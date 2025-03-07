import { ChainClientParams, Network } from "../client";
import { validatePhrase } from "../crypto";
import { SwapAssetList } from "@dojima-wallet/utils";
import axios from "axios";
import BigNumber from "bignumber.js";
import * as ethers from "ethers";
import Web3 from "web3";
import moment from "moment";

import { ETH_DECIMAL } from "./const";
import {
  EthTransferParams,
  EthTxData,
  EthTxDetailsResult,
  EthTxHistoryParams,
  EthTxs,
  GasfeeResult,
  TransactionHistoryResult,
} from "./eth-types";
import {
  calcDoubleSwapOutput,
  calcDoubleSwapSlip,
  calcSwapOutput,
  calcSwapSlip,
  getStagenetInboundObject,
  getTestnetInboundObject,
  PoolData,
  SwapFeeResult,
} from "../swap_utils";

export type EthRpcParams = {
  privateKey: string;
  rpcUrl: string;
  etherscanKey?: string;
};

class EthereumClient {
  protected network: Network;
  protected web3: Web3;
  protected rpcUrl: string;
  protected account: ethers.ethers.Wallet;
  protected provider: ethers.ethers.providers.JsonRpcProvider;
  private phrase = "";
  protected api = "";
  private etherscanApiKey = "";
  private privateKey = "";

  constructor({
    phrase,
    privateKey,
    network = Network.Mainnet,
    rpcUrl,
    etherscanKey = "",
  }: ChainClientParams & EthRpcParams) {
    this.network = network;
    this.rpcUrl = rpcUrl;
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    if ((!phrase && !privateKey) || (phrase && privateKey)) {
      throw new Error("Any one of phrase or privateKey should be provided");
    }
    if (phrase) {
      if (!validatePhrase(phrase)) {
        throw new Error("Invalid phrase");
      }
      this.phrase = phrase;
      const accountData = ethers.Wallet.fromMnemonic(this.phrase);
      this.account = new ethers.Wallet(accountData.privateKey).connect(
        this.provider
      );
    }
    if (privateKey) {
      this.privateKey = privateKey;
      this.account = new ethers.Wallet(this.privateKey).connect(this.provider);
    }
    this.etherscanApiKey = etherscanKey;
    if (this.network === Network.Mainnet || this.network === Network.Stagenet)
      this.api = "https://api.etherscan.io/api?";
    else this.api = "https://api-holesky.etherscan.io/api";
  }

  getAddress(): string {
    return this.account.address;
  }

  async getBalance(address: string): Promise<number> {
    const gweiBalance = await this.web3.eth.getBalance(address); // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
    const ethBalance = this.web3.utils.fromWei(gweiBalance);
    return Number(ethBalance);
  }

  calculateDojFee(baseGasFee: number, multiplier: number): number {
    return new BigNumber(baseGasFee)
      .times(new BigNumber(multiplier))
      .toNumber();
  }

  async estimateGasFee(amount: number, memo?: string): Promise<number> {
    return await this.web3.eth.estimateGas({
      from: this.getAddress(),
      to: this.getAddress(),
      value: amount * Math.pow(10, ETH_DECIMAL),
      data: memo ? this.web3.utils.toHex(memo) : undefined,
    });
  }

  async getFees(amount: number, memo?: string): Promise<GasfeeResult> {
    const estimateGas = await this.estimateGasFee(
      amount,
      memo ? memo : undefined
    );
    return {
      slow: this.calculateDojFee(estimateGas, 1) / Math.pow(10, 9),
      average: this.calculateDojFee(estimateGas, 1.5) / Math.pow(10, 9),
      fast: this.calculateDojFee(estimateGas, 2) / Math.pow(10, 9),
    };
  }

  // Function to estimate gas limit
  async estimateGasLimit(
    tx: ethers.providers.TransactionRequest
  ): Promise<ethers.BigNumber> {
    return await this.provider.estimateGas(tx);
  }

  // Function to get the current gas price
  async getCurrentGasPrice(): Promise<ethers.BigNumber> {
    return await this.provider.getGasPrice();
  }

  async transfer(params: EthTransferParams): Promise<string> {
    const transaction = await this.web3.eth.accounts.signTransaction(
      {
        from: this.getAddress(),
        to: params.recipient,
        value: params.amount * Math.pow(10, ETH_DECIMAL),
        gas: params.fee
          ? params.fee * Math.pow(10, 9)
          : await this.estimateGasFee(
              params.amount,
              params.memo ? params.memo : undefined
            ),
        data: params.memo ? this.web3.utils.toHex(params.memo) : undefined,
      },
      this.account.privateKey
    );

    const transactionResult = await this.web3.eth.sendSignedTransaction(
      transaction.rawTransaction as string
    );
    return transactionResult.transactionHash;
    // const tx = {
    //   to: params.recipient,
    //   value: ethers.utils.parseEther(`${params.amount}`),
    //   data: params.memo ? ethers.utils.toUtf8Bytes(params.memo) : undefined,
    // };
    //
    // // Send transaction with gas limit and gas price
    // const gasLimit = await this.estimateGasLimit(tx);
    // const gasPrice = await this.getCurrentGasPrice();
    //
    // const transactionResponse = await this.account.sendTransaction({
    //   ...tx,
    //   gasLimit,
    //   gasPrice,
    // });
    //
    // return transactionResponse.hash;
  }

  async dummyTx(recipient: string, amount: number): Promise<string> {
    const memo = `NOOP:NOVAULT`;
    const poolHash = await this.transfer({
      recipient,
      amount,
      memo,
    });
    return poolHash;
  }

