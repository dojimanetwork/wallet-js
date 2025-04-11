import {
  OpenSeaSDK,
  Chain,
  EventType,
  EventData,
  OrderV2,
  CollectionOffer,
  AssetWithTokenId,
  Order,
  AssetWithTokenStandard,
} from "opensea-js";
import { BigNumberish, ethers, Overrides } from "ethers";
// Import BigNumberish from seaport-js to match OpenSea's types
// import { BigNumberish } from '@opensea/seaport-js/node_modules/ethers/lib/utils';

export class OpenSeaClient {
  private sdk: OpenSeaSDK;
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private chain: string;
  private rpcUrl: string;
  protected openseaApiKey: string;

  constructor(privateKey: string, chain: string, openseaApiKey: string) {
    this.chain = chain;
    this.rpcUrl = this.getRpcUrl();
    this.provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
    this.openseaApiKey = openseaApiKey;

    // Create a signer with the required signTypedData method
    const signer = new ethers.Wallet(privateKey, this.provider);

    // Add signTypedData method to the signer
    (signer as any).signTypedData = async (
      domain: any,
      types: any,
      value: any
    ) => {
      return signer._signTypedData(domain, types, value);
    };

    this.signer = signer;

    // Initialize OpenSea SDK with the enhanced signer
    this.sdk = new OpenSeaSDK(this.signer as any, {
      chain: this.getChain(),
      apiKey: this.openseaApiKey,
    });
  }

  // Add a method to get WETH contract
  async getWethContract() {
    const wethAddress = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"; // Sepolia WETH address
    return new ethers.Contract(
      wethAddress,
      [
        "function deposit() payable",
        "function withdraw(uint256 amount)",
        "function balanceOf(address owner) view returns (uint256)",
        "function approve(address spender, uint256 amount) returns (bool)",
      ],
      this.signer
    );
  }

  getChain(): Chain {
    switch (this.chain.toLowerCase()) {
      case "mainnet":
        return Chain.Mainnet;
      case "sepolia":
        return Chain.Sepolia;
      case "base_sepolia":
        return Chain.BaseSepolia;
      default:
        throw new Error(`Unsupported chain: ${this.chain}`);
    }
  }

  getRpcUrl(): string {
    switch (this.chain.toLowerCase()) {
      case "mainnet":
        return "https://eth-mainnet.public.blastapi.io";
      case "sepolia":
        return "https://ethereum-sepolia-rpc.publicnode.com";
      case "goerli":
        return "https://ethereum-goerli-rpc.publicnode.com";
      default:
        throw new Error(`RPC URL not configured for chain: ${this.chain}`);
    }
  }

  /**
   * Add a listener for events emitted by the SDK.
   * @param event The EventType to listen to
   * @param listener A callback that will accept an object with EventData
   * @param once Whether the listener should only be called once, or continue listening until removed
   */
  public addListener(
    event: EventType,
    listener: (data: EventData) => void,
    once = false
  ): void {
    this.sdk.addListener(event, listener, once);
  }

  /**
   * Instead of signing an off-chain order, this methods allows you to approve an order
   * with on on-chain transaction.
   * @param order Order to approve
   * @param domain An optional domain to be hashed and included at the end of fulfillment calldata
   * @returns Transaction hash of the approval transaction
   */
  public async approveOrder(order: OrderV2, domain?: string): Promise<string> {
    try {
      return await this.sdk.approveOrder(order, domain);
    } catch (error) {
      this.handleError(error, "approveOrder");
      throw error;
    }
  }

  /**
   * Cancel an order onchain, preventing it from ever being fulfilled.
   * @param options.order The order to cancel
   * @param options.accountAddress The account address that will be cancelling the order
   * @param options.domain An optional domain to be hashed and included at the end of fulfillment calldata
   */
  public async cancelOrder({
    order,
    accountAddress,
    domain,
  }: {
    order: OrderV2;
    accountAddress: string;
    domain?: string;
  }): Promise<void> {
    try {
      await this.sdk.cancelOrder({
        order,
        accountAddress,
        domain,
      });
    } catch (error) {
      this.handleError(error, "cancelOrder");
      throw error;
    }
  }

