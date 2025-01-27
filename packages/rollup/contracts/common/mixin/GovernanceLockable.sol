pragma solidity ^0.8.19;

import {Governable} from "../governance/Governable.sol";
import {Lockable} from "./Lockable.sol";

contract GovernanceLockable is Lockable, Governable {
    constructor(address governance) Governable(governance) {}

    function lock() public override onlyGovernance {
        super.lock();
    }

    function unlock() public override onlyGovernance {
        super.unlock();
    }
}
