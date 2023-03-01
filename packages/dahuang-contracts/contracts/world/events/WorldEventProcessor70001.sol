// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/StoryEventProcessor.sol";
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

contract WorldEventProcessor70001 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name, 
            //的佩剑在路上丢了，
            "\xE7\x9A\x84\xE4\xBD\xA9\xE5\x89\x91\xE5\x9C\xA8\xE8\xB7\xAF\xE4\xB8\x8A\xE4\xB8\xA2\xE4\xBA\x86\xEF\xBC\x8C",
            //X
            name,
            //准备去铁匠铺买剑。
            "\xE5\x87\x86\xE5\xA4\x87\xE5\x8E\xBB\xE9\x93\x81\xE5\x8C\xA0\xE9\x93\xBA\xE4\xB9\xB0\xE5\x89\x91\xE3\x80\x82"
        ));
    }
    
    //风天小畜（小畜卦）蓄养待进
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 1;
        _t[1] = 1;
        _t[2] = 0;
        _t[3] = 1;
        _t[4] = 1;
        _t[5] = 1;
        return _t;
    }

    function checkOccurrence(uint256 /*_actor*/, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        //"exclude": "全局处于70001线",
        IParameterizedStorylines story = IParameterizedStorylines(worldRoute.modules(223));
        if(story.isStoryExist(70001))
            return false;

        return defaultRt;
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 70002; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor70002 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //和铁匠商量价钱时，
            "\xE5\x92\x8C\xE9\x93\x81\xE5\x8C\xA0\xE5\x95\x86\xE9\x87\x8F\xE4\xBB\xB7\xE9\x92\xB1\xE6\x97\xB6\xEF\xBC\x8C",
            //X
            name, 
            //听到里屋有人说话。其中一人呻吟喊疼，说：“兄长何必下手这么重呢？”另一人说：“贤弟以为我不痛吗？可宝剑锋从磨砺出，不下重手怎么能打出好兵器呢？”
            "\xE5\x90\xAC\xE5\x88\xB0\xE9\x87\x8C\xE5\xB1\x8B\xE6\x9C\x89\xE4\xBA\xBA\xE8\xAF\xB4\xE8\xAF\x9D\xE3\x80\x82\xE5\x85\xB6\xE4\xB8\xAD\xE4\xB8\x80\xE4\xBA\xBA\xE5\x91\xBB\xE5\x90\x9F\xE5\x96\x8A\xE7\x96\xBC\xEF\xBC\x8C\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE5\x85\x84\xE9\x95\xBF\xE4\xBD\x95\xE5\xBF\x85\xE4\xB8\x8B\xE6\x89\x8B\xE8\xBF\x99\xE4\xB9\x88\xE9\x87\x8D\xE5\x91\xA2\xEF\xBC\x9F\xE2\x80\x9D\xE5\x8F\xA6\xE4\xB8\x80\xE4\xBA\xBA\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE8\xB4\xA4\xE5\xBC\x9F\xE4\xBB\xA5\xE4\xB8\xBA\xE6\x88\x91\xE4\xB8\x8D\xE7\x97\x9B\xE5\x90\x97\xEF\xBC\x9F\xE5\x8F\xAF\xE5\xAE\x9D\xE5\x89\x91\xE9\x94\x8B\xE4\xBB\x8E\xE7\xA3\xA8\xE7\xA0\xBA\xE5\x87\xBA\xEF\xBC\x8C\xE4\xB8\x8D\xE4\xB8\x8B\xE9\x87\x8D\xE6\x89\x8B\xE6\x80\x8E\xE4\xB9\x88\xE8\x83\xBD\xE6\x89\x93\xE5\x87\xBA\xE5\xA5\xBD\xE5\x85\xB5\xE5\x99\xA8\xE5\x91\xA2\xEF\xBC\x9F\xE2\x80\x9D"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 70003; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor70003 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name, 
            //掀开帘子去看，屋里并没有人，只有一柄铁锤躺在铁砧上面。
            "\xE6\x8E\x80\xE5\xBC\x80\xE5\xB8\x98\xE5\xAD\x90\xE5\x8E\xBB\xE7\x9C\x8B\xEF\xBC\x8C\xE5\xB1\x8B\xE9\x87\x8C\xE5\xB9\xB6\xE6\xB2\xA1\xE6\x9C\x89\xE4\xBA\xBA\xEF\xBC\x8C\xE5\x8F\xAA\xE6\x9C\x89\xE4\xB8\x80\xE6\x9F\x84\xE9\x93\x81\xE9\x94\xA4\xE8\xBA\xBA\xE5\x9C\xA8\xE9\x93\x81\xE7\xA0\xA7\xE4\xB8\x8A\xE9\x9D\xA2\xE3\x80\x82"
        ));
    }
    
    function eventAttributeModifiersToTrigger(uint256 /*_actor*/) public view virtual override returns (int[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_WUX);
        modifiers[1] = 10;
        return modifiers;
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 0; }
}
