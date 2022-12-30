// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import './WorldZoneBaseResources.sol';
//import "hardhat/console.sol";

contract WorldZoneBaseResourcesTest is WorldZoneBaseResources {

    constructor(uint256 _growTimeDay, uint256 _growQuantityScale, WorldContractRoute _route) WorldZoneBaseResources(_growTimeDay, _growQuantityScale, _route) 
    {
        GOLD_GROW_QUANTITY = 100e18;
        FOOD_GROW_QUANTITY = 1000e18;
        WOOD_GROW_QUANTITY = 1000e18;
        FABRIC_GROW_QUANTITY = 100e18;
        HERB_GROW_QUANTITY = 100e18;
    }
}
