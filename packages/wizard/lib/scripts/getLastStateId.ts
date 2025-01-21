import { ethers } from "ethers";

export async function getLastStateId(dojimaUrl: string): Promise<number> {
  try {
    const provider = new ethers.JsonRpcProvider(dojimaUrl);

    const rawValue = await provider.getStorage(
      "0x0000000000000000000000000000000000001001",
      "0x0"
    );

    // Convert hex string to number
    const lastStateId = parseInt(rawValue, 16);
    return lastStateId + 1;
  } catch (error) {
    throw new Error(`Failed to get last state ID: ${error.message}`);
  }
}
