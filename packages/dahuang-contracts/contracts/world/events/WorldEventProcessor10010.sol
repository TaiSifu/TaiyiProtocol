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

contract WorldEventProcessor10010 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {        
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你从小生活在城市
        return "\xE4\xBD\xA0\xE4\xBB\x8E\xE5\xB0\x8F\xE7\x94\x9F\xE6\xB4\xBB\xE5\x9C\xA8\xE5\x9F\x8E\xE5\xB8\x82";
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

        IActorBornPlaces bornPlaces = IActorBornPlaces(worldRoute.modules(DahuangConstants.WORLD_MODULE_BORN_PLACES));
        if(bornPlaces.bornPlaces(_actor) == 0)
            return false;

        uint256 bornPlace = bornPlaces.bornPlaces(_actor);
        if(bornPlace > 15)
            return false;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override 
        onlyYeMing(_operator)
    {
        IActorBornFamilies bornFamilies = IActorBornFamilies(worldRoute.modules(221));
        bornFamilies.addCity(_operator, _actor);
    }
}
