import { Network } from "@dojima-wallet/types";
import { SolanaClient } from "./solana";

export default class SolanaInit {
  solConnect: SolanaClient;
  constructor(mnemonic: string, network: Network) {
    if (network === Network.Testnet || network === Network.Stagenet) {
      this.solConnect = new SolanaClient({
        phrase: mnemonic,
        network: Network.Testnet,
        endpoint: "https://sol-test.h4s.dojima.network:8899",
      });
    } else {
      this.solConnect = new SolanaClient({
        phrase: mnemonic,
      });
    }
  }
}