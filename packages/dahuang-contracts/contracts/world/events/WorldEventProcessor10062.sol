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

contract WorldEventProcessor10062 is DefaultWorldEventProcessor, ERC721Holder {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你的情绪越来越低落，尝试自杀。
        return "\xE4\xBD\xA0\xE7\x9A\x84\xE6\x83\x85\xE7\xBB\xAA\xE8\xB6\x8A\xE6\x9D\xA5\xE8\xB6\x8A\xE4\xBD\x8E\xE8\x90\xBD\xEF\xBC\x8C\xE5\xB0\x9D\xE8\xAF\x95\xE8\x87\xAA\xE6\x9D\x80\xE3\x80\x82";
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
    // "branch": [
    //     "XIQ<2:10000"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IActorAttributes moodAttrs = IActorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_MOOD_ATTRIBUTES));
        if(moodAttrs.attributesScores(DahuangConstants.ATTR_XIQ, _actor) < 2)
            return 10000;

        return defaultBranchEvent;
    }
}
