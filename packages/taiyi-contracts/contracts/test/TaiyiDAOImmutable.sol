// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '../governance/TaiyiDAOLogicV1.sol';

contract TaiyiDAOImmutable is TaiyiDAOLogicV1 {
    constructor(
        address timelock_,
        address sifus_,
        address admin_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) {
        admin = msg.sender;
        initialize(timelock_, sifus_, vetoer_, votingPeriod_, votingDelay_, proposalThresholdBPS_, quorumVotesBPS_);

        admin = admin_;
    }

    function initialize(
        address timelock_,
        address sifus_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) public override {
        require(msg.sender == admin, 'TaiyiDAO::initialize: admin only');
        require(address(timelock) == address(0), 'TaiyiDAO::initialize: can only initialize once');

        timelock = ITaiyiDAOExecutor(timelock_);
        sifus = SifusTokenLike(sifus_);
        vetoer = vetoer_;
        votingPeriod = votingPeriod_;
        votingDelay = votingDelay_;
        proposalThresholdBPS = proposalThresholdBPS_;
        quorumVotesBPS = quorumVotesBPS_;
    }
}
