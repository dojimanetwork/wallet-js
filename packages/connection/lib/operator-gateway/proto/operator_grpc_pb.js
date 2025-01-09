// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("@grpc/grpc-js");
var operator_pb = require("./operator_pb.js");
var query_pb = require("./query_pb.js");

function serialize_AddChainClientRequest(arg) {
  if (!(arg instanceof operator_pb.AddChainClientRequest)) {
    throw new Error("Expected argument of type AddChainClientRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddChainClientRequest(buffer_arg) {
  return operator_pb.AddChainClientRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_AddChainClientResponse(arg) {
  if (!(arg instanceof operator_pb.AddChainClientResponse)) {
    throw new Error("Expected argument of type AddChainClientResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddChainClientResponse(buffer_arg) {
  return operator_pb.AddChainClientResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_TestRequest(arg) {
  if (!(arg instanceof query_pb.TestRequest)) {
    throw new Error("Expected argument of type TestRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TestRequest(buffer_arg) {
  return query_pb.TestRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TestResponse(arg) {
  if (!(arg instanceof query_pb.TestResponse)) {
    throw new Error("Expected argument of type TestResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TestResponse(buffer_arg) {
  return query_pb.TestResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

var OperatorTxnsService = (exports.OperatorTxnsService = {
  addChainClient: {
    path: "/OperatorTxns/AddChainClient",
    requestStream: false,
    responseStream: false,
    requestType: operator_pb.AddChainClientRequest,
    responseType: operator_pb.AddChainClientResponse,
    requestSerialize: serialize_AddChainClientRequest,
    requestDeserialize: deserialize_AddChainClientRequest,
    responseSerialize: serialize_AddChainClientResponse,
    responseDeserialize: deserialize_AddChainClientResponse,
  },
  test1: {
    path: "/OperatorTxns/Test1",
    requestStream: false,
    responseStream: false,
    requestType: query_pb.TestRequest,
    responseType: query_pb.TestResponse,
    requestSerialize: serialize_TestRequest,
    requestDeserialize: deserialize_TestRequest,
    responseSerialize: serialize_TestResponse,
    responseDeserialize: deserialize_TestResponse,
  },
});

exports.OperatorTxnsClient =
  grpc.makeGenericClientConstructor(OperatorTxnsService);
