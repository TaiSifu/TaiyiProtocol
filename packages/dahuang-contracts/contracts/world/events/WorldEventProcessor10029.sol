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

contract WorldEventProcessor10029 is DefaultWorldEventProcessor, ERC721Holder {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //家人从小就培养你做家务。
        return "\xE5\xAE\xB6\xE4\xBA\xBA\xE4\xBB\x8E\xE5\xB0\x8F\xE5\xB0\xB1\xE5\x9F\xB9\xE5\x85\xBB\xE4\xBD\xA0\xE5\x81\x9A\xE5\xAE\xB6\xE5\x8A\xA1\xE3\x80\x82";
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
        // "LVL": 10
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_LVL);
        modifiers[1] = 10;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        //"exclude": "(EVT?[10029])|(TLT?[1015])"
        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 10029) > 0)
            return false;

        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1015)
                return false;
        }

        //"include": "EVT?[10009]"
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 10009) > 0)
            return true;

        return defaultRt;
    }
}
