import { ethers } from "ethers";
import FACTORY_ABI from "./abis/factory.json";
import QUOTER_ABI from "./abis/quoter.json";
import SWAP_ROUTER_ABI from "./abis/swaprouter.json";
import POOL_ABI from "./abis/pool.json";
import WETH_ABI from "./abis/weth.json";
import { CHAIN_CONFIG } from "./config";
import { TOKENS } from "./tokens";
import { ERC20_ABI } from "./basic-abis";
import { Config, SwapParams, TokensType } from "./types";

export class Client {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private chain: string;

  constructor(privateKey: string, chain: string) {
    this.chain = chain;
    const config = this.getConfig();
    this.provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
  }

  getConfig(): Config {
    return CHAIN_CONFIG[this.chain as keyof typeof CHAIN_CONFIG];
  }

  getProvider(): ethers.providers.JsonRpcProvider {
    return this.provider;
  }

  // private getSigner(): ethers.Wallet {
  //     return this.signer;
  // }

  getTokens() {
    return TOKENS[this.chain as keyof typeof TOKENS];
  }

  getPoolFactoryContract(): ethers.Contract {
    const chainConfig = this.getConfig();
    const factoryContract = new ethers.Contract(
      chainConfig.poolFactory,
      FACTORY_ABI,
      this.provider
    );
    return factoryContract;
  }

  getQuoterContract(): ethers.Contract {
    const chainConfig = this.getConfig();
    const quoterContract = new ethers.Contract(
      chainConfig.quoter,
      QUOTER_ABI,
      this.provider
    );
    return quoterContract;
  }

  getSwapRouterContract(): ethers.Contract {
    const chainConfig = this.getConfig();
    const swapRouterContract = new ethers.Contract(
      chainConfig.swapRouter,
      SWAP_ROUTER_ABI,
      this.provider
    );
    return swapRouterContract;
  }
  protected async approveToken(
    tokenIn: TokensType,
    tokenABI: any,
    amountIn: number,
    wallet: ethers.Wallet,
    swapRouterAddress: string
  ): Promise<string> {
    const tokenContract = new ethers.Contract(
      tokenIn.address,
      tokenABI,
      wallet
    );
    const amountInWei = ethers.utils.parseUnits(
      amountIn.toString(),
      tokenIn.decimals
    );
    // const approveTx = await tokenContract.approve(
    //   swapRouterAddress,
    //   amountInWei
    // );
    // await approveTx.wait();
    // console.log(`Approved ${amountIn} tokens for swapping.`);
    // return approveTx.hash;
    const approveTx = await tokenContract.approve(
      swapRouterAddress,
      amountInWei
    );
    const receipt = await approveTx.wait();
    // console.log(`Approved ${amountIn} tokens for swapping.`);
    return receipt.transactionHash;
  }