  async getTransactionData(hash: string): Promise<EthTxData> {
    // const data = await this.web3.eth.getTransaction(hash);
    // if (data) {
    //   return {
    //     transaction_hash: data.hash,
    //     from: data.from,
    //     to: data.to as string,
    //     amount: Number(data.value) / Math.pow(10, ETH_DECIMAL),
    //     gasFee: data.gas / Math.pow(10, 9),
    //     block_number: data.blockNumber as number,
    //     block_hash: data.blockHash as string,
    //     gasPrice: data.gasPrice,
    //     nonce: data.nonce,
    //   };
    // } else {
    //   throw new Error(`Failed to get transaction data (tx-hash: ${hash})`);
    // }
    const tx = await this.provider.getTransaction(hash);
    const receipt = await this.provider.getTransactionReceipt(hash);
    if (tx && receipt) {
      const amount = ethers.utils.formatEther(tx.value);
      const gasUsed = ethers.utils.formatUnits(receipt.gasUsed, "gwei");
      const gasPrice = ethers.utils.formatUnits(tx.gasPrice, "gwei");
      return {
        transaction_hash: tx.hash,
        from: tx.from,
        to: tx.to as string,
        amount: parseFloat(amount),
        gasFee: parseFloat(gasPrice) * parseFloat(gasUsed),
        block_number: receipt.blockNumber as number,
        block_hash: receipt.blockHash as string,
        gasPrice: gasPrice,
        transaction_status: receipt.status,
        nonce: tx.nonce,
      };
    } else {
      throw new Error(`Failed to get transaction data (tx-hash: ${hash})`);
    }
  }

  async getTransactionsHistory(params: EthTxHistoryParams) {
    let requestUrl = `${this.api}?module=account&action=txlist&api=${this.etherscanApiKey}`;

    if (params.address) requestUrl += `&address=${params.address}`;
    if (params.limit) requestUrl += `&offset=${params.limit}`;
    else requestUrl += `&offset=10`;
    if (params.page) requestUrl += `&page=${params.page}`;
    else requestUrl += `&page=1`;
    if (params.sort) requestUrl += `&sort=${params.sort}`;
    else requestUrl += `&sort=desc`;
    if (params.startBlock) requestUrl += `&startblock=${params.startBlock}`;
    else requestUrl += `&startblock=0`;
    if (params.endBlock) requestUrl += `&endblock=${params.endBlock}`;
    else requestUrl += `&endblock=99999999`;
    const convertTimestampToDate = (timestamp: number) => {
      const date = moment(timestamp).toDate().toUTCString();
      return date;
    };

    const convertISOtoUTC = (date: string) => {
      const utcDate = new Date(date).toUTCString();
      return utcDate;
    };

    try {
      let response: TransactionHistoryResult = await (
        await axios.get(requestUrl)
      ).data;
      if (response.status === "1") {
        let result: EthTxDetailsResult[] = response.result;
        if (result !== undefined) {
          const resultTxs: EthTxs = {
            total: result.length,
            txs: result.map((res) => ({
              block: Number(res.blockNumber),
              date: moment(
                convertISOtoUTC(
                  convertTimestampToDate(Number(res.timeStamp) * 1000)
                )
              ).format("DD/MM/YYYY"),
              time: moment(
                convertISOtoUTC(
                  convertTimestampToDate(Number(res.timeStamp) * 1000)
                )
              ).format("HH:mm:ss"),
              transaction_hash: res.hash,
              contract_address:
                res.contractAddress !== "" ? res.contractAddress : "NA",
              value: Number(res.value) / Math.pow(10, 18),
              gas_price: (Number(res.gasPrice) / Math.pow(10, 18)).toFixed(18),
              from: res.from,
              to: res.to,
              transaction_type:
                res.from === params.address.toLowerCase()
                  ? "Send | ETH"
                  : "Receive | ETH",
            })),
          };
          return resultTxs;
        } else {
          return {
            total: 0,
            txs: [],
          };
        }
      } else {
        throw Error(`Failed to get txs list`);
      }
    } catch (error) {
      throw Error(`Failed to get txs list`);
    }
  }

  getSwapOutput(inputAmount: number, pool: PoolData, toDoj: boolean): number {
    const input = inputAmount * Math.pow(10, ETH_DECIMAL);
    return calcSwapOutput(input, pool, toDoj);
  }

  getDoubleSwapOutput(
    inputAmount: number,
    pool1: PoolData,
    pool2: PoolData
  ): number {
    const input = inputAmount * Math.pow(10, ETH_DECIMAL);
    return calcDoubleSwapOutput(input, pool1, pool2);
  }

  getSwapSlip(inputAmount: number, pool: PoolData, toDoj: boolean): number {
    const input = inputAmount * Math.pow(10, ETH_DECIMAL);
    return calcSwapSlip(input, pool, toDoj);
  }

  getDoubleSwapSlip(
    inputAmount: number,
    pool1: PoolData,
    pool2: PoolData
  ): number {
    const input = inputAmount * Math.pow(10, ETH_DECIMAL);
    return calcDoubleSwapSlip(input, pool1, pool2);
  }

  async getSwapFeesData(): Promise<SwapFeeResult> {
    return;
  }

  async getEthereumInboundAddress(hermesApiUrl: string): Promise<string> {
    switch (this.network) {
      case Network.Testnet: {
        const inboundObj = await getTestnetInboundObject(hermesApiUrl, "ETH");
        return inboundObj.address;
      }
      case Network.Stagenet: {
        const inboundObj = await getStagenetInboundObject(hermesApiUrl, "ETH");
        return inboundObj.address;
      }
      case Network.Mainnet: {
        return "";
      }
    }
  }

