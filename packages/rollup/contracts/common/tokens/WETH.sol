pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract WETH is ERC20 {
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);

    function deposit() public payable virtual;

    function withdraw(uint256 wad) public virtual;

    function withdraw(uint256 wad, address user) public virtual;
}
