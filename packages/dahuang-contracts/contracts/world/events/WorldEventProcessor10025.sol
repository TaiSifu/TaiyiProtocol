// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor10025 is DefaultWorldEventProcessor {

    uint256 immutable public zoneTaiyi;

    constructor(uint256 _zoneTaiyi, WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {
        zoneTaiyi = _zoneTaiyi;
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你和父母一同进了村。
        return "\xE4\xBD\xA0\xE5\x92\x8C\xE7\x88\xB6\xE6\xAF\x8D\xE4\xB8\x80\xE5\x90\x8C\xE8\xBF\x9B\xE4\xBA\x86\xE6\x9D\x91\xE3\x80\x82";
    }
    //风天小畜（小畜卦）蓄养待进
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 1;
        _t[1] = 1;
        _t[2] = 0;
        _t[3] = 1;
        _t[4] = 1;
        _t[5] = 1;
        return _t;
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //"XIQ": 5
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_XIQ);
        modifiers[1] = 5;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        if(zoneTaiyi == 0)
            return false;

        //"exclude": "(Location Locked)"
        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        if(locations.isActorLocked(_actor))
            return false;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        require(zoneTaiyi > 0, "taiyi zone is not initialized");
        //直接到达太乙村
        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        locations.finishActorTravel(_actor); //结束掉之前已经完成的移动
        locations.setActorLocation(_operator, _actor, zoneTaiyi, zoneTaiyi);
    }

}
