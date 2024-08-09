import { Network } from "@dojima-wallet/types";
import { EvmChainClient, EvmChainConfigParams } from "./evm";

export default class EvmInit {
  evmConnect: EvmChainClient;
  constructor(
    mnemonic: string,
    network: Network,
    config: EvmChainConfigParams
  ) {
    this.evmConnect = new EvmChainClient({
      phrase: mnemonic,
      network: network,
      config: config,
    });
  }
}
