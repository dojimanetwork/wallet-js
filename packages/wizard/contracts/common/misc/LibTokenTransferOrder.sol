// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { LibEIP712Domain } from './EIP712.sol';

contract LibTokenTransferOrder is LibEIP712Domain {
    string internal constant _EIP712_TOKEN_TRANSFER_ORDER_SCHEMA =
        'TokenTransferOrder(address spender,uint256 tokenIdOrAmount,bytes32 data,uint256 expiration)'; // solhint-disable-line
    bytes32 public constant EIP712_TOKEN_TRANSFER_ORDER_SCHEMA_HASH =
        keccak256(abi.encodePacked(_EIP712_TOKEN_TRANSFER_ORDER_SCHEMA));

    struct TokenTransferOrder {
        address spender;
        uint256 tokenIdOrAmount;
        bytes32 data;
        uint256 expiration;
    }

    function getTokenTransferOrderHash(
        address spender,
        uint256 tokenIdOrAmount,
        bytes32 data,
        uint256 expiration
    ) public view returns (bytes32 orderHash) {
        orderHash = _hashEIP712Message(_hashTokenTransferOrder(spender, tokenIdOrAmount, data, expiration));
    }

    function _hashTokenTransferOrder(
        address spender,
        uint256 tokenIdOrAmount,
        bytes32 data,
        uint256 expiration
    ) internal pure returns (bytes32 result) {
        bytes32 schemaHash = EIP712_TOKEN_TRANSFER_ORDER_SCHEMA_HASH;

        // Assembly for more efficiently computing:
        // return keccak256(abi.encode(
        //   schemaHash,
        //   spender,
        //   tokenIdOrAmount,
        //   data,
        //   expiration
        // ));

        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Load free memory pointer
            let memPtr := mload(64)

            mstore(memPtr, schemaHash) // hash of schema
            mstore(add(memPtr, 32), and(spender, 0xffffffffffffffffffffffffffffffffffffffff)) // spender
            mstore(add(memPtr, 64), tokenIdOrAmount) // tokenIdOrAmount
            mstore(add(memPtr, 96), data) // hash of data
            mstore(add(memPtr, 128), expiration) // expiration

            // Compute hash
            result := keccak256(memPtr, 160)
        }
        return result;
    }
}
