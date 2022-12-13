// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../base/Ownable.sol";

contract DefaultWorldEventProcessor is IWorldEventProcessor, WorldConfigurable, Ownable
{
    uint256 public defaultBranchEvent;

    constructor(WorldContractRoute _route, uint256 _defaultBranchEvent) WorldConfigurable(_route) {
        defaultBranchEvent = _defaultBranchEvent;
    }

    function eventInfo(uint256 /*_actor*/) virtual external view override returns (string memory) { return ""; }
    function eventAttributeModifiers(uint256 /*_actor*/) virtual external view override returns (int256[] memory) {
        int256[] memory modifiers;
        return modifiers;
    }
    function checkOccurrence(uint256 /*_actor*/, uint256 /*_age*/) virtual external view override returns (bool) { return true; }
    function process(uint256 _operator, uint256 _actor, uint256 _age) virtual external override 
        onlyYeMing(_operator)
    {}
    function activeTrigger(uint256 _operator, uint256 /*_actor*/, uint256[] memory /*_uintParams*/, string[] memory /*_stringParams*/) virtual external override 
        onlyYeMing(_operator)
    {}

    function checkBranch(uint256 /*_actor*/, uint256 /*_age*/) virtual external view override returns (uint256) {
        return defaultBranchEvent; 
    }
    
    function setDefaultBranch(uint256 _enentId) external override {
        require(_isActorApprovedOrOwner(WorldConstants.ACTOR_PANGU), "not architect approved or owner");
        defaultBranchEvent = _enentId;
    }

    function randomTrigrams(uint256 _actor) internal view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        _t[0] = (random.dn(_actor + 331, 1000)>= 500?1:0);
        _t[1] = (random.dn(_actor + 719, 1000)>= 500?1:0);
        _t[2] = (random.dn(_actor + 1013, 1000)>= 500?1:0);
        _t[3] = (random.dn(_actor + 1237, 1000)>= 500?1:0);
        _t[4] = (random.dn(_actor + 2129, 1000)>= 500?1:0);
        _t[5] = (random.dn(_actor + 13757, 1000)>= 500?1:0);
        return _t;
    }

    function trigrams(uint256 _actor) virtual external override view returns (uint256[] memory) {
        return randomTrigrams(_actor);
    }
} 
