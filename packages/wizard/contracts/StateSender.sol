// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import './interfaces/IInboundStateSender.sol';
import {IStateExecutor} from './interfaces/IStateReceiver.sol';

/**
 * @title StateSender contract
 * @notice Contract that will be used by other smart contract developers on dojima chain
 * to send the state to the hermes chain. The state sender smart contract will emit
 * events that will be used by the hermes chain to receive the state from the dojima chain.
 * @author Aryan Tikarya
 * @dev Need to be careful about the registry mapping.
 * As it is main source of truth for the state sender destination chain.
 */
contract StateSender is IInboundStateSender,Initializable, UUPSUpgradeable, OwnableUpgradeable,AccessControlUpgradeable {
    bytes32 public constant DOJIMA_CHAIN = 'DOJIMA';

    /**
     * @notice Whitelist chains that can receive the state from the dojima chain.
     * @dev Key is the chain name and value is the boolean.
     */
    mapping(bytes32 => bool) public whitelistChains;

    /**
     * @notice Registry of all the smart contracts that are using the state sender smart contract.
     * @dev Key is the address of the receiver contract and value is the address of the root contract.
     * @dev Before sending the state to the hermes chain,
     * the receiver contract address should be registered with the state sender smart contract.
     */
    mapping(address => address) public registry;

    /**
     * @notice counter for dojima chain events
     * @dev counter should only be incremented for dojima chain events
     */
    uint256 public dojimaChainEventCounter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // initialize the contract state
    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        __AccessControl_init();

        whitelistChains[DOJIMA_CHAIN] = true;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function isOwner() public view returns (bool) {
        return owner() == msg.sender;
    }

    // Events
    event NewRegistration(address indexed user, address indexed sender, address indexed receiver);

    event RegistrationUpdated(address indexed user, address indexed sender, address indexed receiver);

    /**
     * @notice Modifier to check if the receiver is registered with the state sender smart contract.
     * @param receiver The address of the receiver contract.
     */
    modifier onlyRegistered(address receiver) {
        require(registry[receiver] == msg.sender, 'StateSender: receiver address not registered');
        _;
    }

    /**
     * @notice Modifier to check if the payload is valid.
     * @dev Payload cannot be empty.
     * @param payload The payload that will be sent to the hermes chain.
     */
    modifier isPayloadValid(bytes calldata payload) {
        require(payload.length != 0, 'StateSender: payload cannot be empty');
        _;
    }

    /**
     * @notice Modifier to check if the token data is valid.
     * @dev Token symbol cannot be empty and token amount cannot be 0.
     * @param tokenAmount The amount of the token.
     * TODO: Check for the maximum token amount.
     */
    modifier isTokenAmountValid(uint256 tokenAmount) {
        require(tokenAmount != 0, 'StateSender: token amount cannot be 0');
        _;
    }

    /**
     * @notice Modify to check the destination data.
     * @dev Destination chain cannot be empty.
     * @param destinationChain The chain to which the data will be sent.
     */
    modifier isDestinationChainValid(bytes32 destinationChain) {
        require(destinationChain != bytes32(0), 'StateSender: Invalid destinationChain');
        _;
    }

    /**
     * @notice Modifier to check if the chain is whitelisted.
     * @dev Chain should be whitelisted to receive the state from the dojima chain.
     * @param destinationChain The chain to which the data will be sent.
     */
    modifier isChainWhitelisted(bytes32 destinationChain) {
        require(whitelistChains[destinationChain], 'StateSender: Chain not whitelisted');
        _;
    }

    /**
     * @notice Modifier to check if the address is valid.
     * @dev Address cannot be empty.
     * @param addr The address that will be checked.
     */
    modifier isAddressValid(address addr) {
        require(addr != address(0), 'StateSender: address cannot be empty');
        _;
    }

    modifier isMemoValid(string memory memo) {
        bytes memory memoBytes = bytes(memo);
        require(memoBytes.length != 0, 'StateSender: memo cannot be empty');
        require(memoBytes.length <= 256, 'StateSender: memo cannot be more than 256 bytes');
        _;
    }

    /**
     * @notice Register new contract for state sync.
     * @dev Only the owner of the smart contract can register the smart contract.
     * @dev Once the receiver address is registered for the state sender,
     * then the state sender can also update the receiver address.
     * @param sender The address of the sender contract.
     * @param receiver The address of the receiver contract.
     */
    function register(address sender, address receiver) public isAddressValid(receiver) {
        require(isOwner() || registry[receiver] == msg.sender, 'StateSender.register: Not authorized to register');

        registry[receiver] = sender;
        // TODO: Should we allow empty sender address?
        if (registry[receiver] == address(0)) {
            emit NewRegistration(msg.sender, sender, receiver);
        } else {
            emit RegistrationUpdated(msg.sender, sender, receiver);
        }
    }

    /**
     * @notice Update the whitelist chain.
     * @dev Only the owner of the smart contract can update the whitelist chain.
     * @param chainName The name of the chain.
     */
    function updateWhitelistChain(bytes32 chainName) public onlyOwner isDestinationChainValid(chainName) {
        whitelistChains[chainName] = true;
    }

    /**
     * @notice Remove the chain from the whitelist chains.
     * @dev Only the owner of the smart contract can remove the chain from the whitelist.
     * @param chainName The name of the chain.
     */
    function removeWhitelistChain(bytes32 chainName) public onlyOwner isDestinationChainValid(chainName) {
        require(whitelistChains[chainName], 'Chain is not whitelisted');
        whitelistChains[chainName] = false;
    }

    // @inherits IInboundStateSender.sol
    function transferPayload(
        address destinationContract,
        bytes calldata payload
    ) external isPayloadValid(payload) onlyRegistered(destinationContract) {
        // this is a dojima chain event
        dojimaChainEventCounter += 1;
        emit DataTransfer(dojimaChainEventCounter, destinationContract, payload);
    }

    // check if address is contract
    function isContract(address _addr) private view returns (bool){
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }

    function receivePayload(
        uint256 Id,
        address destinationContract,
        bytes calldata payload,
        string memory memo
    )
        external
        isPayloadValid(payload)
        isMemoValid(memo)
//        onlyOwner // TODO: @akhil who should be able to execute the payload?
        payable
    {
        require(isContract(destinationContract), 'StateSender: destination contract is not a contract');
        IStateExecutor destination = IStateExecutor(destinationContract);
        require(destination.executeState(Id, payload), "StateSender: Payload execution failed");

        emit PayloadExecuted(Id , destinationContract, memo);
    }

    /**
     * @inheritdoc IInboundStateSender
     * @dev if destinationChain is dojima chain then update the counter and emit the event with depositID.
     */
    function tokenTransferWithPayload(
        bytes32 destinationChain,
        address destinationContract,
        address asset,
        uint256 tokenAmount,
        bytes calldata payload
    )
        external
        isDestinationChainValid(destinationChain)
        isTokenAmountValid(tokenAmount)
        isChainWhitelisted(destinationChain)
        isPayloadValid(payload) // TODO: Is this modifier needed here or can we send empty payload?
        onlyRegistered(destinationContract)
    {
        if (destinationChain == DOJIMA_CHAIN) {
            dojimaChainEventCounter += 1;
            emit TokenTransfer(
                dojimaChainEventCounter,
                destinationChain,
                destinationContract,
                asset,
                tokenAmount,
                payload
            );
        } else {
            emit TokenTransfer(0, destinationChain, destinationContract, asset, tokenAmount, payload);
        }
    }
}
