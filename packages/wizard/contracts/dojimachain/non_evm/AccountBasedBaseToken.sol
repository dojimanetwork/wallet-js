// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {AccountBasedChildToken} from "./AccountBasedChildToken.sol";

abstract contract AccountBasedBaseToken is AccountBasedChildToken, IERC20 {
    event Deposit(bytes indexed token, address indexed from, uint256 amount, uint256 input1, uint256 output1);

    event Withdraw(bytes indexed token, address indexed from, uint256 amount, uint256 input1, uint256 output1);

    event LogTransfer(
        bytes indexed token,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 fromAddrOldBalance,
        uint256 toAddrOldBalance,
        uint256 fromAddrNewBalance,
        uint256 toAddrNewBalance
    );

    function transferWithSig(
        bytes calldata sig,
        uint256 amount,
        bytes32 data,
        uint256 expiration,
        address to
    ) external returns (address from) {
        require(amount > 0, 'Account Based Base Token: invalid amount');
        require(expiration == 0 || block.number <= expiration, 'Account Based Base Token: Signature is expired');

        bytes32 dataHash = _hashEIP712MessageWithAddress(
            _hashTokenTransferOrder(msg.sender, amount, data, expiration),
            address(this)
        );

        require(disabledHashes[dataHash] == false, 'Account Based Base Token: Sig deactivated');

        disabledHashes[dataHash] = true;

        from = ecrecovery(dataHash, sig);
        _transferFrom(from, address(uint160(to)), amount);
    }

    // function balanceOf(address account) external view virtual returns (uint256);
    function _transfer(address sender, address recipient, uint256 amount) internal virtual;

    /**
     * @param from Address from where tokens are withdrawn.
     * @param to Address to where tokens are sent.
     * @param value Number of tokens to transfer.
     * @return Returns success of function call.
     */
    function _transferFrom(address from, address to, uint256 value) internal returns (bool) {
        uint256 fromBalBeforeTransfer = this.balanceOf(from);
        uint256 toBalBeforeTransfer = this.balanceOf(to);

        _transfer(from, to, value);
        emit LogTransfer(
            token,
            from,
            to,
            value,
            fromBalBeforeTransfer,
            toBalBeforeTransfer,
            this.balanceOf(from),
            this.balanceOf(to)
        );

        return true;
    }
}