import { BigNumber } from "ethers";

export type ChainName =
  | "sepolia"
  | "baseSepolia"
  | "arbitrumSepolia"
  | "optimismSepolia"
  // | "polygonMumbai"
  | "bscTestnet"
  | "avalancheCChain";

export type TokenSymbol = "ETH" | "USDC" | "WETH" | "EURC" | "DAI" | "LINK";

export type TokensType = {
  chainId: number;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  isToken: boolean;
  isNative: boolean;
  wrapped: boolean;
};

export type SwapParams = {
  tokenIn: string;
  tokenOut: string;
  fee: number;
  recipient: string;
  amountIn: BigNumber;
  amountOutMinimum: BigNumber;
  sqrtPriceLimitX96: number;
};

export type Config = {
  chainId: number;
  rpcUrl: string;
  poolFactory: string;
  quoter: string;
  swapRouter: string;
  explorerUrl: string;
};
