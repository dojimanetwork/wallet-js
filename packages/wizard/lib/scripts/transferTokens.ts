import { ethers } from "ethers";
import CrossChainERC20Token from "../../artifacts/contracts/rollupEndToEnd/CrossChainERC20Token.sol/CrossChainERC20Token.json";
import WrappedCrossERC20Token from "../../artifacts/contracts/rollupEndToEnd/WrappedCrossERC20Toke.sol/WrappedCrossERC20Token.json";

export async function transferCrossChainToken(
  privateKey: string,
  crossChainTokenAddress: string,
  recipientAddress: string,
  amount: string,
  evmUrl: string
): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(evmUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create contract instance
    const crossChainToken = new ethers.Contract(
      crossChainTokenAddress,
      CrossChainERC20Token.abi,
      wallet
    );

    // Convert amount to wei
    const amountInWei = ethers.parseEther(amount);

    // Check balance before transfer
    const balance = await crossChainToken.balanceOf(wallet.address);
    if (balance < amountInWei) {
      throw new Error(
        `Insufficient CrossChain token balance. Available: ${ethers.formatUnits(
          balance
        )}, Required: ${amount}`
      );
    }

    // Transfer CrossChain Token
    const crossChainTransferTx = await crossChainToken.transfer(
      recipientAddress,
      amountInWei
    );
    await crossChainTransferTx.wait();

    return crossChainTransferTx.hash;
  } catch (error) {
    throw new Error(`CrossChain token transfer failed: ${error.message}`);
  }
}

export async function transferWrappedToken(
  privateKey: string,
  wrappedTokenAddress: string,
  recipientAddress: string,
  amount: string,
  dojUrl: string
): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(dojUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create contract instance
    const wrappedToken = new ethers.Contract(
      wrappedTokenAddress,
      WrappedCrossERC20Token.abi,
      wallet
    );

    // Convert amount to wei
    const amountInWei = ethers.parseEther(amount);

    // Check balance before transfer
    const balance = await wrappedToken.balanceOf(wallet.address);
    if (balance < amountInWei) {
      throw new Error(
        `Insufficient Wrapped token balance. Available: ${ethers.formatUnits(
          balance
        )}, Required: ${amount}`
      );
    }

    // Transfer Wrapped Token
    const wrappedTransferTx = await wrappedToken.transfer(
      recipientAddress,
      amountInWei
    );
    await wrappedTransferTx.wait();

    return wrappedTransferTx.hash;
  } catch (error) {
    throw new Error(`Wrapped token transfer failed: ${error.message}`);
  }
}
