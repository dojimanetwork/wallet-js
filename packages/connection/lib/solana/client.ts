import { ChainClientParams, Network } from "../client";
import { validatePhrase } from "../crypto";
import { SwapAssetList } from "@dojima-wallet/utils";
import * as web3 from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";

import { SOL_DECIMAL, programId } from "./const";
import {
  GasfeeResult,
  SolTxData,
  SolTxParams,
  SolTxs,
  SolTxsHistoryParams,
} from "./types";
import { baseToLamports, IDL, lamportsToBase, SOLNodeWallet } from "./utils";
import { Program, Provider } from "@project-serum/anchor";
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

export interface SolanaChainClient {
  getCluster(): web3.Cluster;
  getAddress(index?: number): Promise<string>;
  getBalance(address: string): Promise<number>;
  getFees(): Promise<GasfeeResult>;
  transfer(params: SolTxParams): Promise<string>;
  getTransactionData(txId: string, state?: web3.Finality): Promise<SolTxData>;
  getTransactionsHistory(params?: SolTxsHistoryParams): Promise<SolTxs>;
}

export type ChainEndpointParams = {
  endpoint: string;
  apiKey?: string;
};

export const defaultSolEndpoint = "mainnet-beta";

export const alchemySolRpcUrl = "https://solana-mainnet.g.alchemy.com/v2/";

class SolanaClient implements SolanaChainClient {
  protected network: Network;
  protected cluster: web3.Cluster;
  protected connection: web3.Connection;
  private phrase = "";

  constructor({
    phrase,
    network = Network.Mainnet,
    endpoint,
    apiKey = "",
  }: ChainClientParams & ChainEndpointParams) {
    if (phrase) {
      if (!validatePhrase(phrase)) {
        throw new Error("Invalid phrase");
      }
      this.phrase = phrase;
    }
    this.network = network;
    this.cluster = this.getCluster();
    // if (this.network === Network.Testnet && endpoint === alchemySolRpcUrl) {
    //   throw Error(`'endpoint' params can't be empty for testnet`);
    // }
    // if (this.network === Network.Mainnet && apiKey === "") {
    //   throw Error(`apiKey can't be empty for mainnet`);
    // }
    if (this.network === Network.Testnet) {
      this.connection = new web3.Connection(endpoint, "confirmed");
    } else {
      // this.connection = new web3.Connection(
      //   web3.clusterApiUrl(this.cluster),
      //   "confirmed"
      // );
      this.connection = new web3.Connection(
        // `${endpoint}${apiKey}`,
        endpoint,
        "confirmed"
      );
    }
  }

  getCluster(): web3.Cluster {
    switch (this.network) {
      case Network.Mainnet:
        return "mainnet-beta";
      case Network.Stagenet:
      case Network.Testnet:
        return "devnet";
      // case Network.Testnet:
      //   return "testnet";
    }
  }

  private async getKeypair(): Promise<web3.Keypair[]> {
    const seed = bip39.mnemonicToSeedSync(`${this.phrase}`, ""); // (mnemonic, password)
    const keyPairResult: web3.Keypair[] = [];
    for (let i = 0; i < 10; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      const keypair = web3.Keypair.fromSeed(
        derivePath(path, seed.toString("hex")).key
      );
      keyPairResult.push(keypair);
    }
    return keyPairResult;
  }

  async getAddress(index = 0): Promise<string> {
    const keypair = await this.getKeypair();
    const address = keypair[index].publicKey.toBase58();
    return address;
  }

  async requestSolTokens(
    faucetEndpoint: string,
    address: string
  ): Promise<string> {
    if (this.network === Network.Mainnet || this.network === Network.Stagenet) {
      return "Method not allowed for mainnet";
    } else {
      const faucetConnection = new web3.Connection(
        `${faucetEndpoint}`,
        "confirmed"
      );
      const pubKey = new web3.PublicKey(address);
      const amt = baseToLamports(2, SOL_DECIMAL);
      const requestHash = await faucetConnection.requestAirdrop(pubKey, amt);
      return requestHash;
    }
  }

