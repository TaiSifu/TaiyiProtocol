// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
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

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你进行了原始的野外采集活动。
        return "\xE4\xBD\xA0\xE8\xBF\x9B\xE8\xA1\x8C\xE4\xBA\x86\xE5\x8E\x9F\xE5\xA7\x8B\xE7\x9A\x84\xE9\x87\x8E\xE5\xA4\x96\xE9\x87\x87\xE9\x9B\x86\xE6\xB4\xBB\xE5\x8A\xA8\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_ACT);
        modifiers[1] = -1;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        IActorAttributes baseAttr = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES));
        uint256 _hlh = baseAttr.attributesScores(WorldConstants.ATTR_HLH, _actor);

        IActorBehaviorAttributes behavior = IActorBehaviorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES));
        uint256 _act = behavior.attributesScores(DahuangConstants.ATTR_ACT, _actor);
        
        return (_hlh > 0 && _act >= 1);
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length>0, "params is invalid");
        uint256 zoneId = _uintParams[0];
        require(zoneId >=1, "collect zone is not valid");
        //IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        //require(bytes(zones.names(zoneId)).length > 0, "zone is not exist");

        IActorLocations lcs = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        uint256[] memory lc = lcs.actorLocations(_actor);
        require(zoneId == lc[1], "must collect at actor located zone");

        //approve zone res module the authority of timeline operator
        address zoneResAddress = worldRoute.modules(DahuangConstants.WORLD_MODULE_ZONE_BASE_RESOURCES);
        worldRoute.actors().approve(zoneResAddress, _operator);

        IWorldZoneBaseResources zoneRes = IWorldZoneBaseResources(zoneResAddress);
        zoneRes.growAssets(_operator, zoneId); //trigger grow asset
        zoneRes.collectAssets(_operator, _actor, zoneId);
    }
}
