// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@dojimanetwork/dojima-contracts/contracts/interfaces/IStateReceiver.sol';
import './RegistryContract.sol';
import '../../../interfaces/IOutboundStateSender.sol';

contract VotingContract is AccessControl, IStateReceiver, ReentrancyGuard {
    using ECDSA for bytes32;

    // state syncer verifier role
    bytes32 public constant STATE_SYNCER_ROLE = keccak256('STATE_SYNCER_ROLE');

    RegistryContract public registry;

    IOutboundStateSender public outboundStateSender;

    // Voting session data structure
    struct VotingSession {
        uint128 withdrawID;
        uint128 rollupID;
        bytes32 txHash;
        uint256 amount;
        bytes recipient;
        bool completed;
    }

    // Mapping from withdrawID to VotingSession
    mapping(uint128 => VotingSession) public votings;

    // Optional: Mapping from rollupID to array of withdrawIDs
    mapping(uint128 => uint128[]) public rollupWithdrawIDs;

    // Events
    event VotingStarted(uint128 indexed rollupID, uint128 indexed withdrawID, bytes32 txHash);
    event VotingStartedBefore(uint128 indexed rollupID, uint128 indexed withdrawID, bytes32 txHash);

    constructor(address registryAddress) {
        require(registryAddress != address(0), 'Invalid registry address');
        registry = RegistryContract(registryAddress);

        // Grant the deployer the default admin role
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier isOutboundStateSenderSet() {
        require(address(outboundStateSender) != address(0), 'VotingContract: OutboundStateSender not set');
        _;
    }

    // Function to set the OutboundStateSender address
    function setGenesisContracts(
        address _outboundStateSender,
        address _stateSyncerVerifier
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_outboundStateSender != address(0), 'Invalid OutboundStateSender address');
        require(_stateSyncerVerifier != address(0), 'Invalid StateSyncerVerifier address');
        outboundStateSender = IOutboundStateSender(_outboundStateSender);
        _grantRole(STATE_SYNCER_ROLE, _stateSyncerVerifier);
    }

    /**
     * @dev Starts the voting process for a withdrawal event.
     * Can only be called by the state syncer.
     */
    function startVoting(
        uint128 rollupID,
        uint128 withdrawID,
        bytes32 txHash,
        bytes memory recipient,
        uint256 amount
    ) internal {
        require(votings[withdrawID].txHash == bytes32(0), 'Voting already started for this withdrawID');
        require(recipient.length > 0, 'Recipient must be set');
        require(amount > 0, 'Amount must be greater than zero');

        // Ensure the rollup is registered
        RegistryContract.RollupInfo memory rollupInfo = registry.getRollupInfo(rollupID);
        require(rollupInfo.tssAddress != address(0), 'Rollup not registered');

        // Initialize the voting session with withdrawID
        votings[withdrawID] = VotingSession({
            withdrawID: withdrawID,
            rollupID: rollupID,
            txHash: txHash,
            recipient: recipient,
            amount: amount,
            completed: false
        });

        // Track the withdrawID under the rollupID
        rollupWithdrawIDs[rollupID].push(withdrawID);

        emit VotingStarted(rollupID, withdrawID, txHash);
    }

    /**
     * @dev Submits the TSS signature for the voting process.
     */
    function submitSignature(
        uint128 withdrawID,
        bytes memory signature
    ) external isOutboundStateSenderSet nonReentrant {
        VotingSession storage session = votings[withdrawID];
        require(session.txHash != bytes32(0), 'Voting not started for this withdrawID');
        require(!session.completed, 'Voting already completed for this withdrawID');

        // Retrieve the TSS public key from the Registry Contract
        address tssPublicKey = registry.getRollupInfo(session.rollupID).tssAddress;
        require(tssPublicKey != address(0), 'Invalid TSS public key');

        // Verify the signature
        bool isValid = verifySignature(session, signature, tssPublicKey);
        require(isValid, 'Invalid TSS signature');

        // Mark the voting session as completed
        session.completed = true;

        outboundStateSender.handleVotingCompleted(withdrawID, session.rollupID, session.txHash);
    }

    // TODO: Remove this function
    // Only for testing purposes
    function submitDummySignature(uint128 withdrawID) external {
        VotingSession storage session = votings[withdrawID];
        require(session.txHash != bytes32(0), 'Voting not started for this withdrawID');
        require(!session.completed, 'Voting already completed for this withdrawID');

        // Mark the voting session as completed
        session.completed = true;

        outboundStateSender.handleVotingCompleted(withdrawID, session.rollupID, session.txHash);
    }
    /**
     * @dev Internal function to verify the TSS signature.
     */
    function verifySignature(
        VotingSession storage session,
        bytes memory signature,
        address tssPublicKey
    ) internal view returns (bool) {
        /**
         * @notice: The order of the parameters is important and should not be changed
         * @custom:startVoting: rollupID, withdrawID, txHash, recipient, amount
         * @custom:submitSignature: rollupID, withdrawID, txHash, recipient, amount
         * @custom:hermes_digest: rollupID, withdrawID, txHash, recipient, amount
         */
        bytes32 messageHash = keccak256(
            abi.encodePacked(session.rollupID, session.withdrawID, session.txHash, session.recipient, session.amount)
        ).toEthSignedMessageHash();

        // Recover the address from the signature
        address recoveredAddress = messageHash.recover(signature);

        // Compare with the TSS public key
        return (recoveredAddress == tssPublicKey);
    }

    function onStateReceive(uint256 /* id */, bytes calldata data) external onlyRole(STATE_SYNCER_ROLE) {
        (uint128 rollupID, uint128 withdrawID, bytes32 txHash, bytes memory recipient, uint256 amount) = abi.decode(
            data,
            (uint128, uint128, bytes32, bytes, uint256)
        );

        startVoting(rollupID, withdrawID, txHash, recipient, amount);
    }
}
