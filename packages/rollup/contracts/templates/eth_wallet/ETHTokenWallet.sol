// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@dojimanetwork/dojima-contracts/contracts/interfaces/IInboundStateSender.sol';

contract ETHTokenWallet {
    mapping(address => mapping(address => uint256)) private _balances;

    event Deposit(string chain, address indexed owner, address indexed token, uint256 amountOrNFTId, uint256 depositId);
    event Withdrawal(address indexed withdrawer, address indexed tokenAddress, uint256 amount);
    IInboundStateSender internal _stateSender;
    string internal _chainName;
    uint256 public depositIdCounter;
    address internal _childChain;
    struct DepositBlock {
        bytes32 depositHash;
        uint256 createdAt;
    }

    mapping(uint256 => DepositBlock) public deposits;

    constructor(string memory chainName) {
        require(bytes(chainName).length != 0, 'Invalid chain name');
        _chainName = chainName;
    }

    /**
     * @dev update child chain address and state sender address
     */
    function updateChildChainAndStateSender(address childChain, address stateSender) public {
        require(stateSender != address(0), 'Invalid state sender address');
        require(_childChain != childChain, 'Atleast one of stateSender or childChain address should change');
        _childChain = childChain;
        _stateSender = IInboundStateSender(stateSender);
    }

    function _safeDeposit(address _user, address _token, uint256 _amountOrToken) internal {
        depositIdCounter = depositIdCounter + 1;
        _depositBlock(_user, _token, _amountOrToken, depositIdCounter);
    }

    function _depositBlock(address _user, address _token, uint256 _amountOrToken, uint256 _depositId) internal {
        deposits[_depositId] = DepositBlock(
            keccak256(abi.encodePacked(_chainName, _user, _token, _amountOrToken)),
            block.timestamp
        );
        _stateSender.transferPayload(_childChain, abi.encode(_chainName, _user, _token, _amountOrToken, _depositId));
        emit Deposit(_chainName, _user, _token, _amountOrToken, _depositId);
    }

    /*
     * @notice Deposit tokens into the wallet
     * @param tokenAddress The address of the token to deposit
     * @param amount The amount of tokens to deposit
     */
    function deposit(address tokenAddress, uint256 amount) public {
        IERC20 token = IERC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), amount), 'Transfer failed');
        _balances[msg.sender][tokenAddress] += amount;
        _safeDeposit(msg.sender, tokenAddress, amount);
    }

    // implement withdraw function

    function balanceOf(address account, address tokenAddress) public view returns (uint256) {
        return _balances[account][tokenAddress];
    }
}
