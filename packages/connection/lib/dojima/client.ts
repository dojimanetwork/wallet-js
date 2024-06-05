import { ChainClientParams, Network } from "../client";
import { validatePhrase } from "../crypto";
// import BigNumber from "bignumber.js";
import * as ethers from "ethers";
import Web3 from "web3";

import { DOJ_DECIMAL } from "./const";
import { DojTransferParams, DojTxData } from "./types";
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
import { SwapAssetList } from "@dojima-wallet/utils";

export type DojRpcParams = {
  rpcUrl: string;
  infuraApiKey?: string;
};

class DojimaClient {
  protected network: Network;
  protected web3: Web3;
  protected rpcUrl: string;
  protected provider: ethers.ethers.providers.JsonRpcProvider;
  protected account: ethers.ethers.Wallet;
  protected phrase = "";

  constructor({ phrase, network, rpcUrl }: ChainClientParams & DojRpcParams) {
    if (phrase) {
      if (!validatePhrase(phrase)) {
        throw new Error("Invalid phrase");
      }
      this.phrase = phrase;
    }
    this.network = network;
    // if (
    //   (this.network === Network.Testnet || this.network === Network.Stagenet) &&
    //   rpcUrl === defaultDojRpcUrl
    // ) {
    //   throw Error(`'rpcUrl' param can't be empty for 'testnet' or 'stagenet`);
    // }
    this.rpcUrl = rpcUrl;
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
    // this.account = ethers.Wallet.fromMnemonic(this.phrase);
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    const accountData = ethers.Wallet.fromMnemonic(this.phrase);
    this.account = new ethers.Wallet(accountData.privateKey).connect(
      this.provider
    );
  }

  getAddress(): string {
    return this.account.address;
  }

  async getBalance(address: string): Promise<number> {
    const gweiBalance = await this.web3.eth.getBalance(address); // Results balance in gwei, 1 doj = 10^9 gwei(1,000,000,000)
    const dojBalance = this.web3.utils.fromWei(gweiBalance);
    return Number(dojBalance);
  }

  // calculateDojFee(baseGasFee: number, multiplier: number): number {
  //   return new BigNumber(baseGasFee)
  //     .times(new BigNumber(multiplier))
  //     .toNumber();
  // }
  //
  // async estimateGasFee(amount: number, memo?: string): Promise<number> {
  //   return await this.web3.eth.estimateGas({
  //     from: this.getAddress(),
  //     to: this.getAddress(),
  //     value: amount * Math.pow(10, DOJ_DECIMAL),
  //     data: memo ? this.web3.utils.toHex(memo) : undefined,
  //   });
  // }
  //
  // async getFees(amount: number, memo?: string): Promise<GasfeeResult> {
  //   const estimateGas = await this.estimateGasFee(
  //     amount,
  //     memo ? memo : undefined
  //   );
  //   return {
  //     slow: this.calculateDojFee(estimateGas, 1) / Math.pow(10, 9),
  //     average: this.calculateDojFee(estimateGas, 1.5) / Math.pow(10, 9),
  //     fast: this.calculateDojFee(estimateGas, 2) / Math.pow(10, 9),
  //   };
  // }

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

  // Function to calculate the gas fee
  async calculateGasFee(
    recipient: string,
    amount: number,
    memo?: string
  ): Promise<string> {
    const tx = {
      to: recipient,
      value: ethers.utils.parseEther(`${amount}`),
      data: memo ? ethers.utils.toUtf8Bytes(memo) : undefined,
    };
    const gasLimit = await this.estimateGasLimit(tx);
    const gasPrice = await this.getCurrentGasPrice();
    return ethers.utils.formatEther(gasLimit.mul(gasPrice));
  }

