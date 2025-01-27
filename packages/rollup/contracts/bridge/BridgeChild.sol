// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "../interfaces/IStateReceiver.sol";
import "../interfaces/IBridgeMessageProcessor.sol";

contract BridgeChild is IStateReceiver {
    address public bridgeParent;

    event NewBridgeMessage(address parentMessageSender, address receiver, bytes data);

    function setBridgeParent(address _bridgeParent) external {
        require(bridgeParent == address(0x0));
        bridgeParent = _bridgeParent;
    }

    function onStateReceive(uint256 stateId, bytes calldata _data) external override {
        require(msg.sender == address(0x0000000000000000000000000000000000001001), "BridgeChild: Invalid sender");

        (address parentMessageSender, address receiver, bytes memory data) = abi.decode(_data, (address, address, bytes));
        emit NewBridgeMessage(parentMessageSender, receiver, data);
        IBridgeMessageProcessor(receiver).processMessageFromParent(stateId, parentMessageSender, data);
    }
}