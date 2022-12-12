// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor10009 is DefaultWorldEventProcessor {
    uint256 public actorNum;
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你从小生活在农村
        return "\xE4\xBD\xA0\xE4\xBB\x8E\xE5\xB0\x8F\xE7\x94\x9F\xE6\xB4\xBB\xE5\x9C\xA8\xE5\x86\x9C\xE6\x9D\x91";
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
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorBornPlaces bornPlaces = IActorBornPlaces(worldRoute.modules(WorldConstants.WORLD_MODULE_BORN_PLACES));
        if(bornPlaces.bornPlaces(_actor) == 0)
            return false;

        // uint256 bornPlace = bornPlaces.bornPlaces(_actor);
        // if(bornPlace <= 30 || bornPlace > 135)
        //     return false;

        return defaultRt;
    }
    function process(uint256 _operator, uint256 /*_actor*/, uint256 /*_age*/) external override 
        onlyYeMing(_operator)
    {
        actorNum += 1;
        //"coin": 10e18
        //IWorldFungible coin = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        //coin.claim(_actor, 10e18);
    }
}
