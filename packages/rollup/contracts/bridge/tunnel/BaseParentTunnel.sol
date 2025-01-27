// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {IBridgeStateSender} from "../../interfaces/IBridgeStateSender.sol";

abstract contract BaseParentTunnel {
    // child tunnel contract which receives and sends messages
    address public bridgeChildTunnel;
    // state sender contract
    IBridgeStateSender public bridgeParent;

    constructor(address _bridgeStateSender) {
        bridgeParent = IBridgeStateSender(_bridgeStateSender);
    }

    // set setBridgeChildTunnel if not set already
    function setBridgeChildTunnel(address _bridgeChildTunnel) public virtual {
        require(bridgeChildTunnel == address(0x0), "BaseTokenBridgeParentTunnel: child tunnel already set");
        bridgeChildTunnel = _bridgeChildTunnel;
    }

    /**
     * @notice Send bytes message to Bridge Child Tunnel
     * @param message bytes message that will be sent to Child Tunnel
     * some message examples -
     *   abi.encode(tokenId);
     *   abi.encode(tokenId, tokenMetadata);
     *   abi.encode(messageType, messageData);
     * @custom:security non-reentrant
     */
    function _sendMessageToChild(bytes memory message) internal {
        bridgeParent.sendMessageToBridgeChild(bridgeChildTunnel, message);
    }

    /**
     * @notice Process message received from Child Tunnel
     * @dev function needs to be implemented to handle message as per requirement
     * This is called by receiveMessage function.
     * Since it is called via a system call, any event will not be emitted during its execution.
     * @param message bytes message that was sent from Child Tunnel
     */
    function _processMessageFromChild(bytes memory message) internal virtual;
}