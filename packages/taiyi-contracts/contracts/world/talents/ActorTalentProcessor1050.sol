// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
//import "hardhat/console.sol";

/*
default return init to be false;
check order:
    condition --> return true if match condition
    return default
*/

contract ActorTalentProcessor1050 is IActorTalentProcessor, WorldConfigurable {

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {
    }

    function checkOccurrence(uint256 /*_actor*/, uint256 _age) external virtual view override returns (bool) {
        bool defaultRt = false;

        //"condition": "AGE?[40]",
        if(_age == 40)
            return true;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 _age) external override 
        onlyYeMing(_operator)
    {        
    }
}
