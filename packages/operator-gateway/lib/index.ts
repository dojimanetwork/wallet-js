import { OperatorGatewayClient } from "./client";

export default class OperatorInit {
  client: OperatorGatewayClient;
  constructor(serverUrl: string, chainId?: string, prefix?: string) {
    this.client = new OperatorGatewayClient({
      server: serverUrl,
      chainId,
      prefix,
    });
  }
}
