#!/bin/bash

PROTO_DIR=/Users/tikaryan/go/src/github.com/dojimanetwork/operator-gateway/proto
OUT_DIR=/Users/tikaryan/go/src/github.com/dojimanetwork/wallet-js/packages/connection/lib/operator-gateway/proto

# Generate JavaScript code
yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${OUT_DIR} \
    --grpc_out=${OUT_DIR} \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I ${PROTO_DIR} \
    ${PROTO_DIR}/*.proto

# Generate TypeScript code (d.ts)
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=${OUT_DIR} \
    -I ${PROTO_DIR} \
    ${PROTO_DIR}/*.proto  # Specify the correct path for proto files