  async getBalance(address: string): Promise<number> {
    // Get account details
    const pubKey = new web3.PublicKey(address);

    // Retrieve user token balance
    let balance = await this.connection.getBalance(pubKey);
    balance = lamportsToBase(balance, SOL_DECIMAL);
    return balance;
  }

  // Calculate Gas fee based in recent block hash
  async getFees(): Promise<GasfeeResult> {
    // Get the latest blockhash
    const { blockhash } = await this.connection.getLatestBlockhash("finalized");

    // Create a dummy transaction message
    const message = new web3.TransactionMessage({
      payerKey: (await this.getKeypair())[0].publicKey, // Replace with your wallet or any valid public key
      recentBlockhash: blockhash,
      instructions: [], // No instructions needed to calculate base fees
    });

    // Convert message to a VersionedTransaction
    const versionedTx = new web3.VersionedTransaction(
      message.compileToLegacyMessage()
    );

    // Fetch the fee for the dummy message
    const sol_gasFee = await this.connection.getFeeForMessage(
      versionedTx.message,
      "finalized"
    );

    if (!sol_gasFee) {
      throw new Error("Failed to fetch fees");
    }

    const normalizedFee = lamportsToBase(sol_gasFee.value, SOL_DECIMAL);

    return {
      slow: normalizedFee,
      average: normalizedFee,
      fast: normalizedFee,
    };
  }

  // // Create transaction details based on user input
  // async createTransaction(
  //   walletIndex = 0,
  //   recipient: string,
  //   amount: number
  // ): Promise<web3.Transaction> {
  //   // Get account address
  //   const fromPubkey = new web3.PublicKey(await this.getAddress(walletIndex));
  //
  //   // Convert recipient string to PublicKey
  //   const toPubkey = new web3.PublicKey(recipient);
  //
  //   const toAmount = baseToLamports(amount, SOL_DECIMAL);
  //
  //   // Add transaction for the required amount
  //   const rawTx = new web3.Transaction().add(
  //     web3.SystemProgram.transfer({
  //       fromPubkey,
  //       toPubkey,
  //       lamports: toAmount,
  //     })
  //   );
  //
  //   return rawTx;
  // }
  //
  // async signAndSend(walletIndex = 0, rawTx: web3.Transaction): Promise<string> {
  //   // Get account details
  //   const account = await this.getKeypair();
  //
  //   // Sign the transaction
  //   const signature = await web3.sendAndConfirmTransaction(
  //     this.connection,
  //     rawTx,
  //     [account[walletIndex]]
  //   );
  //
  //   return signature;
  // }
  //
  // async transfer({
  //   walletIndex = 0,
  //   recipient,
  //   amount,
  // }: SolTxParams): Promise<string> {
  //   const rawTx = await this.createTransaction(walletIndex, recipient, amount);
  //   const txHash = await this.signAndSend(walletIndex, rawTx);
  //
  //   if (!txHash) throw Error(`Invalid transaction hash: ${txHash}`);
  //
  //   return txHash;
  // }

