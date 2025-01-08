// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("grpc");
var query_pb = require("./query_pb.js");

function serialize_BlockRequest(arg) {
  if (!(arg instanceof query_pb.BlockRequest)) {
    throw new Error("Expected argument of type BlockRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BlockRequest(buffer_arg) {
  return query_pb.BlockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BlockResponse(arg) {
  if (!(arg instanceof query_pb.BlockResponse)) {
    throw new Error("Expected argument of type BlockResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BlockResponse(buffer_arg) {
  return query_pb.BlockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BroadcastRequest(arg) {
  if (!(arg instanceof query_pb.BroadcastRequest)) {
    throw new Error("Expected argument of type BroadcastRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BroadcastRequest(buffer_arg) {
  return query_pb.BroadcastRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_BroadcastResponse(arg) {
  if (!(arg instanceof query_pb.BroadcastResponse)) {
    throw new Error("Expected argument of type BroadcastResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BroadcastResponse(buffer_arg) {
  return query_pb.BroadcastResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_ChainRPCMethodRequest(arg) {
  if (!(arg instanceof query_pb.ChainRPCMethodRequest)) {
    throw new Error("Expected argument of type ChainRPCMethodRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ChainRPCMethodRequest(buffer_arg) {
  return query_pb.ChainRPCMethodRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_ChainRPCMethodResponse(arg) {
  if (!(arg instanceof query_pb.ChainRPCMethodResponse)) {
    throw new Error("Expected argument of type ChainRPCMethodResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ChainRPCMethodResponse(buffer_arg) {
  return query_pb.ChainRPCMethodResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_SOLDataRequest(arg) {
  if (!(arg instanceof query_pb.SOLDataRequest)) {
    throw new Error("Expected argument of type SOLDataRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SOLDataRequest(buffer_arg) {
  return query_pb.SOLDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_TransactionRequest(arg) {
  if (!(arg instanceof query_pb.TransactionRequest)) {
    throw new Error("Expected argument of type TransactionRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TransactionRequest(buffer_arg) {
  return query_pb.TransactionRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_TransactionResponse(arg) {
  if (!(arg instanceof query_pb.TransactionResponse)) {
    throw new Error("Expected argument of type TransactionResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TransactionResponse(buffer_arg) {
  return query_pb.TransactionResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

var ChaindataFetcherService = (exports.ChaindataFetcherService = {
  getBlock: {
    path: "/ChaindataFetcher/GetBlock",
    requestStream: false,
    responseStream: false,
    requestType: query_pb.BlockRequest,
    responseType: query_pb.BlockResponse,
    requestSerialize: serialize_BlockRequest,
    requestDeserialize: deserialize_BlockRequest,
    responseSerialize: serialize_BlockResponse,
    responseDeserialize: deserialize_BlockResponse,
  },
  getTransaction: {
    path: "/ChaindataFetcher/GetTransaction",
    requestStream: false,
    responseStream: false,
    requestType: query_pb.TransactionRequest,
    responseType: query_pb.TransactionResponse,
    requestSerialize: serialize_TransactionRequest,
    requestDeserialize: deserialize_TransactionRequest,
    responseSerialize: serialize_TransactionResponse,
    responseDeserialize: deserialize_TransactionResponse,
  },
  broadcastSignedTxn: {
    path: "/ChaindataFetcher/BroadcastSignedTxn",
    requestStream: false,
    responseStream: false,
    requestType: query_pb.BroadcastRequest,
    responseType: query_pb.BroadcastResponse,
    requestSerialize: serialize_BroadcastRequest,
    requestDeserialize: deserialize_BroadcastRequest,
    responseSerialize: serialize_BroadcastResponse,
    responseDeserialize: deserialize_BroadcastResponse,
  },
  callChainRPCMethod: {
    path: "/ChaindataFetcher/CallChainRPCMethod",
    requestStream: false,
    responseStream: false,
    requestType: query_pb.ChainRPCMethodRequest,
    responseType: query_pb.ChainRPCMethodResponse,
    requestSerialize: serialize_ChainRPCMethodRequest,
    requestDeserialize: deserialize_ChainRPCMethodRequest,
    responseSerialize: serialize_ChainRPCMethodResponse,
    responseDeserialize: deserialize_ChainRPCMethodResponse,
  },
  // Streaming API for Solana data
  getSOLData: {
    path: "/ChaindataFetcher/GetSOLData",
    requestStream: false,
    responseStream: true,
    requestType: query_pb.SOLDataRequest,
    responseType: query_pb.TransactionResponse,
    requestSerialize: serialize_SOLDataRequest,
    requestDeserialize: deserialize_SOLDataRequest,
    responseSerialize: serialize_TransactionResponse,
    responseDeserialize: deserialize_TransactionResponse,
  },
  test: {
    path: "/ChaindataFetcher/Test",
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

exports.ChaindataFetcherClient = grpc.makeGenericClientConstructor(
  ChaindataFetcherService
);
