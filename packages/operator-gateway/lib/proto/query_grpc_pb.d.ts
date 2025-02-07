// package:
// file: query.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as query_pb from "./query_pb";

interface IChaindataFetcherService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getBlock: IChaindataFetcherService_IGetBlock;
  getTransaction: IChaindataFetcherService_IGetTransaction;
  broadcastSignedTxn: IChaindataFetcherService_IBroadcastSignedTxn;
  callChainRPCMethod: IChaindataFetcherService_ICallChainRPCMethod;
  getSOLData: IChaindataFetcherService_IGetSOLData;
  test: IChaindataFetcherService_ITest;
}

interface IChaindataFetcherService_IGetBlock
  extends grpc.MethodDefinition<query_pb.BlockRequest, query_pb.BlockResponse> {
  path: "/ChaindataFetcher/GetBlock";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<query_pb.BlockRequest>;
  requestDeserialize: grpc.deserialize<query_pb.BlockRequest>;
  responseSerialize: grpc.serialize<query_pb.BlockResponse>;
  responseDeserialize: grpc.deserialize<query_pb.BlockResponse>;
}
interface IChaindataFetcherService_IGetTransaction
  extends grpc.MethodDefinition<
    query_pb.TransactionRequest,
    query_pb.TransactionResponse
  > {
  path: "/ChaindataFetcher/GetTransaction";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<query_pb.TransactionRequest>;
  requestDeserialize: grpc.deserialize<query_pb.TransactionRequest>;
  responseSerialize: grpc.serialize<query_pb.TransactionResponse>;
  responseDeserialize: grpc.deserialize<query_pb.TransactionResponse>;
}
interface IChaindataFetcherService_IBroadcastSignedTxn
  extends grpc.MethodDefinition<
    query_pb.BroadcastRequest,
    query_pb.BroadcastResponse
  > {
  path: "/ChaindataFetcher/BroadcastSignedTxn";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<query_pb.BroadcastRequest>;
  requestDeserialize: grpc.deserialize<query_pb.BroadcastRequest>;
  responseSerialize: grpc.serialize<query_pb.BroadcastResponse>;
  responseDeserialize: grpc.deserialize<query_pb.BroadcastResponse>;
}
interface IChaindataFetcherService_ICallChainRPCMethod
  extends grpc.MethodDefinition<
    query_pb.ChainRPCMethodRequest,
    query_pb.ChainRPCMethodResponse
  > {
  path: "/ChaindataFetcher/CallChainRPCMethod";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<query_pb.ChainRPCMethodRequest>;
  requestDeserialize: grpc.deserialize<query_pb.ChainRPCMethodRequest>;
  responseSerialize: grpc.serialize<query_pb.ChainRPCMethodResponse>;
  responseDeserialize: grpc.deserialize<query_pb.ChainRPCMethodResponse>;
}
interface IChaindataFetcherService_IGetSOLData
  extends grpc.MethodDefinition<
    query_pb.SOLDataRequest,
    query_pb.TransactionResponse
  > {
  path: "/ChaindataFetcher/GetSOLData";
  requestStream: false;
  responseStream: true;
  requestSerialize: grpc.serialize<query_pb.SOLDataRequest>;
  requestDeserialize: grpc.deserialize<query_pb.SOLDataRequest>;
  responseSerialize: grpc.serialize<query_pb.TransactionResponse>;
  responseDeserialize: grpc.deserialize<query_pb.TransactionResponse>;
}
interface IChaindataFetcherService_ITest
  extends grpc.MethodDefinition<query_pb.TestRequest, query_pb.TestResponse> {
  path: "/ChaindataFetcher/Test";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<query_pb.TestRequest>;
  requestDeserialize: grpc.deserialize<query_pb.TestRequest>;
  responseSerialize: grpc.serialize<query_pb.TestResponse>;
  responseDeserialize: grpc.deserialize<query_pb.TestResponse>;
}

export const ChaindataFetcherService: IChaindataFetcherService;

