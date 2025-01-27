// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Ownable} from '../../common/misc/OwnableV2.sol';
import {StateSyncerVerifier} from '../StateSyncerVerifier.sol';
import {IStateReceiver} from '../../interfaces/IStateReceiver.sol';

import {AccountBasedToken} from "./AccountBasedToken.sol";
import {AccountBasedChildToken} from "./AccountBasedChildToken.sol";
import {IOutboundStateSender} from '../../interfaces/IOutboundStateSender.sol';

contract AccountBasedChildChain is Ownable, StateSyncerVerifier, IStateReceiver {
    // mapping for chainName => (root token => child token)
    mapping(string => mapping(bytes => address)) public tokens;
    // mapping for (deposit ID => true/false)
    mapping(string => mapping(uint256 => bool)) public deposits;
    // mapping for (withdraw ID => true/false)
    mapping(string =>mapping(uint256 => bool)) public withdraws;

    string internal constant _DOJ_CHAIN = 'DOJIMA';

    // outbound state sender contract
    IOutboundStateSender public outboundStateSender;

    event NewToken(string chainName, bytes indexed rootToken, address indexed token, uint8 _decimals);

    event TokenDeposited(
        string chainName,
        bytes indexed rootToken,
        address indexed childToken,
        address indexed user,
        uint256 amount,
        uint256 depositId
    );

    event TokenWithdrawn(
        string chainName,
        bytes indexed rootToken,
        address indexed childToken,
        address indexed user,
        uint256 amount,
        uint256 withrawCount
    );

    constructor(address _outboundStateSender) {
        //Mapping Dojima Token
        tokens[_DOJ_CHAIN]['DOJ-67C'] = 0x0000000000000000000000000000000000001010;
        require(_outboundStateSender != address(0x0), 'Account Based Child Chain: Invalid OutboundStateSender address');
        outboundStateSender = IOutboundStateSender(_outboundStateSender);
    }

    /**
     * @notice updateOutboundStateSender
     * @param _outboundStateSender address of new outboundStateSender contract
     */
    function updateOutboundStateSender(address _outboundStateSender) public onlyOwner {
        require(_outboundStateSender != address(0x0), 'Child Beacon: Invalid OutboundStateSender address');
        outboundStateSender = IOutboundStateSender(_outboundStateSender);
    }

    function convertBytesToAddress(bytes memory userBytes) public pure returns (address userAddress) {
        require(userBytes.length == 20, "OmniChainTokenContract: Invalid address length");

        assembly {
            userAddress := mload(add(userBytes, 20))
        }
    }

    function onStateReceive(uint256 /* id */, bytes calldata data) external onlyStateSyncer {
        (string memory chainName, bytes memory user, bytes memory rootToken, uint256 amountOrTokenId, uint256 depositId) = abi.decode(
            data,
            (string, bytes, bytes, uint256, uint256)
        );

        _depositTokens(chainName, rootToken, convertBytesToAddress(user), amountOrTokenId, depositId);
    }

    function addToken(
        string calldata chainName,
        address owner,
        bytes memory rootToken,
        string memory name,
        string memory symbol,
        uint8 decimals
    ) public onlyOwner returns (address token) {
        // check if root token already exists
        require(tokens[chainName][rootToken] == address(0x0), 'Account Based Child Chain: Token already mapped');
        // create new token contract
        token = address(new AccountBasedToken(owner, rootToken, name, symbol, decimals));

        // add mapping with root token
        tokens[chainName][rootToken] = token;

        // broadcast new token's event
        emit NewToken(chainName, rootToken, token, decimals);
    }

    // for testnet updates remove for mainnet @akhilpune - remove
    function mapToken(string calldata chainName, bytes memory rootToken, address token) public onlyOwner {
        tokens[chainName][rootToken] = token;
    }

    /*
     * @notice withdrawTokens
     * @dev: amountOrTokenId: tokenId for ERC721 and amount for ERC20
     * @param user address for deposit
     * @param rootToken root token address
     * @param withdrawId
     */
    function withdrawTokens(
        string calldata chainName,
        bytes memory rootToken,
        bytes memory user,
        uint256 amountOrTokenId,
        uint256 withdrawId,
        bytes32 destinationChain,
        bytes memory destinationAddress,
        bytes memory destinationAsset
    ) public onlyOwner {
        // check if withdrawal happens only once
        require(withdraws[chainName][withdrawId] == false, 'Account Based Chain: already withdrawal for the given Id');

        // set withdrawal flag
        withdraws[chainName][withdrawId] = true;

        // retrieve child tokens
        address childToken = tokens[chainName][rootToken];

        // check if child token is mapped
        require(childToken != address(0x0), 'Account Based Child Chain: child token is not registered');


        AccountBasedChildToken obj = AccountBasedToken(childToken);

        // @notice withdraw tokens
        obj.withdraw(amountOrTokenId);

        address userAddress = convertBytesToAddress(user);
        outboundStateSender.transferAsset(
            destinationChain,
            destinationAddress,
            userAddress,
            destinationAsset,
            amountOrTokenId
        );


        // Emit TokenWithdrawn event
        emit TokenWithdrawn(chainName,rootToken, childToken, userAddress, amountOrTokenId, withdrawId);
    }

    /*
     * @notice Deposit tokens
     * @dev: amountOrTokenId: tokenId for ERC721 and amount for ERC20
     * @param user address for deposit
     * @param rootToken root token address
     * @param amountOrTokenId tokenId to mint ERC721 and amount for ERC20
     */
    function _depositTokens(
        string memory chainName,
        bytes memory rootToken,
        address user,
        uint256 amountOrTokenId,
        uint256 depositId
    ) internal {
        // check if deposit happens only once
        require(deposits[chainName][depositId] == false, 'Account Based Child Chain: Deposit already made with the given deposit Id');

        // set deposit flag
        deposits[chainName][depositId] = true;

        // retrieve child tokens
        address childToken = tokens[chainName][rootToken];

        // check if child token is mapped
        require(childToken != address(0x0), 'Account Based Child Chain: token is not registered');

        AccountBasedChildToken obj = AccountBasedToken(childToken);
        // deposit tokens
        obj.deposit(user, amountOrTokenId);

        // Emit TokenDeposited event
        emit TokenDeposited(chainName, rootToken, childToken, user, amountOrTokenId, depositId);
    }

}