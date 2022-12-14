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

contract WorldEventProcessor10000 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你死了。
        return "\xE4\xBD\xA0\xE6\xAD\xBB\xE4\xBA\x86\xE3\x80\x82";
    }

    //大过
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

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //"HLH": -1000
        int256[] memory atts = new int256[](2);
        atts[0] = int256(WorldConstants.ATTR_HLH);
        atts[1] = -1000;
        return atts;
    }
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override 
        onlyYeMing(_operator)
    {
        IWorldDeadActors deads = IWorldDeadActors(worldRoute.modules(219));
        deads.addDead(_operator, _actor);
    }
}
