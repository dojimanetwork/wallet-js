import { PoolData, UsdtTokenGasFeeResult } from "./types";
import { DojimaInit } from "@dojima-wallet/connection";
import { Network } from "@dojima-wallet/types";
import { getUsdtTokenPriceResult } from "./utils";
import { SwapAssetList } from "@dojima-wallet/utils";

export default class DojimaChain extends DojimaInit {
  constructor(
    mnemonic: string,
    privateKey: string,
    network: Network,
    rpcUrl: string
  ) {
    super(mnemonic, privateKey, network, rpcUrl);
  }

  async getGasFee(
    amount: number,
    memo?: string
  ): Promise<UsdtTokenGasFeeResult> {
    const gasFee = await this.dojConnect.calculateGasFee(
      this.dojConnect.getAddress(),
      amount,
      memo ? memo : undefined
    );
    const gasFeeResult = {
      slow: parseFloat(gasFee),
      average: parseFloat(gasFee),
      fast: parseFloat(gasFee),
    };
    const result = await getUsdtTokenPriceResult(gasFeeResult, "doj");
    return result;
  }

  async transfer(
    recipient: string,
    amount: number,
    gasPrice?: number,
    memo?: string
  ): Promise<string> {
    const hash = await this.dojConnect.transfer({
      recipient,
      amount,
      fee: gasPrice ? gasPrice : undefined,
      memo: memo ? memo : undefined,
    });
    return hash;
  }

  getSwapOutput(amount: number, pool: PoolData, toDoj: boolean): number {
    return this.dojConnect.getSwapOutput(amount, pool, toDoj);
  }

  getDoubleSwapOutput(
    amount: number,
    pool1: PoolData,
    pool2: PoolData
  ): number {
    return this.dojConnect.getDoubleSwapOutput(amount, pool1, pool2);
  }

  getSwapSlippage(amount: number, pool: PoolData, toDoj: boolean): number {
    return this.dojConnect.getSwapSlip(amount, pool, toDoj) * 100;
  }

  getDoubleSwapSlippage(
    amount: number,
    pool1: PoolData,
    pool2: PoolData
  ): number {
    return this.dojConnect.getDoubleSwapSlip(amount, pool1, pool2) * 100;
  }

  async getDefaultLiquidityPoolGasFee(
    hermesApiUrl: string
  ): Promise<UsdtTokenGasFeeResult> {
    const LPDefaultGasFee = await this.dojConnect.getDefaultLiquidityPoolGasFee(
      hermesApiUrl
    );
    const eth_LPgasfee = {
      slow: LPDefaultGasFee,
      average: LPDefaultGasFee,
      fast: LPDefaultGasFee,
    };
    const result = await getUsdtTokenPriceResult(eth_LPgasfee, "doj");
    return result;
  }

  async addLiquidityPool(
    amount: number,
    hermesApiUrl: string,
    hermesAddress?: string
  ): Promise<string> {
    try {
      const inboundAddress = await this.dojConnect.getDojimaInboundAddress(
        hermesApiUrl
      );
      const liquidityPoolHash = await this.dojConnect.addLiquidityPool(
        amount,
        inboundAddress,
        hermesAddress
      );
      return liquidityPoolHash;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async swap(
    amount: number,
    recipient: string,
    token: SwapAssetList,
    hermesApiUrl: string
  ) {
    try {
      const inboundAddress = await this.dojConnect.getDojimaInboundAddress(
        hermesApiUrl
      );
      const swapHash = await this.dojConnect.swap(
        amount,
        token,
        inboundAddress,
        recipient
      );
      return swapHash;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