  /**
   * Create and submit a collection offer.
   * @param options Parameters for creating the collection offer
   * @returns The CollectionOffer that was created
   */
  public async createCollectionOffer({
    collectionSlug,
    accountAddress,
    amount,
    quantity,
    domain,
    salt,
    expirationTime,
    paymentTokenAddress,
    excludeOptionalCreatorFees = false,
    offerProtectionEnabled = true,
    traitType,
    traitValue,
  }: {
    collectionSlug: string;
    accountAddress: string;
    amount: BigNumberish;
    quantity: number;
    domain?: string;
    salt?: BigNumberish;
    expirationTime?: number | string;
    paymentTokenAddress: string;
    excludeOptionalCreatorFees?: boolean;
    offerProtectionEnabled?: boolean;
    traitType?: string;
    traitValue?: string;
  }): Promise<CollectionOffer | null> {
    try {
      return await this.sdk.createCollectionOffer({
        collectionSlug,
        accountAddress,
        amount: amount.toString(),
        quantity,
        domain,
        salt: salt?.toString(),
        expirationTime,
        paymentTokenAddress,
        excludeOptionalCreatorFees,
        offerProtectionEnabled,
        traitType,
        traitValue,
      });
    } catch (error) {
      this.handleError(error, "createCollectionOffer");
      throw error;
    }
  }

  /**
   * Create and submit a listing for an asset.
   * @param options Parameters for creating the listing
   * @returns The OrderV2 that was created
   */
  public async createListing({
    asset,
    accountAddress,
    startAmount,
    endAmount,
    quantity = 1,
    domain,
    salt,
    listingTime,
    expirationTime,
    paymentTokenAddress = ethers.constants.AddressZero,
    buyerAddress,
    englishAuction,
    excludeOptionalCreatorFees = false,
    zone = ethers.constants.AddressZero,
  }: {
    asset: AssetWithTokenId;
    accountAddress: string;
    startAmount: BigNumberish;
    endAmount?: BigNumberish;
    quantity?: BigNumberish;
    domain?: string;
    salt?: BigNumberish;
    listingTime?: number;
    expirationTime?: number;
    paymentTokenAddress?: string;
    buyerAddress?: string;
    englishAuction?: boolean;
    excludeOptionalCreatorFees?: boolean;
    zone?: string;
  }): Promise<OrderV2> {
    try {
      return await this.sdk.createListing({
        asset,
        accountAddress,
        startAmount: startAmount.toString(),
        endAmount: endAmount?.toString(),
        quantity: quantity?.toString(),
        domain,
        salt: salt?.toString(),
        listingTime,
        expirationTime,
        paymentTokenAddress,
        buyerAddress,
        englishAuction,
        excludeOptionalCreatorFees,
        zone,
      });
    } catch (error) {
      this.handleError(error, "createListing");
      throw error;
    }
  }

  /**
   * Create and submit an offer on an asset.
   * @param options Parameters for creating the offer
   * @returns The OrderV2 that was created
   */
  public async createOffer({
    asset,
    accountAddress,
    startAmount,
    domain,
    salt,
    expirationTime,
    paymentTokenAddress = ethers.constants.AddressZero,
    quantity = 1,
    excludeOptionalCreatorFees = true,
    zone = ethers.constants.AddressZero,
  }: {
    asset: AssetWithTokenId;
    accountAddress: string;
    startAmount: BigNumberish;
    domain?: string;
    salt?: BigNumberish;
    expirationTime?: BigNumberish;
    paymentTokenAddress?: string;
    quantity?: BigNumberish;
    excludeOptionalCreatorFees?: boolean;
    zone?: string;
  }): Promise<OrderV2> {
    try {
      return await this.sdk.createOffer({
        asset,
        accountAddress,
        startAmount: startAmount.toString(),
        domain,
        salt: salt?.toString(),
        expirationTime: expirationTime?.toString(),
        paymentTokenAddress,
        quantity: quantity?.toString(),
        excludeOptionalCreatorFees,
        zone,
      });
    } catch (error) {
      this.handleError(error, "createOffer");
      throw error;
    }
  }

