// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "../interfaces/IBridgeStateSender.sol";
import "../interfaces/IInboundStateSender.sol";

contract BridgeParent is IBridgeStateSender {
    IInboundStateSender public stateSender;
    address public bridgeChild;

    constructor(address _stateSender) {
        stateSender = IInboundStateSender(_stateSender);
    }

    function setChild(address _bridgeChild) public {
        require(bridgeChild == address(0x0));
        bridgeChild = _bridgeChild;
    }

    // @custom:security non-reentrant
    function sendMessageToBridgeChild(address _receiver, bytes calldata _data) public override {
        require(_data.length != 0, 'BridgeParent: payload cannot be empty');
        require(_receiver != address(0x0), 'BridgeParent: invalid receiver address');

        bytes memory data = abi.encode(msg.sender, _receiver, _data);
        stateSender.transferPayload(bridgeChild, data);
    }
}