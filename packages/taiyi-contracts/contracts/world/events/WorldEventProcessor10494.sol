// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
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

contract WorldEventProcessor10494 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //体质过低，胎死腹中。
        return "\xE4\xBD\x93\xE8\xB4\xA8\xE8\xBF\x87\xE4\xBD\x8E\xEF\xBC\x8C\xE8\x83\x8E\xE6\xAD\xBB\xE8\x85\xB9\xE4\xB8\xAD\xE3\x80\x82";
    }
    //山地剥（剥卦）顺势而止
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 1;
        _t[1] = 0;
        _t[2] = 0;
        _t[3] = 0;
        _t[4] = 0;
        _t[5] = 0;
        return _t;
    }
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        IActorAttributes core_attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_CORE_ATTRIBUTES));

        //"exclude": "TLT?[1071]",
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1071)
                return false;
        }

        //"include": "TIZ<5"
        defaultRt = false; //default should be fasle if have "include" conditions
        IActorSocialIdentity sids = IActorSocialIdentity(worldRoute.modules(WorldConstants.WORLD_MODULE_SIDS));
        uint256 tiz = core_attributes.attributesScores(ActorCoreAttributesConstants.TIZ, _actor);
        if(tiz < 5 && sids.haveName(_actor, 49)) //太乙百子不会胎死腹中
            return true;

        return defaultRt;
    }
    // "branch": [
    //     "TIZ<5:10000"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {        
        IActorAttributes core_attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_CORE_ATTRIBUTES));
        uint256 tiz = core_attributes.attributesScores(ActorCoreAttributesConstants.TIZ, _actor);
        if(tiz < 5)
            return 10000;

        return defaultBranchEvent;
    }
}