  async transfer(params: DojTransferParams): Promise<string> {
    const tx = {
      to: params.recipient,
      value: ethers.utils.parseEther(`${params.amount}`),
      data: params.memo ? ethers.utils.toUtf8Bytes(params.memo) : undefined,
    };

    // Send transaction with gas limit and gas price
    const gasLimit = await this.estimateGasLimit(tx);
    const gasPrice = await this.getCurrentGasPrice();

    const transactionResponse = await this.account.sendTransaction({
      ...tx,
      gasLimit,
      gasPrice,
    });

    return transactionResponse.hash;
    // const transaction = await this.web3.eth.accounts.signTransaction(
    //   {
    //     from: this.getAddress(),
    //     to: params.recipient,
    //     value: params.amount * Math.pow(10, DOJ_DECIMAL),
    //     gas: params.fee
    //       ? params.fee * Math.pow(10, 9)
    //       : await this.estimateGasFee(
    //           params.amount,
    //           params.memo ? params.memo : undefined
    //         ),
    //     data: params.memo ? this.web3.utils.toHex(params.memo) : undefined,
    //   },
    //   this.account.privateKey
    // );
    //
    // const transactionResult = await this.web3.eth.sendSignedTransaction(
    //   transaction.rawTransaction as string
    // );
    // return transactionResult.transactionHash;
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

  async getTransactionData(hash: string): Promise<DojTxData> {
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
        nonce: tx.nonce,
      };
    } else {
      throw new Error(`Failed to get transaction data (tx-hash: ${hash})`);
    }
    // const data = await this.web3.eth.getTransaction(hash);
    // if (data) {
    //   return {
    //     transaction_hash: data.hash,
    //     from: data.from,
    //     to: data.to as string,
    //     amount: Number(data.value) / Math.pow(10, 18),
    //     gasFee: data.gas / Math.pow(10, 9),
    //     block_number: data.blockNumber as number,
    //     block_hash: data.blockHash as string,
    //     gasPrice: data.gasPrice,
    //     nonce: data.nonce,
    //   };
    // } else {
    //   throw new Error(`Failed to get transaction data (tx-hash: ${hash})`);
    // }
  }

  getSwapOutput(inputAmount: number, pool: PoolData, toDoj: boolean): number {
    const input = inputAmount * Math.pow(10, DOJ_DECIMAL);
    return calcSwapOutput(input, pool, toDoj);
  }

  getDoubleSwapOutput(
    inputAmount: number,
    pool1: PoolData,
    pool2: PoolData
  ): number {
    const input = inputAmount * Math.pow(10, DOJ_DECIMAL);
    return calcDoubleSwapOutput(input, pool1, pool2);
  }

  getSwapSlip(inputAmount: number, pool: PoolData, toDoj: boolean): number {
    const input = inputAmount * Math.pow(10, DOJ_DECIMAL);
    return calcSwapSlip(input, pool, toDoj);
  }

  getDoubleSwapSlip(
    inputAmount: number,
    pool1: PoolData,
    pool2: PoolData
  ): number {
    const input = inputAmount * Math.pow(10, DOJ_DECIMAL);
    return calcDoubleSwapSlip(input, pool1, pool2);
  }

  async getSwapFeesData(): Promise<SwapFeeResult> {
    return;
  }

  async getDojimaInboundAddress(): Promise<string> {
    switch (this.network) {
      case Network.Testnet: {
        const inboundObj = await getTestnetInboundObject("DOJ");
        return inboundObj.address;
      }
      case Network.Stagenet: {
        const inboundObj = await getStagenetInboundObject("DOJ");
        return inboundObj.address;
      }
      case Network.Mainnet: {
        return "";
      }
    }
  }

  async getDefaultLiquidityPoolGasFee(): Promise<number> {
    switch (this.network) {
      case Network.Testnet: {
        const inboundObj = await getTestnetInboundObject("DOJ");

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, DOJ_DECIMAL);

        return gasFee;
      }
      case Network.Stagenet: {
        const inboundObj = await getStagenetInboundObject("DOJ");

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, DOJ_DECIMAL);

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
    dojAddress?: string
  ): Promise<string> {
    const memo = dojAddress ? `ADD:DOJ.DOJ:${dojAddress}` : `ADD:DOJ.DOJ`;

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

export { DojimaClient };
