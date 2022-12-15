// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
//import "hardhat/console.sol";

/*
default return init to be false;
check order:
    condition --> return true if match condition
    return default
*/

contract ActorTalentProcessor1049 is IActorTalentProcessor, WorldConfigurable {

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {
    }

    function checkOccurrence(uint256 /*_actor*/, uint256 _age) external virtual view override returns (bool) {
        bool defaultRt = false;

        //"condition": "AGE?[30]",
        if(_age == 30)
            return true;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override 
        onlyYeMing(_operator)
    {
        IWorldFungible gold = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD));
        //"gold": 10e18
        gold.claim(_operator, _actor, 10e18);        
    }
}
