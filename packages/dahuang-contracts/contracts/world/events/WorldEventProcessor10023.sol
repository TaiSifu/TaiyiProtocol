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

contract WorldEventProcessor10023 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你什么事都要让着弟弟。
        return "\xE4\xBD\xA0\xE4\xBB\x80\xE4\xB9\x88\xE4\xBA\x8B\xE9\x83\xBD\xE8\xA6\x81\xE8\xAE\xA9\xE7\x9D\x80\xE5\xBC\x9F\xE5\xBC\x9F\xE3\x80\x82";
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
        //"XIQ": -5
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_XIQ);
        modifiers[1] = -5;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"exclude": "(EVT?[10023])|(TLT?[1015])"
        if(evts.actorEventCount(_actor, 10023) > 0)
            return false;

        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1015)
                return false;
        }

        //"include": "EVT?[10014]"
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 10014) > 0)
            return true;

        return defaultRt;
    }
}
