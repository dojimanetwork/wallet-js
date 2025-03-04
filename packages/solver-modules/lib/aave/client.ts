import {
  Pool,
  InterestRate,
  EthereumTransactionTypeExtended,
  UiPoolDataProvider,
  UiIncentiveDataProvider,
  ChainId,
  PoolBundle,
  // ERC20Service,
  // ERC20_2612Service
} from "@aave/contract-helpers";
import { formatReserves, formatUserSummary } from "@aave/math-utils";
import { ethers } from "ethers";
import dayjs from "dayjs";
import * as markets from "@bgd-labs/aave-address-book";
// import {
//   AaveToken, SupplyParams, BorrowParams, RepayParams, WithdrawParams,
//   SwapRateParams, SetUsageAsCollateralParams, LiquidationParams,
//   SwapCollateralParams, EModeParams, Config
// } from "../types";

export class AaveV3Client {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private chain: string;
  // private erc20Service: ERC20Service;
  // private erc2612Service: ERC20_2612Service;

  constructor(privateKey: string, chain: string) {
    this.chain = chain;
    this.provider = new ethers.JsonRpcProvider(this.getRpcUrl());
    this.signer = new ethers.Wallet(privateKey, this.provider);

    // // Initialize ERC20 services
    // this.erc20Service = new ERC20Service(this.provider);
    // this.erc2612Service = new ERC20_2612Service(this.provider);
  }

  getChainId(): ChainId {
    switch (this.chain) {
      case "mainnet":
        return ChainId.mainnet;
      case "sepolia":
        return ChainId.sepolia;
      case "optimismSepolia":
        return ChainId.optimism_sepolia;
      // case 'baseSepolia':
      //     return ChainId.base_sepolia;
      case "arbitrumSepolia":
        return ChainId.arbitrum_sepolia;

      default:
        throw new Error(`Unsupported chain: ${this.chain}`);
    }
  }

  getRpcUrl(): string {
    switch (this.chain) {
      case "mainnet":
        return "https://eth-mainnet.public.blastapi.io";
      case "sepolia":
        return "https://ethereum-sepolia-rpc.publicnode.com";
      case "optimismSepolia":
        return "https://sepolia.optimism.io";
      // case 'baseSepolia':
      //   return 'https://base-sepolia-rpc.publicnode.com';
      case "arbitrumSepolia":
        // return 'https://arbitrum-sepolia-rpc.publicnode.com';
        // return 'https://arbitrum-sepolia.drpc.org';
        return "https://arbitrum-sepolia.gateway.tenderly.co";

      default:
        throw new Error(`RPC URL not configured for chain: ${this.chain}`);
    }
  }

  getMarketAddresses() {
    switch (this.chain) {
      case "mainnet":
        return markets.AaveV3Ethereum;
      case "sepolia":
        return markets.AaveV3Sepolia;
      case "optimismSepolia":
        return markets.AaveV3OptimismSepolia;
      // case 'baseSepolia':
      //   return markets.AaveV3BaseSepolia;
      case "arbitrumSepolia":
        return markets.AaveV3ArbitrumSepolia;
      default:
        throw new Error(`Market addresses not found for chain: ${this.chain}`);
    }
  }

  async getFormattedUserSummary(userAddress: string) {
    const marketAddresses = this.getMarketAddresses();
    const poolDataProvider = new UiPoolDataProvider({
      uiPoolDataProviderAddress: marketAddresses.UI_POOL_DATA_PROVIDER,
      provider: this.provider,
      chainId: this.getChainId(),
    });

    try {
      const { reservesData, baseCurrencyData } =
        await poolDataProvider.getReservesHumanized({
          lendingPoolAddressProvider: marketAddresses.POOL_ADDRESSES_PROVIDER,
        });

      const userReserves = await poolDataProvider.getUserReservesHumanized({
        lendingPoolAddressProvider: marketAddresses.POOL_ADDRESSES_PROVIDER,
        user: userAddress,
      });

      // Convert BigNumber values to strings before formatting
      const safeReservesData = reservesData.map((reserve) => ({
        ...reserve,
        liquidityRate: reserve.liquidityRate.toString(),
        variableBorrowRate: reserve.variableBorrowRate.toString(),
        // Remove stableBorrowRate as it's not in the type
      }));

      const currentTimestamp = dayjs().unix();

      const formattedReserves = formatReserves({
        reserves: safeReservesData,
        currentTimestamp,
        marketReferenceCurrencyDecimals:
          baseCurrencyData.marketReferenceCurrencyDecimals,
        marketReferencePriceInUsd:
          baseCurrencyData.marketReferenceCurrencyPriceInUsd,
      });

      return formatUserSummary({
        currentTimestamp,
        marketReferencePriceInUsd:
          baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        marketReferenceCurrencyDecimals:
          baseCurrencyData.marketReferenceCurrencyDecimals,
        userReserves: userReserves.userReserves,
        formattedReserves,
        userEmodeCategoryId: userReserves.userEmodeCategoryId,
      });
    } catch (error) {
      console.error("Error in getFormattedUserSummary:", error);
      throw error;
    }
  }

