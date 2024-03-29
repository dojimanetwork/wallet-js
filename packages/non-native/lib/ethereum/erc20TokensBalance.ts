import { AbiItem } from "web3-utils";
import { contractData, tokenList, minABI, BalanceResult } from "./utils";
import { EthereumAccount } from "@dojima-wallet/account";
import { NetworkType } from "@dojima-wallet/types";

export default class Erc20TokenBalance extends EthereumAccount {
  constructor(network: NetworkType) {
    super(network);
  }

  async getErc20Balance(
    token: tokenList,
    walletAddress: string
  ): Promise<BalanceResult> {
    const contract = new this._web3.eth.Contract(
      minABI as AbiItem[],
      contractData[`${token}`].contractAddress
    );
    var balance: number =
      (await contract.methods.balanceOf(walletAddress).call()) /
      Math.pow(10, contractData[`${token}`].decimal);
    var result: BalanceResult = {
      balance: balance,
      tokenName: contractData[`${token}`].tokenSymbol,
    };
    return result;
  }
}
