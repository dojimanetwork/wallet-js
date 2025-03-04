export type AaveToken = {
  chainId: number;
  address: string;
  aTokenAddress: string;
  debtTokenAddress: string;
  decimals: number;
  symbol: string;
  name: string;
  isToken: boolean;
  isNative: boolean;
};

export type SupplyParams = {
  tokenIn: string;
  amount: bigint;
  onBehalfOf?: string;
  referralCode?: number;
};

export type BorrowParams = {
  tokenOut: string;
  amount: bigint;
  interestRateMode: number; // 1 for stable, 2 for variable
  onBehalfOf?: string;
  referralCode?: number;
};

export type RepayParams = {
  tokenIn: string;
  amount: bigint;
  interestRateMode: number;
  onBehalfOf?: string;
};

export type WithdrawParams = {
  tokenOut: string;
  amount: bigint;
  to?: string;
};

export type SwapRateParams = {
  reserve: string;
  interestRateMode: number;
};

export type SetUsageAsCollateralParams = {
  reserve: string;
  usageAsCollateral: boolean;
};

export type LiquidationParams = {
  liquidatedUser: string;
  debtReserve: string;
  collateralReserve: string;
  debtToCover: bigint;
  receiveAToken: boolean;
};

export type SwapCollateralParams = {
  fromAsset: string;
  toAsset: string;
  fromAmount: bigint;
  minToAmount: bigint;
};

export type EModeParams = {
  categoryId: number;
};

export type Config = {
  chainId: number;
  rpcUrl: string;
  lendingPool: string;
  dataProvider: string;
  wethGateway: string; // Added for WETH operations
  explorerUrl: string;
};
