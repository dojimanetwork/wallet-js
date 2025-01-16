// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "../tunnel/BaseChildTunnel.sol";
import "../tokens/IBridgeERC20.sol";
import "../lib/Create2.sol";
/**
 * @title ERC20ChildTunnel
 */
contract ERC20ChildTunnel is BaseChildTunnel, Create2 {
    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    string public constant SUFFIX_NAME = "ERC20";
    string public constant PREFIX_SYMBOL = "bridge";

    // event for token mapping
    event TokenMapped(address indexed parentToken, address indexed childToken);
    // root to child token
    mapping(address => address) public parentToChildToken;
    // token template
    address public immutable tokenTemplate;

    constructor (address _bridgeChild , address _tokenTemplate) BaseChildTunnel(_bridgeChild) {
        tokenTemplate = _tokenTemplate;
        require(_isContract(_tokenTemplate), "BridgeERC20ChildTunnel: Token template is not contract");
    }


    function withdraw(address childToken, uint256 amount) public {
        _withdraw(childToken, msg.sender, amount);
    }

    function withdrawTo(address childToken, address receiver, uint256 amount) public {
        _withdraw(childToken, receiver, amount);
    }

    //
    // Internal methods
    //

    function _processMessageFromParent(
        uint256 /* stateId */,
        address sender,
        bytes memory data
    ) internal override validateSender(sender) {
        // decode incoming data
        (bytes32 payloadType, bytes memory payload) = abi.decode(data, (bytes32, bytes));

        if (payloadType == DEPOSIT) {
            _payloadDeposit(payload);
        } else if (payloadType == MAP_TOKEN) {
            _mapToken(payload);
        } else {
            revert("BridgeERC20ChildTunnel: INVALID_PAYLOAD_TYPE");
        }

    }

    function _mapToken(bytes memory payload) internal returns (address) {
        (address parentToken, string memory name, string memory symbol, uint8 decimals) = abi.decode(
            payload,
            (address, string, string, uint8)
        );

        // get root to child token
        address childToken = parentToChildToken[parentToken];
        // check if it's already mapped
        require(childToken == address(0x0), "BridgeERC20ChildTunnel: ALREADY_MAPPED");

        // deploy new child token
        bytes32 salt = keccak256(abi.encodePacked(parentToken));

        childToken = createClone(salt, tokenTemplate);
        // slither-disable-next-line reentrancy-no-eth

        IBridgeERC20(childToken).initialize(
            address(this),
            parentToken,
            string(abi.encodePacked(name, SUFFIX_NAME)),
            string(abi.encodePacked(PREFIX_SYMBOL, symbol)),
            decimals
        );

        // map the token
        parentToChildToken[parentToken] = childToken;
        emit TokenMapped(parentToken, childToken);

        // return new child token
        return childToken;
    }

    function _payloadDeposit(bytes memory payload) internal {
        (address parentToken, address depositor, address to, uint256 amount, bytes memory depositData) = abi.decode(
            payload,
            (address, address, address, uint256, bytes)
        );

        address childToken = parentToChildToken[parentToken];

        // deposit tokens
        IBridgeERC20 childTokenContract = IBridgeERC20(childToken);
        childTokenContract.mint(to, amount);

        // call onTokenTransfer() on `to` with limit and ignore error
        if (_isContract(to)) {
            uint256 txGas = 2000000;
            bool success = false;
            bytes memory data = abi.encodeWithSignature(
                "onTokenTransfer(address,address,address,address,uint256,bytes)",
                parentToken,
                childToken,
                depositor,
                to,
                amount,
                depositData
            );

            // solium-disable-next-line security/no-inline-assembly
            assembly {
                success := call(txGas, to, 0, add(data, 0x20), mload(data), 0, 0)
            }
        }
    }

    function _withdraw(address childToken, address receiver, uint256 amount) internal {
        IBridgeERC20 childTokenContract = IBridgeERC20(childToken);
        // child token contract will have parent token
        address parentToken = childTokenContract.connectedToken();

        // validate root and child token mapping
        require(
            childToken != address(0x0) && parentToken != address(0x0) && childToken == parentToChildToken[parentToken],
            "BridgeERC20ChildTunnel: NO_MAPPED_TOKEN"
        );

        // withdraw tokens
        childTokenContract.burn(msg.sender, amount);

        // send message to root regarding token burn
        _sendMessageToRoot(abi.encode(parentToken, childToken, receiver, amount));
    }

    // check if address is contract
    function _isContract(address _addr) private view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }
}