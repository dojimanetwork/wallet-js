// package:
// file: query.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ChainRPCMethodRequest extends jspb.Message {
  hasChain(): boolean;
  clearChain(): void;
  getChain(): Chain | undefined;
  setChain(value?: Chain): ChainRPCMethodRequest;
  getMethodname(): string;
  setMethodname(value: string): ChainRPCMethodRequest;
  getMethoddata(): Uint8Array | string;
  getMethoddata_asU8(): Uint8Array;
  getMethoddata_asB64(): string;
  setMethoddata(value: Uint8Array | string): ChainRPCMethodRequest;
  getPubkey(): Uint8Array | string;
  getPubkey_asU8(): Uint8Array;
  getPubkey_asB64(): string;
  setPubkey(value: Uint8Array | string): ChainRPCMethodRequest;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): ChainRPCMethodRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChainRPCMethodRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ChainRPCMethodRequest
  ): ChainRPCMethodRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ChainRPCMethodRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ChainRPCMethodRequest;
  static deserializeBinaryFromReader(
    message: ChainRPCMethodRequest,
    reader: jspb.BinaryReader
  ): ChainRPCMethodRequest;
}

export namespace ChainRPCMethodRequest {
  export type AsObject = {
    chain?: Chain.AsObject;
    methodname: string;
    methoddata: Uint8Array | string;
    pubkey: Uint8Array | string;
    signature: Uint8Array | string;
  };
}

export class ChainRPCMethodResponse extends jspb.Message {
  getResult(): Uint8Array | string;
  getResult_asU8(): Uint8Array;
  getResult_asB64(): string;
  setResult(value: Uint8Array | string): ChainRPCMethodResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChainRPCMethodResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ChainRPCMethodResponse
  ): ChainRPCMethodResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ChainRPCMethodResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ChainRPCMethodResponse;
  static deserializeBinaryFromReader(
    message: ChainRPCMethodResponse,
    reader: jspb.BinaryReader
  ): ChainRPCMethodResponse;
}

export namespace ChainRPCMethodResponse {
  export type AsObject = {
    result: Uint8Array | string;
  };
}

export class BroadcastRequest extends jspb.Message {
  hasChain(): boolean;
  clearChain(): void;
  getChain(): Chain | undefined;
  setChain(value?: Chain): BroadcastRequest;
  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): BroadcastRequest;
  getPubkey(): Uint8Array | string;
  getPubkey_asU8(): Uint8Array;
  getPubkey_asB64(): string;
  setPubkey(value: Uint8Array | string): BroadcastRequest;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): BroadcastRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BroadcastRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BroadcastRequest
  ): BroadcastRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BroadcastRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BroadcastRequest;
  static deserializeBinaryFromReader(
    message: BroadcastRequest,
    reader: jspb.BinaryReader
  ): BroadcastRequest;
}

export namespace BroadcastRequest {
  export type AsObject = {
    chain?: Chain.AsObject;
    payload: Uint8Array | string;
    pubkey: Uint8Array | string;
    signature: Uint8Array | string;
  };
}

export class BroadcastResponse extends jspb.Message {
  getTxnhash(): string;
  setTxnhash(value: string): BroadcastResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BroadcastResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BroadcastResponse
  ): BroadcastResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BroadcastResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BroadcastResponse;
  static deserializeBinaryFromReader(
    message: BroadcastResponse,
    reader: jspb.BinaryReader
  ): BroadcastResponse;
}

export namespace BroadcastResponse {
  export type AsObject = {
    txnhash: string;
  };
}

export class Chain extends jspb.Message {
  getTicker(): string;
  setTicker(value: string): Chain;
  getName(): string;
  setName(value: string): Chain;
  getId(): string;
  setId(value: string): Chain;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Chain.AsObject;
  static toObject(includeInstance: boolean, msg: Chain): Chain.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Chain,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Chain;
  static deserializeBinaryFromReader(
    message: Chain,
    reader: jspb.BinaryReader
  ): Chain;
}

export namespace Chain {
  export type AsObject = {
    ticker: string;
    name: string;
    id: string;
  };
}

