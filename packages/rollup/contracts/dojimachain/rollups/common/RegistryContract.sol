// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Import OpenZeppelin's AccessControl for role-based permissions
import '@openzeppelin/contracts/access/AccessControl.sol';

contract RegistryContract is AccessControl {
    // Struct to store rollup information
    struct RollupInfo {
        address tssAddress; // TSS public key address
        string rollupName; // Human-readable name
        address rollupAdmin; // Admin address for the rollup
        string metadataURI; // URI to off-chain metadata (e.g., IPFS link)
    }

    // Mapping from rollup ID to RollupInfo
    mapping(uint256 => RollupInfo) private rollups;

    // Event emitted when a new rollup is registered
    event RollupRegistered(uint256 indexed rollupID);

    // Event emitted when rollup information is updated
    event RollupInfoUpdated(uint256 indexed rollupID);

    // Event emitted when a rollup is deregistered
    event RollupDeregistered(uint256 indexed rollupID);

    constructor() {
        // Grant the deployer the default admin role
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyRollupAdmin(uint256 rollupID) {
        require(msg.sender == rollups[rollupID].rollupAdmin, 'Caller is not the rollup admin');
        _;
    }

    /**
     * @dev Registers a new rollup with its information.
     * Can only be called by an account with the DEFAULT_ADMIN_ROLE.
     */
    function registerRollup(uint256 rollupID, RollupInfo calldata info) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(info.tssAddress != address(0), 'Invalid TSS address');
        require(rollups[rollupID].tssAddress == address(0), 'Rollup already registered');

        rollups[rollupID] = info;

        emit RollupRegistered(rollupID);
    }

    /**
     * @dev Updates the rollup information for an existing rollup.
     * Can only be called by the current rollup admin of the specific rollup.
     */
    function updateRollupInfo(uint256 rollupID, RollupInfo calldata newInfo) external onlyRollupAdmin(rollupID) {
        require(rollups[rollupID].tssAddress != address(0), 'Rollup not registered');
        require(newInfo.tssAddress != address(0), 'Invalid TSS address');

        // Update the rollup information
        rollups[rollupID] = newInfo;

        emit RollupInfoUpdated(rollupID);
    }

    /**
     * @dev Retrieves the rollup information for a given rollup ID.
     */
    function getRollupInfo(uint256 rollupID) external view returns (RollupInfo memory) {
        require(rollups[rollupID].tssAddress != address(0), 'Rollup not registered');
        return rollups[rollupID];
    }

    /**
     * @dev Deregisters a rollup.
     * Can only be called by an account with the DEFAULT_ADMIN_ROLE.
     */
    function deregisterRollup(uint256 rollupID) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(rollups[rollupID].tssAddress != address(0), 'Rollup not registered');

        delete rollups[rollupID];

        emit RollupDeregistered(rollupID);
    }

    /**
     * @dev Retrieves the TSS public key address for a given rollup ID.
     */
    function getTSSPublicKey(uint256 rollupID) external view returns (address) {
        require(rollups[rollupID].tssAddress != address(0), 'Rollup not registered');
        return rollups[rollupID].tssAddress;
    }
}
