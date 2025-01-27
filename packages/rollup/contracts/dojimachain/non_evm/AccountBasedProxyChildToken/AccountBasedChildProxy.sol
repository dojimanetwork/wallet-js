// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

import {Initializable} from '../../../common/mixin/Initializable.sol';
import {AccountBasedToken} from '../AccountBasedToken.sol';

contract AccountBasedChildProxy is AccountBasedToken, Initializable {
    constructor() AccountBasedToken(address(0x1), abi.encodePacked('TEST-12A'), '', '', 18) {}

    function initialize(
        bytes calldata _token,
        string calldata name,
        string calldata symbol
    // uint8 _decimals //@akhilpune: removed initialization of decimals
    ) external initializer {
        require(_token.length != 0, 'Account Child Proxy: token length cannot be zero');
        token = _token;
        _name = name;
        _symbol = symbol;
        // _decimals = decimals;
    }

    // Overriding isOwner from Ownable.sol because owner() 
    //and transferOwnership() have been overridden by UpgradableProxy
    function isOwner() public view override returns (bool) {
        address _owner;
        bytes32 position = keccak256("dojima.network.proxy.owner");
        assembly {
            _owner := sload(position)
        }
        return msg.sender == _owner;
    }
}
