pragma solidity ^0.8.19;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ProxyStorage is Ownable {
    address internal proxyTo;
}
