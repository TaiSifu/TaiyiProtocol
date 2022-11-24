// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../../WorldConfigurable.sol";

contract DefaultWorldEventProcessor is IWorldEventProcessor, WorldConfigurable
{
    uint public defaultBranchEvent;

    constructor(address worldRouteAddress, uint _defaultBranchEvent) WorldConfigurable(worldRouteAddress) {
        defaultBranchEvent = _defaultBranchEvent;
    }

    function eventInfo(uint /*_actor*/) virtual external view override returns (string memory) { return ""; }
    function eventAttributeModifiers(uint /*_actor*/) virtual external view override returns (int[] memory) {
        int[] memory modifiers;
        return modifiers;
    }
    function checkOccurrence(uint /*_actor*/, uint /*_age*/) virtual external view override returns (bool) { return true; }
    function process(uint256 _operator, uint _actor, uint _age) virtual external override 
        onlyYeMing(_operator)
    {}
    function activeTrigger(uint256 _operator, uint /*_actor*/, uint[] memory /*_uintParams*/, string[] memory /*_stringParams*/) virtual external override 
        onlyYeMing(_operator)
    {}

    function checkBranch(uint /*_actor*/, uint /*_age*/) virtual external view override returns (uint) {
        return defaultBranchEvent; 
    }
    
    function setDefaultBranch(uint _enentId) external override {
        require(_isActorApprovedOrOwner(WorldConstants.ACTOR_PANGU), "not architect approved or owner");
        defaultBranchEvent = _enentId;
    }

    function randomTrigrams(uint _actor) internal view returns (uint[] memory) {
        uint[] memory _t = new uint[](6);
        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        _t[0] = (random.dn(_actor + 331, 1000)>= 500?1:0);
        _t[1] = (random.dn(_actor + 719, 1000)>= 500?1:0);
        _t[2] = (random.dn(_actor + 1013, 1000)>= 500?1:0);
        _t[3] = (random.dn(_actor + 1237, 1000)>= 500?1:0);
        _t[4] = (random.dn(_actor + 2129, 1000)>= 500?1:0);
        _t[5] = (random.dn(_actor + 13757, 1000)>= 500?1:0);
        return _t;
    }

    function trigrams(uint _actor) virtual external override view returns (uint[] memory) {
        return randomTrigrams(_actor);
    }
} 
