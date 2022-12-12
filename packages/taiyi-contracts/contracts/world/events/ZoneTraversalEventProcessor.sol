// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
import "../attributes/ActorAttributes.sol";
import "../../base/DateTimeLibrary.sol";
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

        //记录所在时间线当前年龄
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        address zt = zones.timelines(locations.actorLocations(_actor)[0]);
        require(zt != address(0), "current zone timeline invalid");
        IActorTimelineAges atas = IActorTimelineAges(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_TIMELINE_LASTAGES));
        atas.setActorTimelineLastAge(_operator, _actor, zt, evts.ages(_actor));

        //根据目的地时间线记录设置进入年龄
        address target_zt = zones.timelines(targetZone);
        require(target_zt != address(0), "target zone timeline invalid");
        evts.changeAge(_operator, _actor, atas.actorTimelineLastAges(_actor, target_zt));

        //移动位置到目的地
        locations.setActorLocation(_operator, _actor, targetZone, targetZone);
    }
}
