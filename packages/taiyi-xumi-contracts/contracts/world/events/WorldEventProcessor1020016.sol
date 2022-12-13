// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import "../attributes/ActorXumiAttributes.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020016 is DefaultWorldEventProcessor {
    uint[] public paticleActors;
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你成为了一个氦原子。
        return "\xE4\xBD\xA0\xE6\x88\x90\xE4\xB8\xBA\xE4\xBA\x86\xE4\xB8\x80\xE4\xB8\xAA\xE6\xB0\xA6\xE5\x8E\x9F\xE5\xAD\x90\xE3\x80\x82";
    }
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        paticleActors.push(_actor);
    }
    function particleNum() external view returns (uint) {
        return paticleActors.length;
    }
}
