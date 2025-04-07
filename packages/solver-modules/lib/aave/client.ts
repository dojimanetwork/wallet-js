import {
  Pool,
  InterestRate,
  EthereumTransactionTypeExtended,
  UiPoolDataProvider,
  UiIncentiveDataProvider,
  ChainId,
  PoolBundle,
  ERC20Service,
  ERC20_2612Service,
} from "@aave/contract-helpers";
import { formatReserves, formatUserSummary } from "@aave/math-utils";
import { ethers, BigNumberish } from "ethers5";
import dayjs from "dayjs";
import * as markets from "@bgd-labs/aave-address-book";
// import {
//   AaveToken, SupplyParams, BorrowParams, RepayParams, WithdrawParams,
//   SwapRateParams, SetUsageAsCollateralParams, LiquidationParams,
//   SwapCollateralParams, EModeParams, Config
// } from "../types";

export class AaveV3Client {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private chain: string;
  private erc20Service: ERC20Service;
  private erc2612Service: ERC20_2612Service;

  constructor(privateKey: string, chain: string) {
    this.chain = chain;
    this.provider = new ethers.providers.JsonRpcProvider(this.getRpcUrl());
    this.signer = new ethers.Wallet(privateKey, this.provider);

    // Initialize ERC20 services
    this.erc20Service = new ERC20Service(this.provider);
    this.erc2612Service = new ERC20_2612Service(this.provider);
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

  // Methods that use contracts directly without storing them as class properties
  async getFormattedReserves() {
    const marketAddresses = this.getMarketAddresses();
    const poolDataProvider = new UiPoolDataProvider({
      uiPoolDataProviderAddress: marketAddresses.UI_POOL_DATA_PROVIDER,
      provider: this.provider,
      chainId: this.getChainId(),
    });

    // console.log("marketAddresses.UI_POOL_DATA_PROVIDER: ", marketAddresses.UI_POOL_DATA_PROVIDER);
    // console.log("marketAddresses: ", marketAddresses);
    // console.log("--------------\n------------------");
    // console.log("poolDataProvider: ", poolDataProvider);

    const reserves = await poolDataProvider.getReservesHumanized({
      lendingPoolAddressProvider: marketAddresses.POOL_ADDRESSES_PROVIDER,
    });

    // console.log("reserves: ",reserves);

    // No need to convert to string as the values are already humanized
    const reservesArray = reserves.reservesData;
    const baseCurrencyData = reserves.baseCurrencyData;

    const currentTimestamp = dayjs().unix();

    const formattedPoolReserves = formatReserves({
      reserves: reservesArray,
      currentTimestamp,
      marketReferenceCurrencyDecimals:
        baseCurrencyData.marketReferenceCurrencyDecimals,
      marketReferencePriceInUsd:
        baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    });

    return formattedPoolReserves;
  }

  // get user summary like total collateral, debt, health factor etc.
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

  async getReserveIncentives() {
    const marketAddresses = this.getMarketAddresses();
    const incentiveDataProvider = new UiIncentiveDataProvider({
      uiIncentiveDataProviderAddress:
        marketAddresses.UI_INCENTIVE_DATA_PROVIDER,
      provider: this.provider,
      chainId: this.getChainId(),
    });

    return await incentiveDataProvider.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: marketAddresses.POOL_ADDRESSES_PROVIDER,
    });
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

