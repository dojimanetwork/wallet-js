import { Chain } from "@dojima-wallet/utils";

export type AddChainClientParam = {
  chain: Chain;
  rpcUrl: string;
  wsUrl: string;
};

export type GRPCClientParams = {
  server: string;
  chainId?: string;
  prefix?: string;
};
