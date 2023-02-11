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
    
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_WUX);
        modifiers[1] = 10;
        return modifiers;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory /*_uintParams*/, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        //"结束剧情"
        IParameterizedStorylines story = IParameterizedStorylines(worldRoute.modules(223));
        story.setActorStory(_operator, _actor, 70001, 0);
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 0; }
}
