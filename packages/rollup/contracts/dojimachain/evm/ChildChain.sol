// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from '../../common/misc/OwnableV2.sol';

import { StateSyncerVerifier } from '../StateSyncerVerifier.sol';
import { IStateReceiver } from '../../interfaces/IStateReceiver.sol';

import { ChildToken } from "./ChildToken.sol";
import { ChildERC20 } from "./ChildERC20.sol";
import { ChildERC721 } from "./ChildERC721.sol";
import {IOutboundStateSender} from '../../interfaces/IOutboundStateSender.sol';

contract ChildChain is Ownable, StateSyncerVerifier, IStateReceiver {
    // mapping for (root token => child token)
    mapping(string => mapping(address => address)) public tokens;
    mapping(string => mapping(address => bool)) public isERC721;
    mapping(string => mapping(uint256 => bool)) public deposits;
    mapping(string => mapping(uint256 => bool)) public withdraws;

    string internal constant _DOJ_CHAIN = 'DOJIMA';

    event NewToken(string chain, address indexed rootToken, address indexed token, uint8 decimals);

    // outbound state sender contract
    IOutboundStateSender public outboundStateSender;

    event TokenDeposited(
        string chain,
        address indexed rootToken,
        address indexed childToken,
        address indexed user,
        uint256 amount,
        uint256 depositId
    );

    event TokenWithdrawn(
        string chain,
        address indexed rootToken,
        address indexed childToken,
        address indexed user,
        uint256 amount,
        uint256 withdrawlId
    );

    // _outboundStateSender is state sender contract address on dojima chain
    constructor(address _outboundStateSender) {
        //Mapping Dojima Token
        tokens[_DOJ_CHAIN][0x7D07395335b1e69dc8fEd0488367d1db53aD50AD] = 0x0000000000000000000000000000000000001010;
        require(_outboundStateSender != address(0x0), 'Child Chain ETH: Invalid OutboundStateSender address');
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


    function onStateReceive(uint256 /* id */, bytes calldata data) external onlyStateSyncer {
        (string memory chain, address user, address rootToken, uint256 amountOrTokenId, uint256 depositId) = abi.decode(
            data,
            (string, address, address, uint256, uint256)
        );
        _depositTokens(chain, rootToken, user, amountOrTokenId, depositId);
    }

    function addToken(
        address owner,
        address rootToken,
        string memory chain,
        string memory name,
        string memory symbol,
        uint8 decimals,
        bool _isERC721 // solhint-disable-line private-vars-leading-underscore
    ) public onlyOwner returns (address token) {
        // check if root token already exists
        require(tokens[chain][rootToken] == address(0x0), 'Token already mapped');

        // create new token contract
        if (_isERC721) {
            token = address(new ChildERC721(owner, rootToken, name, symbol));
            isERC721[chain][rootToken] = true;
        } else {
            token = address(new ChildERC20(owner, rootToken, name, symbol, decimals));
        }

        // add mapping with root token
        tokens[chain][rootToken] = token;

        // broadcast new token's event
        emit NewToken(chain, rootToken, token, decimals);
    }

    // for testnet updates remove for mainnet - @akhilpune remove
    function mapToken(string memory chain,address rootToken, address token, bool isErc721) public onlyOwner {
        tokens[chain][rootToken] = token;
        isERC721[chain][rootToken] = isErc721;
    }

    /*
     * @notice Withdraw tokens
     * @dev: amountOrTokenId is tokenId for ERC721 and amount for ERC20
     * @param user address for withdraw
     * @param rootToken root token address
     * @param amountOrTokenId tokenId to mint ERC721 and amount for ERC20
     */
    function withdrawTokens(
        string memory chain,
        address rootToken,
        address user,
        uint256 amountOrTokenId,
        uint256 withdrawId,
        bytes32 destinationChain,
        bytes memory destinationContract
    ) public onlyOwner {
        // check if withdrawal happens only once
        require(withdraws[chain][withdrawId] == false, 'Chain Chain: already withdrawal for the given Id');

        // set withdrawal flag
        withdraws[chain][withdrawId] = true;

        // retrieve child tokens
        address childToken = tokens[chain][rootToken];

        // check if child token is mapped
        require(childToken != address(0x0), 'Child Chain: token is not registered');

        ChildToken obj;

        if (isERC721[chain][rootToken]) {
            obj = ChildERC721(childToken);
        } else {
            obj = ChildERC20(childToken);
        }

        // withdraw tokens
        obj.withdraw(amountOrTokenId);

        outboundStateSender.transferPayload(
            destinationChain,
            destinationContract,
            user,
            abi.encode(rootToken, childToken, user, amountOrTokenId, withdrawId)
        );
        // Emit TokenWithdrawn event
        emit TokenWithdrawn(chain, rootToken, childToken, user, amountOrTokenId, withdrawId);
    }

    /*
     * @notice Deposit tokens
     * @dev: amountOrTokenId is tokenId for ERC721 and amount for ERC20
     * @param user address for deposit
     * @param rootToken root token address
     * @param amountOrTokenId tokenId to mint ERC721 and amount for ERC20
     */
    function _depositTokens(string memory chain, address rootToken, address user, uint256 amountOrTokenId, uint256 depositId) internal {
        // check if deposit happens only once
        require(deposits[chain][depositId] == false, 'Child Chain: Deposit already made with the given deposit Id');

        // set deposit flag
        deposits[chain][depositId] = true;

        // retrieve child tokens
        address childToken = tokens[chain][rootToken];

        // check if child token is mapped
        require(childToken != address(0x0), 'Child Chain: token is not registered');

        ChildToken obj;

        if (isERC721[chain][rootToken]) {
            obj = ChildERC721(childToken);
        } else {
            obj = ChildERC20(childToken);
        }

        // deposit tokens
        obj.deposit(user, amountOrTokenId);

        // Emit TokenDeposited event
        emit TokenDeposited(chain, rootToken, childToken, user, amountOrTokenId, depositId);
    }
}
