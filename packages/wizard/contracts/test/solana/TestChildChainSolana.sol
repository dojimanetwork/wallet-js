//// SPDX-License-Identifier: UNLICENSED
//pragma solidity ^0.8.19;
//
//import {Ownable} from '../../common/misc/OwnableV2.sol';
//import {IStateReceiver} from '../../interfaces/IStateReceiver.sol';
//
//import {ChildTokenSolana} from "../../dojimachain/non_evm/solana/ChildTokenSolana.sol";
//import {TestChildSPL} from "./TestChildSPL.sol";
//
//
//contract TestChildChainSolana is Ownable, IStateReceiver {
//    // mapping for (root token => child token)
//    mapping(bytes => address) public tokens;
//    mapping(uint256 => bool) public deposits;
//    mapping(uint256 => bool) public withdraws;
//
//    // solhint-disable-next-line private-vars-leading-underscore
//    event NewToken(bytes indexed rootToken, address indexed token, uint8 _decimals);
//
//    event TokenDeposited(
//        bytes indexed rootToken,
//        address indexed childToken,
//        address indexed user,
//        uint256 amount,
//        uint256 depositId
//    );
//
//    event TokenWithdrawn(
//        bytes indexed rootToken,
//        address indexed childToken,
//        address indexed user,
//        uint256 amount,
//        uint256 withrawCount
//    );
//
//    constructor() {
//        //Mapping Dojima Token
//        tokens['DOJ-67C'] = 0x0000000000000000000000000000000000001010;
//    }
//
//    function onStateReceive(uint256 /* id */, bytes calldata data) external {
//        (address user, bytes memory rootToken, uint256 amountOrTokenId, uint256 depositId) = abi.decode(
//            data,
//            (address, bytes, uint256, uint256)
//        );
//        depositTokens(rootToken, user, amountOrTokenId, depositId);
//    }
//
//    function addToken(
//        address owner,
//        bytes memory rootToken,
//        string memory name,
//        string memory symbol,
//        uint8 decimals
//    ) public onlyOwner returns (address token) {
//        // check if root token already exists
//        require(tokens[rootToken] == address(0x0), 'Child Solana: Token already mapped');
//
//        // create new token contract
//        token = address(new TestChildSPL(owner, rootToken, name, symbol, decimals));
//
//        // add mapping with root token
//        tokens[rootToken] = token;
//
//        // broadcast new token's event
//        emit NewToken(rootToken, token, decimals);
//    }
//
//    // for testnet updates remove for mainnet @akhilpune - remove
//    function mapToken(
//        bytes memory rootToken,
//        address token) public onlyOwner {
//        tokens[rootToken] = token;
//    }
//
//    /*
//     * @notice withdrawTokens
//     * @dev: amountOrTokenId: tokenId for ERC721 and amount for ERC20
//     * @param user address for deposit
//     * @param rootToken root token address
//     * @param withdrawId
//     */
//    function withdrawTokens(
//        bytes memory rootToken,
//        address user,
//        uint256 amountOrTokenId,
//        uint256 withdrawId
//    ) public onlyOwner {
//        // check if withdrawal happens only once
//        require(withdraws[withdrawId] == false, 'Chain Solana: already withdrawal for the given Id');
//
//        // set withdrawal flag
//        withdraws[withdrawId] = true;
//
//        // retrieve child tokens
//        address childToken = tokens[rootToken];
//
//        // check if child token is mapped
//        require(childToken != address(0x0), 'Chain Solana: child token is not registered');
//
//        ChildTokenSolana obj = TestChildSPL(childToken);
//
//        // @notice withdraw tokens
//        obj.withdraw(amountOrTokenId);
//
//        // Emit TokenWithdrawn event
//        emit TokenWithdrawn(rootToken, childToken, user, amountOrTokenId, withdrawId);
//    }
//
//    /*
//     * @notice Deposit tokens
//     * @dev: amountOrTokenId: tokenId for ERC721 and amount for ERC20
//     * @param user address for deposit
//     * @param rootToken root token address
//     * @param amountOrTokenId tokenId to mint ERC721 and amount for ERC20
//     */
//    function depositTokens(
//        bytes memory rootToken,
//        address user,
//        uint256 amountOrTokenId,
//        uint256 depositId
//    ) public { // changed to public from internal in testCases
//        // check if deposit happens only once
//        require(deposits[depositId] == false, 'Child Solana: Deposit already made with the given deposit Id');
//
//        // set deposit flag
//        deposits[depositId] = true;
//
//        // retrieve child tokens
//        address childToken = tokens[rootToken];
//
//        // check if child token is mapped
//        require(childToken != address(0x0), 'Child Solana: token is not registered');
//
//        ChildTokenSolana obj = TestChildSPL(childToken);
//        // deposit tokens
//        obj.deposit(user, amountOrTokenId);
//
//        // Emit TokenDeposited event
//        emit TokenDeposited(rootToken, childToken, user, amountOrTokenId, depositId);
//    }
//}
