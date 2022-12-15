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

contract WorldEventProcessor50002 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你捡到一粒奇怪的米粒。
        return "\xE4\xBD\xA0\xE6\x8D\xA1\xE5\x88\xB0\xE4\xB8\x80\xE7\xB2\x92\xE5\xA5\x87\xE6\x80\xAA\xE7\x9A\x84\xE7\xB1\xB3\xE7\xB2\x92\xE3\x80\x82";
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

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, 50, 100, 0, _actor);
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[50002]"
        if(evts.actorEventCount(_actor, 50002) > 0)
            return false;

        return defaultRt;
    }
}
