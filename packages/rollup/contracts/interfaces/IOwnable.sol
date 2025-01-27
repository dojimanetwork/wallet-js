// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

/**
 * @title Ownable interface
 * @author Aryan Tikarya
 * @notice Interface for the Ownable contract.
 */
interface IOwnable {
    error NotOwner();
    error InvalidOwner();

    /**
     * @notice Event emitted when the ownership of the contract is transferred.
     * @param previousOwner address of the previous owner.
     * @param newOwner address of the new owner.
     */
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @notice returns the address of the owner of the contract.
     * @return address of the owner.
     */
    function owner() external view returns (address);

    /**
     * @notice Checks if the caller is the owner of the contract.
     * @return true if the caller is the owner else false.
     */
    function isOwner() external view returns (bool);
}
