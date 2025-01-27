// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// IStateReceiver represents interface to receive state on dojima chain from source chain
interface IStateReceiver {
    function onStateReceive(uint256 id, bytes calldata data) external;
}

// IOutboundStateReceiver represents interface to execute state on destination chain sent from dojima chain
interface IStateExecutor {
    function executeState(uint256 id, bytes calldata data) external returns (bool);
}