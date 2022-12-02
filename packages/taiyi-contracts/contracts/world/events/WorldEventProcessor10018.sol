// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./DefaultWorldEventProcessor.sol";
import "../attributes/ActorMoodAttributes.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor10018 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你的父亲在种地时意外发现一袋金子。
        return "\xE4\xBD\xA0\xE7\x9A\x84\xE7\x88\xB6\xE4\xBA\xB2\xE5\x9C\xA8\xE7\xA7\x8D\xE5\x9C\xB0\xE6\x97\xB6\xE6\x84\x8F\xE5\xA4\x96\xE5\x8F\x91\xE7\x8E\xB0\xE4\xB8\x80\xE8\xA2\x8B\xE9\x87\x91\xE5\xAD\x90\xE3\x80\x82";
    }
    //天雷无妄（无妄卦）无妄而得
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 1;
        _t[1] = 1;
        _t[2] = 1;
        _t[3] = 0;
        _t[4] = 0;
        _t[5] = 1;
        return _t;
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //"XIQ": 5
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(ActorMoodAttributesConstants.XIQ);
        modifiers[1] = 5;
        return modifiers;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible gold = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_GOLD));
        //"gold": 100e18
        gold.claim(_operator, _actor, 100e18);
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[10018,10017]"
        if(evts.actorEventCount(_actor, 10018) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10017) > 0)
            return false;

        //"include": "EVT?[10009]",
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 10009) > 0)
            return true;

        return defaultRt;
    }
}
