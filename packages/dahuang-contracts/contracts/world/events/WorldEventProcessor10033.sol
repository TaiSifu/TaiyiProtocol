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

contract WorldEventProcessor10033 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        uint256 storyActor = IParameterizedStorylines(worldRoute.modules(223)).currentStoryActorByIndex(80001, 0);
        if(storyActor == 0)
            return "";

        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory storyActorName, ,) = names.actorName(storyActor);
        return string(abi.encodePacked(
            //作为赔偿，
            "\xE4\xBD\x9C\xE4\xB8\xBA\xE8\xB5\x94\xE5\x81\xBF\xEF\xBC\x8C",
            //X
            storyActorName,
            //送了你一样礼物。
            "\xE9\x80\x81\xE4\xBA\x86\xE4\xBD\xA0\xE4\xB8\x80\xE6\xA0\xB7\xE7\xA4\xBC\xE7\x89\xA9\xE3\x80\x82"
        ));
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        //"item" : "随机铸造"
        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        uint256 typeId = 20 + random.dn(_actor, 6); //图纸类型范围[20, 25]
        uint256 shape = random.dn(_actor+1, 9); //品相范围[0, 8]

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, typeId, 100, shape, _actor);
    }
}
