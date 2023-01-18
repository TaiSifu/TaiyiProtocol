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

contract WorldEventProcessor10027 is DefaultWorldEventProcessor, ERC721Holder {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你的母亲救了个人，得到了很多感谢金。
        return "\xE4\xBD\xA0\xE7\x9A\x84\xE6\xAF\x8D\xE4\xBA\xB2\xE6\x95\x91\xE4\xBA\x86\xE4\xB8\xAA\xE4\xBA\xBA\xEF\xBC\x8C\xE5\xBE\x97\xE5\x88\xB0\xE4\xBA\x86\xE5\xBE\x88\xE5\xA4\x9A\xE6\x84\x9F\xE8\xB0\xA2\xE9\x87\x91\xE3\x80\x82";
    }
    //坤为地（坤卦）厚德载物
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 0;
        _t[2] = 0;
        _t[3] = 0;
        _t[4] = 0;
        _t[5] = 0;
        return _t;
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //"XIQ": 10
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_XIQ);
        modifiers[1] = 10;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"exclude": "(EVT?[10027,10016])|(Yeming资金不足)"
        if(evts.actorEventCount(_actor, 10027) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10016) > 0)
            return false;

        //验证角色所在时间线“道理”够不够
        uint256 YeMing = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        if(daoli.balanceOfActor(YeMing) < 5e17)
            return false;

        //"include": "EVT?[10009]"
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 10009) > 0)
            return true;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        uint256 YeMing = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
        require(_operator == YeMing, "not at actor's timeline");
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        require(daoli.balanceOfActor(YeMing) >= 5e17, "yeming have not enough daoli");

        daoli.transferActor(_operator, _actor, 5e17);
    }
}
