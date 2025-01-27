import { providers, Wallet, utils, Contract, BigNumber } from "ethers";
import {
  addCustomNetwork,
  getL2Network,
  Erc20Bridger,
  L1ToL2MessageStatus,
} from "@arbitrum/sdk";
import WrappedCrossERC20Token from "../artifacts/contracts/rollupEndToEnd/WrappedCrossERC20Token.sol/WrappedCrossERC20Token.json";
import networkJson from "./network.json";

interface NetworkConfig {
  l1Network: any;
  l2Network: any;
}

export async function depositDojToRollup(
  privateKey: string,
  l1RpcUrl: string,
  l2RpcUrl: string,
  wrappedTokenAddress: string,
  amount: string
): Promise<string> {
  try {
    const l1Provider = new providers.JsonRpcProvider(l1RpcUrl);
    const l2Provider = new providers.JsonRpcProvider(l2RpcUrl);

    const l1Wallet = new Wallet(privateKey, l1Provider);
    /**
     * Set the amount of token to be transferred to L2
     */
    const tokenAmount = BigNumber.from(amount);

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

    // Get wrapped token contract using ethers5 ContractFactory
    const wrappedToken = new Contract(
      wrappedTokenAddress,
      WrappedCrossERC20Token.abi,
      l1Wallet
    );

    // Initialize Arbitrum SDK Erc20Bridger
    const erc20Bridger = new Erc20Bridger(l2Network);

    // Calculate deposit amount with decimals
    const tokenDecimals = await wrappedToken.decimals();
    const tokenDepositAmount = tokenAmount.mul(
      BigNumber.from(10).pow(tokenDecimals)
    );

    // Check balance before deposit
    const balance = await wrappedToken.balanceOf(l1Wallet.address);
    if (balance.lt(tokenDepositAmount)) {
      throw new Error(
        `Insufficient balance. Available: ${utils.formatUnits(
          balance,
          tokenDecimals
        )}, Required: ${amount}`
      );
    }

    // Approve token transfer
    const approveTx = await erc20Bridger.approveToken({
      l1Signer: l1Wallet,
      erc20L1Address: wrappedTokenAddress,
    });

    await approveTx.wait();

    // Deposit tokens
    const depositTx = await erc20Bridger.deposit({
      amount: tokenDepositAmount as any,
      erc20L1Address: wrappedTokenAddress,
      l1Signer: l1Wallet,
      l2Provider: l2Provider,
    });

    const depositReceipt = await depositTx.wait();

    // Wait for L2 confirmation
    const l2Result = await depositReceipt.waitForL2(l2Provider);

    if (!l2Result.complete) {
      throw new Error(
        `L2 message failed: status ${L1ToL2MessageStatus[l2Result.status]}`
      );
    }

    return depositTx.hash;
  } catch (error) {
    throw new Error(`Deposit to rollup failed: ${error.message}`);
  }
}
