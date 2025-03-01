import { EthereumInit } from "@dojima-wallet/connection";
import { Network } from "@dojima-wallet/types";
// import { baseToAsset } from "@dojima-wallet/utils";

export default class EthereumAccount extends EthereumInit {
  constructor(
    mnemonic: string,
    privateKey: string,
    network: Network,
    rpcUrl: string
  ) {
    super(mnemonic, privateKey, network, rpcUrl);
  }

  getAddress(): string {
    const address = this.ethConnect.getAddress();
    return address;
  }

  async getBalance(address: string): Promise<number> {
    // const balArr = await this.ethConnect.getBalance(address);
    // const balance = baseToAsset(balArr[0].amount).amount().toNumber();
    const balance = await this.ethConnect.getBalance(address);
    return balance;
  }
}
