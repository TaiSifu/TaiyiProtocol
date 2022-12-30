// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import './WorldZoneBaseResources.sol';
//import "hardhat/console.sol";

contract WorldZoneBaseResourcesRandom is WorldZoneBaseResources {

    constructor(uint256 _growTimeDay, uint256 _growQuantityScale, WorldContractRoute _route) WorldZoneBaseResources(_growTimeDay, _growQuantityScale, _route) 
    {
        IWorldRandom rand = IWorldRandom(_route.modules(WorldConstants.WORLD_MODULE_RANDOM));
        GOLD_GROW_QUANTITY = rand.dn(1, 100e18);
        FOOD_GROW_QUANTITY = rand.dn(1, 1000e18);
        WOOD_GROW_QUANTITY = rand.dn(1, 1000e18);
        FABRIC_GROW_QUANTITY = rand.dn(1, 100e18);
        HERB_GROW_QUANTITY = rand.dn(1, 100e18);
    }
}
