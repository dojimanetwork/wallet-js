// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ChildToken } from './ChildToken.sol';
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

abstract contract BaseERC20 is ChildToken, IERC20 {
    event Deposit(address indexed token, address indexed from, uint256 amount, uint256 oldBalance, uint256 newBalance);

    event Withdraw(address indexed token, address indexed from, uint256 amount, uint256 oldBalance, uint256 newBalance);

    event LogTransfer(
        address indexed token,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 fromAddressOldBalance,
        uint256 toAddressOldBalance,
        uint256 fromAddressNewBalance,
        uint256 toAddressNewBalance
    );

    function transferWithSig(
        bytes calldata sig,
        uint256 amount,
        bytes32 data,
        uint256 expiration,
        address to
    ) external returns (address from) {
        require(amount > 0, 'ERC20: invalid amount');
        require(expiration == 0 || block.number <= expiration, 'Signature is expired');

        bytes32 dataHash = _hashEIP712MessageWithAddress(
            _hashTokenTransferOrder(msg.sender, amount, data, expiration),
            address(this)
        );

        require(disabledHashes[dataHash] == false, 'Sig deactivated');
        disabledHashes[dataHash] = true;

        from = ecrecovery(dataHash, sig);
        _transferFrom(from, address(uint160(to)), amount);
    }

    //function balanceOf(address account) external view virtual returns (uint256);
    function _transfer(address sender, address recipient, uint256 amount) internal virtual;

    /// @param from Address from where tokens are withdrawn.
    /// @param to Address to where tokens are sent.
    /// @param value Number of tokens to transfer.
    /// @return Returns success of function call.
    function _transferFrom(address from, address to, uint256 value) internal returns (bool) {
        uint256 fromBalanceBeforeTransfer = this.balanceOf(from);
        uint256 toBalanceBeforeTransfer = this.balanceOf(to);
        _transfer(from, to, value);
        emit LogTransfer(
            token,
            from,
            to,
            value,
            fromBalanceBeforeTransfer,
            toBalanceBeforeTransfer,
            this.balanceOf(from),
            this.balanceOf(to)
        );
        return true;
    }
}
