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

contract WorldEventProcessor10017 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你的父亲因病去世，家庭更加困难了。
        return "\xE4\xBD\xA0\xE7\x9A\x84\xE7\x88\xB6\xE4\xBA\xB2\xE5\x9B\xA0\xE7\x97\x85\xE5\x8E\xBB\xE4\xB8\x96\xEF\xBC\x8C\xE5\xAE\xB6\xE5\xBA\xAD\xE6\x9B\xB4\xE5\x8A\xA0\xE5\x9B\xB0\xE9\x9A\xBE\xE4\xBA\x86\xE3\x80\x82";
    }
    //水雷屯（屯卦）起始维艰
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 1;
        _t[2] = 0;
        _t[3] = 0;
        _t[4] = 0;
        _t[5] = 1;
        return _t;
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //"XIQ": -10
        int256[] memory modifiers = new int256[](4);
        modifiers[0] = int256(DahuangConstants.ATTR_XIQ);
        modifiers[1] = -10;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));
        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"exclude": "(EVT?[10016,10125,10126])|(TLT?[1029])"
        if(evts.actorEventCount(_actor, 10016) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10125) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10126) > 0)
            return false;
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1029)
                return false;
        }

        //"include": "(EVT?[10009])&(LVL<30)&(XIQ<30)&(daoli<3e17)"
        defaultRt = false; //default should be fasle if have "include" conditions
        IActorAttributes coreAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES));
        IActorAttributes moodAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES)); 
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        if(evts.actorEventCount(_actor, 10009) > 0 
            && coreAttrs.attributesScores(DahuangConstants.ATTR_LVL, _actor) < 30
            && moodAttrs.attributesScores(DahuangConstants.ATTR_XIQ, _actor) < 30
            && daoli.balanceOfActor(_actor) < 3e17)
            return true;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        //"daoli": -1e17
        if(daoli.balanceOfActor(_actor) < 1e17)
            daoli.transferFromActor(_operator, _actor, _operator, daoli.balanceOfActor(_actor));
        else
            daoli.transferFromActor(_operator, _actor, _operator, 1e17);
    }

    // "branch": [
    //     "EVT?[10016]:10000"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 10016) > 0)
            return 10000;

        return defaultBranchEvent;
    }
}
