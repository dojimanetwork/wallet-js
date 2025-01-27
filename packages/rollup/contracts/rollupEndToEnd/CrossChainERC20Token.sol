// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import { IInboundStateSender } from '../interfaces/IInboundStateSender.sol';

contract CrossChainERC20Token is ERC20, AccessControl, ReentrancyGuard {
    // Define roles using keccak256 hash identifiers
    bytes32 public constant ADMIN_ROLE = keccak256('ADMIN_ROLE');
    bytes32 public constant EXECUTE_STATE_ROLE = keccak256('EXECUTE_STATE_ROLE');

    // Interface for state synchronization
    IInboundStateSender public inboundStateSender;
    address public dojimaWrappedContractAddress; // Fixed address of the wrapped counterpart on Dojima chain

    // Mapping to track user balances specific to cross-chain operations
    mapping(address => uint256) private crossChainBalances;

    // Events
    event Deposit(address indexed user, uint256 amount, uint256 depositId);
    event Withdrawal(address indexed user, uint256 amount, uint256 depositId);
    event StateSenderUpdated(address indexed newStateSender);
    event DojimaWrappedContractUpdated(address indexed newDojimaWrappedContract);

    // Deposit structure
    struct DepositBlock {
        bytes32 depositHash;
        uint256 createdAt;
        uint256 amount;
    }

    mapping(uint256 => DepositBlock) public deposits;
    uint256 public depositIdCounter;

    /**
     * @notice Constructor to initialize the ERC20 token and assign roles.
     * @param name_ The name of the ERC20 token.
     * @param symbol_ The symbol of the ERC20 token.
     * @param stateSender_ Address of the inboundStateSender contract responsible for cross-chain communications.
     */
    constructor(string memory name_, string memory symbol_, address stateSender_) ERC20(name_, symbol_) {
        require(stateSender_ != address(0), 'EthereumERC20: StateSender address cannot be zero');

        // Assign roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(EXECUTE_STATE_ROLE, stateSender_);

        inboundStateSender = IInboundStateSender(stateSender_);
        // Mint initial supply to the deployer
        _mint(msg.sender, 10000000 * (10 ** uint256(decimals())));

        // Set infinite approval for all addresses
        _approve(msg.sender, address(this), type(uint256).max);
    }

    /**
     * @notice Update the inboundStateSender contract address.
     * @param newStateSender The new StateSender contract address.
     */
    function updateStateSender(address newStateSender) external onlyRole(ADMIN_ROLE) {
        require(newStateSender != address(0), 'EthereumERC20: New StateSender address cannot be zero');

        // Grant EXECUTE_STATE_ROLE to the new state sender
        grantRole(EXECUTE_STATE_ROLE, newStateSender);
        // Revoke EXECUTE_STATE_ROLE from the old state sender
        revokeRole(EXECUTE_STATE_ROLE, address(inboundStateSender));

        inboundStateSender = IInboundStateSender(newStateSender);
        emit StateSenderUpdated(newStateSender);
    }

    /**
     * @notice Update the Dojima Wrapped Contract address.
     * @param newDojimaWrappedContract The new Dojima Wrapped Contract address.
     */
    function updateDojimaWrappedContractAddress(address newDojimaWrappedContract) external onlyRole(ADMIN_ROLE) {
        require(
            newDojimaWrappedContract != address(0),
            'EthereumERC20: New DojimaWrappedContract address cannot be zero'
        );
        dojimaWrappedContractAddress = newDojimaWrappedContract;
        emit DojimaWrappedContractUpdated(newDojimaWrappedContract);
    }

    /**
     * @notice Deposit ERC20 tokens to initiate cross-chain transfer to Dojima.
     * @param amount The amount of tokens to deposit.
     */
    function deposit(uint256 amount) external payable nonReentrant {
        require(amount > 0, 'EthereumERC20: Amount must be greater than zero');

        // Transfer tokens from the user to the contract
        require(ERC20(address(this)).transferFrom(msg.sender, address(this), amount), 'EthereumERC20: Transfer failed');

        // Update internal cross-chain balance
        crossChainBalances[msg.sender] += amount;

        // Increment deposit ID
        depositIdCounter += 1;

        // Record the deposit
        deposits[depositIdCounter] = DepositBlock({
            depositHash: keccak256(abi.encodePacked(block.chainid, msg.sender, amount)),
            createdAt: block.timestamp,
            amount: amount
        });

        // Send payload to Dojima chain's wrapped contract
        inboundStateSender.transferPayload(
            dojimaWrappedContractAddress,
            abi.encode(abi.encodePacked(msg.sender), amount, depositIdCounter)
        );

        emit Deposit(msg.sender, amount, depositIdCounter);
    }

    function depositToAddress(uint256 amount, address user) external payable nonReentrant {
        require(amount > 0, 'EthereumERC20: Amount must be greater than zero');

        // Transfer tokens from the user to the contract
        require(ERC20(address(this)).transferFrom(msg.sender, address(this), amount), 'EthereumERC20: Transfer failed');

        // Update internal cross-chain balance
        crossChainBalances[user] += amount;

        // Increment deposit ID
        depositIdCounter += 1;

        // Record the deposit
        deposits[depositIdCounter] = DepositBlock({
            depositHash: keccak256(abi.encodePacked(block.chainid, user, amount)),
            createdAt: block.timestamp,
            amount: amount
        });

        // Send payload to Dojima chain's wrapped contract
        inboundStateSender.transferPayload(
            dojimaWrappedContractAddress,
            abi.encode(abi.encodePacked(user), amount, depositIdCounter)
        );

        emit Deposit(user, amount, depositIdCounter);
    }

    /**
     * @notice Execute state received from Dojima chain to release locked tokens.
     * @param id The deposit ID associated with the withdrawal.
     * @param data The encoded data containing user address, amount, and identifier.
     * @return success A boolean indicating the success of the operation.
     */
    function executeState(
        uint256 id,
        bytes calldata data
    ) external nonReentrant onlyRole(EXECUTE_STATE_ROLE) returns (bool success) {
        (bytes memory userBytes, uint256 amount, uint256 identifier) = abi.decode(data, (bytes, uint256, uint256));

        address userAddress;
        assembly {
            userAddress := mload(add(userBytes, 20))
        }

        require(userAddress != address(0), 'EthereumERC20: Invalid user address');
        require(amount > 0, 'EthereumERC20: Amount must be greater than zero');

        // Check if the contract has enough balance to transfer
        require(balanceOf(address(this)) >= amount, 'EthereumERC20: Insufficient contract balance');

        // Update internal cross-chain balance
        require(crossChainBalances[userAddress] >= amount, 'EthereumERC20: Insufficient cross-chain balance');
        crossChainBalances[userAddress] -= amount;

        // Transfer tokens back to the user
        require(ERC20(address(this)).transfer(userAddress, amount), 'EthereumERC20: Transfer failed');

        emit Withdrawal(userAddress, amount, id);
        return true;
    }

    /**
     * @notice Get the cross-chain balance of an account.
     * @param account The address of the account.
     * @return The cross-chain balance of the account.
     */
    function crossChainBalanceOf(address account) external view returns (uint256) {
        return crossChainBalances[account];
    }

    /**
     * @notice Override ERC20's transfer function to include cross-chain balance updates if necessary.
     * @param recipient The address to transfer to.
     * @param amount The amount to transfer.
     * @return A boolean indicating the success of the transfer.
     */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        return super.transfer(recipient, amount);
    }

    /**
     * @notice Override ERC20's transferFrom function to include cross-chain balance updates if necessary.
     * @param sender The address to transfer tokens from.
     * @param recipient The address to transfer tokens to.
     * @param amount The amount to transfer.
     * @return A boolean indicating the success of the transfer.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }
}
