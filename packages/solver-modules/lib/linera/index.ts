import { ethers } from "ethers";
import { MarketplaceData } from "./abis/marketplace";
import axios from "axios";
import { sampleByteArrayFile } from "./byteArray";

export {
  // listEthNft,
  getNftMetaDataUrl,
  createAndListNFT,
  listGenericNft,
  getNextNftId,
  createCrowdFundingApp,
  setChainAddressForCrowdFundingApp,
};

async function getNftMarketPlaceContract(rpcUrl: string, privateKey: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(
    MarketplaceData.address,
    MarketplaceData.abi,
    signer
  );
  return contract;
}

export async function listEthNft(
  rpcUrl: string,
  privateKey: string,
  tokenId: string,
  price: string
): Promise<string> {
  const contract = await getNftMarketPlaceContract(rpcUrl, privateKey);

  const nftPrice = ethers.utils.parseUnits(price, "ether");
  const listingPrice = (await contract.getListPrice()).toString();
  const transaction = await contract.listToken(tokenId, nftPrice, {
    value: listingPrice,
  });
  await transaction.wait();
  return transaction.hash;
}

async function getNftMetaDataUrl(nftUrl: string) {
  const apiUrl = `${
    nftUrl.endsWith("/") ? nftUrl.slice(0, -1) : nftUrl
  }/publish_image`;
  const blobResponseApi = await axios.post(
    apiUrl,
    {
      imageBytes: Array.from(sampleByteArrayFile),
      chainId:
        "e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (blobResponseApi.status === 200) {
    return blobResponseApi.data.blobHash as string;
  } else {
    throw new Error(
      `Failed to fetch NFT metadata URL: ${blobResponseApi.data}`
    );
  }
}

async function createAndListNFT(
  rpcUrl: string,
  privateKey: string,
  price: string,
  metadataURL: string
) {
  const contract = await getNftMarketPlaceContract(rpcUrl, privateKey);

  try {
    const nftPrice = ethers.utils.parseUnits(price, "ether");
    const listingPrice = (await contract.getListPrice()).toString();

    const transaction = await contract.createAndListToken(
      metadataURL,
      nftPrice,
      { value: listingPrice }
    );
    // console.log("Sell Tx : ", transaction);
    await transaction.wait();
    return transaction.hash;
    // console.log("Successfully listed your NFT!");
  } catch (e) {
    // console.error("Error listing NFT:", e);
    throw new Error(`Error listing NFT : ${e}`);
  }
}

async function getNextNftId(nftUrl: string): Promise<number> {
  try {
    const response = await axios.get(`${nftUrl}/next_nft_id`);
    return response.data?.data?.currentId;
  } catch (error) {
    // console.error("Error fetching next NFT ID:", error);
    throw new Error(`Error fetching next NFT ID : ${error}`);
  }
}

async function listGenericNft(
  nftUrl: string,
  name: string,
  description: string,
  amount: number,
  blobHash: string,
  minterAddress: string,
  ownerAddress: string
): Promise<string> {
  const latestId = await getNextNftId(nftUrl);

  // Prepare final form data
  const formData = {
    name: name, // Replace with actual state
    description: description, // Replace with actual state
    price: `${amount}`, // Replace with actual state
    // imageBytes: Array.from(byteArrayFile), // Convert Uint8Array to array
    chainId: "e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65",
    minter:
      "User:eb8a92bd53a15a5ed3c3169aa13c88ef090c36326999cc14297186bef160d358",
    chainMinter: minterAddress,
    chainOwner: ownerAddress,
    id: latestId,
    token: "ETH",
    blobHash: blobHash,
    nftType: "GENERIC",
  };

  // Send API request using Axios
  try {
    const apiUrl = `${nftUrl}/list_nft`;
    const responseApi = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(responseApi);
    if (responseApi.status === 200) {
      return responseApi.data.blobHash;
    } else {
      // console.error("Failed to list NFT:", responseApi.data);
      throw new Error(`Failed to list NFT : ${responseApi.data}`);
    }
  } catch (error) {
    // console.error("Error listing NFT:", error);
    throw new Error(`Error listing NFT : ${error}`);
  }
}

async function createCrowdFundingApp(
  crowdFundingUrl: string,
  title: string,
  description: string,
  twitterId: string,
  blobHash: string
): Promise<{ status: string; message: string; data: string }> {
  // Prepare final form data
  const formData = {
    args: {
      deadline: 4102473600000000,
      target: "1000000",
    },
    twitterId: twitterId,
    description: description,
    title: title,
    profileScreenshot: blobHash,
  };

  // Send API request using Axios
  try {
    const apiUrl = `${crowdFundingUrl}/crowd_app/new`;
    const responseApi = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(responseApi);
    if (responseApi.status === 200) {
      return responseApi.data;
    } else {
      // console.error("Failed to create app:", responseApi.data);
      throw new Error(`Failed to create app : ${responseApi.data}`);
    }
  } catch (error) {
    // console.error("Error creating app:", error);
    throw new Error(`Error creating app : ${error}`);
  }
}

async function setChainAddressForCrowdFundingApp(
  crowdFundingUrl: string,
  twitterId: string,
  ethaddress: string,
  soladdress: string
): Promise<{
  status: string;
  message: string;
  successful: any;
  errors: any;
  total_added: number;
}> {
  // Prepare chainAddressData
  const chainAddressData = [
    {
      chain: "ethereum",
      address: ethaddress,
      twitter_id: twitterId,
    },
    {
      chain: "solana",
      address: soladdress,
      twitter_id: twitterId,
    },
  ];

  // Send API request using Axios
  try {
    const addressUrl = `${crowdFundingUrl}/add_chain_address`;
    const addressResponseApi = await axios.post(addressUrl, chainAddressData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(addressResponseApi);
    if (addressResponseApi.status === 200) {
      return addressResponseApi.data;
    } else {
      // console.error("Failed to add address to app:", responseApi.data);
      throw new Error(
        `Failed to add address to app : ${addressResponseApi.data}`
      );
    }
  } catch (error) {
    // console.error("Error adding address to app:", error);
    throw new Error(`Error adding address to app : ${error}`);
  }
}
