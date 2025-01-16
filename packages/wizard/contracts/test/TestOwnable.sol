// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import { Ownable } from '../Ownable.sol';

contract TestOwnable is Ownable {
    function testIsOwner() public view returns (bool) {
        return isOwner();
    }

    function testOnlyOwner() public view onlyOwner returns (bool) {
        return true;
    }
}
