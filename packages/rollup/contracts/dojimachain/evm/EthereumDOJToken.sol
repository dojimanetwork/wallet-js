// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@dojimanetwork/dojima-contracts/contracts/interfaces/IInboundStateSender.sol';
import {IStateExecutor} from '@dojimanetwork/dojima-contracts/contracts/interfaces/IStateReceiver.sol';


contract EthereumDOJToken is Initializable, ERC20Upgradeable, UUPSUpgradeable, AccessControlUpgradeable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    string public constant TOKEN_NAME = "Dojima ETH_DOJ Token";
    string public constant TOKEN_SYMBOL = "DOJ";
    bytes32 public constant EXECUTE_STATE_ROLE = keccak256("EXECUTE_STATE_ROLE");

    IInboundStateSender public inboundStateSender;
    // DOJ token address on Dojima chain
    address public dojimaDOJToken;

    event TokenDeposited(
        address indexed user,
        address token,
        uint256 amount,
        uint256 indexed depositId
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     * @param _inboundStateSender Address of the InboundStateSender contract on Ethereum chain.
     * @param _dojimaDOJToken Address of the DOJ token contract on Dojima chain.
     */
    function initialize(address _inboundStateSender, address _dojimaDOJToken) public initializer {
        require(_inboundStateSender != address(0), "EthereumDOJToken: InboundStateSender address cannot be zero");
        require(_dojimaDOJToken != address(0), "EthereumDOJToken: Dojima DOJ token contract address cannot be zero");

        __ERC20_init(TOKEN_NAME, TOKEN_SYMBOL);
        __Ownable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

        // Grant the deployer the default admin role: they can grant/revoke any roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        inboundStateSender = IInboundStateSender(_inboundStateSender);
        dojimaDOJToken = _dojimaDOJToken;
        _setupRole(EXECUTE_STATE_ROLE, _inboundStateSender);
    }

    function assignExecuteStateRole(address _account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setupRole(EXECUTE_STATE_ROLE, _account);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

    function transferToOmniChain(bytes memory user, uint256 amount) external nonReentrant {
        _burn(msg.sender, amount);
        inboundStateSender.transferPayload(dojimaDOJToken, abi.encode(user, amount, 0));
    }

    function executeState(uint256 /*depositID*/, bytes calldata stateData) external nonReentrant onlyRole(EXECUTE_STATE_ROLE) {
        (bytes memory userBytes, uint256 amount, uint256 depositId) = abi.decode(stateData, (bytes, uint256, uint256));
        // Ensure the bytes array for the address is of the correct length
        require(userBytes.length == 20, "EthereumDOJToken: Invalid address length");

        address userAddress;
        assembly {
            userAddress := mload(add(userBytes, 20))
        }

        // Additional validation for the address can go here if needed
        require(userAddress != address(0), "EthereumDOJToken: Invalid address");

        _mint(userAddress, amount);
        emit TokenDeposited(userAddress, address(this), amount, depositId);
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