export interface IChaindataFetcherServer {
  getBlock: grpc.handleUnaryCall<query_pb.BlockRequest, query_pb.BlockResponse>;
  getTransaction: grpc.handleUnaryCall<
    query_pb.TransactionRequest,
    query_pb.TransactionResponse
  >;
  broadcastSignedTxn: grpc.handleUnaryCall<
    query_pb.BroadcastRequest,
    query_pb.BroadcastResponse
  >;
  callChainRPCMethod: grpc.handleUnaryCall<
    query_pb.ChainRPCMethodRequest,
    query_pb.ChainRPCMethodResponse
  >;
  getSOLData: grpc.handleServerStreamingCall<
    query_pb.SOLDataRequest,
    query_pb.TransactionResponse
  >;
  test: grpc.handleUnaryCall<query_pb.TestRequest, query_pb.TestResponse>;
}

export interface IChaindataFetcherClient {
  getBlock(
    request: query_pb.BlockRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BlockResponse
    ) => void
  ): grpc.ClientUnaryCall;
  getBlock(
    request: query_pb.BlockRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BlockResponse
    ) => void
  ): grpc.ClientUnaryCall;
  getBlock(
    request: query_pb.BlockRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BlockResponse
    ) => void
  ): grpc.ClientUnaryCall;
  getTransaction(
    request: query_pb.TransactionRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TransactionResponse
    ) => void
  ): grpc.ClientUnaryCall;
  getTransaction(
    request: query_pb.TransactionRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TransactionResponse
    ) => void
  ): grpc.ClientUnaryCall;
  getTransaction(
    request: query_pb.TransactionRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TransactionResponse
    ) => void
  ): grpc.ClientUnaryCall;
  broadcastSignedTxn(
    request: query_pb.BroadcastRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BroadcastResponse
    ) => void
  ): grpc.ClientUnaryCall;
  broadcastSignedTxn(
    request: query_pb.BroadcastRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BroadcastResponse
    ) => void
  ): grpc.ClientUnaryCall;
  broadcastSignedTxn(
    request: query_pb.BroadcastRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BroadcastResponse
    ) => void
  ): grpc.ClientUnaryCall;
  callChainRPCMethod(
    request: query_pb.ChainRPCMethodRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.ChainRPCMethodResponse
    ) => void
  ): grpc.ClientUnaryCall;
  callChainRPCMethod(
    request: query_pb.ChainRPCMethodRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.ChainRPCMethodResponse
    ) => void
  ): grpc.ClientUnaryCall;
  callChainRPCMethod(
    request: query_pb.ChainRPCMethodRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.ChainRPCMethodResponse
    ) => void
  ): grpc.ClientUnaryCall;
  getSOLData(
    request: query_pb.SOLDataRequest,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<query_pb.TransactionResponse>;
  getSOLData(
    request: query_pb.SOLDataRequest,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<query_pb.TransactionResponse>;
  test(
    request: query_pb.TestRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
  test(
    request: query_pb.TestRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
  test(
    request: query_pb.TestRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
}

export class ChaindataFetcherClient
  extends grpc.Client
  implements IChaindataFetcherClient
{
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: object
  );
  public getBlock(
    request: query_pb.BlockRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BlockResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public getBlock(
    request: query_pb.BlockRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BlockResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public getBlock(
    request: query_pb.BlockRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BlockResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public getTransaction(
    request: query_pb.TransactionRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TransactionResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public getTransaction(
    request: query_pb.TransactionRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TransactionResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public getTransaction(
    request: query_pb.TransactionRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TransactionResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public broadcastSignedTxn(
    request: query_pb.BroadcastRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BroadcastResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public broadcastSignedTxn(
    request: query_pb.BroadcastRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BroadcastResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public broadcastSignedTxn(
    request: query_pb.BroadcastRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.BroadcastResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public callChainRPCMethod(
    request: query_pb.ChainRPCMethodRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.ChainRPCMethodResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public callChainRPCMethod(
    request: query_pb.ChainRPCMethodRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.ChainRPCMethodResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public callChainRPCMethod(
    request: query_pb.ChainRPCMethodRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.ChainRPCMethodResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public getSOLData(
    request: query_pb.SOLDataRequest,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<query_pb.TransactionResponse>;
  public getSOLData(
    request: query_pb.SOLDataRequest,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<query_pb.TransactionResponse>;
  public test(
    request: query_pb.TestRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public test(
    request: query_pb.TestRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public test(
    request: query_pb.TestRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
}
