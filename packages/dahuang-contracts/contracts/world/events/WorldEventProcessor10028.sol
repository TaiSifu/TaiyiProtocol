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

contract WorldEventProcessor10028 is DefaultWorldEventProcessor, ERC721Holder {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你很调皮，喜欢在家到处乱跑。
        return "\xE4\xBD\xA0\xE5\xBE\x88\xE8\xB0\x83\xE7\x9A\xAE\xEF\xBC\x8C\xE5\x96\x9C\xE6\xAC\xA2\xE5\x9C\xA8\xE5\xAE\xB6\xE5\x88\xB0\xE5\xA4\x84\xE4\xB9\xB1\xE8\xB7\x91\xE3\x80\x82";
    }
    //水天需（需卦）守正待机
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 1;
        _t[2] = 0;
        _t[3] = 1;
        _t[4] = 1;
        _t[5] = 1;
        return _t;
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        // "LVL": 10,
        // "XIQ": 5
        int256[] memory modifiers = new int256[](4);
        modifiers[0] = int256(DahuangConstants.ATTR_LVL);
        modifiers[1] = 10;
        modifiers[2] = int256(DahuangConstants.ATTR_XIQ);
        modifiers[3] = 5;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[10028,10052]"
        if(evts.actorEventCount(_actor, 10028) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10052) > 0)
            return false;

        //"include": "(LVL>30)&(EVT?[10009])"
        defaultRt = false; //default should be fasle if have "include" conditions
        IActorAttributes coreAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES));
        if(coreAttrs.attributesScores(DahuangConstants.ATTR_LVL, _actor) > 30
            && evts.actorEventCount(_actor, 10009) > 0)
            return true;

        return defaultRt;
    }
    // "branch": [
    //     "MEL>70:20029",
    //     "LVL<50:20028"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IActorAttributes charmAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CHARM_ATTRIBUTES));
        if(charmAttrs.attributesScores(DahuangConstants.ATTR_MEL, _actor) > 70)
            return 20029;

        IActorAttributes coreAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES));
        if(coreAttrs.attributesScores(DahuangConstants.ATTR_LVL, _actor) < 50)
            return 20028;

        return defaultBranchEvent;
    }
}
