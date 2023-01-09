// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor10111 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 60002) {}
    
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出生了，是极为罕见的双性人。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x94\x9F\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE6\x9E\x81\xE4\xB8\xBA\xE7\xBD\x95\xE8\xA7\x81\xE7\x9A\x84\xE5\x8F\x8C\xE6\x80\xA7\xE4\xBA\xBA\xE3\x80\x82";
    }

    //泽风大过（大过卦）非常行动
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 1;
        _t[2] = 1;
        _t[3] = 1;
        _t[4] = 1;
        _t[5] = 0;
        return _t;
    }
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));

        //"exclude": "TLT?[1003,1004,1025]"
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1003 || tlts[i] == 1004 || tlts[i] == 1025)
                return false;
        }

        return defaultRt;
    }
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IActorsGender gender = IActorsGender(worldRoute.modules(220));
        gender.addBisexual(_operator, _actor);
    }
}
