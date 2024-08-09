import { Network } from "@dojima-wallet/types";

export type EvmChainParams = {
  config: EvmChainConfigParams;
};

export type EvmChainConfigParams = {
  tokenName: string;
  tokenSymbol: string;
  decimals: number;
  rpcUrl: string;
  chainId: string;
  network: Network;
  explorerUrl?: string;
};

export type GasfeeResult = {
  slow: number;
  average: number;
  fast: number;
};

export type EvmTxData = {
  transaction_hash: string;
  from: string;
  to: string;
  amount: number;
  gasFee: number;
  block_number: number;
  block_hash: string;
  gasPrice: string;
  nonce: number;
};

export type EvmTransferParams = {
  recipient: string;
  amount: number;
  fee?: number;
  memo?: string;
};
