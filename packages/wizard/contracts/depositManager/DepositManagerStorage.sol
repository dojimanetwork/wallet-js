// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Registry} from "../common/Registry.sol";
import {ProxyStorage} from "../common/misc/ProxyStorage.sol";
import {GovernanceLockable} from "../common/mixin/GovernanceLockable.sol";
import {IInboundStateSender} from "../interfaces/IInboundStateSender.sol";


contract DepositManagerHeader {
    event NewDepositBlock(string chain ,address indexed owner, address indexed token, uint256 amountOrNFTId, uint256 depositId);
    event MaxErc20DepositUpdate(uint256 indexed oldLimit, uint256 indexed newLimit);

    struct DepositBlock {
        bytes32 depositHash;
        uint256 createdAt;
    }
}


abstract contract DepositManagerStorage is ProxyStorage, GovernanceLockable, DepositManagerHeader {
    Registry public registry;
    IInboundStateSender public stateSender;
    uint256 public  depositIdCounter;
    mapping(uint256 => DepositBlock) public deposits;

    address public childChain;
    uint256 public maxErc20Deposit = 100 * (10**18);
}
