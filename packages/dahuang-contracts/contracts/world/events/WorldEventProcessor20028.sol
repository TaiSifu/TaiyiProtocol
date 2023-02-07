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

contract WorldEventProcessor20028 is DefaultWorldEventProcessor, ERC721Holder {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //有次你不小心摔倒撞到了脑袋，智力略微受损。
        return "\xE6\x9C\x89\xE6\xAC\xA1\xE4\xBD\xA0\xE4\xB8\x8D\xE5\xB0\x8F\xE5\xBF\x83\xE6\x91\x94\xE5\x80\x92\xE6\x92\x9E\xE5\x88\xB0\xE4\xBA\x86\xE8\x84\x91\xE8\xA2\x8B\xEF\xBC\x8C\xE6\x99\xBA\xE5\x8A\x9B\xE7\x95\xA5\xE5\xBE\xAE\xE5\x8F\x97\xE6\x8D\x9F\xE3\x80\x82";
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
        // "WUX": -2
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_WUX);
        modifiers[1] = -2;
        return modifiers;
    }
}
