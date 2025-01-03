import { EthereumClient } from "./ethereum";
import { Network } from "@dojima-wallet/types";

export default class EthereumInit {
  ethConnect: EthereumClient;
  constructor(
    mnemonic: string,
    privateKey: string,
    network: Network,
    rpcUrl: string
  ) {
    if (network === Network.Testnet) {
      this.ethConnect = new EthereumClient({
        phrase: mnemonic,
        privateKey: privateKey,
        network: network,
        rpcUrl: rpcUrl,
        etherscanKey: "VDEEGKUUYSSMICHFRF42UKUWZXNECJAW9I",
      });
      // } else if (network === Network.Stagenet) {
      //   this.ethConnect = new EthereumClient({
      //     phrase: mnemonic,
      //     network: network,
      //     rpcUrl: "https://eth.h4s.dojima.network/",
      //   });
    } else {
      this.ethConnect = new EthereumClient({
        phrase: mnemonic,
        privateKey: privateKey,
        network: network,
        rpcUrl: rpcUrl,
        etherscanKey: "VDEEGKUUYSSMICHFRF42UKUWZXNECJAW9I",
      });
    }
    // if (network === Network.Testnet) {
    //   this.ethConnect = new EthereumClient({
    //     phrase: mnemonic,
    //     network: Network.Testnet,
    //     etherscanApiKey: "6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C",
    //     ethplorerApiKey: "EK-aUaYx-fDc6bNC-WfsGG",
    //   });
    // } else {
    //   this.ethConnect = new EthereumClient({
    //     phrase: mnemonic,
    //     etherscanApiKey: "6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C",
    //     ethplorerApiKey: "EK-aUaYx-fDc6bNC-WfsGG",
    //   });
    // }
  }
}
