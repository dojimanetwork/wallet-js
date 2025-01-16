interface Coin {
  asset: string;
  amount: string;
}

interface TransactionInfo {
  id: string;
  chain: string;
  from_address: string;
  to_address: string;
  coins: Coin[];
  gas: Coin[];
  memo: string;
  payload: string;
  is_xc_msg: boolean;
}

interface TransactionResponse {
  tx: TransactionInfo;
  signer: string;
  destination_contract: string;
  depositId: number;
}

export async function getEvmHermesTransactionDetails(
  txHash: string
): Promise<TransactionResponse> {
  try {
    // Remove '0x' prefix if present
    const formattedHash = txHash.startsWith("0x") ? txHash.slice(2) : txHash;

    const response = await fetch(
      `https://api-test-h4s.dojima.network/hermeschain/evm_transfer_msg?tx_hash=${formattedHash.toUpperCase()}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as TransactionResponse;
  } catch (error) {
    throw new Error(`Failed to get transaction details: ${error.message}`);
  }
}
