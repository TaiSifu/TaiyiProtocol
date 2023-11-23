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

contract WorldEventProcessor10021 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你天资聪颖，家人很关注你的学习。
        return "\xE4\xBD\xA0\xE5\xA4\xA9\xE8\xB5\x84\xE8\x81\xAA\xE9\xA2\x96\xEF\xBC\x8C\xE5\xAE\xB6\xE4\xBA\xBA\xE5\xBE\x88\xE5\x85\xB3\xE6\xB3\xA8\xE4\xBD\xA0\xE7\x9A\x84\xE5\xAD\xA6\xE4\xB9\xA0\xE3\x80\x82";
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
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //"WUX": 10
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_WUX);
        modifiers[1] = 10;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[10021,10020]"
        if(evts.actorEventCount(_actor, 10020) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10021) > 0)
            return false;

        //"include": "(EVT?[10009])&(WUX>=70)&(daoli>3e17)"
        defaultRt = false; //default should be fasle if have "include" conditions
        IActorAttributes coreAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES));
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        if(evts.actorEventCount(_actor, 10009) > 0 
            && coreAttrs.attributesScores(DahuangConstants.ATTR_WUX, _actor) >= 70
            && daoli.balanceOfActor(_actor) > 3e17)
            return true;

        return defaultRt;
    }
}
