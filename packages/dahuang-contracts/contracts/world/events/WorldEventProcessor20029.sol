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

contract WorldEventProcessor20029 is DefaultWorldEventProcessor, ERC721Holder {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //看在你长得可爱的份上家人不和你计较。
        return "\xE7\x9C\x8B\xE5\x9C\xA8\xE4\xBD\xA0\xE9\x95\xBF\xE5\xBE\x97\xE5\x8F\xAF\xE7\x88\xB1\xE7\x9A\x84\xE4\xBB\xBD\xE4\xB8\x8A\xE5\xAE\xB6\xE4\xBA\xBA\xE4\xB8\x8D\xE5\x92\x8C\xE4\xBD\xA0\xE8\xAE\xA1\xE8\xBE\x83\xE3\x80\x82";
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
}
