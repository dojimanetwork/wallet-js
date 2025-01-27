// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {DepositManagerStorage} from "./DepositManagerStorage.sol";
import {Proxy} from "../common/misc/Proxy.sol";
import {Registry} from "../common/Registry.sol";
import {GovernanceLockable} from "../common/mixin/GovernanceLockable.sol";

contract DepositManagerProxy is Proxy, DepositManagerStorage {
    constructor(
        address _proxyTo,
        address _registry,
        address _governance
    ) public Proxy(_proxyTo) GovernanceLockable(_governance) {
        registry = Registry(_registry);
    }
}
