// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import './WorldContractRoute.sol';

contract WorldConfigurable {
    WorldContractRoute internal worldRoute;

    modifier onlyApprovedOrOwner(uint _actor) {
        require(_isActorApprovedOrOwner(_actor), 'not approved or owner of actor');
        _;
    }

    modifier onlyPanGu() {
        require(_isActorApprovedOrOwner(WorldConstants.ACTOR_PANGU), 'only PanGu');
        _;
    }

    modifier onlyYeMing(uint256 _actor) {
        require(IWorldYemings(worldRoute.modules(WorldConstants.WORLD_MODULE_YEMINGS)).isYeMing(_actor), 'only YeMing');
        require(_isActorApprovedOrOwner(_actor), "not YeMing's operator");
        _;
    }

    constructor(WorldContractRoute _route) {
        worldRoute = _route;
    }

    function _isActorApprovedOrOwner(uint _actor) internal view returns (bool) {
        IActors actors = worldRoute.actors();
        return (actors.getApproved(_actor) == msg.sender ||
            actors.ownerOf(_actor) == msg.sender ||
            actors.isApprovedForAll(actors.ownerOf(_actor), msg.sender));
    }
}
