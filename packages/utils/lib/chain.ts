import { Token } from "./tokens";

// Enums
export enum ChainTicker {
  AVAX = "AVAX",
  BNB = "BNB",
  BTC = "BTC",
  ETH = "ETH",
  D11K = "D11K",
  COSMOS = "GAIA",
  DOJ = "DOJ",
  Hermes = "D11K",
  EMPTY = "EMPTY",
}

export enum ChainName {
  Avalanche = "Avalanche",
  Binance = "Binance Chain",
  Bitcoin = "Bitcoin",
  Ethereum = "Ethereum",
  Hermes = "Hermes",
  Cosmos = "Cosmos",
  Dojima = "Dojima",
  Empty = "Empty",
}

// Types
export type Chain = {
  readonly name: ChainName;
  readonly token: Token;
  readonly ticker: ChainTicker;
  readonly chainId?: string;
};

// Chain Configurations
const CHAIN_CONFIGS: Readonly<Record<ChainTicker, Chain>> = {
  [ChainTicker.AVAX]: {
    ticker: ChainTicker.AVAX,
    token: Token.AVAX,
    name: ChainName.Avalanche,
  },
  [ChainTicker.BNB]: {
    ticker: ChainTicker.BNB,
    token: Token.BNB,
    name: ChainName.Binance,
  },
  [ChainTicker.BTC]: {
    ticker: ChainTicker.BTC,
    token: Token.BTC,
    name: ChainName.Bitcoin,
  },
  [ChainTicker.ETH]: {
    ticker: ChainTicker.ETH,
    token: Token.ETH,
    name: ChainName.Ethereum,
  },
  [ChainTicker.D11K]: {
    ticker: ChainTicker.D11K,
    token: Token.Hermes,
    name: ChainName.Hermes,
  },
  [ChainTicker.COSMOS]: {
    ticker: ChainTicker.COSMOS,
    token: Token.Cosmos,
    name: ChainName.Cosmos,
  },
  [ChainTicker.DOJ]: {
    ticker: ChainTicker.DOJ,
    token: Token.DOJ,
    name: ChainName.Dojima,
  },
  [ChainTicker.EMPTY]: {
    ticker: ChainTicker.EMPTY,
    token: Token.Empty,
    name: ChainName.Empty,
  },
} as const;

// Exported Chain Constants
export const {
  [ChainTicker.AVAX]: AvaxChain,
  [ChainTicker.BNB]: BnbChain,
  [ChainTicker.BTC]: BtcChain,
  [ChainTicker.ETH]: EthChain,
  [ChainTicker.D11K]: HermesChain,
  [ChainTicker.COSMOS]: CosmosChain,
  [ChainTicker.DOJ]: DojimaChain,
  [ChainTicker.EMPTY]: EmptyChain,
} = CHAIN_CONFIGS;

// Type Guards and Utilities
/**
 * Type guard to check if a string is a valid ChainTicker
 */
export const isChainTicker = (value: string): value is ChainTicker => {
  return Object.values(ChainTicker).includes(value as ChainTicker);
};

/**
 * Check if a chain is enabled
 */
export const isEnabledChain = (chain: ChainTicker): boolean => {
  return Object.values(ChainTicker).includes(chain);
};

/**
 * Compare two chains for equality
 */
export const eqChain = (a: ChainTicker, b: ChainTicker): boolean => a === b;

/**
 * Convert chain to string.
 *
 * @param {ChainTicker} chainId.
 * @returns {string} The string based on the given chain type.
 */
/**
 * Convert ChainTicker to Chain object
 */
export const tickerToChain = (chainTicker: ChainTicker): Chain => {
  return CHAIN_CONFIGS[chainTicker] || EmptyChain;
};

// Chain-specific checks
/**
 * Check if chain is Bitcoin
 */
export const isBtcChain = (chain: ChainTicker): boolean =>
  chain === ChainTicker.BTC;

/**
 * Check if chain is Hermes
 */
export const isHermesChain = (chain: ChainTicker): boolean =>
  chain === ChainTicker.D11K;

/**
 * Check if chain is Binance
 */
export const isBnbChain = (chain: ChainTicker): boolean =>
  chain === ChainTicker.BNB;

/**
 * Check if chain is Ethereum
 */
export const isEthChain = (chain: ChainTicker): boolean =>
  chain === ChainTicker.ETH;
