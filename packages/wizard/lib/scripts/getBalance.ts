import { ethers } from "ethers";
import CrossChainERC20Token from "../../artifacts/contracts/rollupEndToEnd/CrossChainERC20Token.sol/CrossChainERC20Token.json";
import WrappedCrossERC20Token from "../../artifacts/contracts/rollupEndToEnd/WrappedCrossERC20Toke.sol/WrappedCrossERC20Token.json";

export async function getCrossChainTokenBalance(
  contractAddress: string,
  accountAddress: string,
  evmUrl: string
): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(evmUrl);
    const contract = new ethers.Contract(
      contractAddress,
      CrossChainERC20Token.abi,
      provider
    );

    const [balance, decimals] = await Promise.all([
      contract.balanceOf(accountAddress),
      contract.decimals(),
    ]);

    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    throw new Error(
      `Failed to get CrossChainERC20Token balance: ${error.message}`
    );
  }
}

export async function getWrappedTokenBalance(
  contractAddress: string,
  accountAddress: string,
  dojimaUrl: string
): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(dojimaUrl);
    const contract = new ethers.Contract(
      contractAddress,
      WrappedCrossERC20Token.abi,
      provider
    );

    const [balance, decimals] = await Promise.all([
      contract.balanceOf(accountAddress),
      contract.decimals(),
    ]);

    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    throw new Error(
      `Failed to get WrappedCrossERC20Token balance: ${error.message}`
    );
  }
}
