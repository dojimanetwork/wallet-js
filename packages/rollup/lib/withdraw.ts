import { providers, Wallet, utils, Contract, BigNumber } from "ethers";
import {
  addCustomNetwork,
  getL2Network,
  Erc20Bridger,
  L2TransactionReceipt,
  L2ToL1MessageStatus,
} from "@arbitrum/sdk";
import WrappedCrossERC20Token from "../artifacts/contracts/rollupEndToEnd/WrappedCrossERC20Token.sol/WrappedCrossERC20Token.json";
import networkJson from "./network.json";

interface NetworkConfig {
  l1Network: any;
  l2Network: any;
}

export async function withdrawDojToRollup(
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
    const l2Wallet = new Wallet(privateKey, l2Provider);
    /**
     * Set the amount of token to be transferred to L2
     */
    const tokenAmountToWithdraw = BigNumber.from(amount);

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
    console.log("Initializing Arbitrum SDK Erc20Bridger...");
    const erc20Bridger = new Erc20Bridger(l2Network);

    // Calculate withdraw amount with decimals
    const tokenDecimals = await wrappedToken.decimals();
    const tokenWithdrawAmount = tokenAmountToWithdraw.mul(
      BigNumber.from(10).pow(tokenDecimals)
    );

    // Check balance before withdraw
    const balance = await wrappedToken.balanceOf(l1Wallet.address);
    if (balance.lt(tokenWithdrawAmount)) {
      throw new Error(
        `Insufficient balance. Available: ${utils.formatUnits(
          balance,
          tokenDecimals
        )}, Required: ${amount}`
      );
    }

    // withdraw tokens
    const withdrawTx = await erc20Bridger.withdraw({
      amount: tokenWithdrawAmount as any,
      destinationAddress: l2Wallet.address,
      erc20l1Address: wrappedTokenAddress,
      l2Signer: l2Wallet,
    });

    const withdrawReceipt = await withdrawTx.wait();
    const txnHash = withdrawReceipt.transactionHash;

    /**
         / * We start with a txn hash; we assume this is transaction that triggered an L2 to L1 Message on L2 (i.e., ArbSys.sendTxToL1)
        */
    if (!txnHash)
      throw new Error(
        "Provide a transaction hash of an L2 transaction that sends an L2 to L1 message"
      );
    if (!txnHash.startsWith("0x") || txnHash.trim().length != 66)
      throw new Error(`Hmm, ${txnHash} doesn't look like a txn hash...`);

    /**
     * First, let's find the Arbitrum txn from the txn hash provided
     */
    const receipt = await l2Provider.getTransactionReceipt(txnHash);
    const l2Receipt = new L2TransactionReceipt(receipt);

    /**
     * Note that in principle, a single transaction could trigger any number of outgoing messages; the common case will be there's only one.
     * For the sake of this script, we assume there's only one / just grad the first one.
     */
    const messages = await l2Receipt.getL2ToL1Messages(l1Wallet);
    const l2ToL1Msg = messages[0];

    /**
     * Check if already executed
     */
    if ((await l2ToL1Msg.status(l2Provider)) == L2ToL1MessageStatus.EXECUTED) {
      return txnHash;
    }

    /**
     * before we try to execute out message, we need to make sure the l2 block it's included in is confirmed! (It can only be confirmed after the dispute period; Arbitrum is an optimistic rollup after-all)
     * waitUntilReadyToExecute() waits until the item outbox entry exists
     */
    const timeToWaitMs = 1000 * 60;
    // console.log(
    //     "Waiting for the outbox entry to be created. This only happens when the L2 block is confirmed on L1, ~1 week after it's creation."
    // )
    await l2ToL1Msg.waitUntilReadyToExecute(l2Provider, timeToWaitMs);
    // console.log('Outbox entry exists! Trying to execute now')

    /**
     * Now that its confirmed and not executed, we can execute our message in its outbox entry.
     */
    const res = await l2ToL1Msg.execute(l2Provider);
    await res.wait();

    return txnHash;
  } catch (error) {
    throw new Error(`Withdrawal to rollup failed: ${error.message}`);
  }
}
