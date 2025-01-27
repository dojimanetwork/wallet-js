// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {BaseParentTunnel} from "../tunnel/BaseParentTunnel.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Create2} from "../lib/Create2.sol";
import {ERC20} from "../lib/ERC20.sol";
/**
 * @title BridgeParentTunnel contract
 */
contract BridgeParentTunnel is BaseParentTunnel, Create2 {
    using SafeERC20 for IERC20;
    // maybe DEPOSIT and MAP_TOKEN can be reduced to bytes4
    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");

    event BridgeTokenMappedERC20(address indexed parentToken, address indexed childToken);

    event BridgeWithdrawERC20(
        address indexed parentToken,
        address indexed childToken,
        address indexed userAddress,
        uint256 amount
    );

    event BridgeDepositERC20(
        address indexed parentToken,
        address indexed depositor,
        address indexed userAddress,
        uint256 amount
    );

    mapping(address => address) public parentToChildTokens;
    bytes32 public immutable childTokenTemplateCodeHash;

    constructor(
        address _parent,
        address _ERC20Token
    ) BaseParentTunnel(_parent) {
        // compute child token template code hash
        childTokenTemplateCodeHash = keccak256(minimalProxyCreationCode(_ERC20Token));
    }

    /**
    * @notice Map a token to enable its movement via the PoS Portal, callable by everyone
     * @param parentToken address of token on parent chain
     */
    function mapToken(address parentToken) public {
        // check if token is already mapped
        require(parentToChildTokens[parentToken] == address(0x0), "ERC20ParentTunnel: ALREADY_MAPPED");

        // name, symbol and decimals
        ERC20 parentTokenContract = ERC20(parentToken);
        string memory name = parentTokenContract.name();
        string memory symbol = parentTokenContract.symbol();
        uint8 decimals = parentTokenContract.decimals();


        // MAP_TOKEN, encode(parentToken, name, symbol, decimals)
        bytes memory message = abi.encode(MAP_TOKEN, abi.encode(parentToken, name, symbol, decimals));
        // slither-disable-next-line reentrancy-no-eth
        _sendMessageToChild(message);

        // compute child token address before deployment using create2
        bytes32 salt = keccak256(abi.encodePacked(parentToken));
        address childToken = computedCreate2Address(salt, childTokenTemplateCodeHash, bridgeChildTunnel);

        // add into mapped tokens
        parentToChildTokens[parentToken] = childToken;
        emit BridgeTokenMappedERC20(parentToken, childToken);
    }

    function deposit(address parentToken, address user, uint256 amount, bytes memory data) public {
        // map token if not mapped
        if (parentToChildTokens[parentToken] == address(0x0)) {
            mapToken(parentToken);
        }

        // transfer from depositor to this contract
        IERC20(parentToken).safeTransferFrom(
            msg.sender, // depositor
            address(this), // manager contract
            amount
        );

        // DEPOSIT, encode(parentToken, depositor, user, amount, extra data)
        bytes memory message = abi.encode(DEPOSIT, abi.encode(parentToken, msg.sender, user, amount, data));
        _sendMessageToChild(message);
        emit BridgeDepositERC20(parentToken, msg.sender, user, amount);
    }

    // exit processor
    function _processMessageFromChild(bytes memory data) internal override {
        (address parentToken, address childToken, address to, uint256 amount) = abi.decode(
            data,
            (address, address, address, uint256)
        );

        // validate mapping for parent to child
        require(parentToChildTokens[parentToken] == childToken, "ERC20ParentTunnel: INVALID_MAPPING_ON_EXIT");

        // transfer from tokens to
        IERC20(parentToken).safeTransfer(to, amount);
        emit BridgeWithdrawERC20(parentToken, childToken, to, amount);
    }
}