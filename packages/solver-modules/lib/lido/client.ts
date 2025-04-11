import {
  LidoSDK,
  // LidoSDKCore,
  LIDO_CONTRACT_NAMES,
  // LidoSDKStake,
  // LidoSDKWithdraw,
  // LidoSDKWrap,
  // LidoSDKstETH,
  // LidoSDKwstETH,
  // LidoSDKUnstETH,
  // LidoSDKShares,
  // LidoSDKStatistics,
  // LidoSDKRewards,
  TransactionCallback,
  TransactionCallbackStage,
  SDKError,
} from "@lidofinance/lido-ethereum-sdk";
import {
  // createPublicClient,
  createWalletClient,
  custom,
  // http,
  Address,
} from "viem";
import * as SupportedChains from "viem/chains";
import { ethers } from "ethers";

export class LidoClient {
  private sdk: LidoSDK;
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private chain: string;
  private rpcUrl: string;

  constructor(privateKey: string, chain: string) {
    this.chain = chain;
    this.rpcUrl = this.getRpcUrl();
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);

    // const rpcProvider = createPublicClient({
    //     chain: this.getChain(),
    //     transport: http(this.rpcUrl),
    // });

    const web3Provider = createWalletClient({
      chain: this.getChain(),
      transport: custom({
        request: ({ method, params }) => {
          return this.provider.send(method, params);
        },
      }),
    });

