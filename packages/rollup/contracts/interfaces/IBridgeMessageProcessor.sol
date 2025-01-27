// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

// IBridgeMessageProcessor represents interface to process message
interface IBridgeMessageProcessor {
    function processMessageFromParent(uint256 stateId, address parentMessageSender, bytes calldata data) external;
}