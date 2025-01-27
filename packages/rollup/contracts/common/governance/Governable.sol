pragma solidity ^0.8.19;

import {IGovernance} from "./IGovernance.sol";

contract Governable {
    IGovernance public governance;

    constructor(address _governance) {
        governance = IGovernance(_governance);
    }

    modifier onlyGovernance() {
        require(
            msg.sender == address(governance),
            "Only governance contract is authorized"
        );
        _;
    }
}
