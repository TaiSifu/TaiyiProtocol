// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';

contract WorldEventProcessor70000 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //盘古开天辟地
        return "\xE7\x9B\x98\xE5\x8F\xA4\xE5\xBC\x80\xE5\xA4\xA9\xE8\xBE\x9F\xE5\x9C\xB0\xE3\x80\x82";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        if(_actor != WorldConstants.ACTOR_PANGU) //限定盘古
            return false;

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory /*_uintParams*/, string[] memory _stringParams) external override 
        onlyYeMing(_operator)
    {
        require(_actor == WorldConstants.ACTOR_PANGU, "actor must be PanGu");
        require(_stringParams.length > 0, "params is invalid");
        IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        IWorldYemings yemings = IWorldYemings(worldRoute.modules(WorldConstants.WORLD_MODULE_YEMINGS));
        for(uint256 i=0; i<_stringParams.length; i++) {
            zones.claim(_operator, _stringParams[i], yemings.YeMings(_operator), _operator);
        }
    }
}
