// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {SafeMath} from '@openzeppelin/contracts/utils/math/SafeMath.sol';
import {Ownable} from '../../common/misc/OwnableV2.sol';

import { LibTokenTransferOrder } from '../../common/misc/LibTokenTransferOrder.sol';

abstract contract AccountBasedChildToken is Ownable, LibTokenTransferOrder {
    // ERC721/ERC20 contract token address on root chain
    bytes public token;
    address public childChain;
    address public parent;

    mapping(bytes32 => bool) public disabledHashes;

    modifier onlyChildChain() {
        require(msg.sender == childChain, 'Child token: caller is not the child chain contract');
        _;
    }

    event LogFeeTransfer(
        bytes indexed token,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 input1,
        uint256 input2,
        uint256 output1,
        uint256 output2
    );

    event ChildChainChanged(address indexed previousAddress, address indexed newAddress);

    event ParentChanged(address indexed previousAddress, address indexed newAddress);

    function deposit(address user, uint256 amountOrTokenId) public virtual;

    function withdraw(uint256 amountOrTokenId) public payable virtual;

    function ecrecovery(bytes32 hash, bytes memory sig) public pure returns (address result) {
        bytes32 r;
        bytes32 s;
        uint8 v;
        if (sig.length != 65) {
            return address(0x0);
        }

        // solhint-disable-next-line no-inline-assembly
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := and(mload(add(sig, 65)), 255)
        }

        // https://github.com/ethereum/go-ethereum/issues/2053
        if (v < 27) {
            v += 27;
        }

        if (v != 27 && v != 28) {
            return address(0x0);
        }

        // get address out of hash and signature
        result = ecrecover(hash, v, r, s);
        // ecrecover returns zero on error
        require(result != address(0x0), 'Error in ecrecover');
    }

    // change child chain address
    function changeChildChain(address newAddress) public onlyOwner {
        require(newAddress != address(0), 'Account Based Child token: new child address is the zero address');
        emit ChildChainChanged(childChain, newAddress);
        childChain = newAddress;
    }

    // change parent address
    function setParent(address newAddress) public virtual onlyOwner {
        require(newAddress != address(0), 'Account Based Child token: new parent address is the zero address');
        emit ParentChanged(parent, newAddress);
        parent = newAddress;
    }
}