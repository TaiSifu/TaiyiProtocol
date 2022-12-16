// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/XumiConstants.sol';
//import "hardhat/console.sol";

contract WorldEventProcessor1060002 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 60003) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你具备了结构。
        return "\xE4\xBD\xA0\xE5\x85\xB7\xE5\xA4\x87\xE4\xBA\x86\xE7\xBB\x93\xE6\x9E\x84\xE3\x80\x82";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        if(IActorTalents(worldRoute.modules(XumiConstants.WORLD_MODULE_TALENTS)).actorTalentsInitiated(_actor))
            return false;

        if(IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES)).characterPointsInitiated(_actor))
            return false;
        if(IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES)).characterPointsInitiated(_actor))
            return false;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IActorTalents(worldRoute.modules(XumiConstants.WORLD_MODULE_TALENTS)).talentActor(_operator, _actor);
        IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES)).pointActor(_operator, _actor);
        IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES)).pointActor(_operator, _actor);
    }
}
