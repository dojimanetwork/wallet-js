import { ethers } from "ethers";
import { MarketplaceData } from "./abis/marketplace";

export { listEthNft };

async function listEthNft(
  url: string,
  privateKey: string,
  contractAddress: string,
  tokenId: string,
  price: string
): Promise<string> {
  const provider = new ethers.providers.JsonRpcProvider(url);
  const signer = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(
    contractAddress,
    MarketplaceData.abi,
    signer
  );

  const nftPrice = ethers.utils.parseUnits(price, "ether");
  const listingPrice = (await contract.getListPrice()).toString();
  const transaction = await contract.listToken(tokenId, nftPrice, {
    value: listingPrice,
  });
  await transaction.wait();
  return transaction.hash;
}
