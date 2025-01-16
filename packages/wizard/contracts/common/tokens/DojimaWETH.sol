pragma solidity ^0.8.19;

import {WETH} from "./WETH.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DojimaWeth is WETH {
    string public _name = "Wrapped Ether";
    string public _symbol = "WETH";
    uint8 public _decimals = 18;

    constructor() ERC20(_name, _symbol) {}

    function deposit() public payable override {
        _mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 wad) public override {
        require(balanceOf(msg.sender) >= wad);
        _burn(msg.sender, wad);
        payable(msg.sender).transfer(wad);
        emit Withdrawal(msg.sender, wad);
    }

    function withdraw(uint256 wad, address user) public override {
        require(balanceOf(msg.sender) >= wad);
        _burn(msg.sender, wad);
        payable(user).transfer(wad);
        emit Withdrawal(user, wad);
    }
}
