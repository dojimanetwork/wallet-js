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

contract DOJToken is ERC20, AccessControl, IStateReceiver,ReentrancyGuard, Ownable, Initializable{
    string public constant TOKEN_NAME = "Dojima Token";
    string public constant TOKEN_SYMBOL = "DOJ";

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
        require(hasRole(MINTER_ROLE, msg.sender), "DOJToken: Caller is not a minter");
        _;
    }

    modifier onlyRegisteredContract(bytes32 chainName, bytes memory destinationContract) {
        require(chainName.length > 0, "DOJToken: Invalid chain name");
        require(destinationContract.length > 0, 'DOJToken: Invalid destination contract address');
        require(keccak256(destinationContract) == keccak256(chainContractMappings[chainName]),
            'DOJToken: Either chain name or user not registered');
        _;
    }

    constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL) {}

    function initialize(address _outboundStateSender, address _stateSyncerVerifier) public initializer {
        require(_stateSyncerVerifier != address(0), "DOJToken: Invalid state syncer verifier address");
        require(_outboundStateSender != address(0), "DOJToken: OutboundStateSender address cannot be zero");

        _setupRole(MINTER_ROLE, _stateSyncerVerifier);
        _setupRole(ADMIN_ROLE, msg.sender);
        outboundStateSender = IOutboundStateSender(_outboundStateSender);
        stateVerifier = StateSyncerVerifier(_stateSyncerVerifier);

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
        require(userBytes.length == 20, "DOJToken: Invalid address length");

        address userAddress;
        assembly {
            userAddress := mload(add(userBytes, 20))
        }

        // Additional validation for the address can go here if needed
        require(userAddress != address(0), "DOJToken: Invalid address");

        _mint(userAddress, amount);
    }

    /**
     * Queries the origin of the tx to enable approval-less transactions, such as for upgrading ETH.RUNE to THOR.RUNE.
     * Beware phishing contracts that could steal tokens by intercepting tx.origin.
     * The risks of this are the same as infinite-approved contracts which are widespread.
     * Acknowledge it is non-standard, but the ERC-20 standard is less-than-desired.
     */
    function transferTo(address recipient, uint256 amount) public returns (bool) {
        _transfer(tx.origin, recipient, amount);
        return true;
    }

    function burn(uint amount) public virtual {
        _burn(msg.sender, amount);
    }

    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account);
    }
}