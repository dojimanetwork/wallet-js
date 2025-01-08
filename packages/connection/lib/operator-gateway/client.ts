import { AddChainClientParam } from "./types";
import { GRPCClientParams } from "lib/hermes/types";
import { OperatorTxnsClient } from "./proto/operator_grpc_pb";

import { credentials, ServiceError } from "grpc";
import {
    AddChainClientRequest,
    AddChainClientResponse,
} from "./proto/operator_pb";
import { Chain } from "./proto/query_pb";

export interface OperatorClient {
    addChainClient(
        params: AddChainClientParam,
        callback: (
            error: ServiceError | null,
            response: AddChainClientResponse
        ) => void
    ): void;
}

export const noop = () => { };

class OperatorGatewayClient implements OperatorClient {
    private client: OperatorTxnsClient;

    constructor({ server }: GRPCClientParams) {
        this.client = new OperatorTxnsClient(server, credentials.createInsecure());
    }

    async addChainClient(
        params: AddChainClientParam,
        callback: (
            error: ServiceError | null,
            response: AddChainClientResponse
        ) => void
    ) {
        const request = new AddChainClientRequest();
        const chain = new Chain();

        // Set chain properties
        chain.setTicker(params.chain.ticker);
        chain.setName(params.chain.name);
        chain.setId(params.chain.chainId);

        // Set the chain in the request
        request.setChain(chain);

        // Set RPC and WS hosts
        request.setRpchost(params.rpcUrl);
        request.setWshost(params.wsUrl);

        // Use the callback to handle the response
        this.client.addChainClient(request, (error, response) => {
            if (error) {
                console.error("Error adding chain client:", error);
                callback(error, null);
            } else {
                callback(null, response);
            }
        });
    }
}

export { OperatorGatewayClient };