  /**
   * Fulfill an order for an asset. The order can be either a listing or an offer.
   * @param options Parameters for fulfilling the order
   * @returns Transaction hash of the order
   */
  public async fulfillOrder({
    order,
    accountAddress,
    domain,
    recipientAddress,
    overrides,
  }: {
    order: OrderV2 | Order;
    accountAddress: string;
    domain?: string;
    recipientAddress?: string;
    overrides?: Overrides;
  }): Promise<string> {
    try {
      return await this.sdk.fulfillOrder({
        order,
        accountAddress,
        domain,
        recipientAddress,
        // overrides,
      });
    } catch (error) {
      this.handleError(error, "fulfillOrder");
      throw error;
    }
  }

  /**
   * Get an account's balance of any Asset. This asset can be an ERC20, ERC1155, or ERC721.
   * @param options Parameters for getting the balance
   * @returns The balance of the asset for the account
   * @throws Error if the token standard does not support balanceOf
   */
  public async getBalance({
    accountAddress,
    asset,
  }: {
    accountAddress: string;
    asset: AssetWithTokenStandard;
  }): Promise<bigint> {
    try {
      return await this.sdk.getBalance({
        accountAddress,
        asset,
      });
    } catch (error) {
      this.handleError(error, "getBalance");
      throw error;
    }
  }

  // Helper method to handle errors
  private handleError(error: any, context: string) {
    console.error(`Error in ${context}:`, error);
    throw error;
  }

  /**
   * Transfer an asset. This asset can be an ERC20, ERC1155, or ERC721.
   * @param options Parameters for transferring the asset
   * @returns Promise that resolves when the transfer is complete
   */
  public async transfer({
    amount,
    asset,
    fromAddress,
    overrides,
    toAddress,
  }: {
    amount?: BigNumberish;
    asset: AssetWithTokenStandard;
    fromAddress: string;
    overrides?: Overrides;
    toAddress: string;
  }): Promise<void> {
    try {
      await this.sdk.transfer({
        amount: amount?.toString(),
        asset,
        fromAddress,
        toAddress,
        // overrides temporarily disabled due to type mismatch
        // overrides,
      });
    } catch (error) {
      this.handleError(error, "transfer");
      throw error;
    }
  }

  /**
   * Unwrap WETH into ETH. Emits the UnwrapWeth event when the transaction is prompted.
   * @param options Parameters for unwrapping WETH
   * @returns Promise that resolves when the unwrap is complete
   */
  public async wrapEth({
    accountAddress,
    amountInEth,
  }: {
    accountAddress: string;
    amountInEth: BigNumberish;
  }): Promise<void> {
    try {
      const wethContract = await this.getWethContract();
      const tx = await wethContract.deposit({
        value: amountInEth.toString(),
        gasLimit: 100000,
      });
      await tx.wait();
    } catch (error) {
      this.handleError(error, "wrapEth");
      throw error;
    }
  }
  // problem in converting the value
  // public async wrapEth({
  //   accountAddress,
  //   amountInEth,
  // }: {
  //   accountAddress: string;
  //   amountInEth: BigNumberish;
  // }): Promise<void> {
  //   try {
  //     console.log("amountInEth.toString(): ", amountInEth.toString());
  //     const amountInFormat = ethers.utils.formatEther(amountInEth.toString());
  //     console.log(`Amount in ETH: ${amountInFormat} ETH`);

  //     await this.sdk.wrapEth({
  //       accountAddress,
  //       amountInEth: amountInFormat.toString(),
  //     });
  //   } catch (error) {
  //     this.handleError(error, 'wrapEth');
  //     throw error;
  //   }
  // }

