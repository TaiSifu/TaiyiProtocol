// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import "../attributes/ActorXumiAttributes.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor1000020 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你遇到一个电子，相互吸引，似乎又不会走得太近。
        return "\xE4\xBD\xA0\xE9\x81\x87\xE5\x88\xB0\xE4\xB8\x80\xE4\xB8\xAA\xE7\x94\xB5\xE5\xAD\x90\xEF\xBC\x8C\xE7\x9B\xB8\xE4\xBA\x92\xE5\x90\xB8\xE5\xBC\x95\xEF\xBC\x8C\xE4\xBC\xBC\xE4\xB9\x8E\xE5\x8F\x88\xE4\xB8\x8D\xE4\xBC\x9A\xE8\xB5\xB0\xE5\xBE\x97\xE5\xA4\xAA\xE8\xBF\x91\xE3\x80\x82";
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //INF: 1
        int256[] memory atts = new int256[](2);
        atts[0] = int256(XumiConstants.ATTR_INF);
        atts[1] = 1;
        return atts;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[1000016]",
        if(evts.actorEventCount(_actor, 1000016) > 0)
            return false;

        //"include": "EVT?[1000015]",
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 1000015) > 0)
            return true;

        return defaultRt;
    }

    // "branch": [
    //     "EVT?[1000006,1000009]=>(1000021 on prob 0.5)"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 1000006) > 0 || evts.actorEventCount(_actor, 1000009) > 0) {
            uint pp = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM)).dn(_actor, 100);
            if(pp < 50)
                return 1000021;
        }

        return 0;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000021 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 1000016) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //在巨大的压力和温度下，你和电子结合了！
        return "\xE5\x9C\xA8\xE5\xB7\xA8\xE5\xA4\xA7\xE7\x9A\x84\xE5\x8E\x8B\xE5\x8A\x9B\xE5\x92\x8C\xE6\xB8\xA9\xE5\xBA\xA6\xE4\xB8\x8B\xEF\xBC\x8C\xE4\xBD\xA0\xE5\x92\x8C\xE7\x94\xB5\xE5\xAD\x90\xE7\xBB\x93\xE5\x90\x88\xE4\xBA\x86\xEF\xBC\x81";
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //MAS: 1
        int256[] memory atts = new int256[](2);
        atts[0] = int256(XumiConstants.ATTR_MAS);
        atts[1] = 1;
        return atts;
    }
}
