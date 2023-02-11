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

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory /*_uintParams*/, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        //"设置全局剧情并初始化参数"
        IParameterizedStorylines story = IParameterizedStorylines(worldRoute.modules(223));
        story.setActorStory(_operator, _actor, 70001, 70001);
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 70002; }
}
