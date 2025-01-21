import {
  getCrossChainTokenBalance,
  getWrappedTokenBalance,
} from "./scripts/getBalance";

export { getCrossChainTokenBalance, getWrappedTokenBalance };

export { depositEvmToDojima } from "./scripts/deposit";

export { withdrawDojimaToEvm } from "./scripts/withdraw";

export { getLastStateId } from "./scripts/getLastStateId";

export { getEvmHermesTransactionDetails } from "./scripts/getTransactionDetails";

export {
  transferCrossChainToken,
  transferWrappedToken,
} from "./scripts/transferTokens";
