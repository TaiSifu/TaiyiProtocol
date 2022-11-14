// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./WorldContractRoute.sol";

contract WorldConfigurable 
{
    // Deployment Address
    address internal _owner;    

    // Address of the World Contract Route
    address internal _worldRouteContract;
    WorldContractRoute internal worldRoute;

    modifier onlyApprovedOrOwner(uint _actor) {
        require(_isActorApprovedOrOwner(_actor), "not approved or owner of actor");
        _;
    }

    modifier onlyYeMing() {
        IWorldTimeline timeline = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE));
        require(_isActorApprovedOrOwner(timeline.ACTOR_YEMING()), "not operated by YeMing");
        _;
    }

    constructor(address worldRouteAddress) {
        _owner = msg.sender;
        require(worldRouteAddress != address(0), "cannot set contract as zero address");
        _worldRouteContract = worldRouteAddress;
        worldRoute = WorldContractRoute(worldRouteAddress);
    }

    function _isActorApprovedOrOwner(uint _actor) internal view returns (bool) {
        IActors actors = worldRoute.actors();
        return (actors.getApproved(_actor) == msg.sender || actors.ownerOf(_actor) == msg.sender) || actors.isApprovedForAll(actors.ownerOf(_actor), msg.sender);
    }
}
