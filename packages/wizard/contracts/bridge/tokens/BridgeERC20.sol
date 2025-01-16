// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "./IBridgeERC20.sol";
import {ERC20} from "../lib/ERC20.sol";

/**
 * @title BridgeERC20 represents bridge erc20
 */
contract BridgeERC20 is IBridgeERC20, ERC20 {
    address internal _bridgeManager;
    address internal _connectedToken;

    function initialize(
        address bridgeManager_,
        address connectedToken_,
        string memory name_,
        string memory symbol_,
        uint8 decimals_
    ) public override {
        require(_bridgeManager == address(0x0) &&_connectedToken == address(0x0), "BrideERC20: Token is already initialized");
        _bridgeManager = bridgeManager_;
        _connectedToken = connectedToken_;

        // setup meta data
        setupMetaData(name_, symbol_, decimals_);
    }

    // fxManager returns fx manager
    function bridgeManager() public view override returns (address) {
        return _bridgeManager;
    }

    // connectedToken returns parent token
    function connectedToken() public view override returns (address) {
        return _connectedToken;
    }

    // setup name, symbol and decimals
    function setupMetaData(string memory _name, string memory _symbol, uint8 _decimals) public {
        require(msg.sender == _bridgeManager, "Invalid sender");
        _setupMetaData(_name, _symbol, _decimals);
    }

    function mint(address user, uint256 amount) public override {
        require(msg.sender == _bridgeManager, "Invalid sender");
        _mint(user, amount);
    }

    function burn(address user, uint256 amount) public override {
        require(msg.sender == _bridgeManager, "Invalid sender");
        _burn(user, amount);
    }

}