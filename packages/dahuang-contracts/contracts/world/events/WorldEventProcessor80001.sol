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

contract WorldEventProcessor80001 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name, 
            //年少时，随着家人各处开荒。
            "\xE5\xB9\xB4\xE5\xB0\x91\xE6\x97\xB6\xEF\xBC\x8C\xE9\x9A\x8F\xE7\x9D\x80\xE5\xAE\xB6\xE4\xBA\xBA\xE5\x90\x84\xE5\xA4\x84\xE5\xBC\x80\xE8\x8D\x92\xE3\x80\x82"
        ));
    }
    
    function checkOccurrence(uint256 /*_actor*/, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        //exclude": "全局历史EVT?[80001]",
        IParameterizedStorylines story = IParameterizedStorylines(worldRoute.modules(223));
        if(story.storyHistoryNum(80001) > 0)
            return false;

        return defaultRt;
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80002; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80002 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //有一天，车马在野外树林歇息，
            "\xE6\x9C\x89\xE4\xB8\x80\xE5\xA4\xA9\xEF\xBC\x8C\xE8\xBD\xA6\xE9\xA9\xAC\xE5\x9C\xA8\xE9\x87\x8E\xE5\xA4\x96\xE6\xA0\x91\xE6\x9E\x97\xE6\xAD\x87\xE6\x81\xAF\xEF\xBC\x8C",
            //X
            name, 
            //去小解，在一条小溪边见到一条龙。
            "\xE5\x8E\xBB\xE5\xB0\x8F\xE8\xA7\xA3\xEF\xBC\x8C\xE5\x9C\xA8\xE4\xB8\x80\xE6\x9D\xA1\xE5\xB0\x8F\xE6\xBA\xAA\xE8\xBE\xB9\xE8\xA7\x81\xE5\x88\xB0\xE4\xB8\x80\xE6\x9D\xA1\xE9\xBE\x99\xE3\x80\x82"
        ));
    }
    
    function activeTrigger(uint256 _operator, uint256 /*_actor*/, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length == 1 && _uintParams[0]>0, "uintParams error");
        //"item": "神·一品《寻龙诀》"
        uint256 typeId = 52;
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, typeId, 100, 8, _uintParams[0]);
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80003; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80003 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //龙卧在溪边，一副倦怠沮丧的样子。
            "\xE9\xBE\x99\xE5\x8D\xA7\xE5\x9C\xA8\xE6\xBA\xAA\xE8\xBE\xB9\xEF\xBC\x8C\xE4\xB8\x80\xE5\x89\xAF\xE5\x80\xA6\xE6\x80\xA0\xE6\xB2\xAE\xE4\xB8\xA7\xE7\x9A\x84\xE6\xA0\xB7\xE5\xAD\x90\xE3\x80\x82",
            //X
            name, 
            //胆大，于是去问道：“为什么这么不开心呢？”
            "\xE8\x83\x86\xE5\xA4\xA7\xEF\xBC\x8C\xE4\xBA\x8E\xE6\x98\xAF\xE5\x8E\xBB\xE9\x97\xAE\xE9\x81\x93\xEF\xBC\x9A\xE2\x80\x9C\xE4\xB8\xBA\xE4\xBB\x80\xE4\xB9\x88\xE8\xBF\x99\xE4\xB9\x88\xE4\xB8\x8D\xE5\xBC\x80\xE5\xBF\x83\xE5\x91\xA2\xEF\xBC\x9F\xE2\x80\x9D"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80004; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80004 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //龙说：“实不相瞒，我听闻附近村内的佳酿十分淳美，一路赶来，却得知酒已经被商户全买走了。”
        return "\xE9\xBE\x99\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE5\xAE\x9E\xE4\xB8\x8D\xE7\x9B\xB8\xE7\x9E\x92\xEF\xBC\x8C\xE6\x88\x91\xE5\x90\xAC\xE9\x97\xBB\xE9\x99\x84\xE8\xBF\x91\xE6\x9D\x91\xE5\x86\x85\xE7\x9A\x84\xE4\xBD\xB3\xE9\x85\xBF\xE5\x8D\x81\xE5\x88\x86\xE6\xB7\xB3\xE7\xBE\x8E\xEF\xBC\x8C\xE4\xB8\x80\xE8\xB7\xAF\xE8\xB5\xB6\xE6\x9D\xA5\xEF\xBC\x8C\xE5\x8D\xB4\xE5\xBE\x97\xE7\x9F\xA5\xE9\x85\x92\xE5\xB7\xB2\xE7\xBB\x8F\xE8\xA2\xAB\xE5\x95\x86\xE6\x88\xB7\xE5\x85\xA8\xE4\xB9\xB0\xE8\xB5\xB0\xE4\xBA\x86\xE3\x80\x82\xE2\x80\x9D";
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80005; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80005 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //X
            name,
            //便去车上抱了一坛酒送给龙，龙大喜过望，化作一女子抱坛牛饮。
            "\xE4\xBE\xBF\xE5\x8E\xBB\xE8\xBD\xA6\xE4\xB8\x8A\xE6\x8A\xB1\xE4\xBA\x86\xE4\xB8\x80\xE5\x9D\x9B\xE9\x85\x92\xE9\x80\x81\xE7\xBB\x99\xE9\xBE\x99\xEF\xBC\x8C\xE9\xBE\x99\xE5\xA4\xA7\xE5\x96\x9C\xE8\xBF\x87\xE6\x9C\x9B\xEF\xBC\x8C\xE5\x8C\x96\xE4\xBD\x9C\xE4\xB8\x80\xE5\xA5\xB3\xE5\xAD\x90\xE6\x8A\xB1\xE5\x9D\x9B\xE7\x89\x9B\xE9\xA5\xAE\xE3\x80\x82"
        ));
    }
    
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        //"include": "X有item“太乙村水酒”",
        defaultRt = false; //default should be fasle if have "include" conditions
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        uint256 ict = items.balanceOfActor(_actor);
        for(uint256 i=0; i<ict; i++) {
            if(items.itemTypes(items.tokenOfActorByIndex(_actor, i)) == 53)
                return true;
        }

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory /*_uintParams*/, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        //"proc": "消耗“太乙村水酒”"
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        uint256 ict = items.balanceOfActor(_actor);
        for(uint256 i=0; i<ict; i++) {
            uint256 _item = items.tokenOfActorByIndex(_actor, i);
            if(items.itemTypes(_item) == 53) {
                items.burn(_operator, _item);
            }
        }
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80006; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80006 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //女子说：“你将美酒送我，我该给你什么作为答谢呢？”
            "\xE5\xA5\xB3\xE5\xAD\x90\xE8\xAF\xB4\xEF\xBC\x9A\xE2\x80\x9C\xE4\xBD\xA0\xE5\xB0\x86\xE7\xBE\x8E\xE9\x85\x92\xE9\x80\x81\xE6\x88\x91\xEF\xBC\x8C\xE6\x88\x91\xE8\xAF\xA5\xE7\xBB\x99\xE4\xBD\xA0\xE4\xBB\x80\xE4\xB9\x88\xE4\xBD\x9C\xE4\xB8\xBA\xE7\xAD\x94\xE8\xB0\xA2\xE5\x91\xA2\xEF\xBC\x9F\xE2\x80\x9D",
            //X
            name,
            //回答：“一坛酒不过十五六钱，答谢就不必了。”
            "\xE5\x9B\x9E\xE7\xAD\x94\xEF\xBC\x9A\xE2\x80\x9C\xE4\xB8\x80\xE5\x9D\x9B\xE9\x85\x92\xE4\xB8\x8D\xE8\xBF\x87\xE5\x8D\x81\xE4\xBA\x94\xE5\x85\xAD\xE9\x92\xB1\xEF\xBC\x8C\xE7\xAD\x94\xE8\xB0\xA2\xE5\xB0\xB1\xE4\xB8\x8D\xE5\xBF\x85\xE4\xBA\x86\xE3\x80\x82\xE2\x80\x9D"
        ));
    }
    
    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80007; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80007 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //于是女子掬起一捧溪水给
            "\xE4\xBA\x8E\xE6\x98\xAF\xE5\xA5\xB3\xE5\xAD\x90\xE6\x8E\xAC\xE8\xB5\xB7\xE4\xB8\x80\xE6\x8D\xA7\xE6\xBA\xAA\xE6\xB0\xB4\xE7\xBB\x99",
            //X
            name,
            //喝，
            "\xE5\x96\x9D\xEF\xBC\x8C",
            //X
            name,
            //觉得溪水十分清冽，与往常所喝的水截然不同。
            "\xE8\xA7\x89\xE5\xBE\x97\xE6\xBA\xAA\xE6\xB0\xB4\xE5\x8D\x81\xE5\x88\x86\xE6\xB8\x85\xE5\x86\xBD\xEF\xBC\x8C\xE4\xB8\x8E\xE5\xBE\x80\xE5\xB8\xB8\xE6\x89\x80\xE5\x96\x9D\xE7\x9A\x84\xE6\xB0\xB4\xE6\x88\xAA\xE7\x84\xB6\xE4\xB8\x8D\xE5\x90\x8C\xE3\x80\x82"
        ));
    }
    
    function activeTrigger(uint256 _operator, uint256 /*_actor*/, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length == 1 && _uintParams[0]>0, "uintParams error");
        //"item" : "神·一品“龙溪水”"
        uint256 typeId = 54;
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, typeId, 100, 8, _uintParams[0]);
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual override returns (uint256) { return 80008; }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract WorldEventProcessor80008 is StoryEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory name, ,) = names.actorName(_actor);
        return string(abi.encodePacked(
            //女子喝光美酒后对
            "\xE5\xA5\xB3\xE5\xAD\x90\xE5\x96\x9D\xE5\x85\x89\xE7\xBE\x8E\xE9\x85\x92\xE5\x90\x8E\xE5\xAF\xB9",
            //X
            name,
            //行礼道别，从此以后，
            "\xE8\xA1\x8C\xE7\xA4\xBC\xE9\x81\x93\xE5\x88\xAB\xEF\xBC\x8C\xE4\xBB\x8E\xE6\xAD\xA4\xE4\xBB\xA5\xE5\x90\x8E\xEF\xBC\x8C",
            //X
            name,
            //就能看见妖鬼了。
            "\xE5\xB0\xB1\xE8\x83\xBD\xE7\x9C\x8B\xE8\xA7\x81\xE5\xA6\x96\xE9\xAC\xBC\xE4\xBA\x86\xE3\x80\x82"
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
