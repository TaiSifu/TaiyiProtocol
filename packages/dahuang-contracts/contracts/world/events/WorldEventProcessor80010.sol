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

contract WorldEventProcessor80010 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name, 
            //十五六岁时参加大荒技能考试，晚上，一个披头散发的女鬼走进
            "\xE5\x8D\x81\xE4\xBA\x94\xE5\x85\xAD\xE5\xB2\x81\xE6\x97\xB6\xE5\x8F\x82\xE5\x8A\xA0\xE5\xA4\xA7\xE8\x8D\x92\xE6\x8A\x80\xE8\x83\xBD\xE8\x80\x83\xE8\xAF\x95\xEF\xBC\x8C\xE6\x99\x9A\xE4\xB8\x8A\xEF\xBC\x8C\xE4\xB8\x80\xE4\xB8\xAA\xE6\x8A\xAB\xE5\xA4\xB4\xE6\x95\xA3\xE5\x8F\x91\xE7\x9A\x84\xE5\xA5\xB3\xE9\xAC\xBC\xE8\xB5\xB0\xE8\xBF\x9B",
            //X
            name,
            //的考房。
            "\xE7\x9A\x84\xE8\x80\x83\xE6\x88\xBF\xE3\x80\x82"
        ));
    }
    
    //需要在事件80001的主角
    function needActor() public view virtual override returns (int256) {
        IWorldStoryActors storyActors = IWorldStoryActors(worldRoute.modules(226));
        if(storyActors.storyActorNum(80001) == 0)
            return 0;
        return int256(storyActors.storyActorByIndex(80001, 0));
    }

    function checkOccurrence(uint256 /*_actor*/, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        //exclude": "全局历史EVT?[80010]",
        IParameterizedStorylines story = IParameterizedStorylines(worldRoute.modules(223));
        if(story.storyHistoryNum(80010) > 0)
            return false;

        //"include": "全局历史EVT?[80001]",
        defaultRt = false; //default should be fasle if have "include" conditions
        if(story.storyHistoryNum(80001) > 0)
            return true;

        return defaultRt;
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80011; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80011 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //女鬼凶神恶煞，指甲像刀一样锋利，扯过
            "\xE5\xA5\xB3\xE9\xAC\xBC\xE5\x87\xB6\xE7\xA5\x9E\xE6\x81\xB6\xE7\x85\x9E\xEF\xBC\x8C\xE6\x8C\x87\xE7\x94\xB2\xE5\x83\x8F\xE5\x88\x80\xE4\xB8\x80\xE6\xA0\xB7\xE9\x94\x8B\xE5\x88\xA9\xEF\xBC\x8C\xE6\x89\xAF\xE8\xBF\x87",
            //X
            name, 
            //的考卷撕了个粉碎。
            "\xE7\x9A\x84\xE8\x80\x83\xE5\x8D\xB7\xE6\x92\x95\xE4\xBA\x86\xE4\xB8\xAA\xE7\xB2\x89\xE7\xA2\x8E\xE3\x80\x82"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80012; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80012 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name,
            //性格刚正，放下笔坐直身子问：“你为什么撕我的卷子？”
            "\xE6\x80\xA7\xE6\xA0\xBC\xE5\x88\x9A\xE6\xAD\xA3\xEF\xBC\x8C\xE6\x94\xBE\xE4\xB8\x8B\xE7\xAC\x94\xE5\x9D\x90\xE7\x9B\xB4\xE8\xBA\xAB\xE5\xAD\x90\xE9\x97\xAE\xEF\xBC\x9A\xE2\x80\x9C\xE4\xBD\xA0\xE4\xB8\xBA\xE4\xBB\x80\xE4\xB9\x88\xE6\x92\x95\xE6\x88\x91\xE7\x9A\x84\xE5\x8D\xB7\xE5\xAD\x90\xEF\xBC\x9F\xE2\x80\x9D"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80013; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80013 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //女鬼和
            "\xE5\xA5\xB3\xE9\xAC\xBC\xE5\x92\x8C",
            //X
            name,
            //对视了一会，说：“这里不是三十三室吗？”
            "\xE5\xAF\xB9\xE8\xA7\x86\xE4\xBA\x86\xE4\xB8\x80\xE4\xBC\x9A\xEF\xBC\x8C\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE8\xBF\x99\xE9\x87\x8C\xE4\xB8\x8D\xE6\x98\xAF\xE4\xB8\x89\xE5\x8D\x81\xE4\xB8\x89\xE5\xAE\xA4\xE5\x90\x97\xEF\xBC\x9F\xE2\x80\x9D",
            //X
            name,
            //说：“这里是三十五室。”
            "\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE8\xBF\x99\xE9\x87\x8C\xE6\x98\xAF\xE4\xB8\x89\xE5\x8D\x81\xE4\xBA\x94\xE5\xAE\xA4\xE3\x80\x82\xE2\x80\x9D"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80014; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80014 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //女鬼大惊，脸色惭愧，对
            "\xE5\xA5\xB3\xE9\xAC\xBC\xE5\xA4\xA7\xE6\x83\x8A\xEF\xBC\x8C\xE8\x84\xB8\xE8\x89\xB2\xE6\x83\xAD\xE6\x84\xA7\xEF\xBC\x8C\xE5\xAF\xB9",
            //X
            name,
            //行礼道歉。
            "\xE8\xA1\x8C\xE7\xA4\xBC\xE9\x81\x93\xE6\xAD\x89\xE3\x80\x82",
            //X
            name,
            //说：“我不原谅你。”
            "\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE6\x88\x91\xE4\xB8\x8D\xE5\x8E\x9F\xE8\xB0\x85\xE4\xBD\xA0\xE3\x80\x82\xE2\x80\x9D"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80015; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80015 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //女鬼取来空卷子，再度向
            "\xE5\xA5\xB3\xE9\xAC\xBC\xE5\x8F\x96\xE6\x9D\xA5\xE7\xA9\xBA\xE5\x8D\xB7\xE5\xAD\x90\xEF\xBC\x8C\xE5\x86\x8D\xE5\xBA\xA6\xE5\x90\x91",
            //X
            name,
            //行礼，说：“我不小心进错了房间，还请先生宽恕我。”
            "\xE8\xA1\x8C\xE7\xA4\xBC\xEF\xBC\x8C\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE6\x88\x91\xE4\xB8\x8D\xE5\xB0\x8F\xE5\xBF\x83\xE8\xBF\x9B\xE9\x94\x99\xE4\xBA\x86\xE6\x88\xBF\xE9\x97\xB4\xEF\xBC\x8C\xE8\xBF\x98\xE8\xAF\xB7\xE5\x85\x88\xE7\x94\x9F\xE5\xAE\xBD\xE6\x81\x95\xE6\x88\x91\xE3\x80\x82\xE2\x80\x9D"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80016; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80016 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name,
            //还是回答：“我不原谅你。”女鬼叹息一声，化成一缕烟飞走了。
            "\xE8\xBF\x98\xE6\x98\xAF\xE5\x9B\x9E\xE7\xAD\x94\xEF\xBC\x9A\xE2\x80\x9C\xE6\x88\x91\xE4\xB8\x8D\xE5\x8E\x9F\xE8\xB0\x85\xE4\xBD\xA0\xE3\x80\x82\xE2\x80\x9D\xE5\xA5\xB3\xE9\xAC\xBC\xE5\x8F\xB9\xE6\x81\xAF\xE4\xB8\x80\xE5\xA3\xB0\xEF\xBC\x8C\xE5\x8C\x96\xE6\x88\x90\xE4\xB8\x80\xE7\xBC\x95\xE7\x83\x9F\xE9\xA3\x9E\xE8\xB5\xB0\xE4\xBA\x86\xE3\x80\x82"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80017; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80017 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name,
            //考砸，回太乙村收拾行李，听到墙里有声音。
            "\xE8\x80\x83\xE7\xA0\xB8\xEF\xBC\x8C\xE5\x9B\x9E\xE5\xA4\xAA\xE4\xB9\x99\xE6\x9D\x91\xE6\x94\xB6\xE6\x8B\xBE\xE8\xA1\x8C\xE6\x9D\x8E\xEF\xBC\x8C\xE5\x90\xAC\xE5\x88\xB0\xE5\xA2\x99\xE9\x87\x8C\xE6\x9C\x89\xE5\xA3\xB0\xE9\x9F\xB3\xE3\x80\x82"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80018; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80018 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //那声音说：“先生不要消沉，今晚请留下，让小女子陪你一晚。”
        return "\xE9\x82\xA3\xE5\xA3\xB0\xE9\x9F\xB3\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE5\x85\x88\xE7\x94\x9F\xE4\xB8\x8D\xE8\xA6\x81\xE6\xB6\x88\xE6\xB2\x89\xEF\xBC\x8C\xE4\xBB\x8A\xE6\x99\x9A\xE8\xAF\xB7\xE7\x95\x99\xE4\xB8\x8B\xEF\xBC\x8C\xE8\xAE\xA9\xE5\xB0\x8F\xE5\xA5\xB3\xE5\xAD\x90\xE9\x99\xAA\xE4\xBD\xA0\xE4\xB8\x80\xE6\x99\x9A\xE3\x80\x82\xE2\x80\x9D";
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80019; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80019 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name,
            //回答：“我不原谅你。”那声音呜咽了一阵，随后消失了。
            "\xE5\x9B\x9E\xE7\xAD\x94\xEF\xBC\x9A\xE2\x80\x9C\xE6\x88\x91\xE4\xB8\x8D\xE5\x8E\x9F\xE8\xB0\x85\xE4\xBD\xA0\xE3\x80\x82\xE2\x80\x9D\xE9\x82\xA3\xE5\xA3\xB0\xE9\x9F\xB3\xE5\x91\x9C\xE5\x92\xBD\xE4\xBA\x86\xE4\xB8\x80\xE9\x98\xB5\xEF\xBC\x8C\xE9\x9A\x8F\xE5\x90\x8E\xE6\xB6\x88\xE5\xA4\xB1\xE4\xBA\x86\xE3\x80\x82"
        ));
    }
    
    function eventAttributeModifiersToTrigger(uint256 /*_actor*/) public view virtual override returns (int[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_XIQ);
        modifiers[1] = -10;
        return modifiers;
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 0; }
}
