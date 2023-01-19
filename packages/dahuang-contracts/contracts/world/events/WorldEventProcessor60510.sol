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

contract WorldEventProcessor60510 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //村民为你制作了简陋的工具。
        return "\xE6\x9D\x91\xE6\xB0\x91\xE4\xB8\xBA\xE4\xBD\xA0\xE5\x88\xB6\xE4\xBD\x9C\xE4\xBA\x86\xE7\xAE\x80\xE9\x99\x8B\xE7\x9A\x84\xE5\xB7\xA5\xE5\x85\xB7\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_ACT);
        modifiers[1] = -5;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        IActors rl = worldRoute.actors();
        uint256 mt; uint256 st;
        (mt , st) = rl.actor(_actor);
        if(st != 2) { //non exist actor or dead
            //require(false, "actor not alive");
            return false;
        }

        //区域要求
        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        uint256[] memory lc = locations.actorLocations(_actor);
        if(lc.length == 0 || lc[0]!=lc[1]) {
            //require(false, "actor is not at a zone");
            return false;
        }
        if(!IWorldVillages(worldRoute.modules(DahuangConstants.WORLD_MODULE_VILLAGES)).isZoneVillage(lc[0])) {
            //require(false, "actor is not at a village");
            return false;
        }

        //行动力要求
        IActorBehaviorAttributes behavior = IActorBehaviorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES));
        if(behavior.attributesScores(DahuangConstants.ATTR_ACT, _actor) < 5) {
            //require(false, "act point is low");
            return false;
        }

        //资源要求
        IWorldFungible gold = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD));
        if(gold.balanceOfActor(_actor) < 1e18) {
            //require(false, "gold is insufficient");
            return false;
        }
        IWorldFungible wood = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_WOOD));
        if(wood.balanceOfActor(_actor) < 10e18) {
            //require(false, "wood is insufficient");
            return false;
        }

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length == 1, "params is invalid");
        uint256 typeId = _uintParams[0];
        require(typeId>=8 && typeId<=13, "type is invalid"); //初级工具

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, typeId, 100, 0, _actor);

        //消耗资源
        IWorldFungible gold = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD));
        gold.transferFromActor(_operator, _actor, _operator, 1e18);
        IWorldFungible wood = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_WOOD));
        wood.transferFromActor(_operator, _actor, _operator, 10e18);
    }
}
