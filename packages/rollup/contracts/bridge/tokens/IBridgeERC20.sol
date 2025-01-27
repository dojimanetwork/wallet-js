// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {IERC20} from "../lib/IERC20.sol";

interface IBridgeERC20 is IERC20 {
    function bridgeManager() external returns (address);

    function connectedToken() external returns (address);

    function initialize(
        address bridgeManager_,
        address _connectedToken,
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) external;

    function mint(address user, uint256 amount) external;

    function burn(address user, uint256 amount) external;
}