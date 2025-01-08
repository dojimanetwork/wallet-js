import { Chain } from "@dojima-wallet/utils";

export type AddChainClientParam = {
  chain: Chain;
  rpcUrl: string;
  wsUrl: string;
};
