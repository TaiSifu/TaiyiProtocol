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

contract WorldEventProcessor60507 is DefaultWorldEventProcessor {

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你申请了一个初级商会资格。
        return "\xE4\xBD\xA0\xE7\x94\xB3\xE8\xAF\xB7\xE4\xBA\x86\xE4\xB8\x80\xE4\xB8\xAA\xE5\x88\x9D\xE7\xBA\xA7\xE5\x95\x86\xE4\xBC\x9A\xE8\xB5\x84\xE6\xA0\xBC\xE3\x80\x82";
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
        if(_pst < 10e18)
            return false; //威望要求

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length > 0, "params is invalid");
        uint256 typeId = _uintParams[0];
        require(typeId>=1 && typeId<=7, "type is invalid"); //初级商会资格

        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        uint256 shapeId = random.dn(_actor, 9);
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, typeId, 100, shapeId, _actor);

        //消耗威望
        IWorldFungible prestige = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_PRESTIGE));
        IWorldTimeline timeline = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE));
        uint256 operator = timeline.operator();
        prestige.transferFromActor(operator, _actor, operator, 10e18);
    }
}