    // Initialize Lido SDK
    this.sdk = new LidoSDK({
      chainId: this.getChainId(),
      // rpcProvider,
      rpcUrls: [this.rpcUrl],
      web3Provider,
    });
  }

  getChain() {
    switch (this.chain) {
      case "mainnet":
        return SupportedChains.mainnet;
      case "sepolia":
        return SupportedChains.sepolia;
      case "goerli":
        return SupportedChains.goerli;
      case "holesky":
        return SupportedChains.holesky;
      default:
        throw new Error(`Unsupported chain: ${this.chain}`);
    }
  }

  getChainId(): number {
    const chain = this.getChain();
    return chain.id;
  }

  private getRpcUrl(): string {
    const chain = this.getChain();
    return chain.rpcUrls.default.http[0];
  }

  // Core functionality methods will be added here

  // APR methods
  async getLastAPR(): Promise<number> {
    try {
      return await this.sdk.statistics.apr.getLastApr();
    } catch (error) {
      console.error("Error getting last APR:", error);
      throw error;
    }
  }

  async getSmaAPR(days: number): Promise<number> {
    try {
      return await this.sdk.statistics.apr.getSmaApr({ days });
    } catch (error) {
      console.error("Error getting SMA APR:", error);
      throw error;
    }
  }

  // Balance methods
  async getStETHBalance(address: string) {
    try {
      return await this.sdk.steth.balance(address as Address);
    } catch (error) {
      console.error("Error getting stETH balance:", error);
      throw error;
    }
  }

  async getWstETHBalance(address: string) {
    try {
      return await this.sdk.wsteth.balance(address as Address);
    } catch (error) {
      console.error("Error getting wstETH balance:", error);
      throw error;
    }
  }

  // Contract address methods
  async getStethAddress(): Promise<string> {
    try {
      return await this.sdk.core.getContractAddress(LIDO_CONTRACT_NAMES.lido);
    } catch (error) {
      console.error("Error getting stETH contract address:", error);
      throw error;
    }
  }

  async getWstethAddress(): Promise<string> {
    try {
      return await this.sdk.core.getContractAddress(LIDO_CONTRACT_NAMES.wsteth);
    } catch (error) {
      console.error("Error getting wstETH contract address:", error);
      throw error;
    }
  }

  async getWithdrawalQueueAddress(): Promise<string> {
    try {
      return await this.sdk.core.getContractAddress(
        LIDO_CONTRACT_NAMES.withdrawalQueue
      );
    } catch (error) {
      console.error("Error getting withdrawal queue contract address:", error);
      throw error;
    }
  }

  async getOracleAddress(): Promise<string> {
    try {
      return await this.sdk.core.getContractAddress(
        LIDO_CONTRACT_NAMES.legacyOracle
      );
    } catch (error) {
      console.error("Error getting oracle contract address:", error);
      throw error;
    }
  }

  async getAccountingOracleAddress(): Promise<string> {
    try {
      return await this.sdk.core.getContractAddress(
        LIDO_CONTRACT_NAMES.accountingOracle
      );
    } catch (error) {
      console.error("Error getting accounting oracle address:", error);
      throw error;
    }
  }

  async transferSteth(params: {
    amount: string | bigint;
    to: `0x${string}`;
    from?: `0x${string}`;
    callback?: TransactionCallback;
  }) {
    try {
      return await this.sdk.steth.transfer({
        ...params,
        callback: params.callback || this.defaultStakeCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error transferring stETH:", error);
      throw error;
    }
  }

  async approveSteth(params: {
    amount: string | bigint;
    to: `0x${string}`;
    callback?: TransactionCallback;
  }) {
    try {
      return await this.sdk.steth.approve({
        ...params,
        callback: params.callback || this.defaultStakeCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error approving stETH:", error);
      throw error;
    }
  }

  async getAllowanceSteth(params: {
    to: `0x${string}`;
    account?: `0x${string}`;
  }): Promise<bigint> {
    try {
      return await this.sdk.steth.allowance({
        ...params,
        account: (params.account || this.signer.address) as Address,
      });
    } catch (error) {
      console.error("Error getting stETH allowance:", error);
      throw error;
    }
  }

  async signStethPermit(params: {
    amount: bigint;
    spender: `0x${string}`;
    deadline?: bigint;
  }) {
    try {
      return await this.sdk.steth.signPermit({
        ...params,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error signing stETH permit:", error);
      throw error;
    }
  }

  async transferWsteth(params: {
    amount: string | bigint;
    to: `0x${string}`;
    from?: `0x${string}`;
    callback?: TransactionCallback;
  }) {
    try {
      return await this.sdk.wsteth.transfer({
        ...params,
        callback: params.callback || this.defaultStakeCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error transferring wstETH:", error);
      throw error;
    }
  }

  async approveWsteth(params: {
    amount: string | bigint;
    to: `0x${string}`;
    callback?: TransactionCallback;
  }) {
    try {
      return await this.sdk.wsteth.approve({
        ...params,
        callback: params.callback || this.defaultStakeCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error approving wstETH:", error);
      throw error;
    }
  }

  async getAllowanceWsteth(params: {
    to: `0x${string}`;
    account?: `0x${string}`;
  }): Promise<bigint> {
    try {
      return await this.sdk.wsteth.allowance({
        ...params,
        account: (params.account || this.signer.address) as Address,
      });
    } catch (error) {
      console.error("Error getting wstETH allowance:", error);
      throw error;
    }
  }

  async signWstethPermit(params: {
    amount: bigint;
    spender: `0x${string}`;
    deadline?: bigint;
  }) {
    try {
      return await this.sdk.wsteth.signPermit({
        ...params,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error signing wstETH permit:", error);
      throw error;
    }
  }

  // Staking methods
  async stakeEth(
    value: string | bigint,
    callback?: TransactionCallback,
    referralAddress?: `0x${string}` // Updated type
  ) {
    try {
      const tx = await this.sdk.stake.stakeEth({
        value,
        callback: callback || this.defaultStakeCallback,
        referralAddress,
        account: this.signer.address as Address,
      });
      return tx;
    } catch (error) {
      console.error("Error in staking ETH:", error);
      if (error instanceof SDKError) {
        console.error(`SDK Error: ${error.errorMessage}, Code: ${error.code}`);
      }
      throw error;
    }
  }

  async stakeEthPopulateTx(
    value: string | bigint,
    referralAddress?: `0x${string}`
  ) {
    try {
      return await this.sdk.stake.stakeEthPopulateTx({
        value,
        referralAddress,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error in populating stake transaction:", error);
      throw error;
    }
  }

  async stakeEthSimulateTx(
    value: string | bigint,
    referralAddress?: `0x${string}`
  ) {
    try {
      return await this.sdk.stake.stakeEthSimulateTx({
        value,
        referralAddress,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error in simulating stake transaction:", error);
      throw error;
    }
  }

  // Wrapping methods
  async wrapETH(value: string | bigint, callback?: TransactionCallback) {
    try {
      const tx = await this.sdk.wrap.wrapEth({
        value,
        callback: callback || this.defaultStakeCallback,
        account: this.signer.address as Address,
      });
      return tx;
    } catch (error) {
      console.error("Error in wrapping ETH:", error);
      if (error instanceof SDKError) {
        console.error(`SDK Error: ${error.errorMessage}, Code: ${error.code}`);
      }
      throw error;
    }
  }

  async getStethForWrapAllowance(address: string): Promise<bigint> {
    try {
      return await this.sdk.wrap.getStethForWrapAllowance(address as Address);
    } catch (error) {
      console.error("Error getting stETH wrap allowance:", error);
      throw error;
    }
  }

  async approveStethForWrap(
    value: string | bigint,
    callback?: TransactionCallback
  ) {
    try {
      return await this.sdk.wrap.approveStethForWrap({
        value,
        callback: callback || this.defaultStakeCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error approving stETH for wrap:", error);
      throw error;
    }
  }

  async wrapSteth(value: string | bigint, callback?: TransactionCallback) {
    try {
      return await this.sdk.wrap.wrapSteth({
        value,
        callback: callback || this.defaultStakeCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error wrapping stETH:", error);
      throw error;
    }
  }

  async unwrapWsteth(value: string | bigint, callback?: TransactionCallback) {
    try {
      return await this.sdk.wrap.unwrap({
        value,
        callback: callback || this.defaultStakeCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error unwrapping wstETH:", error);
      throw error;
    }
  }

  // Utility methods for wrapping
  async wrapEthEstimateGas(value: string | bigint) {
    try {
      return await this.sdk.wrap.wrapEthEstimateGas({
        value,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error estimating wrap ETH gas:", error);
      throw error;
    }
  }

  async wrapStethPopulateTx(value: string | bigint) {
    try {
      return await this.sdk.wrap.wrapStethPopulateTx({
        value,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error populating wrap stETH transaction:", error);
      throw error;
    }
  }

  async unwrapWstethPopulateTx(value: string | bigint) {
    try {
      return await this.sdk.wrap.unwrapPopulateTx({
        value,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error populating unwrap wstETH transaction:", error);
      throw error;
    }
  }
  private defaultStakeCallback: TransactionCallback = ({ stage, payload }) => {
    switch (stage) {
      case TransactionCallbackStage.SIGN:
        console.log("Waiting for signature...");
        break;
      case TransactionCallbackStage.RECEIPT:
        console.log("Waiting for transaction receipt...", payload);
        break;
      case TransactionCallbackStage.CONFIRMATION:
        console.log("Waiting for confirmation...", payload);
        break;
      case TransactionCallbackStage.DONE:
        console.log("Transaction completed!", payload);
        break;
      case TransactionCallbackStage.ERROR:
        console.error("Transaction failed:", payload);
        break;
      default:
        console.log(`Unknown stage: ${stage}`);
    }
  };
  // Rewards methods
  // async getRewardsFromChain(
  //   address: string,
  //   options: {
  //     stepBlock?: number;
  //     back?: { days: bigint };
  //     to?: { block: string | number };
  //     from?: { block: string | number };
  //     includeZeroRebases?: boolean;
  //     includeOnlyRewards?: boolean;
  //   } = {}
  // ) {
  //   try {
  //     return await this.sdk.rewards.getRewardsFromChain({
  //       address: address as Address,
  //       stepBlock: options.stepBlock,
  //       back: options.back,
  //       includeZeroRebases?: options.includeZeroRebases || false,
  //       includeOnlyRewards?: options.includeOnlyRewards || false,
  //     });
  //   } catch (error) {
  //     console.error("Error getting rewards from chain:", error);
  //     if (error instanceof SDKError) {
  //       console.error(`SDK Error: ${error.errorMessage}, Code: ${error.code}`);
  //     }
  //     throw error;
  //   }
  // }

  // async getRewardsFromSubgraph(
  //   address: string,
  //   options: {
  //     back?: { days: bigint };
  //     to?: { block: string | number };
  //     from?: { block: string | number };
  //     includeZeroRebases?: boolean;
  //     includeOnlyRewards?: boolean;
  //     stepEntities?: number;
  //     getSubgraphUrl?: (graphId: string, chainId: number) => string | { url: string; requestHeaders?: Record<string, string> };
  //   } = {}
  // ) {
  //   try {
  //     return await this.sdk.rewards.getRewardsFromSubgraph({
  //       address: address as Address,
  //       back: options.back,
  //       includeZeroRebases: options.includeZeroRebases,
  //       includeOnlyRewards: options.includeOnlyRewards,
  //       stepEntities: options.stepEntities,
  //       getSubgraphUrl: options.getSubgraphUrl
  //     });
  //   } catch (error) {
  //     console.error("Error getting rewards from subgraph:", error);
  //     if (error instanceof SDKError) {
  //       console.error(`SDK Error: ${error.errorMessage}, Code: ${error.code}`);
  //     }
  //     throw error;
  //   }
  // }

  // Rebase Events methods
  async getLastRebaseEvent() {
    try {
      return await this.sdk.events.stethEvents.getLastRebaseEvent();
    } catch (error) {
      console.error("Error getting last rebase event:", error);
      throw error;
    }
  }

  async getFirstRebaseEvent(props: { days: number; fromBlockNumber?: bigint }) {
    try {
      return await this.sdk.events.stethEvents.getFirstRebaseEvent(props);
    } catch (error) {
      console.error("Error getting first rebase event:", error);
      throw error;
    }
  }

  // async getRebaseEvents(props: {
  //   to?: { block: string | number };
  //   maxCount?: number;
  //   stepBlock?: number;
  //   from?: {
  //     block?: bigint;
  //     timestamp?: bigint;
  //   };
  //   back?: {
  //     seconds?: bigint;
  //     days?: bigint;
  //     blocks?: bigint;
  //   };
  // }) {
  //   try {
  //     return await this.sdk.events.stethEvents.getRebaseEvents(props);
  //   } catch (error) {
  //     console.error("Error getting rebase events:", error);
  //     throw error;
  //   }
  // }

  async getLastRebaseEvents(props: { count: number; stepBlock?: number }) {
    try {
      return await this.sdk.events.stethEvents.getLastRebaseEvents(props);
    } catch (error) {
      console.error("Error getting last rebase events:", error);
      throw error;
    }
  }

  // Withdrawal methods
  async requestWithdrawalWithPermit(
    params: {
      requests: readonly bigint[];
      token: "stETH" | "wstETH";
      permit?: any; // SignedPermit type
      callback?: TransactionCallback;
      receiver?: `0x${string}`;
    }
    // | {
    //     amount: string | bigint;
    //     token: 'stETH' | 'wstETH';
    //     permit?: any; // SignedPermit type
    //     callback?: TransactionCallback;
    //     receiver?: `0x${string}`;
    // }
  ) {
    try {
      return await this.sdk.withdraw.request.requestWithdrawalWithPermit({
        ...params,
        callback: params.callback || this.defaultWithdrawCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error in requesting withdrawal with permit:", error);
      if (error instanceof SDKError) {
        console.error(`SDK Error: ${error.errorMessage}, Code: ${error.code}`);
      }
      throw error;
    }
  }

  async requestWithdrawal(
    params: {
      requests: readonly bigint[];
      token: "stETH" | "wstETH";
      callback?: TransactionCallback;
      receiver?: `0x${string}`;
    }
    // | {
    //     amount: string | bigint;
    //     token: 'stETH' | 'wstETH';
    //     callback?: TransactionCallback;
    //     receiver?: `0x${string}`;
    // }
  ) {
    try {
      return await this.sdk.withdraw.request.requestWithdrawal({
        ...params,
        callback: params.callback || this.defaultWithdrawCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error in requesting withdrawal:", error);
      if (error instanceof SDKError) {
        console.error(`SDK Error: ${error.errorMessage}, Code: ${error.code}`);
      }
      throw error;
    }
  }

  private defaultWithdrawCallback: TransactionCallback = ({
    stage,
    payload,
  }) => {
    switch (stage) {
      case TransactionCallbackStage.PERMIT:
        console.log("Waiting for permit...");
        break;
      case TransactionCallbackStage.GAS_LIMIT:
        console.log("Waiting for gas limit...");
        break;
      case TransactionCallbackStage.SIGN:
        console.log("Waiting for signature...");
        break;
      case TransactionCallbackStage.RECEIPT:
        console.log("Waiting for transaction receipt...", payload);
        break;
      case TransactionCallbackStage.CONFIRMATION:
        console.log("Waiting for confirmation...", payload);
        break;
      case TransactionCallbackStage.DONE:
        console.log("Transaction completed!", payload);
        break;
      case TransactionCallbackStage.MULTISIG_DONE:
        console.log("Multisig transaction completed!", payload);
        break;
      case TransactionCallbackStage.ERROR:
        console.error("Transaction failed:", payload);
        break;
      default:
        console.log(`Unknown stage: ${stage}`);
    }
  };

  async claimRequests(params: {
    requestsIds: bigint[];
    hints?: bigint[];
    callback?: TransactionCallback;
  }) {
    try {
      return await this.sdk.withdraw.claim.claimRequests({
        ...params,
        callback: params.callback || this.defaultWithdrawCallback,
        account: this.signer.address as Address,
      });
    } catch (error) {
      console.error("Error in claiming withdrawal requests:", error);
      if (error instanceof SDKError) {
        console.error(`SDK Error: ${error.errorMessage}, Code: ${error.code}`);
      }
      throw error;
    }
  }
}
