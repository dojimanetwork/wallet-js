import { DojimaInit } from "@dojima-wallet/connection";
import { Network } from "@dojima-wallet/types";

export default class DojimaAccount extends DojimaInit {
  constructor(
    mnemonic: string,
    privateKey: string,
    network: Network,
    rpcUrl: string
  ) {
    super(mnemonic, privateKey, network, rpcUrl);
  }

  getAddress(): string {
    const address = this.dojConnect.getAddress();
    return address;
  }

  async getBalance(address: string): Promise<number> {
    const balance = await this.dojConnect.getBalance(address);
    return balance;
  }
}
