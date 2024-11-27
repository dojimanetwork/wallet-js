import { PoolData } from "./types";
import axios from "axios";
import {
  StagenetInboundAddressResult,
  SwapAssetList,
  TestnetInboundAddressResult,
} from "@dojima-wallet/utils";

export async function getTestnetTokenPoolData(
  hermesApiUrl: string,
  token: SwapAssetList
): Promise<PoolData> {
  const response = await axios.get(
    `${hermesApiUrl}${
      hermesApiUrl.endsWith("/") ? "" : "/"
    }hermeschain/pool/${token}`
  );
  // const response = await axios.get(
  //   `http://localhost:1317/hermeschain/pool/${token}`
  // );
  if (response.status !== 200) {
    throw new Error(
      `Unable to retrieve testnet pool data. Dojima gateway responded with status ${response.status}.`
    );
  }

  const data: PoolData = response.data;
  return data;
}

export async function getStagenetTokenPoolData(
  hermesApiUrl: string,
  token: SwapAssetList
): Promise<PoolData> {
  const response = await axios.get(
    `${hermesApiUrl}${
      hermesApiUrl.endsWith("/") ? "" : "/"
    }hermeschain/pool/${token}`
  );
  // const response = await axios.get(
  //   `http://localhost:1317/hermeschain/pool/${token}`
  // );
  if (response.status !== 200) {
    throw new Error(
      `Unable to retrieve stagenet pool data. Dojima gateway responded with status ${response.status}.`
    );
  }

  const data: PoolData = response.data;
  return data;
}

export async function getTestnetInboundObject(
  hermesApiUrl: string,
  chain: string
): Promise<TestnetInboundAddressResult> {
  const response = await axios.get(
    `${hermesApiUrl}${
      hermesApiUrl.endsWith("/") ? "" : "/"
    }hermeschain/inbound_addresses`
  );
  if (response.status !== 200) {
    throw new Error(
      `Unable to retrieve testnet inbound object. Dojima gateway responded with status ${response.status}.`
    );
  }

  const data: Array<TestnetInboundAddressResult> = response.data;
  const inboundObj: TestnetInboundAddressResult = data.find(
    (res) => res.chain === chain
  ) as TestnetInboundAddressResult;
  return inboundObj;
}

export async function getStagenetInboundObject(
  hermesApiUrl: string,
  chain: string
): Promise<StagenetInboundAddressResult> {
  const response = await axios.get(
    `${hermesApiUrl}${
      hermesApiUrl.endsWith("/") ? "" : "/"
    }hermeschain/inbound_addresses`
  );
  if (response.status !== 200) {
    throw new Error(
      `Unable to retrieve stagenet inbound object. Dojima gateway responded with status ${response.status}.`
    );
  }

  const data: Array<StagenetInboundAddressResult> = response.data;
  const inboundObj: StagenetInboundAddressResult = data.find(
    (res) => res.chain === chain
  ) as StagenetInboundAddressResult;
  return inboundObj;
}
