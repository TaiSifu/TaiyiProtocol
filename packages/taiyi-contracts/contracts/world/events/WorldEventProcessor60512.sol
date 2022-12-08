// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
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

contract WorldEventProcessor60512 is DefaultWorldEventProcessor {

    uint256 public immutable BASE_BUILD_TIME; //基础建造时间（秒）

    constructor(uint256 baseBuildTime, address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {
        BASE_BUILD_TIME = baseBuildTime;
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你开始建造木工房。
        return "\xE4\xBD\xA0\xE5\xBC\x80\xE5\xA7\x8B\xE5\xBB\xBA\xE9\x80\xA0\xE6\x9C\xA8\xE5\xB7\xA5\xE6\x88\xBF\xE3\x80\x82";
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
        if(behavior.attributesScores(ActorBehaviorAttributesConstants.ACT, _actor) < 15)
            return false;

        IWorldFungible prestige = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_PRESTIGE));
        if(prestige.balanceOfActor(_actor) < 150e18)
            return false; //威望要求

        //资源要求
        IWorldFungible gold = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_GOLD));
        if(gold.balanceOfActor(_actor) < 95e18)
            return false;
        IWorldFungible wood = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_WOOD));
        if(wood.balanceOfActor(_actor) < 350e18)
            return false;
        IWorldFungible fabric = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_FABRIC));
        if(fabric.balanceOfActor(_actor) < 120e18)
            return false;

        return defaultRt;
    }

    function _consume_assets(uint256 _actor) internal {
        uint256 operator = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE)).operator();

        //金95,木350,织120
        IWorldFungible gold = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_GOLD));
        require(gold.balanceOfActor(_actor) >= 95e18, "gold is low");            
        gold.transferFromActor(operator, _actor, operator, 95e18);
        IWorldFungible wood = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_WOOD));
        require(wood.balanceOfActor(_actor) >= 350e18, "wood is low");            
        wood.transferFromActor(operator, _actor, operator, 350e18);
        IWorldFungible fabric = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_FABRIC));
        require(fabric.balanceOfActor(_actor) >= 120e18, "fabric is low");            
        fabric.transferFromActor(operator, _actor, operator, 120e18);

        //消耗威望
        IWorldFungible prestige = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_PRESTIGE));
        require(prestige.balanceOfActor(_actor) >= 150e18, "prestige is low");            
        prestige.transferFromActor(operator, _actor, operator, 150e18);
    }

    function _consume_items(uint256 _operator, uint256 _actor, uint256 _itemId) internal returns (uint256 buildingType) {
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        address itemOwner = items.ownerOf(_itemId);
        require(itemOwner == worldRoute.actors().getActor(_actor).account, "book is not belongs to actor");
        uint256 itemType = items.itemTypes(_itemId);
        require(itemType >= 20 && itemType <= 25, "item is not right for building");
        buildingType = itemType - 19; //1 to 6

        //uint256 operator = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE)).operator();
        items.modify(_operator, _itemId, 0);
        items.burn(_operator, _itemId);
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length == 1, "params is invalid");
        uint256 bookItemId = _uintParams[0];

        //消耗资源
        _consume_assets(_actor);

        //消耗道具
        uint256 buildingType = _consume_items(_operator, _actor, bookItemId);

        //创建木工房区域
        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        uint256[] memory lc = locations.actorLocations(_actor);
        require(lc.length == 2 && lc[0] == lc[1] && locations.isActorUnlocked(_actor), "actor is not at one location and freely");
        IWorldVillages villages = IWorldVillages(worldRoute.modules(WorldConstants.WORLD_MODULE_VILLAGES));
        require(villages.isZoneVillage(lc[0]), "actor is not at villages"); //必须在村庄

        IWorldBuildings buildings = IWorldBuildings(worldRoute.modules(WorldConstants.WORLD_MODULE_BUILDINGS));
        IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        uint256 newBuildingZoneId = zones.claim(_operator, buildings.typeNames(buildingType), _actor);
        locations.setActorLocation(_operator, _actor, newBuildingZoneId, newBuildingZoneId);

        //设置建筑
        buildings.createBuilding(_operator, _actor, buildingType, newBuildingZoneId);

        //锁定建设时长
        locations.lockActor(_operator, _actor, block.timestamp + BASE_BUILD_TIME);
    }
}
