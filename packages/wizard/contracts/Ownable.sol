// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import { IOwnable } from './interfaces/IOwnable.sol';

/**
 * @title Ownable contract
 * @author Aryan Tikarya
 * @notice We can add transferOwnership function to transfer the ownership of the smart contract.
 * @dev This contract will be used by other smart contract on dojima chain
 */
abstract contract Ownable is IOwnable {
    address public owner;

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    modifier onlyOwner() {
        if (owner != msg.sender) revert NotOwner();
        _;
    }

    function isOwner() public view override returns (bool) {
        return msg.sender == owner;
    }
}
