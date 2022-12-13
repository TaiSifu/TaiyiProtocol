// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
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

contract WorldEventProcessor10005 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //刚学会走路，你意外从桌子上跌落。
        return "\xE5\x88\x9A\xE5\xAD\xA6\xE4\xBC\x9A\xE8\xB5\xB0\xE8\xB7\xAF\xEF\xBC\x8C\xE4\xBD\xA0\xE6\x84\x8F\xE5\xA4\x96\xE4\xBB\x8E\xE6\xA1\x8C\xE5\xAD\x90\xE4\xB8\x8A\xE8\xB7\x8C\xE8\x90\xBD\xE3\x80\x82";
    }
    //山泽损（损卦）损益制衡
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 1;
        _t[1] = 0;
        _t[2] = 0;
        _t[3] = 0;
        _t[4] = 1;
        _t[5] = 1;
        return _t;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorAttributes core_attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_CORE_ATTRIBUTES));

        //"exclude": "LIM>35",
        uint256 lim = core_attributes.attributesScores(WorldConstants.ATTR_LIM, _actor);
        if(lim > 35)
            return false;

        return defaultRt;
    }
    
    // "branch": [
    //     "TLT?[1002]:10006",
    //     "TIZ<15:10000"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {

        IActorAttributes core_attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_CORE_ATTRIBUTES));
        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));

        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1002)
                return 10006;
        }

        uint256 tiz = core_attributes.attributesScores(WorldConstants.ATTR_TIZ, _actor);
        if(tiz < 15)
            return 10000;

        return defaultBranchEvent;
    }
}
