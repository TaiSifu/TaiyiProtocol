// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
import "../attributes/ActorAttributes.sol";
import "../attributes/ActorCoreAttributes.sol";
import "../attributes/ActorBehaviorAttributes.sol";
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

contract WorldEventProcessor60505 is DefaultWorldEventProcessor {

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你进行了原始的野外采集活动。
        return "\xE4\xBD\xA0\xE8\xBF\x9B\xE8\xA1\x8C\xE4\xBA\x86\xE5\x8E\x9F\xE5\xA7\x8B\xE7\x9A\x84\xE9\x87\x8E\xE5\xA4\x96\xE9\x87\x87\xE9\x9B\x86\xE6\xB4\xBB\xE5\x8A\xA8\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(ActorBehaviorAttributesConstants.ACT);
        modifiers[1] = -1;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        IActorAttributes baseAttr = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES));
        uint256 _hlh = baseAttr.attributesScores(ActorAttributesConstants.HLH, _actor);

        IActorBehaviorAttributes behavior = IActorBehaviorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES));
        uint256 _act = behavior.attributesScores(ActorBehaviorAttributesConstants.ACT, _actor);
        
        return (_hlh > 0 && _act >= 1);
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length>0, "params is invalid");
        uint256 zoneId = _uintParams[0];
        require(zoneId >=1 && zoneId <=135, "collect zone is not valid");
        //IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        //require(bytes(zones.names(zoneId)).length > 0, "zone is not exist");

        //approve zone res module the authority of timeline
        IWorldTimeline timeline = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE));
        uint256 ACTOR_YEMING = timeline.ACTOR_YEMING();
        address zoneResAddress = worldRoute.modules(WorldConstants.WORLD_MODULE_ZONE_BASE_RESOURCES);
        worldRoute.actors().approve(zoneResAddress, ACTOR_YEMING);

        IWorldZoneBaseResources zoneRes = IWorldZoneBaseResources(zoneResAddress);
        zoneRes.growAssets(_operator, zoneId); //trigger grow asset
        zoneRes.collectAssets(_operator, _actor, zoneId);
    }
}