  /**
   * Wrap ETH into WETH. W-ETH is needed for making offers.
   * @param options Parameters for wrapping ETH
   * @returns Promise that resolves when the wrap is complete
   */
  public async unwrapWeth({
    accountAddress,
    amountInEth,
  }: {
    accountAddress: string;
    amountInEth: BigNumberish;
  }): Promise<void> {
    try {
      const wethContract = await this.getWethContract();
      const tx = await wethContract.withdraw(amountInEth.toString());
      await tx.wait();
    } catch (error) {
      this.handleError(error, "unwrapWeth");
      throw error;
    }
  }

  // problem in converting the value
  // public async unwrapWeth({
  //   accountAddress,
  //   amountInEth,
  // }: {
  //   accountAddress: string;
  //   amountInEth: BigNumberish;
  // }): Promise<void> {
  //   try {
  //     await this.sdk.unwrapWeth({
  //       accountAddress,
  //       amountInEth: amountInEth.toString(),
  //     });
  //   } catch (error) {
  //     this.handleError(error, 'unwrapWeth');
  //     throw error;
  //   }
  // }

  /**
   * Returns whether an order is fulfillable.
   * @param options Parameters for checking order fulfillability
   * @returns True if the order is fulfillable, else False
   * @throws Error if the order's protocol address is not supported by OpenSea
   */
  public async isOrderFulfillable({
    accountAddress,
    order,
  }: {
    accountAddress: string;
    order: OrderV2;
  }): Promise<boolean> {
    try {
      return await this.sdk.isOrderFulfillable({
        accountAddress,
        order,
      });
    } catch (error) {
      this.handleError(error, "isOrderFulfillable");
      throw error;
    }
  }

  /**
   * Remove an event listener by calling .removeListener() on an event and listener.
   * @param event The EventType to remove a listener for
   * @param listener The listener to remove
   */
  public removeListener(
    event: EventType,
    listener: (data: EventData) => void
  ): void {
    this.sdk.removeListener(event, listener);
  }

  /**
   * Remove all event listeners.
   * This should be called when you're unmounting a component that listens to events to make UI updates.
   * @param event Optional EventType to remove listeners for
   */
  public removeAllListeners(event?: EventType): void {
    this.sdk.removeAllListeners(event);
  }

