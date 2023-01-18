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

contract WorldEventProcessor10026 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你比其他小朋友长得更可爱。
        return "\xE4\xBD\xA0\xE6\xAF\x94\xE5\x85\xB6\xE4\xBB\x96\xE5\xB0\x8F\xE6\x9C\x8B\xE5\x8F\x8B\xE9\x95\xBF\xE5\xBE\x97\xE6\x9B\xB4\xE5\x8F\xAF\xE7\x88\xB1\xE3\x80\x82";
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

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[10026,10030]"
        if(evts.actorEventCount(_actor, 10026) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10030) > 0)
            return false;

        //"include": "MEL>70"
        defaultRt = false; //default should be fasle if have "include" conditions
        IActorAttributes charmAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES));
        if(charmAttrs.attributesScores(DahuangConstants.ATTR_MEL, _actor) > 70)
            return true;

        return defaultRt;
    }
}