  async getUserIncentives(userAddress: string) {
    const marketAddresses = this.getMarketAddresses();
    const incentiveDataProvider = new UiIncentiveDataProvider({
      uiIncentiveDataProviderAddress:
        marketAddresses.UI_INCENTIVE_DATA_PROVIDER,
      provider: this.provider,
      chainId: this.getChainId(),
    });

    return await incentiveDataProvider.getUserReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: marketAddresses.POOL_ADDRESSES_PROVIDER,
      user: userAddress,
    });
  }

  async getApprovedAmount(token: string): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const poolBundle = new PoolBundle(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const approvedAmount = await poolBundle.supplyTxBuilder.getApprovedAmount(
        {
          user: this.signer.address,
          token,
        }
      );
      return approvedAmount.amount;
    } catch (error) {
      console.error("Error fetching approved amount", error);
      throw error;
    }
  }

  async supplyBundle(reserve: string, amount: string, onBehalfOf?: string) {
    try {
      const marketAddresses = this.getMarketAddresses();
      const poolBundle = new PoolBundle(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      // Check if approval is needed
      const currentApproval =
        await poolBundle.supplyTxBuilder.getApprovedAmount({
          user: this.signer.address,
          token: reserve,
        });

      console.log("currentApproval: ", currentApproval);

      let txHash: string;

      // Extract the amount from the approval response
      const approvedAmount = currentApproval.amount;

      // if (ethers.BigNumber.from(approvedAmount).lt(ethers.BigNumber.from(amount))) {
      //   // Generate approval transaction using ERC20Service
      //   const approvalTx = this.erc20Service.approve({
      //     user: this.signer.address,
      //     token: reserve,
      //     spender: marketAddresses.POOL,
      //     amount,
      //   });

      //   // Submit approval transaction
      //   const approvalResponse = await this.signer.sendTransaction(approvalTx);
      //   await approvalResponse.wait();
      // }

      // Generate and submit supply transaction

      if (Number(approvedAmount) < Number(amount)) {
        // Get the ERC-20 contract instance
        const tokenContract = new ethers.Contract(
          reserve,
          [
            "function approve(address spender, uint256 amount) public returns (bool)",
          ],
          this.signer
        );

        // Send the approve transaction
        const tx = await tokenContract.approve(marketAddresses.POOL, amount);
        console.log("Approval transaction sent:", tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log("Approval confirmed:", tx.hash);
      }
      const supplyTx = await poolBundle.supplyTxBuilder.generateTxData({
        user: this.signer.address,
        reserve,
        amount,
        onBehalfOf: onBehalfOf || this.signer.address,
      });

      const tx = await this.signer.sendTransaction(supplyTx);
      txHash = tx.hash;
      await tx.wait();

      return txHash;
    } catch (error) {
      console.error("Error in supplyBundle:", error);
      throw error;
    }
  }

  async repay(
    reserve: string,
    amount: string,
    interestRateMode: InterestRate = InterestRate.Variable,
    onBehalfOf?: string
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const poolBundle = new PoolBundle(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      // // Get token decimals
      // const tokenContract = new ethers.Contract(
      //   reserve,
      //   ["function decimals() view returns (uint8)"],
      //   this.provider
      // );
      // const decimals = await tokenContract.decimals();
      // console.log(`Token decimals: ${decimals}`);

      // // Convert amount to proper decimals
      // const amountWithDecimals = ethers.utils.parseUnits(amount, decimals);
      // console.log(`Amount with decimals: ${amountWithDecimals.toString()}`);

      // Check if approval is needed
      const currentApproval =
        await poolBundle.supplyTxBuilder.getApprovedAmount({
          user: this.signer.address,
          token: reserve,
        });

      console.log("currentApproval: ", currentApproval);

      // removed the approval code as it is doing approval itself if allowance is not enough
      // Extract the amount from the approval response
      // const approvedAmount = currentApproval.amount;

      // if (ethers.BigNumber.from(approvedAmount).lt(ethers.BigNumber.from(amount))) {
      //   // Get the ERC-20 contract instance
      //   const tokenContract = new ethers.Contract(
      //     reserve,
      //     ["function approve(address spender, uint256 amount) public returns (bool)"],
      //     this.signer
      //   );

      //   // Send the approve transaction
      //   const tx = await tokenContract.approve(marketAddresses.POOL, amount);
      //   console.log("Approval transaction sent:", tx.hash);

      //   // Wait for the transaction to be mined
      //   await tx.wait();
      //   console.log("Approval confirmed:", tx.hash);
      // }

      const repayTxs: EthereumTransactionTypeExtended[] = await pool.repay({
        user: this.signer.address,
        reserve,
        amount: amount,
        interestRateMode,
        onBehalfOf: onBehalfOf || this.signer.address,
      });

      if (!repayTxs?.length) {
        throw new Error("No transaction generated for repay");
      }

      // Process each transaction in sequence (approval if needed, then repay)
      let lastTxHash: string;
      for (const repayTx of repayTxs) {
        const extendedTxData = await repayTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? txData.value : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in repay:", error);
      throw error;
    }
  }

  async repayWithAToken(
    reserve: string,
    amount: string,
    interestRateMode: InterestRate = InterestRate.Variable
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const repayTxs: EthereumTransactionTypeExtended[] =
        await pool.repayWithATokens({
          user: this.signer.address,
          amount: amount,
          reserve,
          rateMode: interestRateMode,
        });

      if (!repayTxs?.length) {
        throw new Error("No transaction generated for repay");
      }

      // Process each transaction in sequence (approval if needed, then repay)
      let lastTxHash: string;
      for (const repayTx of repayTxs) {
        const extendedTxData = await repayTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? txData.value : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in repay:", error);
      throw error;
    }
  }

  async borrow(
    reserve: string,
    amount: string,
    interestRateMode: InterestRate = InterestRate.Variable,
    onBehalfOf?: string
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      // Use the raw amount without decimal conversion
      console.log(`Raw amount: ${amount}`);

      const borrowTxs: EthereumTransactionTypeExtended[] = await pool.borrow({
        user: this.signer.address,
        reserve,
        amount, // Use raw amount directly
        interestRateMode: InterestRate.Variable,
        onBehalfOf: onBehalfOf || this.signer.address,
        referralCode: "0",
      });

      if (!borrowTxs?.length) {
        throw new Error("No transaction generated for borrow");
      }

      // Process each transaction in sequence
      let lastTxHash: string;
      for (const borrowTx of borrowTxs) {
        const extendedTxData = await borrowTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? txData.value : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in borrow:", error);
      throw error;
    }
  }

  async withdraw(
    reserve: string,
    amount: string,
    aTokenAddress: string,
    onBehalfOf?: string
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const withdrawTxs: EthereumTransactionTypeExtended[] =
        await pool.withdraw({
          user: this.signer.address,
          reserve,
          amount,
          aTokenAddress,
          onBehalfOf: onBehalfOf || this.signer.address,
        });

      if (!withdrawTxs?.length) {
        throw new Error("No transaction generated for withdraw");
      }

      // Process each transaction in sequence
      let lastTxHash: string;
      for (const withdrawTx of withdrawTxs) {
        const extendedTxData = await withdrawTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? txData.value : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in withdraw:", error);
      throw error;
    }
  }

  async setUsageAsCollateral(
    reserve: string,
    usageAsCollateral: boolean
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const collateralTxs: EthereumTransactionTypeExtended[] =
        await pool.setUsageAsCollateral({
          user: this.signer.address,
          reserve,
          usageAsCollateral,
        });

      if (!collateralTxs?.length) {
        throw new Error(
          "No transaction generated for setting collateral usage"
        );
      }

      // Process each transaction in sequence
      let lastTxHash: string;
      for (const collateralTx of collateralTxs) {
        const extendedTxData = await collateralTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? txData.value : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in setUsageAsCollateral:", error);
      throw error;
    }
  }
}
