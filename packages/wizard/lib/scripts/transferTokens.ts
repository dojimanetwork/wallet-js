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
    if (balance.lt(amountInWei)) {
      throw new Error(
        `Insufficient CrossChain token balance. Available: ${ethers.formatUnits(
          balance
        )}, Required: ${amount}`
      );
    }

    // Transfer CrossChain Token
    console.log(
      `Transferring ${amount} CrossChain tokens to ${recipientAddress}...`
    );
    const crossChainTransferTx = await crossChainToken.transfer(
      recipientAddress,
      amountInWei
    );
    const crossChainReceipt = await crossChainTransferTx.wait();
    console.log(
      `CrossChain token transfer successful. Transaction hash: ${crossChainReceipt.transactionHash}`
    );

    return crossChainReceipt.transactionHash;
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
    if (balance.lt(amountInWei)) {
      throw new Error(
        `Insufficient Wrapped token balance. Available: ${ethers.formatUnits(
          balance
        )}, Required: ${amount}`
      );
    }

    // Transfer Wrapped Token
    console.log(
      `Transferring ${amount} Wrapped tokens to ${recipientAddress}...`
    );
    const wrappedTransferTx = await wrappedToken.transfer(
      recipientAddress,
      amountInWei
    );
    const wrappedReceipt = await wrappedTransferTx.wait();
    console.log(
      `Wrapped token transfer successful. Transaction hash: ${wrappedReceipt.transactionHash}`
    );

    return wrappedReceipt.transactionHash;
  } catch (error) {
    throw new Error(`Wrapped token transfer failed: ${error.message}`);
  }
}
