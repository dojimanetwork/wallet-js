import { ethers } from "ethers";
import CrossChainERC20Token from "../../artifacts/contracts/rollupEndToEnd/CrossChainERC20Token.sol/CrossChainERC20Token.json";

export async function depositEvmToDojima(
  privateKey: string,
  crossChainContractAddress: string,
  amount: string,
  toAddress: string,
  evmUrl: string
): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(evmUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const crossChainERC20 = new ethers.Contract(
      crossChainContractAddress,
      CrossChainERC20Token.abi,
      wallet
    );

    const balance = await crossChainERC20.balanceOf(wallet.address);
    const amountInWei = ethers.parseEther(amount);

    if (balance < amountInWei) {
      throw new Error(
        `Insufficient balance. Available: ${ethers.parseEther(
          balance
        )}, Required: ${amount}`
      );
    }

    const tx = await crossChainERC20.depositToAddress(amountInWei, toAddress);
    const receipt = await tx.wait();

    return receipt.hash;
  } catch (error) {
    throw new Error(`Deposit failed: ${error.message}`);
  }
}
