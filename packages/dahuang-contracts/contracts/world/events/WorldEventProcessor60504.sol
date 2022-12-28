// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
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

contract WorldEventProcessor60504 is DefaultWorldEventProcessor, ERC721Holder {

    uint256 public eventOperator;

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function initOperator(uint256 _eventOperator) external 
        onlyOwner
    {
        require(eventOperator == 0, "event operator already initialized");
        IERC721(worldRoute.actorsAddress()).transferFrom(_msgSender(), address(this), _eventOperator);
        eventOperator = _eventOperator;

        //事件经手人掌握的Gold授权给噎明
        uint256 _yeming = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD)).approveActor(eventOperator, _yeming, 1e29);
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //花钱课外补习。
        return "\xE8\x8A\xB1\xE9\x92\xB1\xE8\xAF\xBE\xE5\xA4\x96\xE8\xA1\xA5\xE4\xB9\xA0\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 _actor) external view override returns (int256[] memory) {
        //"WUX": 5 on prob 0.1
        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        int256[] memory modifiers;
        if(random.dn(_actor, 100) < 10) {
            modifiers = new int256[](2);
            modifiers[0] = int256(DahuangConstants.ATTR_WUX);
            modifiers[1] = 5;
        }
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 _age) external view override returns (bool) {
        bool defaultRt = true;

        IActorAttributes base_attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES));
        uint256 hlh = base_attributes.attributesScores(WorldConstants.ATTR_HLH, _actor);

        //"exclude": "AGE<3||AGE>6"
        if(_age < 3 || _age > 6)
            return false;
        if(hlh < 5)
            return false;

        IWorldFungible gold = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD));

        //"include": "gold > 2e18"
        defaultRt = false; //default should be fasle if have "include" conditions
        if(gold.balanceOfActor(_actor) > 2e18)
            return true;

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory /*_uintParams*/, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(eventOperator > 0, "event operator not initialized");
        IWorldFungible gold = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD));
        //"gold": -2e18
        gold.transferFromActor(_operator, _actor, eventOperator, 2e18);
    }

}
