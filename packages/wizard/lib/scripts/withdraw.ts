import { ethers } from "ethers";
import WrappedCrossERC20Token from "../../artifacts/contracts/rollupEndToEnd/WrappedCrossERC20Toke.sol/WrappedCrossERC20Token.json";

export async function withdrawDojimaToEvm(
  privateKey: string,
  wrappedContractAddress: string,
  crossChainContractAddress: string,
  amount: string,
  toAddress: string,
  dojimaUrl: string
): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(dojimaUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const wrappedToken = new ethers.Contract(
      wrappedContractAddress,
      WrappedCrossERC20Token.abi,
      wallet
    );

    const balance = await wrappedToken.balanceOf(wallet.address);
    const amountInWei = ethers.parseEther(amount);

    if (balance < amountInWei) {
      throw new Error(
        `Insufficient balance. Available: ${ethers.parseEther(
          balance
        )}, Required: ${amount}`
      );
    }

    const DOJ_FEE = "1";
    const tx = await wrappedToken.transferToChain(
      ethers.encodeBytes32String("ETH"),
      ethers.solidityPacked(["bytes"], [wallet.address]),
      ethers.parseEther(amount),
      ethers.parseEther(DOJ_FEE), // paid in doj
      ethers.solidityPacked(["bytes"], [crossChainContractAddress]),
      {
        value: ethers.parseEther(DOJ_FEE),
      }
    );
    const receipt = await tx.wait();

    return receipt.hash;
  } catch (error) {
    throw new Error(`Withdrawal failed: ${error.message}`);
  }
}
