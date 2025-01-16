pragma solidity ^0.8.19;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import { BaseERC20NoSig } from './evm/BaseERC20NoSig.sol';
import '@dojimanetwork/dojima-contracts/contracts/interfaces/IOutboundStateSender.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import { StateSyncerVerifier } from './StateSyncerVerifier.sol';

/**
 * @title Dojima Token contract
 * @notice This contract is an ECR20 like wrapper over native ether (Dojima Token) transfers on the dojima chain
 * @dev ERC20 methods have been made payable while keeping their method signature same as other childDRC20 on dojima
 */
contract DRC20 is BaseERC20NoSig, ReentrancyGuard, StateSyncerVerifier {
    event Transfer(address indexed from, address indexed to, uint256 value);

    uint256 public currentSupply = 0;
    uint8 private constant _DECIMALS = 18;
    bool private _isInitialized;

    address public stateVerifier;
    address public outboundStateSender;

    event ChainContractMappingUpdated(bytes32 chainName, bytes contractAddress);
    event TokensTransferredToDestinationChain(bytes32 destinationChain, bytes user, uint256 amount);
    event Initialize(address _outboundStateSender, address _stateSyncerVerifier);
    event DojTokenDeposited(address indexed user, uint256 amount, uint256 input1, uint256 output1);
    event DojWithdraw(string token, address indexed from, uint256 amount, uint256 input1, uint256 output1);

    // Mapping of chain names to their contract addresses in bytes format
    mapping(bytes32 => bytes) public chainContractMappings;

    modifier onlyRegisteredContract(bytes32 chainName, bytes memory destinationContract) {
        require(chainName.length > 0, 'DOJToken: Invalid chain name');
        require(destinationContract.length > 0, 'DOJToken: Invalid destination contract address');
        require(
            keccak256(destinationContract) == keccak256(chainContractMappings[chainName]),
            'DOJToken: Either chain name or user not registered'
        );
        _;
    }

    function initialize(address _outboundStateSender, address _stateSyncerVerifier) public {
        // Todo: once DojimaValidator(@0x1000) contract added uncomment me
        // require(msg.sender == address(0x1000));
        require(!_isInitialized, 'The contract is already initialized');
        _isInitialized = true;

        _transferOwnership(msg.sender);
        currentSupply = 8000000000 * 10 ** uint256(_DECIMALS);

        outboundStateSender = _outboundStateSender;
        stateVerifier = _stateSyncerVerifier;

        emit Initialize(_outboundStateSender, _stateSyncerVerifier);
    }

    function setParent(address) public pure override {
        revert('Disabled feature');
    }

    function updateChainContractMapping(bytes32 chainName, bytes memory contractAddress) external onlyOwner {
        chainContractMappings[chainName] = contractAddress;
        emit ChainContractMappingUpdated(chainName, contractAddress);
    }

    function transferToDestinationChain(
        bytes32 destinationChain,
        bytes memory user,
        bytes memory destinationContractAddress
    ) external payable nonReentrant onlyRegisteredContract(destinationChain, destinationContractAddress) {
        uint256 amount = msg.value;

        // Check for amount
        require(amount > 0, 'Amount should be greater than zero');

        currentSupply -= amount;

        IOutboundStateSender(outboundStateSender).transferPayload(
            destinationChain,
            destinationContractAddress,
            msg.sender,
            abi.encode(user, amount, 0) // TODO: add depositId
        );
        emit TokensTransferredToDestinationChain(destinationChain, user, amount);
    }

    function onStateReceive(uint256 /* id */, bytes calldata data) external onlyStateSyncer {
        (bytes memory userBytes, uint256 amount, uint256 depositId) = abi.decode(data, (bytes, uint256, uint256));

        // Ensure the bytes array for the address is of the correct length
        require(userBytes.length == 20, 'DOJToken: Invalid address length');

        address userAddress;
        assembly {
            userAddress := mload(add(userBytes, 20))
        }

        // Additional validation for the address can go here if needed
        require(userAddress != address(0), 'DOJToken: Invalid address');

        // input balance
        uint256 input1 = balanceOf(userAddress);

        // solhint-disable-next-line private-vars-leading-underscore
        address payable _user = payable(address(uint160(userAddress)));

        currentSupply += amount;

        // transfer amount to user
        _user.transfer(amount);

        // deposit events
        emit DojTokenDeposited(userAddress, amount, input1, balanceOf(userAddress));
    }

    function name() public pure returns (string memory) {
        return 'Dojima Token';
    }

    function symbol() public pure returns (string memory) {
        return 'DOJ';
    }

    function decimals() public pure returns (uint8) {
        return _DECIMALS;
    }

    function totalSupply() public pure returns (uint256) {
        return 10000000000 * 10 ** uint256(_DECIMALS);
    }

    function balanceOf(address account) public view override returns (uint256) {
        return account.balance;
    }

    /// @dev Function that is called when a user or another contract wants to transfer funds.
    /// @param to Address of token receiver.
    /// @param value Number of tokens to transfer.
    /// @return Returns success of function call.
    function transfer(address to, uint256 value) public payable returns (bool) {
        if (msg.value != value) {
            return false;
        }
        return _transferFrom(msg.sender, to, value);
    }

    function withdrawDoj() public payable {
        address user = msg.sender;
        uint256 amount = msg.value;

        uint256 input = balanceOf(user);

        // Check that the sent amount is positive
        require(amount > 0, 'Amount must be greater than zero');

        // Reduce the current supply to reflect the burn
        currentSupply -= amount;

        // withdraw event
        emit DojWithdraw('0x0000000000000000000000000000000000001010', user, amount, input, balanceOf(user));
    }

    /**
     * @dev _transfer is invoked by _transferFrom method that is inherited from BaseERC20.
     * This enables us to transfer dojimaEth between users while keeping the interface same as that of an ERC20 Token.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal override {
        require(recipient != address(this), 'can not send to DRC20');
        payable(address(uint160(recipient))).transfer(amount);
        emit Transfer(sender, recipient, amount);
    }

    function deposit(address user, uint256 amountOrTokenId) public pure override {
        revert('Disabled feature');
    }

    function withdraw(uint256 amountOrTokenId) public payable override {
        revert('Withdrawal feature is disabled');
    }

    function allowance(address /*owner*/, address /*spender*/) public pure returns (uint256) {
        revert('Disabled feature');
    }

    function approve(address /*spender*/, uint256 /*amount*/) public pure returns (bool) {
        revert('Disabled feature');
    }

    function transferFrom(address /*from*/, address /*to*/, uint256 /*amount*/) public pure returns (bool) {
        revert('Disabled feature');
    }
}