  async getDefaultLiquidityPoolGasFee(hermesApiUrl: string): Promise<number> {
    switch (this.network) {
      case Network.Testnet: {
        const inboundObj = await getTestnetInboundObject(hermesApiUrl, "ETH");

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, ETH_DECIMAL);

        return gasFee;
      }
      case Network.Stagenet: {
        const inboundObj = await getStagenetInboundObject(hermesApiUrl, "ETH");

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, ETH_DECIMAL);

        return gasFee;
      }
      case Network.Mainnet: {
        return 0;
      }
    }
  }

  async addLiquidityPool(
    amount: number,
    inboundAddress: string,
    hermesAddress?: string
  ): Promise<string> {
    const memo = hermesAddress ? `ADD:ETH.ETH:${hermesAddress}` : `ADD:ETH.ETH`;

    const txHash = await this.transfer({
      amount,
      recipient: inboundAddress,
      memo,
    });

    return txHash;
  }

  async swap(
    amount: number,
    token: SwapAssetList,
    inboundAddress: string,
    recipient: string
  ): Promise<string> {
    const memo = `SWAP:${token}:${recipient}`;

    const txHash = await this.transfer({
      amount,
      recipient: inboundAddress,
      memo,
    });

    return txHash;
  }
}

export { EthereumClient };
// import {
//   Balance,
//   BaseChainClient,
//   ChainClient,
//   ChainClientParams,
//   FeeOption,
//   FeeRates,
//   FeeType,
//   Fees,
//   Network,
//   Tx,
//   TxHash,
//   TxHistoryParams,
//   TxParams,
//   TxsPage,
//   checkFeeBounds,
//   standardFeeRates,
// } from "../client";
// import {
//   Address,
//   Asset,
//   AssetETH,
//   BaseAmount,
//   Chain,
//   assetToString,
//   baseAmount,
//   delay,
// } from "@dojima-wallet/utils";
// import {
//   Provider,
//   TransactionResponse,
// } from "@ethersproject/abstract-provider";
// import {
//   EtherscanProvider,
//   getDefaultProvider,
// } from "@ethersproject/providers";
// import { BigNumber, Signer, Wallet, ethers } from "ethers";
// import { HDNode, parseUnits, toUtf8Bytes } from "ethers/lib/utils";
//
// import { LOWER_FEE_BOUND, UPPER_FEE_BOUND } from "./const";
// import erc20ABI from "./data/erc20.json";
// import * as etherscanAPI from "./etherscan-api";
// import * as ethplorerAPI from "./ethplorer-api";
// import {
//   ApproveParams,
//   CallParams,
//   EstimateApproveParams,
//   EstimateCallParams,
//   EthNetwork,
//   ExplorerUrl,
//   FeesWithGasPricesAndLimits,
//   GasOracleResponse,
//   GasPrices,
//   // InfuraCreds,
//   IsApprovedParams,
//   TxOverrides,
// } from "./types";
// import {
//   BASE_TOKEN_GAS_COST,
//   ETH_DECIMAL,
//   SIMPLE_GAS_COST,
//   call,
//   chainNetworkToEths,
//   estimateApprove,
//   estimateCall,
//   getApprovalAmount,
//   getAssetAddress,
//   getDecimal,
//   getDefaultGasPrices,
//   getFee,
//   getTokenAddress,
//   getTokenBalances,
//   getTxFromEthplorerEthTransaction,
//   getTxFromEthplorerTokenOperation,
//   isApproved,
//   isEthAsset,
//   validateAddress,
// } from "./utils";
//
// /**
//  * Interface for custom Ethereum client
//  */
// export interface EthClient {
//   call<T>(params: CallParams): Promise<T>;
//   estimateCall(asset: EstimateCallParams): Promise<BigNumber>;
//   estimateGasPrices(): Promise<GasPrices>;
//   estimateGasLimit(params: TxParams): Promise<BigNumber>;
//   estimateFeesWithGasPricesAndLimits(
//     params: TxParams
//   ): Promise<FeesWithGasPricesAndLimits>;
//   estimateApprove(params: EstimateApproveParams): Promise<BigNumber>;
//   isApproved(params: IsApprovedParams): Promise<boolean>;
//   approve(params: ApproveParams): Promise<TransactionResponse>;
//   // `getFees` of `BaseChainClient` needs to be overridden
//   getFees(params: TxParams): Promise<Fees>;
//   getWallet(walletIndex?: number): ethers.Wallet;
//   getProvider(): Provider;
//   getEtherscanProvider(): EtherscanProvider;
// }
//
// export type EthereumClientParams = ChainClientParams & {
//   ethplorerUrl?: string;
//   ethplorerApiKey: string;
//   explorerUrl?: ExplorerUrl;
//   etherscanApiKey: string;
//   // infuraCreds?: InfuraCreds
// };
//
// /**
//  * Custom Ethereum client
//  */
// class EthereumClient extends BaseChainClient implements ChainClient, EthClient {
//   private ethNetwork: EthNetwork;
//   private hdNode?: HDNode;
//   private etherscanApiKey: string;
//   private explorerUrl: ExplorerUrl;
//   // private infuraCreds: InfuraCreds | undefined
//   private ethplorerUrl: string;
//   private ethplorerApiKey: string;
//   private providers: Map<Network, Provider> = new Map<Network, Provider>();
//
//   /**
//    * Constructor
//    * @param {EthereumClientParams} params
//    */
//   constructor({
//     network = Network.Mainnet,
//     feeBounds = {
//       lower: LOWER_FEE_BOUND,
//       upper: UPPER_FEE_BOUND,
//     },
//     ethplorerUrl = "https://api.ethplorer.io",
//     // ethplorerApiKey = 'freekey',
//     ethplorerApiKey,
//     explorerUrl,
//     phrase = "",
//     rootDerivationPaths = {
//       [Network.Mainnet]: `m/44'/60'/0'/0/`,
//       [Network.Testnet]: `m/44'/60'/0'/0/`, // this is INCORRECT but makes the unit tests pass
//       [Network.Stagenet]: `m/44'/60'/0'/0/`,
//     },
//     etherscanApiKey,
//   }: // infuraCreds,
//   EthereumClientParams) {
//     super(Chain.Ethereum, { network, rootDerivationPaths, feeBounds });
//     this.ethNetwork = chainNetworkToEths(network);
//     // this.infuraCreds = infuraCreds
//     this.etherscanApiKey = etherscanApiKey;
//     this.ethplorerUrl = ethplorerUrl;
//     this.ethplorerApiKey = ethplorerApiKey;
//     this.explorerUrl = explorerUrl || this.getDefaultExplorerURL();
//     this.setupProviders();
//     phrase && this.setPhrase(phrase);
//   }
//
//   /**
//    * Purge client.
//    *
//    * @returns {void}
//    */
//   purgeClient(): void {
//     super.purgeClient();
//     this.hdNode = undefined;
//   }
//
//   /**
//    * Set/Update the explorer url.
//    *
//    * @param {string} url The explorer url.
//    * @returns {void}
//    */
//   setExplorerURL(url: ExplorerUrl): void {
//     this.explorerUrl = url;
//   }
//
//   /**
//    * Get the current address.
//    *
//    * @param {number} walletIndex (optional) HD wallet index
//    * @returns {Address} The current address.
//    *
//    * @throws Error
//    * Thrown if HDNode is not defined. Note: A phrase is needed to create a wallet and to derive an address from it.
//    * @throws Error
//    * Thrown if wallet index < 0.
//    */
//   getAddress(walletIndex = 0): Address {
//     if (walletIndex < 0) {
//       throw new Error("index must be greater than or equal to zero");
//     }
//     if (!this.hdNode) {
//       throw new Error(
//         "HDNode is not defined. Make sure phrase has been provided."
//       );
//     }
//     return this.hdNode
//       .derivePath(this.getFullDerivationPath(walletIndex))
//       .address.toLowerCase();
//   }
//
//   /**
//    * Get etherjs wallet interface.
//    *
//    * @param {number} walletIndex (optional) HD wallet index
//    * @returns {Wallet} The current etherjs wallet interface.
//    *
//    * @throws Error
//    * Thrown if HDNode is not defined. Note: A phrase is needed to create a wallet and to derive an address from it.
//    */
//   getWallet(walletIndex = 0): ethers.Wallet {
//     if (!this.hdNode) {
//       throw new Error(
//         "HDNode is not defined. Make sure phrase has been provided."
//       );
//     }
//     return new Wallet(
//       this.hdNode.derivePath(this.getFullDerivationPath(walletIndex))
//     ).connect(this.getProvider());
//   }
//
//   setupProviders(): void {
//     // if (this.infuraCreds) {
//     //     // Infura provider takes either a string of project id
//     //     // or an object of id and secret
//     //     const testnetProvider = this.infuraCreds.projectSecret
//     //         ? new ethers.providers.InfuraProvider(EthNetwork.Test, this.infuraCreds)
//     //         : new ethers.providers.InfuraProvider(EthNetwork.Test, this.infuraCreds.projectId)
//     //     const mainnetProvider = this.infuraCreds.projectSecret
//     //         ? new ethers.providers.InfuraProvider(EthNetwork.Main, this.infuraCreds)
//     //         : new ethers.providers.InfuraProvider(EthNetwork.Main, this.infuraCreds.projectId)
//     //     this.providers.set(Network.Testnet, testnetProvider)
//     //     this.providers.set(Network.Mainnet, mainnetProvider)
//     //     this.providers.set(Network.Stagenet, mainnetProvider)
//     // }
//     if (this.etherscanApiKey) {
//       const testnetProvider = new ethers.providers.EtherscanProvider(
//         EthNetwork.Test,
//         this.etherscanApiKey
//       );
//       const mainnetProvider = new ethers.providers.EtherscanProvider(
//         EthNetwork.Main,
//         this.etherscanApiKey
//       );
//       this.providers.set(Network.Testnet, testnetProvider);
//       this.providers.set(Network.Mainnet, mainnetProvider);
//       this.providers.set(Network.Stagenet, mainnetProvider);
//     } else {
//       this.providers.set(Network.Testnet, getDefaultProvider(EthNetwork.Test));
//       this.providers.set(Network.Mainnet, getDefaultProvider(EthNetwork.Main));
//       this.providers.set(Network.Stagenet, getDefaultProvider(EthNetwork.Main));
//     }
//   }
//
//   /**
//    * Get etherjs Provider interface.
//    *
//    * @returns {Provider} The current etherjs Provider interface.
//    */
//   getProvider(): Provider {
//     return this.providers.get(this.network) || getDefaultProvider(this.network);
//   }
//
//   /**
//    * Get etherjs EtherscanProvider interface.
//    *
//    * @returns {EtherscanProvider} The current etherjs EtherscanProvider interface.
//    */
//   getEtherscanProvider(): EtherscanProvider {
//     return new EtherscanProvider(this.ethNetwork, this.etherscanApiKey);
//   }
//
//   /**
//    * Get the explorer url.
//    *
//    * @returns {string} The explorer url for ethereum based on the current network.
//    */
//   getExplorerUrl(): string {
//     return this.getExplorerUrlByNetwork(this.getNetwork());
//   }
//
//   /**
//    * Get the explorer url.
//    *
//    * @returns {ExplorerUrl} The explorer url (both mainnet and testnet) for ethereum.
//    */
//   private getDefaultExplorerURL(): ExplorerUrl {
//     return {
//       [Network.Testnet]: "https://goerli.etherscan.io",
//       [Network.Mainnet]: "https://etherscan.io",
//       [Network.Stagenet]: "https://etherscan.io",
//     };
//   }
//
//   /**
//    * Get the explorer url.
//    *
//    * @param {Network} network
//    * @returns {string} The explorer url for ethereum based on the network.
//    */
//   private getExplorerUrlByNetwork(network: Network): string {
//     return this.explorerUrl[network];
//   }
//
//   /**
//    * Get the explorer url for the given address.
//    *
//    * @param {Address} address
//    * @returns {string} The explorer url for the given address.
//    */
//   getExplorerAddressUrl(address: Address): string {
//     return `${this.getExplorerUrl()}/address/${address}`;
//   }
//
//   /**
//    * Get the explorer url for the given transaction id.
//    *
//    * @param {string} txID
//    * @returns {string} The explorer url for the given transaction id.
//    */
//   getExplorerTxUrl(txID: string): string {
//     return `${this.getExplorerUrl()}/tx/${txID}`;
//   }
//
//   /**
//    * Set/update the current network.
//    *
//    * @param {Network} network
//    * @returns {void}
//    *
//    * @throws {"Network must be provided"}
//    * Thrown if network has not been set before.
//    */
//   setNetwork(network: Network): void {
//     super.setNetwork(network);
//     this.ethNetwork = chainNetworkToEths(network);
//   }
//
//   /**
//    * Set/update a new phrase (Eg. If user wants to change wallet)
//    *
//    * @param {string} phrase A new phrase.
//    * @param {number} walletIndex (optional) HD wallet index
//    * @returns {Address} The address from the given phrase
//    *
//    * @throws {"Invalid phrase"}
//    * Thrown if the given phase is invalid.
//    */
//   setPhrase(phrase: string, walletIndex = 0): Address {
//     this.hdNode = HDNode.fromMnemonic(phrase);
//     return super.setPhrase(phrase, walletIndex);
//   }
//
//   /**
//    * Validate the given address.
//    *
//    * @param {Address} address
//    * @returns {boolean} `true` or `false`
//    */
//   validateAddress(address: Address): boolean {
//     return validateAddress(address);
//   }
//
//   /**
//    * Get the ETH balance of a given address.
//    *
//    * @param {Address} address By default, it will return the balance of the current wallet. (optional)
//    * @returns {Balance[]} The all balance of the address.
//    *
//    * @throws {"Invalid asset"} throws when the give asset is an invalid one
//    */
//   async getBalance(address: Address, assets?: Asset[]): Promise<Balance[]> {
//     const ethAddress = address || this.getAddress();
//     // get ETH balance directly from provider
//     const ethBalance: BigNumber = await this.getProvider().getBalance(
//       ethAddress
//     );
//     const ethBalanceAmount = baseAmount(ethBalance.toString(), ETH_DECIMAL);
//
//     switch (this.getNetwork()) {
//       case Network.Mainnet:
//       case Network.Stagenet: {
//         // use ethplorerAPI for mainnet - ignore assets
//         const account = await ethplorerAPI.getAddress(
//           this.ethplorerUrl,
//           address,
//           this.ethplorerApiKey
//         );
//         const balances: Balance[] = [
//           {
//             asset: AssetETH,
//             amount: ethBalanceAmount,
//           },
//         ];
//
//         if (account.tokens) {
//           balances.push(...getTokenBalances(account.tokens));
//         }
//
//         return balances;
//       }
//       case Network.Testnet: {
//         // use etherscan for testnet
//
//         const newAssets = assets || [AssetETH];
//         const provider = this.getProvider();
//         // Follow approach is only for testnet
//         // For mainnet, we will use ethplorer api(one request only)
//         // And to avoid etherscan api call limit, it gets balances in a sequence way, not in parallel
//         const balances = [];
//         for (let i = 0; i < newAssets.length; i++) {
//           const asset: Asset = newAssets[i];
//           const etherscan = this.getEtherscanProvider();
//           if (!isEthAsset(asset)) {
//             // Handle token balances
//             const assetAddress = getTokenAddress(asset);
//             if (!assetAddress) {
//               throw new Error(`Invalid asset ${asset}`);
//             }
//             const balance = await etherscanAPI.getTokenBalance({
//               baseUrl: etherscan.baseUrl,
//               address,
//               assetAddress,
//               apiKey: etherscan.apiKey as string,
//             });
//             const decimals = (await getDecimal(asset, provider)) || ETH_DECIMAL;
//
//             if (!Number.isNaN(decimals)) {
//               balances.push({
//                 asset,
//                 amount: baseAmount(balance.toString(), decimals),
//               });
//             }
//           } else {
//             balances.push({
//               asset: AssetETH,
//               amount: ethBalanceAmount,
//             });
//           }
//           // Due to etherscan api call limitation, put some delay before another call
//           // Free Etherscan api key limit: 5 calls per second
//           // So 0.3s delay is reasonable for now
//           await delay(300);
//         }
//
//         return balances;
//       }
//     }
//   }
//
//   /**
//    * Get transaction history of a given address with pagination options.
//    * By default it will return the transaction history of the current wallet.
//    *
//    * @param {TxHistoryParams} params The options to get transaction history. (optional)
//    * @returns {TxsPage} The transaction history.
//    */
//   async getTransactions(params?: TxHistoryParams): Promise<TxsPage> {
//     const offset = params?.offset || 0;
//     const limit = params?.limit || 10;
//     const assetAddress = params?.asset;
//
//     const maxCount = 10000;
//
//     let transactions;
//     const etherscan = this.getEtherscanProvider();
//
//     if (assetAddress) {
//       transactions = await etherscanAPI.getTokenTransactionHistory({
//         baseUrl: etherscan.baseUrl,
//         address: params?.address,
//         assetAddress,
//         page: 0,
//         offset: maxCount,
//         apiKey: etherscan.apiKey as string,
//       });
//     } else {
//       transactions = await etherscanAPI.getETHTransactionHistory({
//         baseUrl: etherscan.baseUrl,
//         address: params?.address,
//         page: 0,
//         offset: maxCount,
//         apiKey: etherscan.apiKey as string,
//       });
//     }
//
//     return {
//       total: transactions.length,
//       txs: transactions.filter(
//         (_, index) => index >= offset && index < offset + limit
//       ),
//     };
//   }
//
//   /**
//    * Get the transaction details of a given transaction id.
//    *
//    * @param {string} txId The transaction id.
//    * @param {string} assetAddress The asset address. (optional)
//    * @returns {Tx} The transaction details of the given transaction id.
//    *
//    * @throws {"Need to provide valid txId"}
//    * Thrown if the given txId is invalid.
//    */
//   async getTransactionData(
//     txId: string
//     // assetAddress?: Address
//   ): Promise<Tx> {
//     switch (this.getNetwork()) {
//       case Network.Mainnet:
//       case Network.Stagenet: {
//         // use ethplorerAPI for mainnet - ignore assetAddress
//         const txInfo = await ethplorerAPI.getTxInfo(
//           this.ethplorerUrl,
//           txId,
//           this.ethplorerApiKey
//         );
//         if (!txInfo.operations?.length)
//           return getTxFromEthplorerEthTransaction(txInfo);
//         const tx = getTxFromEthplorerTokenOperation(txInfo.operations[0]);
//         if (!tx) throw new Error("Could not parse transaction data");
//         return tx;
//       }
//       case Network.Testnet: {
//         let tx;
//         const etherscan = this.getEtherscanProvider();
//         const txInfo = await etherscan.getTransaction(txId);
//         if (txInfo) {
//           // if (assetAddress) {
//           //   tx =
//           //     (
//           //       await etherscanAPI.getTokenTransactionHistory({
//           //         baseUrl: etherscan.baseUrl,
//           //         assetAddress,
//           //         startblock: txInfo.blockNumber,
//           //         endblock: txInfo.blockNumber,
//           //         apiKey: etherscan.apiKey as string,
//           //       })
//           //     ).filter((info) => info.hash === txId)[0] ?? null
//           // } else {
//           tx =
//             (
//               await etherscanAPI.getETHTransactionHistory({
//                 baseUrl: etherscan.baseUrl,
//                 startblock: txInfo.blockNumber,
//                 endblock: txInfo.blockNumber,
//                 apiKey: etherscan.apiKey as string,
//                 address: txInfo.from,
//               })
//             ).filter((info) => info.hash === txId)[0] ?? null;
//           // }
//         }
//
//         if (!tx) throw new Error("Could not get transaction history");
//
//         return tx;
//       }
//     }
//   }
//
//   /**
//      * Call a contract function.
//
//      * @param {signer} Signer (optional) The address a transaction is send from. If not set, signer will be defined based on `walletIndex`
//      * @param {Address} contractAddress The contract address.
//      * @param {number} walletIndex (optional) HD wallet index
//      * @param {ContractInterface} abi The contract ABI json.
//      * @param {string} funcName The function to be called.
//      * @param {unknown[]} funcParams (optional) The parameters of the function.
//      *
//      * @returns {T} The result of the contract function call.
//      */
//   async call<T>({
//     signer: txSigner,
//     contractAddress,
//     walletIndex = 0,
//     abi,
//     funcName,
//     funcParams = [],
//   }: CallParams): Promise<T> {
//     const provider = this.getProvider();
//     const signer = txSigner || this.getWallet(walletIndex);
//     return call({
//       provider,
//       signer,
//       contractAddress,
//       abi,
//       funcName,
//       funcParams,
//     });
//   }
//
//   /**
//      * Call a contract function.
//      * @param {Address} contractAddress The contract address.
//      * @param {ContractInterface} abi The contract ABI json.
//      * @param {string} funcName The function to be called.
//      * @param {any[]} funcParams The parameters of the function.
//      * @param {number} walletIndex (optional) HD wallet index
//      *
//      * @returns {BigNumber} The result of the contract function call.
//
//      */
//   async estimateCall({
//     contractAddress,
//     abi,
//     funcName,
//     funcParams = [],
//   }: EstimateCallParams): Promise<BigNumber> {
//     return estimateCall({
//       provider: this.getProvider(),
//       contractAddress,
//       abi,
//       funcName,
//       funcParams,
//     });
//   }
//
//   /**
//    * Check allowance.
//    *
//    * @param {Address} contractAddress The contract address.
//    * @param {Address} spenderAddress The spender address.
//    * @param {BaseAmount} amount The amount to check if it's allowed to spend or not (optional).
//    * @param {number} walletIndex (optional) HD wallet index
//    * @returns {boolean} `true` or `false`.
//    */
//   async isApproved({
//     contractAddress,
//     spenderAddress,
//     amount,
//     walletIndex,
//   }: IsApprovedParams): Promise<boolean> {
//     const allowance = await isApproved({
//       provider: this.getProvider(),
//       amount,
//       spenderAddress,
//       contractAddress,
//       fromAddress: this.getAddress(walletIndex),
//     });
//
//     return allowance;
//   }
//   /**
//    * Check allowance.
//    *
//    * @param {Address} contractAddress The contract address.
//    * @param {Address} spenderAddress The spender address.
//    * @param {signer} Signer (optional) The address a transaction is send from. If not set, signer will be defined based on `walletIndex`
//    * @param {feeOption} FeeOption Fee option (optional)
//    * @param {BaseAmount} amount The amount of token. By default, it will be unlimited token allowance. (optional)
//    * @param {number} walletIndex (optional) HD wallet index
//    *
//    * @throws Error If gas could not been estimated
//    *
//    * @returns {TransactionResponse} The transaction result.
//    */
//   async approve({
//     contractAddress,
//     spenderAddress,
//     feeOption = FeeOption.Fastest,
//     amount,
//     walletIndex = 0,
//     signer: txSigner,
//     gasLimitFallback,
//   }: ApproveParams): Promise<TransactionResponse> {
//     const gasPrice: BigNumber = BigNumber.from(
//       (
//         await this.estimateGasPrices()
//           .then((prices) => prices[feeOption])
//           .catch(() => getDefaultGasPrices()[feeOption])
//       )
//         .amount()
//         .toFixed()
//     );
//
//     const signer = txSigner || this.getWallet(walletIndex);
//
//     const fromAddress = await signer.getAddress();
//
//     const gasLimit: BigNumber = await this.estimateApprove({
//       spenderAddress,
//       contractAddress,
//       fromAddress,
//       amount,
//     }).catch((error) => {
//       if (gasLimitFallback) {
//         return BigNumber.from(gasLimitFallback);
//       }
//
//       throw Error(
//         `Could not estimate gas to send approve transaction ${error}`
//       );
//     });
//
//     try {
//       checkFeeBounds(this.feeBounds, gasPrice.toNumber());
//     } catch (error) {
//       console.warn("Gas price is lower than min fee bound");
//     }
//
//     const valueToApprove: BigNumber = getApprovalAmount(amount);
//
//     const contract = new ethers.Contract(
//       contractAddress,
//       erc20ABI,
//       this.getProvider()
//     );
//
//     const unsignedTx: ethers.PopulatedTransaction /* as same as ethers.TransactionResponse expected by `sendTransaction` */ =
//       await contract.populateTransaction.approve(
//         spenderAddress,
//         valueToApprove
//       );
//
//     const result = await signer.sendTransaction({
//       ...unsignedTx,
//       from: fromAddress,
//       gasPrice,
//       gasLimit,
//     });
//
//     return result;
//   }
//
//   /**
//    * Estimate gas for calling `approve`.
//    *
//    * @param {Address} contractAddress The contract address.
//    * @param {Address} spenderAddress The spender address.
//    * @param {Address} fromAddress The address the approve transaction is sent from.
//    * @param {BaseAmount} amount The amount of token. By default, it will be unlimited token allowance. (optional)
//    *
//    * @returns {BigNumber} Estimated gas
//    */
//   async estimateApprove({
//     fromAddress,
//     contractAddress,
//     spenderAddress,
//     amount,
//   }: EstimateApproveParams): Promise<BigNumber> {
//     return await estimateApprove({
//       provider: this.getProvider(),
//       contractAddress,
//       spenderAddress,
//       fromAddress,
//       abi: erc20ABI,
//       amount,
//     });
//   }
//
//   /**
//    * Transfers ETH or ERC20 token
//    *
//    * Note: A given `feeOption` wins over `gasPrice` and `gasLimit`
//    *
//    * @param {TxParams} params The transfer options.
//    * @param {signer} Signer (optional) The address a transaction is send from. If not set, signer will be defined based on `walletIndex`
//    * @param {feeOption} FeeOption Fee option (optional)
//    * @param {gasPrice} BaseAmount Gas price (optional)
//    * @param {gasLimit} BigNumber Gas limit (optional)
//    *
//    * @throws Error Thrown if address of given `Asset` could not be parsed
//    *
//    * @returns {TxHash} The transaction hash.
//    */
//   async transfer({
//     walletIndex = 0,
//     signer: txSigner,
//     asset = AssetETH,
//     memo,
//     amount,
//     recipient,
//     feeOption = FeeOption.Fast,
//     gasPrice,
//     gasLimit,
//   }: TxParams & {
//     signer?: Signer;
//     feeOption?: FeeOption;
//     gasPrice?: BaseAmount;
//     gasLimit?: BigNumber;
//   }): Promise<TxHash> {
//     const txAmount = BigNumber.from(amount.amount().toFixed());
//
//     const isETH = isEthAsset(asset);
//     const assetAddress = getAssetAddress(asset);
//     if (!assetAddress)
//       throw Error(`Can't parse address from asset ${assetToString(asset)}`);
//
//     const txGasPrice: BigNumber = gasPrice
//       ? BigNumber.from(gasPrice.amount().toFixed())
//       : await this.estimateGasPrices()
//           .then((prices) => prices[feeOption])
//           .catch(() => getDefaultGasPrices()[feeOption])
//           .then((gp) => BigNumber.from(gp.amount().toFixed()));
//
//     const defaultGasLimit: ethers.BigNumber = isETH
//       ? SIMPLE_GAS_COST
//       : BASE_TOKEN_GAS_COST;
//     const txGasLimit =
//       gasLimit ||
//       (await this.estimateGasLimit({ asset, recipient, amount, memo }).catch(
//         () => defaultGasLimit
//       ));
//
//     type SafeTxOverrides = Omit<TxOverrides, "gasPrice"> & {
//       gasPrice: ethers.BigNumber;
//     };
//     const overrides: SafeTxOverrides = {
//       gasLimit: txGasLimit,
//       gasPrice: txGasPrice,
//     };
//
//     try {
//       checkFeeBounds(this.feeBounds, overrides.gasPrice.toNumber());
//     } catch (error) {
//       console.warn("Gas price is lower than min fee bound");
//     }
//
//     const signer = txSigner || this.getWallet(walletIndex);
//
//     // Transfer ETH
//     if (isETH) {
//       const transactionRequest = Object.assign(
//         { to: recipient, value: txAmount },
//         {
//           ...overrides,
//           data: memo ? toUtf8Bytes(memo) : undefined,
//         }
//       );
//
//       const { hash } = await signer.sendTransaction(transactionRequest);
//
//       return hash;
//     }
//     // Transfer ERC20
//     const { hash } = await this.call<TransactionResponse>({
//       signer,
//       contractAddress: assetAddress,
//       abi: erc20ABI,
//       funcName: "transfer",
//       funcParams: [recipient, txAmount, Object.assign({}, overrides)],
//     });
//
//     return hash;
//   }
//
//   /**
//    * Estimate gas price.
//    * @see https://etherscan.io/apis#gastracker
//    *
//    * @returns {GasPrices} The gas prices (average, fast, fastest) in `Wei` (`BaseAmount`)
//    */
//   async estimateGasPrices(): Promise<GasPrices> {
//     try {
//       // Note: `rates` are in `gwei`
//       // To have all values in `BaseAmount`, they needs to be converted into `wei` (1 gwei = 1,000,000,000 wei = 1e9)
//       const ratesInGwei: FeeRates = standardFeeRates(
//         await this.getFeeRateFromHermeschain()
//       );
//       return {
//         [FeeOption.Average]: baseAmount(
//           ratesInGwei[FeeOption.Average] * 10 ** 9,
//           ETH_DECIMAL
//         ),
//         [FeeOption.Fast]: baseAmount(
//           ratesInGwei[FeeOption.Fast] * 10 ** 9,
//           ETH_DECIMAL
//         ),
//         [FeeOption.Fastest]: baseAmount(
//           ratesInGwei[FeeOption.Fastest] * 10 ** 9,
//           ETH_DECIMAL
//         ),
//       };
//     } catch (error) {}
//     //should only get here if hermes fails
//     try {
//       return await this.estimateGasPricesFromEtherscan();
//     } catch (error) {
//       return Promise.reject(
//         new Error(`Failed to estimate gas price: ${error}`)
//       );
//     }
//   }
//
//   /**
//    * Estimate gas price.
//    * @see https://etherscan.io/apis#gastracker
//    *
//    * @returns {GasPrices} The gas prices (average, fast, fastest) in `Wei` (`BaseAmount`)
//    *
//    * @throws {"Failed to estimate gas price"} Thrown if failed to estimate gas price.
//    */
//   async estimateGasPricesFromEtherscan(): Promise<GasPrices> {
//     const etherscan = this.getEtherscanProvider();
//     if (this.network === Network.Mainnet) {
//       const response: GasOracleResponse = await etherscanAPI.getGasOracle(
//         etherscan.baseUrl,
//         etherscan.apiKey
//       );
//       // Convert result of gas prices: `Gwei` -> `Wei`
//       const averageWei = parseUnits(response.SafeGasPrice, "gwei");
//       const fastWei = parseUnits(response.ProposeGasPrice, "gwei");
//       const fastestWei = parseUnits(response.FastGasPrice, "gwei");
//
//       return {
//         average: baseAmount(averageWei.toString(), ETH_DECIMAL),
//         fast: baseAmount(fastWei.toString(), ETH_DECIMAL),
//         fastest: baseAmount(fastestWei.toString(), ETH_DECIMAL),
//       };
//     } else {
//       const response = await etherscanAPI.getGoerliGasOracle(
//         etherscan.baseUrl,
//         etherscan.apiKey
//       );
//
//       return {
//         average: baseAmount(response, ETH_DECIMAL),
//         fast: baseAmount(response, ETH_DECIMAL),
//         fastest: baseAmount(response, ETH_DECIMAL),
//       };
//     }
//   }
//
//   /**
//    * Estimate gas.
//    *
//    * @param {TxParams} params The transaction and fees options.
//    *
//    * @throws Error Thrown if address could not parsed from given ERC20 asset
//    *
//    * @returns {BaseAmount} The estimated gas fee.
//    */
//   async estimateGasLimit({
//     asset = AssetETH,
//     recipient,
//     amount,
//     memo,
//   }: TxParams): Promise<BigNumber> {
//     const txAmount = BigNumber.from(amount.amount().toFixed());
//
//     if (!isEthAsset(asset)) {
//       // ERC20 gas estimate
//       const assetAddress = getTokenAddress(asset);
//       if (!assetAddress)
//         throw Error(`Can't get address from asset ${assetToString(asset)}`);
//       const contract = new ethers.Contract(
//         assetAddress,
//         erc20ABI,
//         this.getProvider()
//       );
//
//       return await contract.estimateGas.transfer(recipient, txAmount, {
//         from: this.getAddress(),
//       });
//     }
//
//     // ETH gas estimate
//     const transactionRequest = {
//       from: this.getAddress(),
//       to: recipient,
//       value: txAmount,
//       data: memo ? toUtf8Bytes(memo) : undefined,
//     };
//
//     return await this.getProvider().estimateGas(transactionRequest);
//   }
//
//   /**
//    * Estimate gas prices/limits (average, fast fastest).
//    *
//    * @param {TxParams} params
//    * @returns {FeesWithGasPricesAndLimits} The estimated gas prices/limits.
//    */
//   async estimateFeesWithGasPricesAndLimits(
//     params: TxParams
//   ): Promise<FeesWithGasPricesAndLimits> {
//     // gas prices
//     const gasPrices = await this.estimateGasPrices();
//     const { fast: fastGP, fastest: fastestGP, average: averageGP } = gasPrices;
//
//     // gas limits
//     const gasLimit = await this.estimateGasLimit({
//       asset: params.asset,
//       amount: params.amount,
//       recipient: params.recipient,
//       memo: params.memo,
//     });
//
//     return {
//       gasPrices,
//       fees: {
//         type: FeeType.PerByte,
//         average: getFee({ gasPrice: averageGP, gasLimit }),
//         fast: getFee({ gasPrice: fastGP, gasLimit }),
//         fastest: getFee({ gasPrice: fastestGP, gasLimit }),
//       },
//       gasLimit,
//     };
//   }
//
//   /**
//    * Get fees.
//    *
//    * @param {TxParams} params
//    * @returns {Fees} The average/fast/fastest fees.
//    *
//    * @throws {"Params need to be passed"} Thrown if params are not set
//    */
//   getFees(): never;
//   getFees(params: TxParams): Promise<Fees>;
//   async getFees(params?: TxParams): Promise<Fees> {
//     if (!params) throw new Error("Params need to be passed");
//
//     const { fees } = await this.estimateFeesWithGasPricesAndLimits(params);
//     return fees;
//   }
// }
//
// export { EthereumClient };
