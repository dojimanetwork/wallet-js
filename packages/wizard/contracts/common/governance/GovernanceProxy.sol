pragma solidity ^0.8.19;

import {Proxy} from "../misc/Proxy.sol";

contract GovernanceProxy is Proxy {
    constructor(address _proxyTo) Proxy(_proxyTo) {}
}
