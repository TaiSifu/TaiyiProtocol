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

contract WorldEventProcessor10032 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        uint256 storyActor = IParameterizedStorylines(worldRoute.modules(223)).currentStoryActorByIndex(80001, 0);
        if(storyActor == 0)
            return "";

        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory storyActorName, ,) = names.actorName(storyActor);
        return string(abi.encodePacked(
            //家里来了客人，其中有一位叫
            "\xE5\xAE\xB6\xE9\x87\x8C\xE6\x9D\xA5\xE4\xBA\x86\xE5\xAE\xA2\xE4\xBA\xBA\xEF\xBC\x8C\xE5\x85\xB6\xE4\xB8\xAD\xE6\x9C\x89\xE4\xB8\x80\xE4\xBD\x8D\xE5\x8F\xAB",
            //X
            storyActorName,
            //的小孩。小孩调皮，偷了你家里的酒。
            "\xE7\x9A\x84\xE5\xB0\x8F\xE5\xAD\xA9\xE3\x80\x82\xE5\xB0\x8F\xE5\xAD\xA9\xE8\xB0\x83\xE7\x9A\xAE\xEF\xBC\x8C\xE5\x81\xB7\xE4\xBA\x86\xE4\xBD\xA0\xE5\xAE\xB6\xE9\x87\x8C\xE7\x9A\x84\xE9\x85\x92\xE3\x80\x82"
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

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        //"exclude": "daoli<1e17",
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        uint256 _pst = daoli.balanceOfActor(_actor);
        if(_pst < 1e17)
            return false;

        //"include": "剧情当前EVT?[80001|80002|80003|80004]",
        defaultRt = false; //default should be fasle if have "include" conditions
        IParameterizedStorylines globalStory = IParameterizedStorylines(worldRoute.modules(223));
        if(globalStory.isStoryExist(80001)) {
            uint256 storyActor = globalStory.currentStoryActorByIndex(80001, 0);
            uint256 currentStoryEvt = globalStory.currentActorEventByStoryId(storyActor, 80001);
            if( currentStoryEvt == 80001 ||
                currentStoryEvt == 80002 ||
                currentStoryEvt == 80003 ||
                currentStoryEvt == 80004 )
                return true;
        }

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        require(daoli.balanceOfActor(_actor) >= 1e17, "daoli is not enough");

        //"proc" : "铸造“太乙村水酒”给X",
        uint256 storyActor = IParameterizedStorylines(worldRoute.modules(223)).currentStoryActorByIndex(80001, 0);
        require(storyActor > 0, "sotry actor invalid");
        uint256 typeId = 53;
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, typeId, 100, 3, storyActor);

        //"daoli" : "-1e17"
        daoli.transferFromActor(_operator, _actor, _operator, 1e17);
    }

    // "branch": [10033]
    function checkBranch(uint256 /*_actor*/, uint256 /*_age*/) external view override virtual returns (uint256) {
        return 10033;
    }
}
