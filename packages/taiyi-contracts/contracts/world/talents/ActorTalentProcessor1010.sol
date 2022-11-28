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

contract ActorTalentProcessor1010 is IActorTalentProcessor, WorldConfigurable {

    constructor(address _worldRouteAddress) WorldConfigurable(_worldRouteAddress) {
    }

    function checkOccurrence(uint256 /*_actor*/, uint256 _age) external virtual view override returns (bool) {
        if(_age == 0)
            return true;
        else
            return false;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override 
        onlyYeMing(_operator)
    {
        IWorldFungible gold = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_GOLD));
        //"gold": 10e18
        gold.claim(_operator, _actor, 10e18);
    }
}
