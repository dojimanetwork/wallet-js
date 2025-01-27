import { providers } from "ethers";
import { getL2Network, Erc20Bridger, addCustomNetwork } from "@arbitrum/sdk";
import networkJson from "./network.json";

interface NetworkConfig {
  l1Network: any;
  l2Network: any;
}

export async function getL2TokenAddress(
  wrappedTokenAddress: string,
  l1RpcUrl: string,
  l2RpcUrl: string
): Promise<string> {
  try {
    const l1Provider = new providers.JsonRpcProvider(l1RpcUrl);
    const l2Provider = new providers.JsonRpcProvider(l2RpcUrl);

    const networkConfig: NetworkConfig = networkJson;
    const parentChain = networkConfig.l1Network;
    const childChain = networkConfig.l2Network;

    // Check if the network is already added
    let l2Network;
    try {
      l2Network = await getL2Network(l2Provider);
    } catch (error) {
      addCustomNetwork({
        customL1Network: parentChain,
        customL2Network: childChain,
      });
      l2Network = await getL2Network(l2Provider); // Retry getting the L2 network
    }
    const erc20Bridger = new Erc20Bridger(l2Network);
    const l2TokenAddress = await erc20Bridger.getL2ERC20Address(
      wrappedTokenAddress,
      l1Provider
    );

    return l2TokenAddress;
  } catch (error) {
    throw new Error(`Failed to get L2 token address: ${error.message}`);
  }
}

export async function getL2TokenBalance(
  l2TokenAddress: string,
  l2RpcUrl: string,
  walletAddress: string
): Promise<number> {
  try {
    const l2Provider = new providers.JsonRpcProvider(l2RpcUrl);

    const networkConfig: NetworkConfig = networkJson;
    const parentChain = networkConfig.l1Network;
    const childChain = networkConfig.l2Network;

    // Check if the network is already added
    let l2Network;
    try {
      l2Network = await getL2Network(l2Provider);
    } catch (error) {
      addCustomNetwork({
        customL1Network: parentChain,
        customL2Network: childChain,
      });
      l2Network = await getL2Network(l2Provider); // Retry getting the L2 network
    }

    const erc20Bridger = new Erc20Bridger(l2Network);
    const l2Token = erc20Bridger.getL2TokenContract(l2Provider, l2TokenAddress);
    const l2Balance = await l2Token.functions.balanceOf(walletAddress);
    const decimals = await l2Token.functions.decimals();
    const balance =
      Number(l2Balance.toString()) / 10 ** Number(decimals.toString());

    return balance;
  } catch (error) {
    throw new Error(`Failed to get L2 token balance: ${error.message}`);
  }
}
