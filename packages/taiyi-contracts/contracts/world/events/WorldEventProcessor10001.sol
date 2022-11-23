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

contract WorldEventProcessor10001 is DefaultWorldEventProcessor {

    uint[] public maleActors;

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 60002) {
    }

    function eventInfo(uint /*_actor*/) external virtual view override returns (string memory) {
        //你出生了，是个男孩。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x94\x9F\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE7\x94\xB7\xE5\xAD\xA9\xE3\x80\x82";
    }
    //乾
    function trigrams(uint /*_actor*/) virtual external override view returns (uint[] memory) {
        uint[] memory _t = new uint[](6);
        _t[0] = 1;
        _t[1] = 1;
        _t[2] = 1;
        _t[3] = 1;
        _t[4] = 1;
        _t[5] = 1;
        return _t;
    }
    function checkOccurrence(uint _actor, uint /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));

        //"exclude": "TLT?[1004,1024,1025]"
        uint[] memory tlts = talents.actorTalents(_actor);
        for(uint i=0; i<tlts.length; i++) {
            if(tlts[i] == 1004 || tlts[i] == 1024 || tlts[i] == 1025)
                return false;
        }

        return defaultRt;
    }
    function process(uint256 _operator, uint _actor, uint /*_age*/) external override 
        onlyYeMing(_operator)
    {
        maleActors.push(_actor);
    }
    function maleNum() external view returns (uint) {
        return maleActors.length;
    }
}
