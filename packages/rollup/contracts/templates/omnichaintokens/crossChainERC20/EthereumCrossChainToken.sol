// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import '@dojimanetwork/dojima-contracts/contracts/interfaces/IInboundStateSender.sol';
import { IStateExecutor } from '@dojimanetwork/dojima-contracts/contracts/interfaces/IStateReceiver.sol';

contract EthereumCrossChainToken is IStateExecutor, ERC20, AccessControl, ReentrancyGuard {
    bytes32 public constant EXECUTE_STATE_ROLE = keccak256('EXECUTE_STATE_ROLE');

    IInboundStateSender public inboundStateSender;
    address public omniChainContractAddress;

    event TokenDeposited(address indexed user, address token, uint256 amount, uint256 indexed depositId);

    constructor(
        string memory _name,
        string memory _symbol,
        address _inboundStateSender,
        address _omniChainContractAddress
    ) ERC20(_name, _symbol) {
        require(
            _inboundStateSender != address(0),
            'EthereumCrossChainToken: InboundStateSender address cannot be zero'
        );
        require(
            _omniChainContractAddress != address(0),
            'EthereumCrossChainToken: OmniChain contract address cannot be zero'
        );

        // Grant the deployer the default admin role: they can grant/revoke any roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        inboundStateSender = IInboundStateSender(_inboundStateSender);
        omniChainContractAddress = _omniChainContractAddress;
        _setupRole(EXECUTE_STATE_ROLE, _inboundStateSender);
    }

    function assignExecuteStateRole(address _account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupRole(EXECUTE_STATE_ROLE, _account);
    }

    function transferToOmniChain(bytes memory user, uint256 amount) external nonReentrant {
        _burn(msg.sender, amount);
        inboundStateSender.transferPayload(omniChainContractAddress, abi.encode(user, amount, 0));
    }

    function executeState(
        uint256 /*depositID*/,
        bytes calldata stateData
    ) external nonReentrant onlyRole(EXECUTE_STATE_ROLE) {
        (bytes memory userBytes, uint256 amount, uint256 depositId) = abi.decode(stateData, (bytes, uint256, uint256));
        // Ensure the bytes array for the address is of the correct length
        require(userBytes.length == 20, 'EthereumCrossChainToken: Invalid address length');

        address userAddress;
        assembly {
            userAddress := mload(add(userBytes, 20))
        }

        // Additional validation for the address can go here if needed
        require(userAddress != address(0), 'EthereumCrossChainToken: Invalid address');

        _mint(userAddress, amount);
        emit TokenDeposited(userAddress, address(this), amount, depositId);
    }
}
