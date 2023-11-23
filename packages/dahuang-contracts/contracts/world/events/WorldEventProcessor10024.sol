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

contract WorldEventProcessor10024 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 10025) > 0) {
            //家人到村里务工。
            return "\xE5\xAE\xB6\xE4\xBA\xBA\xE5\x88\xB0\xE6\x9D\x91\xE9\x87\x8C\xE5\x8A\xA1\xE5\xB7\xA5\xE3\x80\x82";
        }
        else {
            //家人到村里务工，你在山里留守。
            return "\xE5\xAE\xB6\xE4\xBA\xBA\xE5\x88\xB0\xE6\x9D\x91\xE9\x87\x8C\xE5\x8A\xA1\xE5\xB7\xA5\xEF\xBC\x8C\xE4\xBD\xA0\xE5\x9C\xA8\xE5\xB1\xB1\xE9\x87\x8C\xE7\x95\x99\xE5\xAE\x88\xE3\x80\x82";
        }
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

        //exclude": "EVT?[10016,10017,10024]"
        if(evts.actorEventCount(_actor, 10016) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10017) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10024) > 0)
            return false;

        //"include": "EVT?[10009]"
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 10009) > 0)
            return true;

        return defaultRt;
    }
    // "branch": [
    //     "TLT?[1015]:10025"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1015)
                return 10025;
        }

        return defaultBranchEvent;
    }
}
