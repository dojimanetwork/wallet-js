// package:
// file: operator.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as query_pb from "./query_pb";

export class AddChainClientRequest extends jspb.Message {
  hasChain(): boolean;
  clearChain(): void;
  getChain(): query_pb.Chain | undefined;
  setChain(value?: query_pb.Chain): AddChainClientRequest;
  getRpchost(): string;
  setRpchost(value: string): AddChainClientRequest;
  getWshost(): string;
  setWshost(value: string): AddChainClientRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddChainClientRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AddChainClientRequest
  ): AddChainClientRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: AddChainClientRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): AddChainClientRequest;
  static deserializeBinaryFromReader(
    message: AddChainClientRequest,
    reader: jspb.BinaryReader
  ): AddChainClientRequest;
}

export namespace AddChainClientRequest {
  export type AsObject = {
    chain?: query_pb.Chain.AsObject;
    rpchost: string;
    wshost: string;
  };
}

export class AddChainClientResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddChainClientResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AddChainClientResponse
  ): AddChainClientResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: AddChainClientResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): AddChainClientResponse;
  static deserializeBinaryFromReader(
    message: AddChainClientResponse,
    reader: jspb.BinaryReader
  ): AddChainClientResponse;
}

export namespace AddChainClientResponse {
  export type AsObject = {};
}
