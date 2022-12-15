// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor1060001 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint /*_actor*/) external virtual view override returns (string memory) {
        //你四处飘荡。
        return "\xE4\xBD\xA0\xE5\x9B\x9B\xE5\xA4\x84\xE9\xA3\x98\xE8\x8D\xA1\xE3\x80\x82";
    }
}
