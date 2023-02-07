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

contract WorldEventProcessor10031 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //有一图纸在你手中逐渐显现。此图看似平平无奇，但你若将之传与世人并好生利用，便会在世间成就无穷造化。
        return "\xE6\x9C\x89\xE4\xB8\x80\xE5\x9B\xBE\xE7\xBA\xB8\xE5\x9C\xA8\xE4\xBD\xA0\xE6\x89\x8B\xE4\xB8\xAD\xE9\x80\x90\xE6\xB8\x90\xE6\x98\xBE\xE7\x8E\xB0\xE3\x80\x82\xE6\xAD\xA4\xE5\x9B\xBE\xE7\x9C\x8B\xE4\xBC\xBC\xE5\xB9\xB3\xE5\xB9\xB3\xE6\x97\xA0\xE5\xA5\x87\xEF\xBC\x8C\xE4\xBD\x86\xE4\xBD\xA0\xE8\x8B\xA5\xE5\xB0\x86\xE4\xB9\x8B\xE4\xBC\xA0\xE4\xB8\x8E\xE4\xB8\x96\xE4\xBA\xBA\xE5\xB9\xB6\xE5\xA5\xBD\xE7\x94\x9F\xE5\x88\xA9\xE7\x94\xA8\xEF\xBC\x8C\xE4\xBE\xBF\xE4\xBC\x9A\xE5\x9C\xA8\xE4\xB8\x96\xE9\x97\xB4\xE6\x88\x90\xE5\xB0\xB1\xE6\x97\xA0\xE7\xA9\xB7\xE9\x80\xA0\xE5\x8C\x96\xE3\x80\x82";
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

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        //"exclude": "prestige<100e18"
        IWorldFungible prestige = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_PRESTIGE));
        uint256 _pst = prestige.balanceOfActor(_actor);
        if(_pst < 100e18)
            return false; //威望要求

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible prestige = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_PRESTIGE));
        require(prestige.balanceOfActor(_actor) >= 100e18, "prestige is not enough");

        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        uint256 typeId = 20 + random.dn(_actor, 6); //图纸类型范围[20, 25]
        uint256 shape = random.dn(_actor+1, 9); //品相范围[0, 8]

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, typeId, 100, shape, _actor);

        //消耗威望
        prestige.transferFromActor(_operator, _actor, _operator, 100e18);
    }
}
