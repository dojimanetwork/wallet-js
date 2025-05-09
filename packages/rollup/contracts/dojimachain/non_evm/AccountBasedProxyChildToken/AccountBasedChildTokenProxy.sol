// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UpgradableProxy} from "../../../common/misc/UpgradableProxy.sol";

contract AccountBasedChildTokenProxy is UpgradableProxy {
    constructor(address _proxyTo) UpgradableProxy(_proxyTo) {}
}
