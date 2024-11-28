import { Network } from "@dojima-wallet/types";
import { EvmChainClient, EvmChainConfigParams } from "./evm";

export default class EvmInit {
  evmConnect: EvmChainClient;
  constructor(
    mnemonic: string,
    privateKey: string,
    network: Network,
    config: EvmChainConfigParams
  ) {
    this.evmConnect = new EvmChainClient({
      phrase: mnemonic,
      privateKey: privateKey,
      network: network,
      config: config,
    });
  }
}
