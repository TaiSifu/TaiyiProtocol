// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor10006 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //红肚兜挂在了桌角上，你没有受伤。。
        return "\xE7\xBA\xA2\xE8\x82\x9A\xE5\x85\x9C\xE6\x8C\x82\xE5\x9C\xA8\xE4\xBA\x86\xE6\xA1\x8C\xE8\xA7\x92\xE4\xB8\x8A\xEF\xBC\x8C\xE4\xBD\xA0\xE6\xB2\xA1\xE6\x9C\x89\xE5\x8F\x97\xE4\xBC\xA4\xE3\x80\x82";
    }
    //震为雷（震卦）临危不乱
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 0;
        _t[2] = 1;
        _t[3] = 0;
        _t[4] = 0;
        _t[5] = 1;
        return _t;
    }
}
