// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
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

contract WorldEventProcessor10013 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你的家庭更加困难，吃不饱饭。
        return "\xE4\xBD\xA0\xE7\x9A\x84\xE5\xAE\xB6\xE5\xBA\xAD\xE6\x9B\xB4\xE5\x8A\xA0\xE5\x9B\xB0\xE9\x9A\xBE\xEF\xBC\x8C\xE5\x90\x83\xE4\xB8\x8D\xE9\xA5\xB1\xE9\xA5\xAD\xE3\x80\x82";
    }
    //天水讼（讼卦）慎争戒讼
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 1;
        _t[1] = 1;
        _t[2] = 1;
        _t[3] = 0;
        _t[4] = 1;
        _t[5] = 0;
        return _t;
    }
}
