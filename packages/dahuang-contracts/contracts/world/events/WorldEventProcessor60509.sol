// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor60509 is DefaultWorldEventProcessor {

    uint256 public immutable BASE_TRAVEL_TIME; //基础旅行时间（秒）

    constructor(uint256 baseTravelTime, WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {
        BASE_TRAVEL_TIME = baseTravelTime;
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你步行前往另外地区。
        return '\xE4\xBD\xA0\xE6\xAD\xA5\xE8\xA1\x8C\xE5\x89\x8D\xE5\xBE\x80\xE5\x8F\xA6\xE5\xA4\x96\xE5\x9C\xB0\xE5\x8C\xBA\xE3\x80\x82';
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_ACT);
        modifiers[1] = -15;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        IActors actors = worldRoute.actors();
        if(actors.mintTime(_actor) == 0) //non exist actor
            return false;
        IActorAttributes baseAttrs = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES));
        uint256 _hlh = baseAttrs.attributesScores(WorldConstants.ATTR_HLH, _actor);
        if(_hlh == 0) //dead actor
            return false;

        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        if(locations.isActorLocked(_actor)) {
            //require(false, "actor can not move");
            return false;
        }

        IActorBehaviorAttributes behavior = IActorBehaviorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES));
        uint256 _act = behavior.attributesScores(DahuangConstants.ATTR_ACT, _actor);
        if(_act < 15) {
            //require(false, "action point is low");
            return false;
        }

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length == 2, "params is invalid");
        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        uint256[] memory lc = locations.actorLocations(_actor);
        uint256 zoneA = _uintParams[0];
        uint256 zoneB = _uintParams[1];
        require(zoneA != zoneB, "zone A is same as B");
        require(lc.length == 2 && lc[1] == zoneA, "actor is not at zone A");

        locations.setActorLocation(_operator, _actor, zoneA, zoneB);
        locations.lockActor(_operator, _actor, block.timestamp + BASE_TRAVEL_TIME);
    }
}
