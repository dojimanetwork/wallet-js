import { cosmosclient, proto } from "@cosmos-client/core";
import { Asset, Chain } from "@dojima-wallet/utils";
import { ComputeUnits } from "./util";

export type MsgCoin = {
  asset: Asset;
  amount: string;
};

export class MsgCreateOperator {
  signer: cosmosclient.AccAddress;
  stakeAmount: string;
  serverAddress: string;

  constructor(
    signer: cosmosclient.AccAddress,
    stakeAmount: string,
    serverAddress: string
  ) {
    this.signer = signer;
    this.stakeAmount = stakeAmount;
    this.serverAddress = serverAddress;
  }
}

export class MsgCreateEndpoint {
  chain: Chain;
  rpcUrl: string;
  wsUrl: string;
  signer: cosmosclient.AccAddress;

  constructor(
    chain: Chain,
    rpcUrl: string,
    wsUrl: string,
    signer: cosmosclient.AccAddress
  ) {
    this.chain = chain;
    this.rpcUrl = rpcUrl;
    this.wsUrl = wsUrl;
    this.signer = signer;
  }
}

export class MsgRegisterChain {
  chain: Chain;
  computeUnits: ComputeUnits;
  signer: cosmosclient.AccAddress;

  constructor(
    chain: Chain,
    computeUnits: ComputeUnits,
    signer: cosmosclient.AccAddress
  ) {
    this.chain = chain;
    this.computeUnits = computeUnits;
    this.signer = signer;
  }
}

export class MsgNativeTx {
  coins: MsgCoin[];
  memo: string;
  signer: cosmosclient.AccAddress;

  constructor(coins: MsgCoin[], memo: string, signer: cosmosclient.AccAddress) {
    this.coins = coins;
    this.memo = memo;
    this.signer = signer;
  }
}

/**
 * This creates MsgNativeTx from json.
 *
 * @param value
 * @returns {MsgNativeTx}
 */
export const msgNativeTxFromJson = (value: {
  coins: MsgCoin[];
  memo: string;
  signer: string;
}): MsgNativeTx => {
  return new MsgNativeTx(
    value.coins,
    value.memo,
    cosmosclient.AccAddress.fromString(value.signer)
  );
};

export class MsgSetPubkeysTx {
  secp256k1Pubkey: string;
  ed25519Pubkey: string;
  validatorConsPubkey: string;
  signer: cosmosclient.AccAddress;
  constructor(
    signer: cosmosclient.AccAddress,
    secp256k1Pubkey: string,
    ed25519Pubkey: string,
    validatorConsPubkey: string
  ) {
    this.signer = signer;
    this.secp256k1Pubkey = secp256k1Pubkey;
    this.ed25519Pubkey = ed25519Pubkey;
    this.validatorConsPubkey = validatorConsPubkey;
  }
}

export type AminoWrapping<T> = {
  type: string;
  value: T;
};

export type DojchainDepositResponse = AminoWrapping<{
  msg: AminoWrapping<{
    coins: MsgCoin[];
    memo: string;
    signer: string;
  }>[];
  fee: proto.cosmos.tx.v1beta1.Fee;
  signatures: string[];
  memo: string;
  timeout_height: string;
}>;

export type TxResult = {
  observed_tx: {
    tx: {
      id: string;
      chain: string;
      from_address: string;
      to_address: string;
      coins: {
        asset: string;
        amount: string;
      }[];
      gas: {
        asset: string;
        amount: string;
      }[];
      memo: string;
    };
    status: string;
    signers: string[];
  };
  keysign_metric: {
    tx_id: string;
    node_tss_times: null;
  };
};

export class MsgSetVersionTx {
  version: string;
  signer: cosmosclient.AccAddress;
  constructor(signer: cosmosclient.AccAddress, version: string) {
    this.signer = signer;
    this.version = version;
  }
}

export class MsgSetIpAddressTx {
  ipAddress: string;
  signer: cosmosclient.AccAddress;
  constructor(signer: cosmosclient.AccAddress, ipAddress: string) {
    this.signer = signer;
    this.ipAddress = ipAddress;
  }
}
