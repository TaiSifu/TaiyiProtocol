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

contract WorldEventProcessor10002 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 60002) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出生了，是个女孩。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x94\x9F\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE5\xA5\xB3\xE5\xAD\xA9\xE3\x80\x82";
    }
    
    //坤
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 0;
        _t[2] = 0;
        _t[3] = 0;
        _t[4] = 0;
        _t[5] = 0;
        return _t;
    }
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));

        //"exclude": "TLT?[1003,1024,1025]"
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1003 || tlts[i] == 1024 || tlts[i] == 1025)
                return false;
        }

        return defaultRt;
    }
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IActorsGender gender = IActorsGender(worldRoute.modules(220));
        gender.addFemale(_operator, _actor);
    }
}
