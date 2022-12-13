// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./DefaultWorldEventProcessor.sol";
import "../attributes/ActorMoodAttributes.sol";
import "../attributes/ActorCoreAttributes.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor10015 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你父母并没有精心照顾你。
        return "\xE4\xBD\xA0\xE7\x88\xB6\xE6\xAF\x8D\xE5\xB9\xB6\xE6\xB2\xA1\xE6\x9C\x89\xE7\xB2\xBE\xE5\xBF\x83\xE7\x85\xA7\xE9\xA1\xBE\xE4\xBD\xA0\xE3\x80\x82";
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
        //"TIZ": -5,
        //"XIQ": -5
        int256[] memory modifiers = new int256[](4);
        modifiers[0] = int256(WorldConstants.ATTR_XIQ);
        modifiers[1] = -5;
        modifiers[2] = int256(WorldConstants.ATTR_TIZ);
        modifiers[3] = -5; 
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));

        //"exclude": "(EVT?[10015,10011,10019])|(TLT?[1015])"
        if(evts.actorEventCount(_actor, 10015) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10011) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10019) > 0)
            return false;
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1015)
                return false;
        }

        return defaultRt;
    }
}
