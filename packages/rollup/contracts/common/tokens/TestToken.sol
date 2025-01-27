pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    // detailed ERC20
    string public  name_;
    string public  symbol_;
    uint8 public  decimals_ = 18;

    constructor(string memory _name, string memory _symbol) ERC20(name_, symbol_){
        name_ = _name;
        symbol_ = _symbol;

        uint256 value = 10**10 * (10**18);
        _mint(msg.sender, value);
    }
}
