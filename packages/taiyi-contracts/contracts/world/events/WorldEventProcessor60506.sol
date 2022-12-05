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

contract WorldEventProcessor60506 is DefaultWorldEventProcessor {

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你开辟了一个聚居点。
        return "\xE4\xBD\xA0\xE5\xBC\x80\xE8\xBE\x9F\xE4\xBA\x86\xE4\xB8\x80\xE4\xB8\xAA\xE8\x81\x9A\xE5\xB1\x85\xE7\x82\xB9\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(ActorBehaviorAttributesConstants.ACT);
        modifiers[1] = -15;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        IActorBehaviorAttributes behavior = IActorBehaviorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES));
        uint256 _act = behavior.attributesScores(ActorBehaviorAttributesConstants.ACT, _actor);
        if(_act < 15)
            return false;

        IWorldFungible prestige = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_PRESTIGE));
        uint256 _pst = prestige.balanceOfActor(_actor);
        if(_pst < 150e18)
            return false; //威望要求

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory /*_uintParams*/, string[] memory _stringParams) external override 
        onlyYeMing(_operator)
    {
        require(_stringParams.length > 0, "params is invalid");
        IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        uint256 newZoneId = zones.claim(_operator, _stringParams[0], _actor);

        IWorldVillages(worldRoute.modules(WorldConstants.WORLD_MODULE_VILLAGES)).createVillage(_operator, _actor, newZoneId);

        //消耗威望
        uint256 operator = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE)).operator();
        IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_PRESTIGE)).transferFromActor(operator, _actor, operator, 150e18);
    }
}
