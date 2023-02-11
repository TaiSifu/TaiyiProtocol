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
    
    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory /*_uintParams*/, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        //"设置全局剧情并初始化参数"
        IParameterizedStorylines story = IParameterizedStorylines(worldRoute.modules(223));
        story.setActorStory(_operator, _actor, 70001, 70002);
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 70003; }
}
