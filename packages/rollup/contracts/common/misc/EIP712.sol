// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ChainIdMixin } from '../mixin/ChainIdMixin.sol';

contract LibEIP712Domain is ChainIdMixin {
    string internal constant _EIP712_DOMAIN_SCHEMA =
        'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)';
    bytes32 public constant EIP712_DOMAIN_SCHEMA_HASH = keccak256(abi.encodePacked(_EIP712_DOMAIN_SCHEMA));

    string internal constant _EIP712_DOMAIN_NAME = 'Dojima Network';
    string internal constant _EIP712_DOMAIN_VERSION = '1.0.0';
    uint256 internal constant _EIP712_DOMAIN_CHAINID = CHAINID;

    bytes32 public eip712DomainHash;

    constructor() {
        eip712DomainHash = keccak256(
            abi.encode(
                EIP712_DOMAIN_SCHEMA_HASH,
                keccak256(bytes(_EIP712_DOMAIN_NAME)),
                keccak256(bytes(_EIP712_DOMAIN_VERSION)),
                _EIP712_DOMAIN_CHAINID,
                address(this)
            )
        );
    }

    function _hashEIP712Message(bytes32 hashStruct) internal view returns (bytes32 result) {
        return _hashEIP712Message(hashStruct, eip712DomainHash);
    }

    function _hashEIP712MessageWithAddress(bytes32 hashStruct, address addr) internal pure returns (bytes32 result) {
        bytes32 domainHash = keccak256(
            abi.encode(
                EIP712_DOMAIN_SCHEMA_HASH,
                keccak256(bytes(_EIP712_DOMAIN_NAME)),
                keccak256(bytes(_EIP712_DOMAIN_VERSION)),
                _EIP712_DOMAIN_CHAINID,
                addr
            )
        );
        return _hashEIP712Message(hashStruct, domainHash);
    }

    function _hashEIP712Message(bytes32 hashStruct, bytes32 domainHash) internal pure returns (bytes32 result) {
        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Load free memory pointer
            let memPtr := mload(64)

            mstore(memPtr, 0x1901000000000000000000000000000000000000000000000000000000000000) // EIP191 header
            mstore(add(memPtr, 2), domainHash) // EIP712 domain hash
            mstore(add(memPtr, 34), hashStruct) // Hash of struct

            // Compute hash
            result := keccak256(memPtr, 66)
        }
    }
}