  async transfer({
    walletIndex = 0,
    recipient,
    amount,
  }: SolTxParams): Promise<string> {
    const AMOUNT_TO_TRANSFER = amount * web3.LAMPORTS_PER_SOL;

    // Convert recipient string to PublicKey
    const toPubkey = new web3.PublicKey(recipient);

    // Get account details
    const account = await this.getKeypair();

    // Create instructions for the transaction
    const instructions: web3.TransactionInstruction[] = [
      web3.SystemProgram.transfer({
        fromPubkey: account[0].publicKey,
        toPubkey: toPubkey,
        lamports: AMOUNT_TO_TRANSFER,
      }),
    ];

    try {
      // Get the latest blockhash
      let latestBlockhash = await this.connection.getLatestBlockhash("recent");

      // Generate the transaction message
      const messageV0 = new web3.TransactionMessage({
        payerKey: account[0].publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: instructions,
      }).compileToV0Message();

      // Create a VersionedTransaction and sign it
      const transaction = new web3.VersionedTransaction(messageV0);
      transaction.sign([account[0]]);

      // Send the transaction to the network
      const txhash = await this.connection.sendTransaction(transaction, {
        maxRetries: 15,
        preflightCommitment: "processed",
      });

      // Wait for 3 seconds before checking the transaction status
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Fetch transaction details
      const txResult = await this.connection.getTransaction(txhash, {
        maxSupportedTransactionVersion: 0,
      });
      if (!txResult || !txResult.meta) {
        throw Error("Transaction not confirmed within the expected time.");
      }

      // Return transaction hash on success
      return txhash;
    } catch (error) {
      // Return error message or throw for higher-level handling
      // return `Error: ${error.message}`;
      throw Error(`Error during transaction: ${error.message}`);
    }
  }

  async dummyTx(recipient: string, amount: number): Promise<string> {
    const toAmount = baseToLamports(amount, SOL_DECIMAL);
    const memo = `NOOP:NOVAULT`;
    const poolHash = await this.solanaBatchTxsToHermes(
      toAmount,
      recipient,
      memo
    );
    // await this.connection.confirmTransaction(swapHash);
    return poolHash;
  }

  async getTransactionData(
    txId: string,
    state?: web3.Finality
  ): Promise<SolTxData> {
    const txData = await this.connection.getTransaction(txId, {
      commitment: state ? state : "confirmed",
    });
    if (txData !== null && txData.meta !== null) {
      const amount = txData.meta.postBalances[1] - txData.meta.preBalances[1];

      /** For date and time make use of these */

      // const convertTSToDate = (timestamp: number) => {
      //     const date = moment(
      //         convertISOtoUTC(
      //             convertTimestampToDate(timestamp * 1000)
      //         )
      //     ).format("DD/MM/YYYY");
      //     return date;
      // };
      //
      // const convertTSToTime = (timestamp: number) => {
      //     const date = moment(
      //         convertISOtoUTC(
      //             convertTimestampToDate(timestamp * 1000)
      //         )
      //     ).format("HH:mm:ss");
      //     return date;
      // };

      const resultData: SolTxData = {
        transaction_hash: txId,
        timeStamp: txData.blockTime ? txData.blockTime : 0,
        gasFee: lamportsToBase(txData.meta.fee, SOL_DECIMAL),
        amount: lamportsToBase(amount, SOL_DECIMAL),
        block: txData.slot,
        from: txData.transaction.message.accountKeys[0].toString(),
        to: txData.transaction.message.accountKeys[1].toString(),
        recentBlockHash: txData.transaction.message.recentBlockhash,
        instructionData: txData.transaction.message.instructions[0].data,
      };
      return resultData;
    } else {
      throw new Error(`Failed to get transaction data (tx-hash: ${txId})`);
    }
  }

  async getTransactionsHistory(params?: SolTxsHistoryParams): Promise<SolTxs> {
    const limit = params?.offset || 100;
    const before = params?.beforeHash || undefined;
    const until = params?.untilHash || undefined;

    const pubKey = new web3.PublicKey(
      params?.address || (await this.getAddress())
    );
    const signatures = await this.connection.getSignaturesForAddress(pubKey, {
      limit,
      before,
      until,
    });

    if (!signatures)
      throw new Error(
        `Failed to get transactions list (address: ${
          params?.address || (await this.getAddress())
        })`
      );

    const resultTxs: SolTxs = {
      total: signatures.length,
      txs: await Promise.all(
        signatures.map(({ signature }) => this.getTransactionData(signature))
      ),
    };
    return resultTxs;
  }