  async getApprovedAmount(token: string): Promise<ethers.BigNumber> {
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
      return ethers.BigNumber.from(approvedAmount);
    } catch (error) {
      console.error("Error fetching approved amount", error);
      throw error;
    }
  }

  async generateApprovalTx(token: string, amount: string) {
    try {
      const marketAddresses = this.getMarketAddresses();
      const poolBundle = new PoolBundle(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const approvedAmount = poolBundle.supplyTxBuilder.generateTxData({
        user: this.signer.address,
        reserve: token,
        amount,
      });

      return approvedAmount;
    } catch (error) {
      console.error("Error generating approval tx", error);
      throw error;
    }
  }

  async generateSupplyTx(token: string, amount: string) {
    try {
      const marketAddresses = this.getMarketAddresses();
      const poolBundle = new PoolBundle(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      return poolBundle.supplyTxBuilder.generateTxData({
        user: this.signer.address,
        reserve: token,
        amount,
      });
    } catch (error) {
      console.error("Error generating supply tx data", error);
      throw error;
    }
  }

  async generateSupplyWithPermitTx(
    token: string,
    amount: string,
    signature: string,
    deadline: string
  ) {
    try {
      const marketAddresses = this.getMarketAddresses();
      const poolBundle = new PoolBundle(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      return poolBundle.supplyTxBuilder.generateSignedTxData({
        user: this.signer.address,
        reserve: token,
        amount,
        signature,
        deadline,
      });
    } catch (error) {
      console.error("Error generating supply with permit tx data", error);
      throw error;
    }
  }

  async signERC20Approval(token: string, amount: string, deadline: string) {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const dataToSign: string = await pool.signERC20Approval({
        user: this.signer.address,
        reserve: token,
        amount,
        deadline,
      });

      // console.log("dataToSign: ", dataToSign);

      const signature = await this.provider.send("eth_signTypedData_v4", [
        this.signer.address,
        dataToSign,
      ]);

      // console.log("signature: ", signature);

      return signature;
    } catch (error) {
      console.error("Error generating supply with permit tx data", error);
      throw error;
    }
  }

  async generateSupplySignatureRequest(token: string, amount: string) {
    try {
      const marketAddresses = this.getMarketAddresses();
      const spender = marketAddresses.POOL;
      const { name } = await this.erc20Service.getTokenData(token);
      const { chainId } = await this.provider.getNetwork();
      const nonce = await this.erc2612Service.getNonce({
        token,
        owner: this.signer.address,
      });
      const deadline = Math.floor(Date.now() / 1000 + 3600).toString();

      return {
        types: {
          EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "verifyingContract", type: "address" },
          ],
          Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        primaryType: "Permit",
        domain: {
          name,
          version: "1",
          chainId,
          verifyingContract: token,
        },
        message: {
          owner: this.signer.address,
          spender,
          value: amount,
          nonce,
          deadline,
        },
        deadline,
      };
    } catch (error) {
      console.error("Error generating signature request", error);
      throw error;
    }
  }

  // Update the supplyETHAsCollateral method to use PoolBundle
  // async supplyETHAsCollateral(amount: string): Promise<string> {
  //   try {
  //     const marketAddresses = this.getMarketAddresses();
  //     const poolBundle = new PoolBundle(this.provider, {
  //       POOL: marketAddresses.POOL,
  //       WETH_GATEWAY: marketAddresses.WETH_GATEWAY
  //     });

  //     const txData = await this.generateSupplyTx(
  //       marketAddresses.WETH_TOKEN,
  //       amount
  //     );
  //     const tx = await this.signer.sendTransaction(txData);
  //     return tx.hash;
  //   } catch (error) {
  //     console.error("Error in supplyETHAsCollateral:", error);
  //     throw error;
  //   }
  // }

  // async enableAssetAsCollateral(assetAddress: string): Promise<string> {
  //   try {
  //     const marketAddresses = this.getMarketAddresses();
  //     const pool = new Pool(this.provider, {
  //       POOL: marketAddresses.POOL,
  //       WETH_GATEWAY: marketAddresses.WETH_GATEWAY
  //     });

  //     const enableCollateralTxs = await pool.setUsageAsCollateral({
  //       user: this.signer.address,
  //       reserve: assetAddress,
  //       usageAsCollateral: true,
  //     });

  //     const tx = await this.signer.sendTransaction(enableCollateralTxs[0]);
  //     return tx.hash;
  //   } catch (error) {
  //     console.error("Error in enableAssetAsCollateral:", error);
  //     throw error;
  //   }
  // }

  // this function is called on clicking Supply button
  async supplyBundle(reserve: string, amount: string, onBehalfOf?: string) {
    try {
      const marketAddresses = this.getMarketAddresses();
      const poolBundle = new PoolBundle(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      // Check if the reserve is ETH
      const wethAddress = marketAddresses.ASSETS.WETH.UNDERLYING;
      // console.log("wethAddress: ", wethAddress);

      const isETH =
        reserve.toLowerCase() === "eth" ||
        reserve.toLowerCase() === wethAddress.toLowerCase();

      if (isETH) {
        // For ETH deposits, use the WETH Gateway's depositETH function
        const wethGateway = new ethers.Contract(
          marketAddresses.WETH_GATEWAY,
          [
            "function depositETH(address pool, address onBehalfOf, uint16 referralCode) external payable",
          ],
          this.signer
        );

        const tx = await wethGateway.depositETH(
          marketAddresses.POOL,
          onBehalfOf || this.signer.address,
          0, // referralCode
          { value: amount }
        );

        await tx.wait();
        return tx.hash;
      }

      // Check if approval is needed
      const currentApproval =
        await poolBundle.supplyTxBuilder.getApprovedAmount({
          user: this.signer.address,
          token: reserve,
        });

      // console.log("currentApproval: ", currentApproval);

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

      // arbitrumSepolia this approval is not needed but in sepolia it is needed
      if (
        ethers.BigNumber.from(approvedAmount).lt(ethers.BigNumber.from(amount))
      ) {
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
        // console.log("Approval transaction sent:", tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        // console.log("Approval confirmed:", tx.hash);
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
      // const poolBundle = new PoolBundle(this.provider, {
      //   POOL: marketAddresses.POOL,
      //   WETH_GATEWAY: marketAddresses.WETH_GATEWAY
      // });
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
      // const currentApproval = await poolBundle.supplyTxBuilder.getApprovedAmount({
      //   user: this.signer.address,
      //   token: reserve,
      // });

      // console.log("currentApproval: ", currentApproval);

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
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
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
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
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
      // console.log(`Raw amount: ${amount}`);

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
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
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

      // Check if withdrawing ETH
      const wethAddress = marketAddresses.ASSETS.WETH.UNDERLYING;
      const isETH =
        reserve.toLowerCase() === "eth" ||
        reserve.toLowerCase() === wethAddress.toLowerCase();

      if (isETH) {
        // For ETH withdrawals, use the WETH Gateway's withdrawETH function
        const wethGateway = new ethers.Contract(
          marketAddresses.WETH_GATEWAY,
          [
            "function withdrawETH(address pool, uint256 amount, address to) external",
          ],
          this.signer
        );

        // console.log("Withdrawing ETH via WETH Gateway");
        const tx = await wethGateway.withdrawETH(
          marketAddresses.POOL,
          amount,
          onBehalfOf || this.signer.address,
          { gasLimit: 500000 }
        );

        await tx.wait();
        return tx.hash;
      }

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
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
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

  async swapBorrowRateMode(
    reserve: string,
    interestRateMode: InterestRate
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const swapTxs: EthereumTransactionTypeExtended[] =
        await pool.swapBorrowRateMode({
          user: this.signer.address,
          reserve,
          interestRateMode,
        });

      if (!swapTxs?.length) {
        throw new Error("No transaction generated for swap borrow rate mode");
      }

      // Process each transaction in sequence
      let lastTxHash: string;
      for (const swapTx of swapTxs) {
        const extendedTxData = await swapTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in swapBorrowRateMode:", error);
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
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
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

  async liquidationCall(
    liquidatedUser: string,
    debtReserve: string,
    collateralReserve: string,
    purchaseAmount: string,
    getAToken: boolean = false
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const liquidationTxs: EthereumTransactionTypeExtended[] =
        await pool.liquidationCall({
          liquidator: this.signer.address,
          liquidatedUser,
          debtReserve,
          collateralReserve,
          purchaseAmount,
          getAToken,
        });

      if (!liquidationTxs?.length) {
        throw new Error("No transaction generated for liquidation call");
      }

      // Process each transaction in sequence
      let lastTxHash: string;
      for (const liquidationTx of liquidationTxs) {
        const extendedTxData = await liquidationTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in liquidationCall:", error);
      throw error;
    }
  }

  async supplyWithPermit(
    reserve: string,
    amount: string,
    signature: string,
    onBehalfOf?: string
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const deadline = Math.floor(Date.now() / 1000 + 3600).toString(); // 1 hour from now

      const supplyTxs: EthereumTransactionTypeExtended[] =
        await pool.supplyWithPermit({
          user: this.signer.address,
          reserve,
          amount,
          signature,
          deadline,
          onBehalfOf: onBehalfOf || this.signer.address,
        });

      if (!supplyTxs?.length) {
        throw new Error("No transaction generated for supply with permit");
      }

      // Process each transaction in sequence
      let lastTxHash: string;
      for (const supplyTx of supplyTxs) {
        const extendedTxData = await supplyTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in supplyWithPermit:", error);
      throw error;
    }
  }

  async repayWithPermit(
    reserve: string,
    amount: string,
    interestRateMode: InterestRate,
    signature: string,
    onBehalfOf?: string
  ): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const deadline = Math.floor(Date.now() / 1000 + 3600).toString(); // 1 hour from now

      const repayTxs: EthereumTransactionTypeExtended[] =
        await pool.repayWithPermit({
          user: this.signer.address,
          reserve,
          amount,
          interestRateMode,
          signature,
          deadline,
          onBehalfOf: onBehalfOf || this.signer.address,
        });

      if (!repayTxs?.length) {
        throw new Error("No transaction generated for repay with permit");
      }

      // Process each transaction in sequence
      let lastTxHash: string;
      for (const repayTx of repayTxs) {
        const extendedTxData = await repayTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in repayWithPermit:", error);
      throw error;
    }
  }

  // only works for Ethereum mainnet
  // async swapCollateral(
  //   fromAsset: string,
  //   fromAToken: string,
  //   toAsset: string,
  //   fromAmount: string,
  //   minToAmount: string,
  //   swapAll: boolean = false,
  //   flash: boolean = false,
  //   referralCode: string = '0',
  //   augustus: string,
  //   swapCallData: string
  // ): Promise<string> {
  //   try {
  //     const marketAddresses = this.getMarketAddresses();
  //     const pool = new Pool(this.provider, {
  //       POOL: marketAddresses.POOL,
  //       SWAP_COLLATERAL_ADAPTER: marketAddresses.SWAP_COLLATERAL_ADAPTER,
  //       WETH_GATEWAY: marketAddresses.WETH_GATEWAY
  //     });

  //     const swapTxs: EthereumTransactionTypeExtended[] = await pool.swapCollateral({
  //       user: this.signer.address,
  //       flash,
  //       fromAsset,
  //       fromAToken,
  //       toAsset,
  //       fromAmount,
  //       minToAmount,
  //       // permitSignature: '', // Not needed at the moment
  //       swapAll,
  //       referralCode,
  //       augustus,
  //       swapCallData
  //     });

  //     if (!swapTxs?.length) {
  //       throw new Error('No transaction generated for swap collateral');
  //     }

  //     // Process each transaction in sequence
  //     let lastTxHash: string;
  //     for (const swapTx of swapTxs) {
  //       const extendedTxData = await swapTx.tx();
  //       const { from, ...txData } = extendedTxData;

  //       const tx = await this.signer.sendTransaction({
  //         ...txData,
  //         value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
  //       });

  //       lastTxHash = tx.hash;
  //       await tx.wait();
  //     }

  //     return lastTxHash!;
  //   } catch (error) {
  //     console.error("Error in swapCollateral:", error);
  //     throw error;
  //   }
  // }

  async setUserEMode(categoryId: number): Promise<string> {
    try {
      const marketAddresses = this.getMarketAddresses();
      const pool = new Pool(this.provider, {
        POOL: marketAddresses.POOL,
        WETH_GATEWAY: marketAddresses.WETH_GATEWAY,
      });

      const eModeTxs: EthereumTransactionTypeExtended[] =
        await pool.setUserEMode({
          user: this.signer.address,
          categoryId,
        });

      if (!eModeTxs?.length) {
        throw new Error("No transaction generated for setting eMode");
      }

      // Process each transaction in sequence
      let lastTxHash: string;
      for (const eModeTx of eModeTxs) {
        const extendedTxData = await eModeTx.tx();
        const { from, ...txData } = extendedTxData;

        const tx = await this.signer.sendTransaction({
          ...txData,
          value: txData.value ? ethers.BigNumber.from(txData.value) : undefined,
        });

        lastTxHash = tx.hash;
        await tx.wait();
      }

      return lastTxHash!;
    } catch (error) {
      console.error("Error in setUserEMode:", error);
      throw error;
    }
  }

  //   async borrowUSDCWithETHCollateral(ethAmount: string, usdcAmount: string) {
  //     try {
  //       const marketAddresses = this.getMarketAddresses();

  //       // Step 1: Supply ETH
  //       const supplyTx = await this.supplyETHAsCollateral(ethAmount);
  //       console.log('ETH supplied as collateral:', supplyTx);

  //       // Step 2: Enable ETH as collateral
  //       const enableCollateralTx = await this.enableAssetAsCollateral(marketAddresses.WETH_TOKEN);
  //       console.log('ETH enabled as collateral:', enableCollateralTx);

  //       // Step 3: Borrow USDC
  //       const borrowTx = await this.borrowUSDC(usdcAmount);
  //       console.log('USDC borrowed:', borrowTx);

  //       return {
  //         supplyTx,
  //         enableCollateralTx,
  //         borrowTx
  //       };
  //     } catch (error) {
  //       console.error('Error in borrowUSDCWithETHCollateral:', error);
  //       throw error;
  //     }
  //   }

  // // Helper method to check if asset is already enabled as collateral
  // async isAssetEnabledAsCollateral(userAddress: string, assetAddress: string): Promise<boolean> {
  //   const userConfig = await this.getFormattedUserSummary(userAddress);
  //   const assetData = userConfig.userReserves.find(
  //     reserve => reserve.underlyingAsset.toLowerCase() === assetAddress.toLowerCase()
  //   );
  //   return assetData?.usageAsCollateralEnabledOnUser ?? false;
  // }

  async getAllWalletBalances(walletAddress: string) {
    try {
      // const marketAddresses = this.getMarketAddresses();
      const balances: {
        [key: string]: { symbol: string; balance: string; address: string };
      } = {};

      // Get native ETH balance
      const ethBalance = await this.provider.getBalance(walletAddress);
      balances["ETH"] = {
        symbol: "ETH",
        balance: ethers.utils.formatEther(ethBalance),
        address: "ETH",
      };

      // Get all reserves data
      const reserves = await this.getFormattedReserves();

      // For each reserve, get the token balance
      for (const reserve of reserves) {
        try {
          const tokenContract = new ethers.Contract(
            reserve.underlyingAsset,
            [
              "function balanceOf(address) view returns (uint256)",
              "function decimals() view returns (uint8)",
              "function symbol() view returns (string)",
            ],
            this.provider
          );

          const balance = await tokenContract.balanceOf(walletAddress);
          const decimals = await tokenContract.decimals();
          const symbol = await tokenContract.symbol();

          // Only add to balances if there is a non-zero balance
          if (!balance.isZero()) {
            balances[symbol] = {
              symbol: symbol,
              balance: ethers.utils.formatUnits(balance, decimals),
              address: reserve.underlyingAsset,
            };
          }
        } catch (error) {
          console.error(
            `Error fetching balance for token ${reserve.name}:`,
            error
          );
          // Continue with next token even if one fails
          continue;
        }
      }

      return balances;
    } catch (error) {
      console.error("Error in getAllWalletBalances:", error);
      throw error;
    }
  }

  // Add a method to get WETH contract
  private async getWethContract() {
    const wethAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"; // Sepolia WETH address
    return new ethers.Contract(
      wethAddress,
      [
        "function deposit() payable",
        "function withdraw(uint256 amount)",
        "function balanceOf(address owner) view returns (uint256)",
        "function approve(address spender, uint256 amount) returns (bool)",
      ],
      this.signer
    );
  }

  /**
   * Unwrap WETH into ETH. Emits the UnwrapWeth event when the transaction is prompted.
   * @param options Parameters for unwrapping WETH
   * @returns Promise that resolves when the unwrap is complete
   */
  public async wrapETH({
    amountInEth,
  }: {
    amountInEth: BigNumberish;
  }): Promise<void> {
    try {
      const wethContract = await this.getWethContract();
      const tx = await wethContract.deposit({
        value: amountInEth.toString(),
        gasLimit: 100000,
      });
      await tx.wait();
    } catch (error) {
      console.error(`Error in wraping ETH`, error);
      throw error;
    }
  }
}
