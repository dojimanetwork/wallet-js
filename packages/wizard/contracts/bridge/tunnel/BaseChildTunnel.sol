// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "../../interfaces/IBridgeMessageProcessor.sol";

/**
 * @notice Mock child tunnel contract to receive and send message from L2
 */
abstract contract BaseChildTunnel is IBridgeMessageProcessor {
    // MessageTunnel on L1 will get data from this event
    event MessageSent(bytes message);

    // fx child
    address public bridgeChild;

    // bridge parent tunnel
    address public parentTunnel;

    constructor(address _bridgeChild) {
        bridgeChild = _bridgeChild;
    }

    // Sender must be fxRootTunnel in case of ERC20 tunnel
    modifier validateSender(address sender) {
        require(sender == parentTunnel, "BridgeBaseChildTunnel: INVALID_SENDER_FROM_ROOT");
        _;
    }

    function setParentTunnel(address _parentTunnel) external virtual {
        require(parentTunnel == address(0x0), "BridgeBaseChildTunnel: ROOT_TUNNEL_ALREADY_SET");
        parentTunnel = _parentTunnel;
    }

    function processMessageFromParent(uint256 stateId, address parentMessageSender, bytes calldata data) external override {
        require(msg.sender == bridgeChild, "BridgeBaseChildTunnel: INVALID_SENDER");
        _processMessageFromParent(stateId, parentMessageSender, data);
    }

    /**
 * @notice Emit message that can be received on Parent Tunnel
     * @dev Call the internal function when need to emit message
     * @param message bytes message that will be sent to Root Tunnel
     * some message examples -
     *   abi.encode(tokenId);
     *   abi.encode(tokenId, tokenMetadata);
     *   abi.encode(messageType, messageData);
     */
    function _sendMessageToRoot(bytes memory message) internal {
        emit MessageSent(message);
    }

    /**
     * @notice Process message received from Root Tunnel
     * @dev function needs to be implemented to handle message as per requirement
     * This is called by onStateReceive function.
     * Since it is called via a system call, any event will not be emitted during its execution.
     * @param stateId unique state id
     * @param sender root message sender
     * @param message bytes message that was sent from Root Tunnel
     */
    function _processMessageFromParent(uint256 stateId, address sender, bytes memory message) internal virtual;
}