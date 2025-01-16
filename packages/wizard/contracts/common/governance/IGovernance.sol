pragma solidity ^0.8.19;

interface IGovernance {
    function update(address target, bytes calldata data) external;
}
