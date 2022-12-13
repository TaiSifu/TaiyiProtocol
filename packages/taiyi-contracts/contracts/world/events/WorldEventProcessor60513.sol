// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./ZoneTraversalEventProcessor.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor60513 is ZoneTraversalEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你仔细查看了一粒紫金米。
        return "\xE4\xBD\xA0\xE6\x9F\xA5\xE7\x9C\x8B\xE4\xBA\x86\xE4\xB8\x80\xE7\xB2\x92\xE7\xB4\xAB\xE9\x87\x91\xE7\xB1\xB3\xE3\x80\x82";
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length == 1, "params is invalid");
        uint256 itemId = _uintParams[0];

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        address itemOwner = items.ownerOf(itemId);
        require(itemOwner == worldRoute.actors().getActor(_actor).account, "item is not belongs to actor");
        uint256 itemType = items.itemTypes(itemId);
        require(itemType == 50, "item is not Zijinmi.");

        _activeTravel(_operator, _actor);
    }
}
