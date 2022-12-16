// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
//import "hardhat/console.sol";

contract WorldEventProcessor60002 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 60003) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //百岁礼。
        return "\xE7\x99\xBE\xE5\xB2\x81\xE7\xA4\xBC\xE3\x80\x82";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        if(IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS)).actorTalentsInitiated(_actor))
            return false;

        if(IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES)).characterPointsInitiated(_actor))
            return false;
        if(IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES)).characterPointsInitiated(_actor))
            return false;
        if(IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES)).characterPointsInitiated(_actor))
            return false;
        if(IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES)).characterPointsInitiated(_actor))
            return false;
        if(IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES)).characterPointsInitiated(_actor))
            return false;        

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS)).talentActor(_operator, _actor);
        IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES)).pointActor(_operator, _actor);
        IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES)).pointActor(_operator, _actor);
        IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES)).pointActor(_operator, _actor);
        IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES)).pointActor(_operator, _actor);
        IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES)).pointActor(_operator, _actor);
    }
}
