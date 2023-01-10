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

contract WorldEventProcessor10011 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你自幼被门派收养。
        return "\xE4\xBD\xA0\xE8\x87\xAA\xE5\xB9\xBC\xE8\xA2\xAB\xE9\x97\xA8\xE6\xB4\xBE\xE6\x94\xB6\xE5\x85\xBB\xE3\x80\x82";
    }

    //水地比（比卦）诚信团结
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 1;
        _t[2] = 0;
        _t[3] = 0;
        _t[4] = 0;
        _t[5] = 0;
        return _t;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorBornPlaces bornPlaces = IActorBornPlaces(worldRoute.modules(DahuangConstants.WORLD_MODULE_BORN_PLACES));
        if(bornPlaces.bornPlaces(_actor) == 0)
            return false;

        uint256 bornPlace = bornPlaces.bornPlaces(_actor);
        if(bornPlace < 16 || bornPlace > 30)
            return false;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IActorBornFamilies bornFamilies = IActorBornFamilies(worldRoute.modules(221));
        bornFamilies.addSectarian(_operator, _actor);
    }
}
