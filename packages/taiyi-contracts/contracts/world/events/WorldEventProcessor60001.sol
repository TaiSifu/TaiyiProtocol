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

contract WorldEventProcessor60001 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint /*_actor*/) external virtual view override returns (string memory) {
        //你整日无所事事。
        return "\xE4\xBD\xA0\xE6\x95\xB4\xE6\x97\xA5\xE6\x97\xA0\xE6\x89\x80\xE4\xBA\x8B\xE4\xBA\x8B\xE3\x80\x82";
    }
}
