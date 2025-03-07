import { validatePhrase } from "../crypto";
import { Address, Asset, Chain } from "@dojima-wallet/utils";
import axios from "axios";

import {
  Balance,
  ChainClient,
  ChainClientParams,
  FeeBounds,
  FeeRate,
  Fees,
  Network,
  RootDerivationPaths,
  Tx,
  TxHistoryParams,
  TxParams,
  TxsPage,
} from "./types";

const MAINNET_HERMESNODE_API_BASE =
  "https://api-h4s.dojima.network/hermeschain";
const STAGENET_HERMESNODE_API_BASE =
  "https://api-h4s.dojima.network/hermeschain";
const TESTNET_HERMESNODE_API_BASE =
  "https://api-test-h4s.dojima.network/hermeschain";
// const DOJTESTNET_HERMESNODE_API_BASE = "http://localhost:1317/hermeschain";

export abstract class BaseChainClient implements ChainClient {
  protected chain: Chain;
  protected network: Network;
  protected feeBounds: FeeBounds;
  protected phrase = "";
  protected rootDerivationPaths: RootDerivationPaths | undefined;

  /**
   * Constructor
   *
   * Client has to be initialised with network type and phrase.
   * It will throw an error if an invalid phrase has been passed.
   *
   * @param {ChainClientParams} params
   *
   * @throws {"Invalid phrase"} Thrown if the given phase is invalid.
   */
  constructor(chain: Chain, params: ChainClientParams) {
    this.chain = chain;
    this.network = params.network;
    this.feeBounds = params.feeBounds || { lower: 1, upper: Infinity };
    // Fire off a warning in the console to indicate that mainnet and real assets are being used.
    if (this.network === Network.Mainnet)
      console.warn(
        "WARNING: This is using Mainnet! Real assets are being used!"
      );
    // Fire off a warning in the console to indicate that stagenet and real assets are being used.
    if (this.network === Network.Stagenet)
      console.warn(
        "WARNING: This is using Stagenet! Real assets are being used!"
      );
    if (params.rootDerivationPaths)
      this.rootDerivationPaths = params.rootDerivationPaths;
    //NOTE: we don't call this.setPhrase() to avoid generating an address and paying the perf penalty
    if (params.phrase) {
      if (!validatePhrase(params.phrase)) {
        throw new Error("Invalid phrase");
      }
      this.phrase = params.phrase;
    }
  }
  /**
   * Set/update the current network.
   *
   * @param {Network} network
   * @returns {void}
   *
   * @throws {"Network must be provided"}
   * Thrown if network has not been set before.
   */
  public setNetwork(network: Network): void {
    if (!network) {
      throw new Error("Network must be provided");
    }
    this.network = network;
    // Fire off a warning in the console to indicate that mainnet and real assets are being used.
    if (this.network === Network.Mainnet)
      console.warn(
        "WARNING: This is using Mainnet! Real assets are being used!"
      );
    // Fire off a warning in the console to indicate that stagenet and real assets are being used.
    if (this.network === Network.Stagenet)
      console.warn(
        "WARNING: This is using Stagenet! Real assets are being used!"
      );
  }

  /**
   * Get the current network.
   *
   * @returns {Network}
   */
  public getNetwork(): Network {
    return this.network;
  }

  protected async getFeeRateFromHermeschain(): Promise<FeeRate> {
    const respData = await this.hermesnodeAPIGet("/inbound_addresses");
    if (!Array.isArray(respData))
      throw new Error("bad response from Hermesnode API");

    const chainData: { chain: Chain; gas_rate: string } = respData.find(
      (elem) => elem.chain === this.chain && typeof elem.gas_rate === "string"
    );
    if (!chainData)
      throw new Error(
        `Hermesnode API /inbound_addresses does not contain fees for ${this.chain}`
      );

    return Number(chainData.gas_rate);
  }

  protected async hermesnodeAPIGet(endpoint: string): Promise<unknown> {
    const url = (() => {
      switch (this.network) {
        case Network.Mainnet:
          return MAINNET_HERMESNODE_API_BASE;
        case Network.Stagenet:
          return STAGENET_HERMESNODE_API_BASE;
        case Network.Testnet:
          return TESTNET_HERMESNODE_API_BASE;
      }
    })();
    return (await axios.get(url + endpoint)).data;
  }

  /**
   * Set/update a new phrase
   *
   * @param {string} phrase A new phrase.
   * @param {number} walletIndex (optional) HD wallet index
   * @returns {Address} The address from the given phrase
   *
   * @throws {"Invalid phrase"}
   * Thrown if the given phase is invalid.
   */
  public setPhrase(phrase: string, walletIndex = 0): Address {
    if (this.phrase !== phrase) {
      if (!validatePhrase(phrase)) {
        throw new Error("Invalid phrase");
      }
      this.phrase = phrase;
    }

    return this.getAddress(walletIndex);
  }

  /**
   * Get getFullDerivationPath
   *
   * @param {number} walletIndex HD wallet index
   * @returns {string} The bitcoin derivation path based on the network.
   */
  protected getFullDerivationPath(walletIndex: number): string {
    return this.rootDerivationPaths
      ? `${this.rootDerivationPaths[this.network]}${walletIndex}`
      : "";
  }
  /**
   * Purge client.
   *
   * @returns {void}
   */
  public purgeClient(): void {
    this.phrase = "";
  }
  //individual clients will need to implement these
  abstract getFees(): Promise<Fees>;
  abstract getAddress(
    walletIndex?: number,
    secondaryAccountIndex?: number
  ): string;
  abstract getExplorerUrl(): string;
  abstract getExplorerAddressUrl(address: string): string;
  abstract getExplorerTxUrl(txID: string): string;
  abstract validateAddress(address: string): boolean;
  abstract getBalance(address: string, assets?: Asset[]): Promise<Balance[]>;
  abstract getTransactions(params?: TxHistoryParams): Promise<TxsPage>;
  abstract getTransactionData(txId: string, assetAddress?: string): Promise<Tx>;
  abstract transfer(params: TxParams): Promise<string>;
}
