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

contract WorldEventProcessor10019 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你的父母对你视若珍宝，呵护备至。
        return "\xE4\xBD\xA0\xE7\x9A\x84\xE7\x88\xB6\xE6\xAF\x8D\xE5\xAF\xB9\xE4\xBD\xA0\xE8\xA7\x86\xE8\x8B\xA5\xE7\x8F\x8D\xE5\xAE\x9D\xEF\xBC\x8C\xE5\x91\xB5\xE6\x8A\xA4\xE5\xA4\x87\xE8\x87\xB3\xE3\x80\x82";
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
        //"LVL": 10,
        //"XIQ": 10
        int256[] memory modifiers = new int256[](4);
        modifiers[0] = int256(DahuangConstants.ATTR_XIQ);
        modifiers[1] = 10;
        modifiers[2] = int256(DahuangConstants.ATTR_LVL);
        modifiers[3] = 10;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[10015,10016,10017,10019]"
        if(evts.actorEventCount(_actor, 10015) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10016) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10017) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10019) > 0)
            return false;

        return defaultRt;
    }
}
