pragma solidity ^0.8.19;

contract TestSystem {
  address public dummySystem;

  function setSystemAddress(address _system) public {
    dummySystem = _system;
  }

  modifier onlySystem() virtual {
    require(msg.sender == dummySystem, "Not System Addess!");
    _;
  }
}