  async getPoolInfo(
    tokenIn: string,
    tokenOut: string
  ): Promise<{
    poolContract: ethers.Contract;
    token0: any;
    token1: any;
    fee: any;
  }> {
    const tokenData = this.getTokens();
    const tokenInData = tokenData.find((token) => token.symbol === tokenIn);
    const tokenOutData = tokenData.find((token) => token.symbol === tokenOut);
    const poolAddress = await this.getPoolFactoryContract().getPool(
      tokenInData.address,
      tokenOutData.address,
      3000
    );
    // console.log(poolAddress);
    const poolContract = new ethers.Contract(
      poolAddress,
      POOL_ABI,
      this.provider
    );
    // console.log(poolContract);
    const [token0, token1, fee] = await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
    ]);
    // console.log(token0, token1, fee);
    return { poolContract, token0, token1, fee };
  }

  async quoteSwap(
    tokenIn: string,
    tokenOut: string,
    amountIn: number,
    gasFee?: number
  ): Promise<string> {
    const tokenData = this.getTokens();
    const tokenInData = tokenData.find((token) => token.symbol === tokenIn);
    const tokenOutData = tokenData.find((token) => token.symbol === tokenOut);
    const amountInWei = ethers.utils.parseUnits(
      amountIn.toString(),
      tokenInData.decimals
    );
    // Get Pool Info
    const {
      // poolContract,
      fee,
    } = await this.getPoolInfo(tokenIn, tokenOut);
    // console.log(tokenIn, tokenOut);
    const quotedAmountOut =
      await this.getQuoterContract().callStatic.quoteExactInputSingle({
        tokenIn: tokenInData.address,
        tokenOut: tokenOutData.address,
        fee: gasFee ? gasFee : fee,
        recipient: this.signer.address,
        deadline: Math.floor(new Date().getTime() / 1000 + 60 * 10),
        amountIn: amountInWei,
        sqrtPriceLimitX96: 0,
      });
    const amountOut = ethers.utils.formatUnits(
      quotedAmountOut[0],
      tokenOutData.decimals
    );
    return amountOut;
  }

  protected async executeSwap(
    params: SwapParams,
    explorerUrl: string
  ): Promise<string> {
    const tx =
      await this.getSwapRouterContract().populateTransaction.exactInputSingle(
        params
      );
    const receipt = await this.signer.sendTransaction(tx);
    // console.log(`-------------------------------`);
    // console.log(`Receipt: https://sepolia.etherscan.io/tx/${receipt.hash}`);
    // console.log(`-------------------------------`);
    // console.log(`Swap executed: ${explorerUrl}/${receipt.hash}`);
    return receipt.hash;
  }

  // Main Function

  async swap(
    tokenIn: string,
    tokenOut: string,
    amountIn: number
  ): Promise<{
    txHash: string;
    explorerUrl: string;
    quotedAmount: string;
  }> {
    const chainConfig = this.getConfig();
    const tokenData = this.getTokens();
    const tokenInData = tokenData.find((token) => token.symbol === tokenIn);
    const tokenOutData = tokenData.find((token) => token.symbol === tokenOut);
    // console.log(tokenIn, tokenOut);

    if (!tokenIn || !tokenOut) {
      throw new Error("Invalid token selection.");
    }

    const amountInWei = ethers.utils.parseUnits(
      amountIn.toString(),
      tokenInData.decimals
    );

    // Check Balance based on token type
    if (tokenInData.symbol === "ETH") {
      // Check native ETH balance
      const balance = await this.getNativeBalance();
      if (parseFloat(balance) < amountIn) {
        throw new Error(
          `Insufficient ETH balance. Required: ${amountIn} ETH, Available: ${balance} ETH`
        );
      }
    } else {
      // Check ERC20 token balance
      const balance = await this.getTokenBalance(tokenInData.symbol);
      if (parseFloat(balance) < amountIn) {
        throw new Error(
          `Insufficient ${tokenInData.symbol} balance. Required: ${amountIn} ${tokenInData.symbol}, Available: ${balance} ${tokenInData.symbol}`
        );
      }

      // Approve Token for ERC20
      // console.log(`Approving ${amountIn} ${tokenInData.symbol} for swap...`);
      await this.approveToken(
        tokenInData,
        ERC20_ABI,
        amountIn,
        this.signer,
        chainConfig.swapRouter
      );
    }

    // Get Pool Info
    const {
      // poolContract,
      fee,
    } = await this.getPoolInfo(tokenIn, tokenOut);

    // Quote Swap
    const quotedAmountOut = await this.quoteSwap(tokenIn, tokenOut, amountIn);
    // console.log(`Quoted Amount Out: ${quotedAmountOut} ${tokenOutData.symbol}`);

    // Execute Swap
    const params: SwapParams = {
      tokenIn: tokenInData.address,
      tokenOut: tokenOutData.address,
      fee: fee,
      recipient: this.signer.address,
      amountIn: amountInWei,
      amountOutMinimum: ethers.utils.parseUnits(
        quotedAmountOut,
        tokenOutData.decimals
      ),
      sqrtPriceLimitX96: 0,
    };
    const txHash = await this.executeSwap(params, chainConfig.explorerUrl);
    return {
      txHash,
      explorerUrl: `${chainConfig.explorerUrl}/${txHash}`,
      quotedAmount: quotedAmountOut,
    };
  }

  // Add New Chain Config
  protected addChainConfig(
    newChain: string,
    config: (typeof CHAIN_CONFIG)[keyof typeof CHAIN_CONFIG]
  ) {
    if (CHAIN_CONFIG[newChain]) {
      throw new Error(`Chain configuration for ${newChain} already exists.`);
    }
    CHAIN_CONFIG[newChain] = config;
    // console.log(`Added chain configuration for ${newChain}.`);
  }

  // // Delete Chain Config
  // deleteChainConfig(chain: string) {
  //   if (!CHAIN_CONFIG[chain]) {
  //     throw new Error(`Chain configuration for ${chain} does not exist.`);
  //   }
  //   // Move the deleted config to DEPRECATED_CHAIN_CONFIG
  //   DEPRECATED_CHAIN_CONFIG[chain] = CHAIN_CONFIG[chain];
  //   // Delete the config from CHAIN_CONFIG
  //   delete CHAIN_CONFIG[chain];
  //   console.log(
  //     `Deleted chain configuration for ${chain} and moved it to DEPRECATED_CHAIN_CONFIG.`
  //   );
  // }

  // Update Chain Config
  protected updateChainConfig(
    chain: string,
    updatedFields: Partial<(typeof CHAIN_CONFIG)[keyof typeof CHAIN_CONFIG]>
  ) {
    if (!CHAIN_CONFIG[chain]) {
      throw new Error(`Chain configuration for ${chain} does not exist.`);
    }
    // Update the config with new fields
    CHAIN_CONFIG[chain] = { ...CHAIN_CONFIG[chain], ...updatedFields };
    // console.log(`Updated chain configuration for ${chain}.`);
  }

  /**
   * Wrap ETH to WETH
   * @param amountInETH Amount of ETH to wrap
   * @returns Transaction hash and explorer URL
   */
  async wrapETHToWETH(
    amountInETH: number
  ): Promise<{ txHash: string; explorerUrl: string }> {
    const chainConfig = this.getConfig();
    const tokenData = this.getTokens();

    // Get WETH token
    const weth = tokenData.find((token) => token.symbol === "WETH");
    if (!weth) {
      throw new Error("WETH not found on the current chain.");
    }

    // Check ETH balance
    const ethBalance = await this.getTokenBalance("ETH");
    if (parseFloat(ethBalance) < amountInETH) {
      throw new Error(
        `Insufficient ETH balance. Required: ${amountInETH} ETH, Available: ${ethBalance} ETH`
      );
    }

    // Create WETH contract instance
    const wethContract = new ethers.Contract(
      weth.address,
      WETH_ABI,
      this.signer
    );

    try {
      // Wrap ETH to WETH
      const wrapTx = await wethContract.deposit({
        value: ethers.utils.parseUnits(amountInETH.toString(), weth.decimals),
      });
      await wrapTx.wait();

      return {
        txHash: wrapTx.hash,
        explorerUrl: `${chainConfig.explorerUrl}/${wrapTx.hash}`,
      };
    } catch (error) {
      console.error("Error wrapping ETH:", error);
      throw new Error(
        `Failed to wrap ETH: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async unwrapWETHToETH(
    amountInWETH: number
  ): Promise<{ txHash: string; explorerUrl: string }> {
    const chainConfig = this.getConfig();
    const tokenData = this.getTokens();

    // Get WETH token
    const weth = tokenData.find((token) => token.symbol === "WETH");
    // console.log("Weth token :", weth);
    if (!weth) {
      throw new Error("WETH not found on the current chain.");
    }

    // Create WETH contract instance with the correct ABI
    const wethContract = new ethers.Contract(
      weth.address,
      WETH_ABI,
      this.signer
    );

    // Check WETH balance
    const wethBalance = await wethContract.balanceOf(this.signer.address);
    const amountInWei = ethers.utils.parseUnits(
      amountInWETH.toString(),
      weth.decimals
    );
    // console.log("Weth balance :", wethBalance);
    // console.log("Amount in wei :", amountInWei);
    if (wethBalance < amountInWei) {
      throw new Error(
        `Insufficient WETH balance. Required: ${amountInWETH} WETH, Available: ${ethers.utils.formatUnits(
          wethBalance,
          weth.decimals
        )} WETH`
      );
    }

    try {
      // Unwrap WETH to ETH
      // const unwrapTx = await wethContract.withdraw(amountInWei);
      // await unwrapTx.wait();
      const unwrapTx = await wethContract.withdraw(amountInWei);
      const receipt = await unwrapTx.wait();

      // console.log(`Unwrapped ${amountInWETH} WETH to ETH.`);

      return {
        // txHash: receipt.hash,
        txHash: receipt.transactionHash,
        explorerUrl: `${chainConfig.explorerUrl}/${unwrapTx.hash}`,
      };
    } catch (error) {
      console.error("Error unwrapping WETH:", error);
      throw new Error(
        `Failed to unwrap WETH: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get balance of a token (native or ERC20)
   * @param tokenSymbol Token symbol (e.g., 'ETH', 'WETH', 'USDT')
   * @param address Optional address (defaults to signer's address)
   * @returns Balance in token decimals
   */
  async getTokenBalance(
    tokenSymbol: string,
    address?: string
  ): Promise<string> {
    try {
      const targetAddress = address || this.signer.address;

      // Handle native token (ETH)
      if (tokenSymbol === "ETH") {
        const balance = await this.provider.getBalance(targetAddress);
        return ethers.utils.formatEther(balance);
      }

      // Handle ERC20 tokens
      const token = this.getTokens().find((t) => t.symbol === tokenSymbol);
      if (!token) {
        throw new Error(`Token ${tokenSymbol} not found on ${this.chain}`);
      }

      const tokenContract = new ethers.Contract(
        token.address,
        ERC20_ABI,
        this.provider
      );
      const balance = await tokenContract.balanceOf(targetAddress);
      // return ethers.utils.formatUnits(balance, token.decimals);
      return ethers.utils.formatUnits(balance.toString(), token.decimals);
    } catch (error) {
      console.error(`Error fetching ${tokenSymbol} balance:`, error);
      throw new Error(
        `Failed to get ${tokenSymbol} balance: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get native token (ETH) balance for an address
   * @param address Optional address (defaults to signer's address)
   * @returns Balance in ETH
   */
  protected async getNativeBalance(address?: string): Promise<string> {
    try {
      const targetAddress = address || this.signer.address;
      const balance = await this.provider.getBalance(targetAddress);
      // return ethers.utils.formatEther(balance);
      return ethers.utils.formatEther(balance.toString());
    } catch (error) {
      console.error("Error fetching native balance:", error);
      throw new Error(
        `Failed to get native balance: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get ERC20 token balance for an address
   * @param tokenSymbol Token symbol (e.g., 'USDT', 'WETH')
   * @param address Optional address (defaults to signer's address)
   * @returns Balance in token decimals
   */
  protected async getErcTokenBalance(
    tokenSymbol: string,
    address?: string
  ): Promise<string> {
    try {
      const token = this.getTokens().find((t) => t.symbol === tokenSymbol);
      if (!token) {
        throw new Error(`Token ${tokenSymbol} not found on ${this.chain}`);
      }

      const targetAddress = address || this.signer.address;
      const tokenContract = new ethers.Contract(
        token.address,
        ERC20_ABI,
        this.provider
      );
      const balance = await tokenContract.balanceOf(targetAddress);
      return ethers.utils.formatUnits(balance, token.decimals);
    } catch (error) {
      console.error("Error fetching token balance:", error);
      throw new Error(
        `Failed to get ${tokenSymbol} balance: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get balances for multiple tokens at once
   * @param tokenSymbols Array of token symbols
   * @param address Optional address (defaults to signer's address)
   * @returns Object mapping token symbols to their balances
   */
  async getMultipleTokenBalances(
    tokenSymbols: string[],
    address?: string
  ): Promise<Record<string, string>> {
    try {
      const balances: Record<string, string> = {};
      const targetAddress = address || this.signer.address;

      // Get native balance if requested
      if (tokenSymbols.includes("ETH")) {
        balances["ETH"] = await this.getNativeBalance(targetAddress);
      }

      // Get ERC20 balances
      const erc20Symbols = tokenSymbols.filter((symbol) => symbol !== "ETH");
      await Promise.all(
        erc20Symbols.map(async (symbol) => {
          try {
            balances[symbol] = await this.getTokenBalance(
              symbol,
              targetAddress
            );
          } catch (error) {
            console.warn(`Failed to get balance for ${symbol}:`, error);
            balances[symbol] = "0";
          }
        })
      );

      return balances;
    } catch (error) {
      console.error("Error fetching multiple balances:", error);
      throw new Error(
        `Failed to get multiple balances: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Check if an address has sufficient balance for a token
   * @param tokenSymbol Token symbol
   * @param requiredAmount Amount needed
   * @param address Optional address (defaults to signer's address)
   * @returns boolean indicating if balance is sufficient
   */
  async hasEnoughBalance(
    tokenSymbol: string,
    requiredAmount: number,
    address?: string
  ): Promise<boolean> {
    try {
      const token = this.getTokens().find((t) => t.symbol === tokenSymbol);
      if (!token) {
        throw new Error(`Token ${tokenSymbol} not found on ${this.chain}`);
      }

      if (tokenSymbol === "ETH") {
        const balance = await this.getNativeBalance(address);
        return parseFloat(balance) >= requiredAmount;
      } else {
        const balance = await this.getTokenBalance(tokenSymbol, address);
        return parseFloat(balance) >= requiredAmount;
      }
    } catch (error) {
      console.error("Error checking balance:", error);
      throw new Error(
        `Failed to check ${tokenSymbol} balance: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
