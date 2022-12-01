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

contract WorldEventProcessor60511 is DefaultWorldEventProcessor {

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //有一图纸在你手中逐渐显现。此图看似平平无奇，但你若将之传与世人并好生利用，便会在世间成就无穷造化。
        return "\xE6\x9C\x89\xE4\xB8\x80\xE5\x9B\xBE\xE7\xBA\xB8\xE5\x9C\xA8\xE4\xBD\xA0\xE6\x89\x8B\xE4\xB8\xAD\xE9\x80\x90\xE6\xB8\x90\xE6\x98\xBE\xE7\x8E\xB0\xE3\x80\x82\xE6\xAD\xA4\xE5\x9B\xBE\xE7\x9C\x8B\xE4\xBC\xBC\xE5\xB9\xB3\xE5\xB9\xB3\xE6\x97\xA0\xE5\xA5\x87\xEF\xBC\x8C\xE4\xBD\x86\xE4\xBD\xA0\xE8\x8B\xA5\xE5\xB0\x86\xE4\xB9\x8B\xE4\xBC\xA0\xE4\xB8\x8E\xE4\xB8\x96\xE4\xBA\xBA\xE5\xB9\xB6\xE5\xA5\xBD\xE7\x94\x9F\xE5\x88\xA9\xE7\x94\xA8\xEF\xBC\x8C\xE4\xBE\xBF\xE4\xBC\x9A\xE5\x9C\xA8\xE4\xB8\x96\xE9\x97\xB4\xE6\x88\x90\xE5\xB0\xB1\xE6\x97\xA0\xE7\xA9\xB7\xE9\x80\xA0\xE5\x8C\x96\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(ActorBehaviorAttributesConstants.ACT);
        modifiers[1] = -5;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        IActorBehaviorAttributes behavior = IActorBehaviorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES));
        uint256 _act = behavior.attributesScores(ActorBehaviorAttributesConstants.ACT, _actor);
        if(_act < 5)
            return false;

        IWorldFungible prestige = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_PRESTIGE));
        uint256 _pst = prestige.balanceOfActor(_actor);
        if(_pst < 5e18)
            return false; //威望要求

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length > 0, "WorldEventProcessor60511: params is invalid");
        uint256 typeId = _uintParams[0];
        require(typeId>=20 && typeId<=25, "WorldEventProcessor60511, type is invalid"); //初级建筑图纸

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, typeId, 100, 0, _actor);

        //消耗威望
        IWorldFungible prestige = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_PRESTIGE));
        prestige.transferFromActor(_operator, _actor, _operator, 5e18);
    }
}