  /**
   * Get a list of OpenSea collections
   * @returns Promise with the collections data
   */
  public async getCollections(): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/collections?chain=${this.chain}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getCollections");
      throw error;
    }
  }

  /**
   * Get a single collection's details
   * @param collectionSlug The slug of the collection to fetch
   * @returns Promise with the collection details
   */
  public async getCollection(collectionSlug: string): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/collections/${collectionSlug}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getCollection");
      throw error;
    }
  }

  /**
   * Get an OpenSea Account Profile
   * @param addressOrUsername The address or username of the account to fetch
   * @returns Promise with the account profile data
   */
  public async getAccount(addressOrUsername: string): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/accounts/${addressOrUsername}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getAccount");
      throw error;
    }
  }

  /**
   * Get a smart contract for a given chain and address
   * @param chain The blockchain where the contract is deployed
   * @param address The contract address
   * @returns Promise with the contract details
   */
  public async getContract(chain: string, address: string): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/chain/${chain}/contract/${address}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getContract");
      throw error;
    }
  }

  /**
   * Get metadata, traits, ownership information, and rarity for a single NFT
   * @param chain The blockchain where the NFT exists
   * @param address The NFT contract address
   * @param identifier The token ID of the NFT
   * @returns Promise with the NFT details
   */
  public async getNFT(
    chain: string,
    address: string,
    identifier: string
  ): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/chain/${chain}/contract/${address}/nfts/${identifier}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getNFT");
      throw error;
    }
  }

  /**
   * Get NFTs owned by a given account address
   * @param chain The blockchain to query
   * @param address The account address to get NFTs for
   * @returns Promise with the account's NFTs
   */
  public async getNFTsByAccount(chain: string, address: string): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/chain/${chain}/account/${address}/nfts`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getNFTsByAccount");
      throw error;
    }
  }

  /**
   * Get multiple NFTs for a collection
   * @param collectionSlug The slug of the collection
   * @returns Promise with the collection's NFTs
   */
  public async getNFTsByCollection(collectionSlug: string): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/collection/${collectionSlug}/nfts`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getNFTsByCollection");
      throw error;
    }
  }

  /**
   * Get multiple NFTs for a smart contract
   * @param chain The blockchain where the contract exists
   * @param address The contract address
   * @returns Promise with the contract's NFTs
   */
  public async getNFTsByContract(chain: string, address: string): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/chain/${chain}/contract/${address}/nfts`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getNFTsByContract");
      throw error;
    }
  }

  /**
   * Refresh metadata for a single NFT
   * @param chain The blockchain where the NFT exists
   * @param address The NFT contract address
   * @param identifier The token ID of the NFT
   * @returns Promise with the refresh status
   */
  public async refreshNFTMetadata(
    chain: string,
    address: string,
    identifier: string
  ): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/chain/${chain}/contract/${address}/nfts/${identifier}/refresh`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "refreshNFTMetadata");
      throw error;
    }
  }

  /**
   * Get a list of events for an account
   * @param address The account address
   * @param options Optional parameters (after, before timestamps)
   * @returns Promise with the account's events
   */
  public async getEventsByAccount(
    address: string,
    options?: { after?: number; before?: number }
  ): Promise<any> {
    try {
      let url = `https://testnets-api.opensea.io/api/v2/events/accounts/${address}`;

      // Add query parameters if provided
      if (options) {
        const params = new URLSearchParams();
        if (options.after) params.append("after", options.after.toString());
        if (options.before) params.append("before", options.before.toString());
        if (params.toString()) url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-KEY": this.openseaApiKey || "",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getEventsByAccount");
      throw error;
    }
  }

  /**
   * Get a list of events for a collection
   * @param collectionSlug The collection slug
   * @returns Promise with the collection's events
   */
  public async getEventsByCollection(collectionSlug: string): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/events/collection/${collectionSlug}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getEventsByCollection");
      throw error;
    }
  }

  /**
   * Get a list of events for a single NFT
   * @param chain The blockchain where the NFT exists
   * @param address The NFT contract address
   * @param identifier The token ID of the NFT
   * @returns Promise with the NFT's events
   */
  public async getEventsByNFT(
    chain: string,
    address: string,
    identifier: string
  ): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/events/chain/${chain}/contract/${address}/nfts/${identifier}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getEventsByNFT");
      throw error;
    }
  }

  /**
   * Buy a listed NFT on OpenSea
   * @param options Parameters for buying the NFT
   * @param options.order The listing order to fulfill
   * @param options.accountAddress Address of the wallet that will buy the NFT
   * @param options.recipientAddress Optional address to receive the NFT (defaults to accountAddress)
   * @returns Transaction hash of the purchase
   */
  public async buyNFT({
    order,
    accountAddress,
    recipientAddress,
  }: {
    order: OrderV2 | Order;
    accountAddress: string;
    recipientAddress?: string;
  }): Promise<string> {
    try {
      // Fulfill the listing order
      const txHash = await this.fulfillOrder({
        order,
        accountAddress,
        recipientAddress: recipientAddress || accountAddress,
      });

      //   console.log(`✅ Successfully purchased NFT. Transaction hash: ${txHash}`);
      return txHash;
    } catch (error) {
      console.error("❌ NFT purchase failed:", error);
      throw error;
    }
  }

  /**
   * Get the best listing for an NFT
   * @param collectionSlug The collection slug
   * @param identifier The token ID of the NFT
   * @returns Promise with the best listing details
   */
  public async getBestListingForNFT(
    collectionSlug: string,
    identifier: string
  ): Promise<any> {
    try {
      const response = await fetch(
        `https://testnets-api.opensea.io/api/v2/listings/collection/${collectionSlug}/nfts/${identifier}/best`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-KEY": this.openseaApiKey || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, "getBestListingForNFT");
      throw error;
    }
  }
}
