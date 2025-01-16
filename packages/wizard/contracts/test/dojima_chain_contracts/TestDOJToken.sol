// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@dojimanetwork/dojima-contracts/contracts/interfaces/IOutboundStateSender.sol';
import '@dojimanetwork/dojima-contracts/contracts/interfaces/IStateReceiver.sol';
import {StateSyncerVerifier} from '@dojimanetwork/dojima-contracts/contracts/dojimachain/StateSyncerVerifier.sol';

contract TestDOJ is ERC20, AccessControl, IStateReceiver,ReentrancyGuard, Ownable, Initializable{
    string public constant TOKEN_NAME = "Test DOJ Token";
    string public constant TOKEN_SYMBOL = "TOJ";

    StateSyncerVerifier public stateVerifier;
    IOutboundStateSender public outboundStateSender;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    event ChainContractMappingUpdated(bytes32 chainName, bytes contractAddress);
    event TokensTransferredToDestinationChain(bytes32 destinationChain, bytes user, uint256 amount);
    event Initialize(address _outboundStateSender, address _stateSyncerVerifier);

    // Mapping of chain names to their contract addresses in bytes format
    mapping(bytes32 => bytes) public chainContractMappings;

    modifier onlyMinter() {
        require(hasRole(MINTER_ROLE, msg.sender), "TOJToken Caller is not a minter");
        _;
    }

    modifier onlyRegisteredContract(bytes32 chainName, bytes memory destinationContract) {
        require(chainName.length > 0, "TOJToken Invalid chain name");
        require(destinationContract.length > 0, 'TOJToken Invalid destination contract address');
        require(keccak256(destinationContract) == keccak256(chainContractMappings[chainName]),
            'TOJToken Either chain name or user not registered');
        _;
    }

    constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL) {}

    function initialize(address _outboundStateSender, address _stateSyncerVerifier) public initializer {
        require(_stateSyncerVerifier != address(0), "TOJToken Invalid state syncer verifier address");
        require(_outboundStateSender != address(0), "TOJToken OutboundStateSender address cannot be zero");

        _setupRole(MINTER_ROLE, _stateSyncerVerifier);
        _setupRole(ADMIN_ROLE, msg.sender);
        outboundStateSender = IOutboundStateSender(_outboundStateSender);
        stateVerifier = StateSyncerVerifier(_stateSyncerVerifier);
        _mint(msg.sender, 10000000000 * (10 ** uint256(decimals())));

        emit Initialize(_outboundStateSender, _stateSyncerVerifier);
    }

    function updateChainContractMapping(bytes32 chainName, bytes memory contractAddress) external onlyRole(ADMIN_ROLE) {
        chainContractMappings[chainName] = contractAddress;
        emit ChainContractMappingUpdated(chainName, contractAddress);
    }

    function allowance(address /*owner*/, address /*spender*/) public pure override returns (uint256) {
        revert('Disabled feature');
    }

    function approve(address /*spender*/, uint256 /*amount*/) public pure override returns (bool) {
        revert('Disabled feature');
    }

    function transferFrom(address /*from*/, address /*to*/, uint256 /*amount*/) public pure override returns (bool) {
        revert('Disabled feature');
    }

    function transferToDestinationChain(
        bytes32 destinationChain,
        bytes memory user,
        uint256 amount,
        bytes memory destinationContractAddress) external nonReentrant() onlyRegisteredContract(destinationChain, destinationContractAddress) {
        _burn(msg.sender, amount);

        outboundStateSender.transferPayload(
            destinationChain,
            destinationContractAddress,
            msg.sender,
            abi.encode(user, amount, 0) // TODO: add depositId
        );
        emit TokensTransferredToDestinationChain(destinationChain, user, amount);
    }

    function onStateReceive(uint256 /* id */, bytes calldata data) external onlyRole(MINTER_ROLE) {
        (bytes memory userBytes, uint256 amount, uint256 depositId ) = abi.decode(data, (bytes, uint256, uint256));

        // Ensure the bytes array for the address is of the correct length
        require(userBytes.length == 20, "TOJToken: Invalid address length");

        address userAddress;
        assembly {
            userAddress := mload(add(userBytes, 20))
        }

        // Additional validation for the address can go here if needed
        require(userAddress != address(0), "TOJToken: Invalid address");

        _mint(userAddress, amount);
    }
}