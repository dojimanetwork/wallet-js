//// SPDX-License-Identifier: MIT
//pragma solidity ^0.8.19;
//
//import { IERC20Metadata } from '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
//import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
//
//import {IStateReceiver} from '../../interfaces/IStateReceiver.sol';
//import "../../dojimachain/non_evm/beacon/BaseBEP2.sol";
//import '../../interfaces/IParentToken.sol';
//
//contract TestChildBEP2 is BaseBEP2, IERC20Metadata, IStateReceiver {
//    mapping(address => uint256) private _balances;
//
//    mapping(address => mapping(address => uint256)) private _allowances;
//
//    uint256 private _totalSupply;
//
//
//  string public _name;
//  string public _symbol;
//
//  uint8 public immutable _decimals;
//  constructor(
//    address /* ignoring parent owner, use contract owner instead */,
//    bytes memory _token,
//    string memory name,
//    string memory symbol,
//    uint8 decimals
//  ) {
//    require(_token.length != 0);
//    token = _token;
//    _name = name;
//    _symbol = symbol;
//    _decimals = decimals;
//  }
//
//  /**
//     * @dev Returns the name of the token.
//     */
//    function name() public view virtual override returns (string memory) {
//        return _name;
//    }
//
//    /**
//     * @dev Returns the symbol of the token, usually a shorter version of the
//     * name.
//     */
//    function symbol() public view virtual override returns (string memory) {
//        return _symbol;
//    }
//
//    /**
//     * @dev Returns the number of decimals used to get its user representation.
//     * For example, if `decimals` equals `2`, a balance of `505` tokens should
//     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
//     *
//     * Tokens usually opt for a value of 18, imitating the relationship between
//     * Ether and Wei. This is the default value returned by this function, unless
//     * it's overridden.
//     *
//     * NOTE: This information is only used for _display_ purposes: it in
//     * no way affects any of the arithmetic of the contract, including
//     * {IERC20-balanceOf} and {IERC20-transfer}.
//     */
//    function decimals() public view virtual override returns (uint8) {
//        return _decimals;
//    }
//
//    function getToken() public view virtual returns (bytes memory) {
//        return token;
//    }
//
//    /**
//     * @dev See {IERC20-totalSupply}.
//     */
//    function totalSupply() public view virtual override returns (uint256) {
//        return _totalSupply;
//    }
//
//    /**
//     * @dev See {IERC20-balanceOf}.
//     */
//    function balanceOf(address account) public view virtual override returns (uint256) {
//        return _balances[account];
//    }
//
//    /**
//     * @notice Deposit tokens
//     * @param user address for address
//     * @param amount token balance
//     */
//    function deposit(address user, uint256 amount) public override  {  // @akhilpune add onlyChildChain clause
//        // check for amount and user
//        require(amount > 0 && user != address(0x0), 'Child BEP2: invalid user address and deposit amount');
//
//        // input balance
//        uint256 userBalanceBeforeMinting = balanceOf(user);
//
//        // increase balance
//        _mint(user, amount);
//
//        // deposit events
//        emit Deposit(token, user, amount, userBalanceBeforeMinting, balanceOf(user));
//    }
//
//    /**
//     * Withdraw tokens
//     * @param amount tokens
//     */
//    function withdraw(uint256 amount) public payable override {
//        _withdraw(msg.sender, amount);
//    }
//
//    function onStateReceive(uint256 /* id */, bytes calldata data) external {
//        (address user, uint256 burnAmount) = abi.decode(data, (address, uint256));
//        uint256 balance = balanceOf(user);
//        if (balance < burnAmount) {
//            burnAmount = balance;
//        }
//
//        _withdraw(user, burnAmount);
//    }
//
//    function _withdraw(address user, uint256 amount) internal {
//        uint256 balanceBeforeBurn = balanceOf(user);
//        _burn(user, amount);
//        emit Withdraw(token, user, amount, balanceBeforeBurn, balanceOf(user));
//    }
//
//    /**
//     * @dev Function that is called when a user or another contract wants to transfer funds.
//     * @param to Address of token receiver.
//     * @param value Number of tokens to transfer.
//     * @return Returns success of function call.
//     */
//    function transfer(address to, uint256 value) public override returns (bool) {
//        if (parent != address(0x0) && !IParentToken(parent).beforeTransfer(msg.sender, to, value)) {
//            return false;
//        }
//
//        return _transferFrom(msg.sender, to, value);
//    }
//
//    /**
//     * @dev Moves `amount` of tokens from `from` to `to`.
//     *
//     * This internal function is equivalent to {transfer}, and can be used to
//     * e.g. implement automatic token fees, slashing mechanisms, etc.
//     *
//     * Emits a {Transfer} event.
//     *
//     * Requirements:
//     *
//     * - `from` cannot be the zero address.
//     * - `to` cannot be the zero address.
//     * - `from` must have a balance of at least `amount`.
//     */
//    function _transfer(address from, address to, uint256 amount) internal virtual override {
//        require(from != address(0), 'Child BEP2: transfer from the zero address');
//        require(to != address(0), 'Child BEP2: transfer to the zero address');
//
//        uint256 fromBalance = _balances[from];
//        require(fromBalance >= amount, 'Child BEP2: transfer amount exceeds balance');
//        unchecked {
//            _balances[from] = fromBalance - amount;
//            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
//            // decrementing then incrementing.
//            _balances[to] += amount;
//        }
//
//        emit Transfer(from, to, amount);
//    }
//
//    /**
//     * @dev Creates `amount` tokens and assigns them to `account`, increasing
//     * the total supply.
//     *
//     * Emits a {Transfer} event with `from` set to the zero address.
//     *
//     * Requirements:
//     *
//     * - `account` cannot be the zero address.
//     */
//    function _mint(address account, uint256 amount) internal virtual {
//        require(account != address(0), 'Child BEP2: invalid account');
//
//        _totalSupply += amount;
//        unchecked {
//            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
//            _balances[account] += amount;
//        }
//
//        emit Transfer(address(0), account, amount);
//    }
//
//    /**
//     * @dev Destroys `amount` tokens from `account`, reducing the
//     * total supply.
//     *
//     * Emits a {Transfer} event with `to` set to the zero address.
//     *
//     * Requirements:
//     *
//     * - `account` cannot be the zero address.
//     * - `account` must have at least `amount` tokens.
//     */
//    function _burn(address account, uint256 amount) internal virtual {
//        require(account != address(0), 'Child BEP2: invalid address');
//
//        uint256 accountBalance = _balances[account];
//        require(accountBalance >= amount, 'Child BEP2: burn amount exceeds balance');
//        unchecked {
//            _balances[account] = accountBalance - amount;
//            // Overflow not possible: amount <= accountBalance <= totalSupply.
//            _totalSupply -= amount;
//        }
//
//        emit Transfer(account, address(0), amount);
//    }
//
//    function allowance(address, address) public pure override returns (uint256) {
//        revert('Disabled feature');
//    }
//
//    function approve(address, uint256) public pure override returns (bool) {
//        revert('Disabled feature');
//    }
//
//    function transferFrom(address, address, uint256) public pure override returns (bool) {
//        revert('Disabled feature');
//    }
//}
