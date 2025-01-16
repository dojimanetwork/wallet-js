pragma solidity ^0.8.19;

import { BaseERC20NoSig } from './evm/BaseERC20NoSig.sol';

/**
 * @title Dojima Token contract
 * @notice This contract is an ECR20 like wrapper over native ether (Dojima Token) transfers on the dojima chain
 * @dev ERC20 methods have been made payable while keeping their method signature same as other childDRC20 on dojima
 */
contract DRC20_OLD is BaseERC20NoSig {
    event Transfer(address indexed from, address indexed to, uint256 value);

    uint256 public currentSupply = 0;
    uint8 private constant _DECIMALS = 18;
    bool private _isInitialized;

    function initialize(
        address _childChain, // solhint-disable-line private-vars-leading-underscore
        address _token // solhint-disable-line private-vars-leading-underscore
    ) public {
        // Todo: once DojimaValidator(@0x1000) contract added uncomment me
        // require(msg.sender == address(0x1000));
        require(!_isInitialized, 'The contract is already initialized');
        _isInitialized = true;
        token = _token;
        _transferOwnership(_childChain);
    }

    function setParent(address) public pure override {
        revert('Disabled feature');
    }

    function deposit(address user, uint256 amount) public override onlyOwner {
        // check for amount and user
        require(amount > 0 && user != address(0x0), 'Insufficient amount or invalid user');

        // input balance
        uint256 input1 = balanceOf(user);

        // transfer amount to user
        // solhint-disable-next-line private-vars-leading-underscore
        address payable _user = payable(address(uint160(user)));

        currentSupply += amount;

        _user.transfer(amount);

        // deposit events
        emit Deposit(token, user, amount, input1, balanceOf(user));
    }

    function withdraw(uint256 amount) public payable override {
        address user = msg.sender;
        // input balance
        uint256 input = balanceOf(user);

        currentSupply -= amount;

        // check for amount
        require(amount > 0 && msg.value == amount, 'Insufficient amount');

        // withdraw event
        emit Withdraw(token, user, amount, input, balanceOf(user));
    }

    function name() public pure returns (string memory) {
        return 'Dojima Token';
    }

    function symbol() public pure returns (string memory) {
        return 'DOJ';
    }

    function decimals() public pure returns (uint8) {
        return _DECIMALS;
    }

    function totalSupply() public pure returns (uint256) {
        return 10000000000 * 10 ** uint256(_DECIMALS);
    }

    function balanceOf(address account) public view override returns (uint256) {
        return account.balance;
    }

    /// @dev Function that is called when a user or another contract wants to transfer funds.
    /// @param to Address of token receiver.
    /// @param value Number of tokens to transfer.
    /// @return Returns success of function call.
    function transfer(address to, uint256 value) public payable returns (bool) {
        if (msg.value != value) {
            return false;
        }
        return _transferFrom(msg.sender, to, value);
    }

    /**
     * @dev _transfer is invoked by _transferFrom method that is inherited from BaseERC20.
     * This enables us to transfer dojimaEth between users while keeping the interface same as that of an ERC20 Token.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal override {
        require(recipient != address(this), 'can not send to DRC20');
        payable(address(uint160(recipient))).transfer(amount);
        emit Transfer(sender, recipient, amount);
    }

    function allowance(address /*owner*/, address /*spender*/) public pure returns (uint256) {
        revert('Disabled feature');
    }

    function approve(address /*spender*/, uint256 /*amount*/) public pure returns (bool) {
        revert('Disabled feature');
    }

    function transferFrom(address /*from*/, address /*to*/, uint256 /*amount*/) public pure returns (bool) {
        revert('Disabled feature');
    }
}
