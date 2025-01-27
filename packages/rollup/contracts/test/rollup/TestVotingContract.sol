// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '../../dojimachain/rollups/common/VotingContract.sol';

contract TestVotingContract is VotingContract {
    constructor(address registryAddress) VotingContract(registryAddress) {}

    // Expose the internal function as public for testing
    function testVerifySignature(uint128 withdrawID, bytes memory signature) public view returns (bool) {
        VotingSession storage session = votings[withdrawID];
        address tssPublicKey = registry.getRollupInfo(session.rollupID).tssAddress;
        return verifySignature(session, signature, tssPublicKey);
    }
}