  getSwapOutput(inputAmount: number, pool: PoolData, toDoj: boolean): number {
    const input = inputAmount * Math.pow(10, SOL_DECIMAL);
    return calcSwapOutput(input, pool, toDoj);
  }

  getDoubleSwapOutput(
    inputAmount: number,
    pool1: PoolData,
    pool2: PoolData
  ): number {
    const input = inputAmount * Math.pow(10, SOL_DECIMAL);
    return calcDoubleSwapOutput(input, pool1, pool2);
  }

  getSwapSlip(inputAmount: number, pool: PoolData, toDoj: boolean): number {
    const input = inputAmount * Math.pow(10, SOL_DECIMAL);
    return calcSwapSlip(input, pool, toDoj);
  }

  getDoubleSwapSlip(
    inputAmount: number,
    pool1: PoolData,
    pool2: PoolData
  ): number {
    const input = inputAmount * Math.pow(10, SOL_DECIMAL);
    return calcDoubleSwapSlip(input, pool1, pool2);
  }

  async getSwapFeesData(): Promise<SwapFeeResult> {
    return;
  }

  async getSolanaInboundAddress(hermesApiUrl: string): Promise<string> {
    switch (this.network) {
      case Network.Testnet: {
        const inboundObj = await getTestnetInboundObject(hermesApiUrl, "SOL");
        return inboundObj.address;
      }
      case Network.Stagenet: {
        const inboundObj = await getStagenetInboundObject(hermesApiUrl, "SOL");
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
        const inboundObj = await getTestnetInboundObject(hermesApiUrl, "SOL");

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, SOL_DECIMAL);

        return gasFee;
      }
      case Network.Stagenet: {
        const inboundObj = await getStagenetInboundObject(hermesApiUrl, "SOL");

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, SOL_DECIMAL);

        return gasFee;
      }
      case Network.Mainnet: {
        return 0;
      }
    }
  }

  async getProvider() {
    const opts: web3.ConfirmOptions = {
      preflightCommitment: "processed",
    };
    // const provider = new Provider(this.connection, new Wallet((await this.getKeypair())[0]), opts);
    const provider = new Provider(
      this.connection,
      new SOLNodeWallet((await this.getKeypair())[0]),
      opts
    );
    return provider;
  }

  async solanaBatchTxsToHermes(
    amount: number,
    recipient: string,
    memo: string
  ) {
    const provider = await this.getProvider();
    const programIDPPubKey = new web3.PublicKey(`${programId}`);
    const program = new Program(IDL, programIDPPubKey, provider);
    const fromWallet = await this.getKeypair();
    const swapHash = await program.rpc.transferNativeTokens(`${amount}`, memo, {
      accounts: {
        from: fromWallet[0].publicKey,
        to: new web3.PublicKey(recipient),
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [fromWallet[0]],
    });
    // await this.connection.confirmTransaction(swapHash);
    return swapHash;
  }

  async addLiquidityPool(
    amount: number,
    inboundAddress: string,
    hermesAddress?: string
  ) {
    const toAmount = baseToLamports(amount, SOL_DECIMAL);
    const memo = hermesAddress ? `ADD:SOL.SOL:${hermesAddress}` : `ADD:SOL.SOL`;
    const poolHash = await this.solanaBatchTxsToHermes(
      toAmount,
      inboundAddress,
      memo
    );
    // await this.connection.confirmTransaction(swapHash);
    return poolHash;
  }

  async swap(
    amount: number,
    token: SwapAssetList,
    inboundAddress: string,
    recipient: string
  ) {
    const toAmount = baseToLamports(amount, SOL_DECIMAL);
    const memo = `SWAP:${token}:${recipient}`;
    const swapHash = await this.solanaBatchTxsToHermes(
      toAmount,
      inboundAddress,
      memo
    );
    // await this.connection.confirmTransaction(swapHash);
    return swapHash;
  }
}

export { SolanaClient };
