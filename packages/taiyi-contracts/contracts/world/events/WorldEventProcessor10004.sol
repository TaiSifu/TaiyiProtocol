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

contract WorldEventProcessor10004 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //可能是玉佩保佑，你活了下来。
        return "\xE5\x8F\xAF\xE8\x83\xBD\xE6\x98\xAF\xE7\x8E\x89\xE4\xBD\xA9\xE4\xBF\x9D\xE4\xBD\x91\xEF\xBC\x8C\xE4\xBD\xA0\xE6\xB4\xBB\xE4\xBA\x86\xE4\xB8\x8B\xE6\x9D\xA5\xE3\x80\x82";
    }
    //地水师（师卦）行险而顺
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 0;
        _t[2] = 0;
        _t[3] = 0;
        _t[4] = 1;
        _t[5] = 0;
        return _t;
    }
}
