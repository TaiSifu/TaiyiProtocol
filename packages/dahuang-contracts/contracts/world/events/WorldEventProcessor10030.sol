// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
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

contract WorldEventProcessor10030 is DefaultWorldEventProcessor, ERC721Holder {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你的脸意外被开水烫伤，毁容了。
        return "\xE4\xBD\xA0\xE7\x9A\x84\xE8\x84\xB8\xE6\x84\x8F\xE5\xA4\x96\xE8\xA2\xAB\xE5\xBC\x80\xE6\xB0\xB4\xE7\x83\xAB\xE4\xBC\xA4\xEF\xBC\x8C\xE6\xAF\x81\xE5\xAE\xB9\xE4\xBA\x86\xE3\x80\x82";
    }
    //坎为水（坎卦）行险用险
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 1;
        _t[2] = 0;
        _t[3] = 0;
        _t[4] = 1;
        _t[5] = 0;
        return _t;
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        // "MEL": -30,
        // "XIQ": -20
        int256[] memory modifiers = new int256[](4);
        modifiers[0] = int256(DahuangConstants.ATTR_MEL);
        modifiers[1] = -30;
        modifiers[2] = int256(DahuangConstants.ATTR_XIQ);
        modifiers[3] = -20;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        //"exclude": "EVT?[10030]"
        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 10030) > 0)
            return false;

        //"include": "(MEL>30)&(EVT?[10015])"
        defaultRt = false; //default should be fasle if have "include" conditions
        IActorAttributes charmAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES));
        if(charmAttrs.attributesScores(DahuangConstants.ATTR_MEL, _actor) > 30
            && evts.actorEventCount(_actor, 10015) > 0)
            return true;

        return defaultRt;
    }
    // "branch": [
    //     "XIQ<20:10062"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IActorAttributes moodAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES));
        if(moodAttrs.attributesScores(DahuangConstants.ATTR_XIQ, _actor) < 20)
            return 10062;

        return defaultBranchEvent;
    }
}
