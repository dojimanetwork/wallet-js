// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { IOutboundStateSender } from '../interfaces/IOutboundStateSender.sol';
import '@openzeppelin/contracts/proxy/utils/Initializable.sol';
import { Ownable } from '../common/misc/OwnableV2.sol';

/**
 * @title OutboundStateSender contract
 * @notice Contract that will be used by other smart contract developers on dojima chain
 * to send the state to the hermes chain. The state sender smart contract will emit
 * events that will be used by the hermes chain to receive the state from the dojima chain.
 * @author Aryan Tikarya, Akhil Reddy
 * @dev Need to be careful about the registry mapping.
 * As it is main source of truth for the state sender destination chain.
 */
contract TestOutboundStateSender is Initializable, IOutboundStateSender, Ownable {
    uint256 public withdrawId = 0;

    /**
     * @notice Whitelist chains that can receive the state from the dojima chain.
     * @dev Key is the chain name and value is the boolean.
     */
    mapping(bytes32 => bool) public whitelistChains;

    /**
     * @notice Assets Registry stores the asset mapping
     * @dev Key is the asset name and value is the boolean.
     */
    mapping(bytes => bool) public assetRegistry;

    /**
     * @notice Registry of all the addresses which will be used by the state sender to send payload. It's a map of map,
     * where first key is the chain name bytes32 then the second key is the address of the receiver contract.
     */
    mapping(bytes32 => mapping(bytes => bytes)) public registry;

    /**
     * @notice poolRegistry of all the assets for which will be used by the state sender to send assets to account based systems. It's a map of map,
     * where first key is the chain name bytes32 then the second key is the unique representation of the asset
     */
    mapping(bytes32 => mapping(bytes => address)) public poolRegistry;

    // TODO: @akhil or @tikaryan whitelist chains based on payload or asset transfer and write different functions for both

    /**
     * @notice outboundEventCounter of the all chains that are using the outbound state sender smart contract.
     * @dev  Key is the chain name and value is the counter for outbound chain events
     * @dev counter should only be incremented for that particular outbound chain
     */
    mapping(bytes32 => uint256) public outboundEventCounter;

    /**
     * @notice outboundAssetCounter of the all chains that are using the outbound state sender smart contract.
     * @dev  Key is the chain name and value is the counter for outbound chain events
     * @dev counter should only be incremented for that particular outbound chain
     */
    mapping(bytes32 => uint256) public outboundAssetCounter;

    mapping(uint256 => bool) public authorizedRollups;

    uint256 internal constant _NOT_ENTERED = 1;
    uint256 internal constant _ENTERED = 2;

    /**
     * @notice _status reentrancy guard variable.
     */
    uint256 private _statusPayload;

    /**
     * @notice current vault address that collects gas tokens
     */
    address payable public vault;

    /**
     * @notice Update Vault Address
     * @dev This is the funtion to update vault address
     * @param newVault The address of the new vault
     */
    function updateVault(address payable newVault) public {
        vault = newVault;
    }

    /**
     * @notice _status reentrancy guard variable.
     */
    uint256 private _statusAsset;

    function initialize() external initializer {
        _transferOwnership(msg.sender);
    }

    // Events
    event NewRegistration(bytes32 chain, bytes caller, bytes sender, bytes receiver);
    event NewPoolRegistration(bytes32 chain, address caller, bytes pool, address poolContract);

    event RegistrationUpdated(bytes32 chain, bytes caller, bytes sender, bytes receiver);
    event PoolRegistrationUpdated(bytes32 chain, address caller, bytes pool, address poolContract);

    /**
     * @notice Modifier to check if the receiver is registered with the state sender smart contract.
     * @param receiver The address of the receiver contract.
     */
    modifier onlyRegistered(bytes32 chain, bytes memory receiver) {
        bytes memory senderAddress = registry[chain][receiver];
        require(
            keccak256(senderAddress) == keccak256(abi.encodePacked(msg.sender)),
            'OutboundStateSender: receiver address not registered'
        );
        _;
    }

    /**
     * @notice Modifier to check if there exists a pool for the cuurent asset
     * @param destinationAsset The destinationAsset that will be sent to the hermes chain.
     */
    modifier isPoolRegistered(bytes32 chain, bytes memory destinationAsset) {
        address poolAddress = poolRegistry[chain][destinationAsset];
        require(poolAddress == msg.sender, 'OutboundStateSender: Transaction not done from valid asset contract');
        _;
    }

    /**
     * @notice Modifier to check if the payload is valid.
     * @dev Payload cannot be empty.
     * @param payload The payload that will be sent to the hermes chain.
     */
    modifier isPayloadValid(bytes calldata payload) {
        require(payload.length != 0, 'OutboundStateSender: payload cannot be empty');
        _;
    }

    /**
     * @notice Modifier to check if the destinationAsset is valid.
     * @dev destinationAsset should be unique and cannot be empty
     * @param destinationAsset The destinationAsset that will be sent to the hermes chain.
     */
    modifier isAssetRegistered(bytes memory destinationAsset) {
        require(assetRegistry[destinationAsset], 'OutboundStateSender: Asset is not registered');
        _;
    }

    /**
     * @notice Modifier to check if the destinationAddress is valid.
     * @dev destinationAddress should be unique and cannot be empty
     * @param destinationAddress The destinationAddress on the destination chain.
     */
    modifier isDestinationAddressValid(bytes memory destinationAddress) {
        require(destinationAddress.length != 0, 'OutboundStateSender: destinationAddress cannot be empty');
        _;
    }

    /**
     * @notice Modifier to check if the token data is valid.
     * @dev gas amount cannot be 0.
     * @param amount The amount of the gas.
     * TODO: Check for the maximum token amount.
     */
    modifier isGasAmountValid(uint256 amount) {
        require(amount != 0, 'OutboundStateSender: gas amount cannot be 0');
        _;
    }

    /**
     * @notice Modify to check the destination data.
     * @dev Destination chain cannot be empty.
     * @param destinationChain The chain to which the data will be sent.
     */
    modifier isDestinationChainValid(bytes32 destinationChain) {
        require(destinationChain != bytes32(0), 'OutboundStateSender: Invalid destinationChain');
        _;
    }

    /**
     * @notice Modifier to check if the chain is whitelisted.
     * @dev Chain should be whitelisted to receive the state from the dojima chain.
     * @param chain name of the chain that is registered.
     */
    modifier isChainWhitelisted(bytes32 chain) {
        require(whitelistChains[chain], 'OutboundStateSender: Chain not whitelisted');
        _;
    }

    /**
     * @notice Modifier to check if the address is valid.
     * @dev Address cannot be empty.
     * @param addr The address that will be checked.
     */
    modifier isAddressValid(bytes memory addr) {
        // TODO: discuss this with @akhilpune
        require(addr.length != 0, 'OutboundStateSender: address cannot be empty');
        _;
    }

    /**
     * @notice Modifier to check if the refund address is valid.
     * @dev Address cannot be empty.
     * @param addr The address that will be checked.
     */
    modifier isRefundAddressValid(address addr) {
        require(addr != address(0), 'OutboundStateSender: refundAddress in not valid');
        _;
    }

    /**
     * @notice Modifier to check if the contract is not reentrant.
     */
    modifier nonReentrantPayload() {
        require(_statusPayload != _ENTERED, 'ReentrancyGuard: reentrant call');
        _statusPayload = _ENTERED;
        _;
        _statusPayload = _NOT_ENTERED;
    }

    /**
     * @notice Modifier to check if the contract is not reentrant.
     */
    modifier nonReentrantAsset() {
        require(_statusAsset != _ENTERED, 'ReentrancyGuard: reentrant call');
        _statusAsset = _ENTERED;
        _;
        _statusAsset = _NOT_ENTERED;
    }

    /**
     * @notice Register new contract for state sync.
     * @dev Only the owner of the smart contract can register the smart contract.
     * @dev chain name should be all uppercase. i.e (DOJIMA, ETHEREUM, BINANCE, POLYGON, etc)
     * @dev Once the receiver address is registered then the owner or the its corresponding caller can update the registry.
     * @param senderAddress The address of the sender contract in bytes.
     * @param receiverAddress The address of the receiver contract in bytes.
     */
    // TODO: @Tikaryan or @akhilpune make it more efficient.
    function register(
        bytes32 chain,
        bytes memory senderAddress,
        bytes memory receiverAddress
    )
        public
        isAddressValid(receiverAddress) //isChainWhitelisted(chain)
    {
        bytes memory caller = abi.encodePacked(msg.sender);
        //require(isOwner() || keccak256(registry[chain][receiverAddress]) == keccak256(caller), 'OutboundStateSender: Not authorized to register');

        registry[chain][receiverAddress] = senderAddress;
        // TODO: Should we allow empty sender address?
        if (registry[chain][receiverAddress].length == 0) {
            emit NewRegistration(chain, caller, senderAddress, receiverAddress);
        } else {
            emit RegistrationUpdated(chain, caller, senderAddress, receiverAddress);
        }
    }

    /**
     * @notice Register new Pool for Asset Transfer.
     * @dev Only the owner of the smart contract can register the Pool.
     * @dev chain name should be all uppercase. i.e (DOJIMA, ETHEREUM, BINANCE, POLYGON, etc)
     * @dev Once the pool is registered then the owner or the its corresponding caller can update the poolRegistry.
     * @param assetContract The address of the asset contract contract in bytes.
     * @param destinationAsset the unique representation of asset in bytes.
     */
    // TODO: @Tikaryan or @akhilpune make it more efficient.
    function registerPool(
        bytes32 chain,
        bytes memory destinationAsset,
        address assetContract
    )
        public
        isAssetRegistered(destinationAsset) //isChainWhitelisted(chain)
    {
        address caller = msg.sender;
        require(
            isOwner() || poolRegistry[chain][destinationAsset] == caller,
            'OutboundStateSender: Not authorized to register'
        );

        if (poolRegistry[chain][destinationAsset] == address(0)) {
            poolRegistry[chain][destinationAsset] = assetContract;
            emit NewPoolRegistration(chain, caller, destinationAsset, assetContract);
        } else {
            poolRegistry[chain][destinationAsset] = assetContract;
            emit PoolRegistrationUpdated(chain, caller, destinationAsset, assetContract);
        }
    }

    // Asset Registering
    /**
     * @notice Update the whitelist chain.
     * @dev Only the owner of the smart contract can update the whitelist chain.
     * @param asset The name of the chain, chain name should be all uppercase. i.e (DOJIMA, ETHEREUM, BINANCE, POLYGON, etc).
     */
    function registerAsset(bytes memory asset) public onlyOwner {
        require(asset.length != 0, 'OutboundStateSender: destinationAsset cannot be empty');
        assetRegistry[asset] = true;
    }

    /**
     * @notice Remove the chain from the whitelist chains.
     * @dev Only the owner of the smart contract can remove the chain from the whitelist.
     * @param asset The name of the chain.
     */
    // TODO: discuss this before using as things stand this will also delete all the addressed registered for that chain.
    function removeRegisteredAsset(bytes memory asset) public onlyOwner isAssetRegistered(asset) {
        delete assetRegistry[asset];
    }

    // Chain Updating
    /**
     * @notice Update the whitelist chain.
     * @dev Only the owner of the smart contract can update the whitelist chain.
     * @param chain The name of the chain, chain name should be all uppercase. i.e (DOJIMA, ETHEREUM, BINANCE, POLYGON, etc).
     */
    function updateWhitelistChain(bytes32 chain) public isDestinationChainValid(chain) {
        whitelistChains[chain] = true;
    }

    /**
     * @notice Remove the chain from the whitelist chains.
     * @dev Only the owner of the smart contract can remove the chain from the whitelist.
     * @param chain The name of the chain.
     */
    // TODO: discuss this before using as things stand this will also delete all the addressed registered for that chain.
    function removeWhitelistChain(bytes32 chain) public isDestinationChainValid(chain) {
        require(whitelistChains[chain], 'OutboundStateSender: Chain is not whitelisted');
        delete whitelistChains[chain];
    }

    /**
     * @notice Function to send payload to the hermes chain, value sent by the caller will be used as gas amount.
     * @param destinationChain destination chain name bytes32 format.
     * @param refundAddress address to send refund remaining gas on dojima chain if reverted.
     * @param destinationContract destination chain contract address in bytes format.
     * @param payload payload that will be sent to the hermes chain.
     */
    function transferPayload(
        bytes32 destinationChain,
        bytes memory destinationContract,
        address refundAddress,
        bytes calldata payload
    )
        external
        payable
        isGasAmountValid(msg.value)
        //      isChainWhitelisted(destinationChain)
        isRefundAddressValid(refundAddress)
        //      onlyRegistered(destinationChain, destinationContract)
        isPayloadValid(payload) // TODO: Is this modifier needed here or can we send empty payload?
        nonReentrantPayload
    {
        uint256 gasAmount = msg.value;

        uint256 counter = outboundEventCounter[destinationChain] + 1;
        outboundEventCounter[destinationChain] = counter;
        require(vault != address(0), 'OutboundStateSender: Vault address is not set');
        emit TransferPayload(counter, destinationChain, destinationContract, vault, refundAddress, gasAmount, payload);
    }

    /**
     * @notice Function to send assets to the hermes chain.
     * @param destinationChain destination chain name.
     * @param destinationAddress destination user address for token transfer.
     * @param refundAddress address to send refund remaining gas and tokens on dojima chain if reverted.
     * @param destinationAsset is the unique representation of asset on destination chain
     * @param assetAmount is the total amount of asset that the user burnt
     */
    function transferAsset(
        bytes32 destinationChain,
        bytes memory destinationAddress,
        address refundAddress,
        bytes memory destinationAsset,
        uint256 assetAmount
    )
        external
        payable
        isGasAmountValid(msg.value)
        //isChainWhitelisted(destinationChain)
        isDestinationAddressValid(destinationAddress)
        isRefundAddressValid(refundAddress)
        isAssetRegistered(destinationAsset)
        //isPoolRegistered(destinationChain, destinationAsset)
        nonReentrantAsset
    {
        uint256 gasAmount = msg.value;

        uint256 counter = outboundAssetCounter[destinationChain] + 1;
        outboundAssetCounter[destinationChain] = counter;

        emit TransferAsset(
            counter,
            destinationChain,
            destinationAddress,
            refundAddress,
            gasAmount,
            destinationAsset,
            assetAmount
        );
    }

    /**
     * @notice Registers a new rollup ID.
     * @param rollupId The unique identifier for the rollup to register.
     */
    function registerRollup(uint256 rollupId) public {
        authorizedRollups[rollupId] = true;
    }

    /**
     * @notice Removes a rollup ID.
     * @param rollupId The unique identifier for the rollup to unregister.
     */
    function unregisterRollup(uint256 rollupId) public {
        authorizedRollups[rollupId] = false;
    }

    /**
     * @notice Initiates a withdrawal by emitting an event with necessary details for Hermes.
     * @dev Called by the settlement contract after locking the assets.
     * @param rollupId The unique identifier for the rollup initiating the withdrawal.
     * @param amount The amount of the asset to withdraw.
     * @param refundAddress The address that will be refunded for the gas amount.
     * @param destinationChainId The chain ID of the target L1 chain (use a unique ID for non-EVM chains like Bitcoin, Solana).
     * @param destinationAssetId is the unique representation of asset on destination chain.
     * @param recipientAddress The address on the L1 chain where the assets will be sent (could be a custom format for non-EVM chains).
     */
    function initiateWithdrawal(
        uint256 rollupId,
        uint256 amount,
        address refundAddress,
        bytes32 destinationChainId,
        bytes memory destinationAssetId,
        bytes memory recipientAddress
    ) external payable {
        require(authorizedRollups[rollupId], 'Unauthorized rollup');

        // Check that the amount is greater than zero
        require(amount > 0, 'Amount must be greater than zero');

        // Check that the destinationChainId is valid (non-zero)
        require(destinationChainId.length > 0, 'Invalid destination chain ID');

        // Check that the recipient address is not empty
        require(recipientAddress.length > 0, 'Recipient address cannot be empty');

        uint256 gasAmount = msg.value;

        // Emit the event with all necessary details
        emit InitiateWithdrawal(
            msg.sender, // The settlement contract initiating the withdrawal
            rollupId, // The rollup ID
            withdrawId++, // Withdrawal ID
            amount, // Amount of the asset
            refundAddress, // Refund address
            gasAmount, // Gas fee
            destinationChainId, // Target L1 chain ID
            destinationAssetId, // asset id of the asset being withdrawn (ETH, BTC, etc)
            recipientAddress, // Recipient address on the L1 chain
            address(0) // Voting contract address
        );
    }

    function handleVotingCompleted(uint128 rollupId, uint128 withdrawEventId, bytes32 txHash) external {}
}
