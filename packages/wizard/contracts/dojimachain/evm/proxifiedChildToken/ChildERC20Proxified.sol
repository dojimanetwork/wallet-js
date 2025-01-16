// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

import {Initializable} from "../../../common/mixin/Initializable.sol";
import "../ChildERC20.sol";

contract ChildERC20Proxified is ChildERC20, Initializable {
    constructor() public ChildERC20(address(0x1), address(0x1), "", "", 18) {}

    function initialize(
        address _token,
        string calldata name,
        string calldata symbol
      //  uint8 _decimals //@akhilpune: removed initialization of decimals
    ) external initializer {
        require(_token != address(0x0),'ChildERC20Proxified: invalid token address');
        token = _token;
        _name = name;
        _symbol = symbol;
      //  decimals = _decimals;
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
