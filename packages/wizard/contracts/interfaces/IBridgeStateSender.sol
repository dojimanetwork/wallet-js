// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface IBridgeStateSender {
    function sendMessageToBridgeChild(address _receiver, bytes calldata _data) external;
}