export class BlockRequest extends jspb.Message {
  hasChain(): boolean;
  clearChain(): void;
  getChain(): Chain | undefined;
  setChain(value?: Chain): BlockRequest;
  getBlocknum(): number;
  setBlocknum(value: number): BlockRequest;
  getPubkey(): Uint8Array | string;
  getPubkey_asU8(): Uint8Array;
  getPubkey_asB64(): string;
  setPubkey(value: Uint8Array | string): BlockRequest;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): BlockRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BlockRequest
  ): BlockRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BlockRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BlockRequest;
  static deserializeBinaryFromReader(
    message: BlockRequest,
    reader: jspb.BinaryReader
  ): BlockRequest;
}

export namespace BlockRequest {
  export type AsObject = {
    chain?: Chain.AsObject;
    blocknum: number;
    pubkey: Uint8Array | string;
    signature: Uint8Array | string;
  };
}

export class BlockResponse extends jspb.Message {
  hasChain(): boolean;
  clearChain(): void;
  getChain(): Chain | undefined;
  setChain(value?: Chain): BlockResponse;
  getBlcinbytestr(): string;
  setBlcinbytestr(value: string): BlockResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BlockResponse
  ): BlockResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BlockResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BlockResponse;
  static deserializeBinaryFromReader(
    message: BlockResponse,
    reader: jspb.BinaryReader
  ): BlockResponse;
}

export namespace BlockResponse {
  export type AsObject = {
    chain?: Chain.AsObject;
    blcinbytestr: string;
  };
}

export class TransactionRequest extends jspb.Message {
  hasChain(): boolean;
  clearChain(): void;
  getChain(): Chain | undefined;
  setChain(value?: Chain): TransactionRequest;
  getTxhash(): string;
  setTxhash(value: string): TransactionRequest;
  getBlocknum(): number;
  setBlocknum(value: number): TransactionRequest;
  getPubkey(): Uint8Array | string;
  getPubkey_asU8(): Uint8Array;
  getPubkey_asB64(): string;
  setPubkey(value: Uint8Array | string): TransactionRequest;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): TransactionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: TransactionRequest
  ): TransactionRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: TransactionRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): TransactionRequest;
  static deserializeBinaryFromReader(
    message: TransactionRequest,
    reader: jspb.BinaryReader
  ): TransactionRequest;
}

export namespace TransactionRequest {
  export type AsObject = {
    chain?: Chain.AsObject;
    txhash: string;
    blocknum: number;
    pubkey: Uint8Array | string;
    signature: Uint8Array | string;
  };
}

export class TransactionResponse extends jspb.Message {
  hasChain(): boolean;
  clearChain(): void;
  getChain(): Chain | undefined;
  setChain(value?: Chain): TransactionResponse;
  getTxhash(): string;
  setTxhash(value: string): TransactionResponse;
  getTxninbytestr(): string;
  setTxninbytestr(value: string): TransactionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: TransactionResponse
  ): TransactionResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: TransactionResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): TransactionResponse;
  static deserializeBinaryFromReader(
    message: TransactionResponse,
    reader: jspb.BinaryReader
  ): TransactionResponse;
}

export namespace TransactionResponse {
  export type AsObject = {
    chain?: Chain.AsObject;
    txhash: string;
    txninbytestr: string;
  };
}

export class SOLDataRequest extends jspb.Message {
  hasChain(): boolean;
  clearChain(): void;
  getChain(): Chain | undefined;
  setChain(value?: Chain): SOLDataRequest;
  getAccountaddress(): string;
  setAccountaddress(value: string): SOLDataRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SOLDataRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: SOLDataRequest
  ): SOLDataRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: SOLDataRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): SOLDataRequest;
  static deserializeBinaryFromReader(
    message: SOLDataRequest,
    reader: jspb.BinaryReader
  ): SOLDataRequest;
}

export namespace SOLDataRequest {
  export type AsObject = {
    chain?: Chain.AsObject;
    accountaddress: string;
  };
}

export class TestRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: TestRequest
  ): TestRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: TestRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): TestRequest;
  static deserializeBinaryFromReader(
    message: TestRequest,
    reader: jspb.BinaryReader
  ): TestRequest;
}

export namespace TestRequest {
  export type AsObject = {};
}

export class TestResponse extends jspb.Message {
  getMsg(): string;
  setMsg(value: string): TestResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: TestResponse
  ): TestResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: TestResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): TestResponse;
  static deserializeBinaryFromReader(
    message: TestResponse,
    reader: jspb.BinaryReader
  ): TestResponse;
}

export namespace TestResponse {
  export type AsObject = {
    msg: string;
  };
}
