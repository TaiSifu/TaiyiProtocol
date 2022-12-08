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

contract WorldEventProcessor60513 is DefaultWorldEventProcessor {

    uint256 public xumiZone;

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你仔细查看了一粒紫金米。
        return "\xE4\xBD\xA0\xE6\x9F\xA5\xE7\x9C\x8B\xE4\xBA\x86\xE4\xB8\x80\xE7\xB2\x92\xE7\xB4\xAB\xE9\x87\x91\xE7\xB1\xB3\xE3\x80\x82";
    }

    function setXumiZoneId(uint256 _zoneId) external
        onlyOwner
    {
        require(xumiZone == 0, "xumi zone is already initialized.");
        IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        require(zones.ownerOf(_zoneId) != address(0), "zoneId is not exist.");
        xumiZone = _zoneId;
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(ActorAttributesConstants.AGE);
        modifiers[1] = -10000;
        return modifiers;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(xumiZone > 0, "xumi zone is not initialized.");
        require(_uintParams.length == 1, "params is invalid");
        uint256 itemId = _uintParams[0];

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        address itemOwner = items.ownerOf(itemId);
        require(itemOwner == worldRoute.actors().getActor(_actor).account, "item is not belongs to actor");
        uint256 itemType = items.itemTypes(itemId);
        require(itemType == 50, "item is not Zijinmi.");
        //传送到须弥域
        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        locations.setActorLocation(_operator, _actor, xumiZone, xumiZone);
    }
}
