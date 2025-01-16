// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import {ContractReceiver} from "../common/misc/ContractReceiver.sol";
import {Registry} from "../common/Registry.sol";
import {WETH} from "../common/tokens/WETH.sol";
import {IDepositManager} from "./IDepositManager.sol";
import {DepositManagerStorage} from "./DepositManagerStorage.sol";
import {IInboundStateSender} from "../interfaces/IInboundStateSender.sol";
import {GovernanceLockable} from "../common/mixin/GovernanceLockable.sol";
import {IStateExecutor} from "../interfaces/IStateReceiver.sol";

contract DepositManager is DepositManagerStorage, IDepositManager, IERC721Receiver, ContractReceiver, IStateExecutor {

    string public constant _ETH_CHAIN = "ETHEREUM";
    modifier isTokenMapped(address _token) {
        require(registry.isTokenMapped(_token), "TOKEN_NOT_SUPPORTED");
        _;
    }

    modifier isPredicateAuthorized() {
        require(uint8(registry.predicates(msg.sender)) != 0, "Not a valid predicate");
        _;
    }

    constructor() GovernanceLockable(address(0x0)) {}

    // deposit ETH by sending to this contract
    receive() external payable {
        depositEther();
    }

    function updateMaxErc20Deposit(uint256 maxDepositAmount) public onlyGovernance {
        require(maxDepositAmount != 0);
        emit MaxErc20DepositUpdate(maxErc20Deposit, maxDepositAmount);
        maxErc20Deposit = maxDepositAmount;
    }

    function transferAssets(address _token, address _user, uint256 _amountOrNFTId) external isPredicateAuthorized {
        address wethToken = registry.getWethTokenAddress();
        if (registry.isERC721(_token)) {
            IERC721(_token).transferFrom(address(this), _user, _amountOrNFTId);
        } else if (_token == wethToken) {
            WETH t = WETH(_token);
            t.withdraw(_amountOrNFTId, _user);
        } else {
            require(IERC20(_token).transfer(_user, _amountOrNFTId), "TRANSFER_FAILED");
        }
    }

    function depositERC20(address _token, uint256 _amount) external {
        depositERC20ForUser(_token, msg.sender, _amount);
    }

    function depositERC721(address _token, uint256 _tokenId) external {
        depositERC721ForUser(_token, msg.sender, _tokenId);
    }

    /**
     * @dev Caches childChain and stateSender (frequently used variables) from registry
     */
    function updateChildChainAndStateSender() public {
        (address _childChain, address _stateSender) = registry.getChildChainAndStateSender();
        require(
            _stateSender != address(stateSender) || _childChain != childChain,
            "Atleast one of stateSender or childChain address should change"
        );
        childChain = _childChain;
        stateSender = IInboundStateSender(_stateSender);
    }

    function depositERC20ForUser(address _token, address _user, uint256 _amount) public {
        require(_amount <= maxErc20Deposit, "exceed maximum deposit amount");
        require(IERC20(_token).transferFrom(msg.sender, address(this), _amount), "TOKEN_TRANSFER_FAILED");
        _safeCreateDepositBlock(_user, _token, _amount);
    }

    function depositERC721ForUser(address _token, address _user, uint256 _tokenId) public {
        IERC721(_token).transferFrom(msg.sender, address(this), _tokenId);
        _safeCreateDepositBlock(_user, _token, _tokenId);
    }

    // @todo: write depositEtherForUser
    function depositEther() public payable {
        address wethToken = registry.getWethTokenAddress();
        WETH t = WETH(wethToken);
        t.deposit{value: msg.value}();
        _safeCreateDepositBlock(msg.sender, wethToken, msg.value);
    }

    /**
   * @notice This will be invoked when safeTransferFrom is called on the token contract to deposit tokens to this contract
     without directly interacting with it
   * @dev msg.sender is the token contract
   * _operator The address which called `safeTransferFrom` function on the token contract
   * @param _user The address which previously owned the token
   * @param _tokenId The NFT identifier which is being transferred
   * _data Additional data with no specified format
   * @return `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
   */
    function onERC721Received(
        address /* _operator */,
        address _user,
        uint256 _tokenId,
        bytes memory /* _data */
    ) public returns (bytes4) {
        // the ERC721 contract address is the message sender
        _safeCreateDepositBlock(
            _user,
            msg.sender,
            /* token */
            _tokenId
        );
        return 0x150b7a02;
    }

    // See https://github.com/ethereum/EIPs/issues/223
    function tokenFallback(address _user, uint256 _amount, bytes memory /* _data */) public override {
        _safeCreateDepositBlock(
            _user,
            msg.sender,
            /* token */
            _amount
        );
    }

    function _safeCreateDepositBlock(
        address _user,
        address _token,
        uint256 _amountOrToken
    ) internal onlyWhenUnlocked isTokenMapped(_token) {
        depositIdCounter = depositIdCounter + 1;
        _createDepositBlock(_user, _token, _amountOrToken, depositIdCounter);
    }

    function _createDepositBlock(address _user, address _token, uint256 _amountOrToken, uint256 _depositId) internal {
        deposits[_depositId] = DepositBlock(
            keccak256(abi.encodePacked(_ETH_CHAIN, _user, _token, _amountOrToken)),
            block.timestamp
        );
        stateSender.transferPayload(childChain, abi.encode(_ETH_CHAIN, _user, _token, _amountOrToken, _depositId));
        emit NewDepositBlock(_ETH_CHAIN, _user, _token, _amountOrToken, _depositId);
    }

    function executeState(uint256 depositID, bytes calldata stateData) external returns (bool) {
        (address _user, address _token, uint256 _amountOrToken, uint256 _depositId) = abi.decode(stateData, (address, address, uint256, uint256));
        // implement withdrawal logic here
        return true;
    }
}
