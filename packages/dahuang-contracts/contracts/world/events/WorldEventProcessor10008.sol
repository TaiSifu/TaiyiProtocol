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

contract WorldEventProcessor10008 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //在外玩耍，遇到一人送了你一本书。
        return "\xE5\x9C\xA8\xE5\xA4\x96\xE7\x8E\xA9\xE8\x80\x8D\xEF\xBC\x8C\xE9\x81\x87\xE5\x88\xB0\xE4\xB8\x80\xE4\xBA\xBA\xE9\x80\x81\xE4\xBA\x86\xE4\xBD\xA0\xE4\xB8\x80\xE6\x9C\xAC\xE4\xB9\xA6\xE3\x80\x82";
    }
    //天雷无妄（无妄卦）无妄而得
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 1;
        _t[1] = 1;
        _t[2] = 1;
        _t[3] = 0;
        _t[4] = 0;
        _t[5] = 1;
        return _t;
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //XIQ: +5
        int256[] memory atts = new int256[](2);
        atts[0] = int256(DahuangConstants.ATTR_XIQ);
        atts[1] = 5;
        return atts;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        //《叕盾术》
        items.mint(_operator, 51, 100, 0, _actor);
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        //"exclude": "(LIM<30)|(EVT?[10008])",
        IActorAttributes coreAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES));
        uint256 lim = coreAttrs.attributesScores(DahuangConstants.ATTR_LIM, _actor);
        if(lim < 30)
            return false;


        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));        
        if(evts.actorEventCount(_actor, 10008) > 0)
            return false;

        return defaultRt;
    }
}
