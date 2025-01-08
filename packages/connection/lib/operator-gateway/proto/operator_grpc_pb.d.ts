// package:
// file: operator.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as operator_pb from "./operator_pb";
import * as query_pb from "./query_pb";

interface IOperatorTxnsService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  addChainClient: IOperatorTxnsService_IAddChainClient;
  test1: IOperatorTxnsService_ITest1;
}

interface IOperatorTxnsService_IAddChainClient
  extends grpc.MethodDefinition<
    operator_pb.AddChainClientRequest,
    operator_pb.AddChainClientResponse
  > {
  path: "/OperatorTxns/AddChainClient";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<operator_pb.AddChainClientRequest>;
  requestDeserialize: grpc.deserialize<operator_pb.AddChainClientRequest>;
  responseSerialize: grpc.serialize<operator_pb.AddChainClientResponse>;
  responseDeserialize: grpc.deserialize<operator_pb.AddChainClientResponse>;
}
interface IOperatorTxnsService_ITest1
  extends grpc.MethodDefinition<query_pb.TestRequest, query_pb.TestResponse> {
  path: "/OperatorTxns/Test1";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<query_pb.TestRequest>;
  requestDeserialize: grpc.deserialize<query_pb.TestRequest>;
  responseSerialize: grpc.serialize<query_pb.TestResponse>;
  responseDeserialize: grpc.deserialize<query_pb.TestResponse>;
}

export const OperatorTxnsService: IOperatorTxnsService;

export interface IOperatorTxnsServer {
  addChainClient: grpc.handleUnaryCall<
    operator_pb.AddChainClientRequest,
    operator_pb.AddChainClientResponse
  >;
  test1: grpc.handleUnaryCall<query_pb.TestRequest, query_pb.TestResponse>;
}

export interface IOperatorTxnsClient {
  addChainClient(
    request: operator_pb.AddChainClientRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: operator_pb.AddChainClientResponse
    ) => void
  ): grpc.ClientUnaryCall;
  addChainClient(
    request: operator_pb.AddChainClientRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: operator_pb.AddChainClientResponse
    ) => void
  ): grpc.ClientUnaryCall;
  addChainClient(
    request: operator_pb.AddChainClientRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: operator_pb.AddChainClientResponse
    ) => void
  ): grpc.ClientUnaryCall;
  test1(
    request: query_pb.TestRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
  test1(
    request: query_pb.TestRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
  test1(
    request: query_pb.TestRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
}

export class OperatorTxnsClient
  extends grpc.Client
  implements IOperatorTxnsClient
{
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: object
  );
  public addChainClient(
    request: operator_pb.AddChainClientRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: operator_pb.AddChainClientResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public addChainClient(
    request: operator_pb.AddChainClientRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: operator_pb.AddChainClientResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public addChainClient(
    request: operator_pb.AddChainClientRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: operator_pb.AddChainClientResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public test1(
    request: query_pb.TestRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public test1(
    request: query_pb.TestRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
  public test1(
    request: query_pb.TestRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: query_pb.TestResponse
    ) => void
  ): grpc.ClientUnaryCall;
}
