// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./DefaultWorldEventProcessor.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

abstract contract ZoneTraversalEventProcessor is DefaultWorldEventProcessor {

    uint256 public targetZone;

    function setTargetZoneId(uint256 _zoneId) external
        onlyOwner
    {
        require(targetZone == 0, "target zone is already initialized.");
        IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        require(zones.ownerOf(_zoneId) != address(0), "zoneId is not exist.");
        targetZone = _zoneId;
    }

    function _activeTravel(uint256 _operator, uint256 _actor) internal {
        require(targetZone > 0, "target zone is not initialized.");

        //移动位置到目的地
        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        locations.setActorLocation(_operator, _actor, targetZone, targetZone);
    }
}
