// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/*
    State Sender interface that will be used by other smart contract developers on dojima chain to call the state
    sender smart contract and send the state to the hermes chain.
*/
interface IInboundStateSender {
    // Events
    event DataTransfer(uint256 depositID, address indexed destinationContract, bytes payload);

    event TokenTransfer(
        uint256 depositID,
        bytes32 indexed destinationChain,
        address indexed destinationContract,
        address asset,
        uint256 tokenAmount,
        bytes payload
    );

    event PayloadExecuted(uint256 indexed Id, address destinationContract, string memo);

    /**
     * @notice  Function to send data to the hermes chain.
     * @param destinationContract destination chain contract address.
     * @param payload payload that will be sent to the hermes chain.
     */
    function transferPayload(address destinationContract, bytes calldata payload) external;

    /**
     * @notice  Function to receive data from the hermes chain.
     * @param destinationContract destination chain contract address.
     * @param payload payload that will be executed over the destination chain sent by the hermes.
     */
    function receivePayload(
        uint256 Id,
        address destinationContract,
        bytes calldata payload,
        string memory memo
    ) external payable;

    /**
     * @notice Function to send token with data to the hermes chain.
     * @param destinationChain destination chain name.
     * @param destinationContract destination chain contract address.
     * @param asset address of the token that will be sent to the hermes chain.
     * @param tokenAmount amount of the token that will be sent to the hermes chain.
     * @param payload data that will be sent to the hermes chain.
     */
    function tokenTransferWithPayload(
        bytes32 destinationChain,
        address destinationContract,
        address asset,
        uint256 tokenAmount,
        bytes calldata payload
    ) external;
}
