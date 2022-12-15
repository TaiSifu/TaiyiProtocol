// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import "../attributes/ActorXumiAttributes.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020015 is DefaultWorldEventProcessor {
    uint256[] public paticleActors;
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你成为了一个氢原子。
        return "\xE4\xBD\xA0\xE6\x88\x90\xE4\xB8\xBA\xE4\xBA\x86\xE4\xB8\x80\xE4\xB8\xAA\xE6\xB0\xA2\xE5\x8E\x9F\xE5\xAD\x90\xE3\x80\x82";
    }
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        paticleActors.push(_actor);
    }
    function particleNum() external view returns (uint256) {
        return paticleActors.length;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000023 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //周围温度继续降低，你和电子的这种关系竟然稳定了下来。
        return "\xE5\x91\xA8\xE5\x9B\xB4\xE6\xB8\xA9\xE5\xBA\xA6\xE7\xBB\xA7\xE7\xBB\xAD\xE9\x99\x8D\xE4\xBD\x8E\xEF\xBC\x8C\xE4\xBD\xA0\xE5\x92\x8C\xE7\x94\xB5\xE5\xAD\x90\xE7\x9A\x84\xE8\xBF\x99\xE7\xA7\x8D\xE5\x85\xB3\xE7\xB3\xBB\xE7\xAB\x9F\xE7\x84\xB6\xE7\xA8\xB3\xE5\xAE\x9A\xE4\xBA\x86\xE4\xB8\x8B\xE6\x9D\xA5\xE3\x80\x82";
    }

    //"INF": 1
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory atts = new int256[](2);
        atts[0] = int256(XumiConstants.ATTR_INF);
        atts[1] = 1;
        return atts;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[1000016,1000023]",
        if(evts.actorEventCount(_actor, 1000016) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1000023) > 0)
            return false;

        //"include": "EVT?[1000020]",
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 1000020) > 0)
            return true;

        return defaultRt;
    }

    // "branch": [
    //     "EVT?[1000020==3]=>1020017",
    //     "EVT?[1000020==2]=>1020016",
    //     "EVT?[1000020==1]=>1020015"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));
        uint256 ct = evts.actorEventCount(_actor, 1000020);
        if(ct == 3)
            return 1020017;
        if(ct == 2)
            return 1020016;
        if(ct == 1)
            return 1020015;

        return 0;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000024 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你所在的星云正在塌陷。
        return "\xE4\xBD\xA0\xE6\x89\x80\xE5\x9C\xA8\xE7\x9A\x84\xE6\x98\x9F\xE4\xBA\x91\xE6\xAD\xA3\xE5\x9C\xA8\xE5\xA1\x8C\xE9\x99\xB7\xE3\x80\x82";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[1030001,1030002,1030003]",
        if(evts.actorEventCount(_actor, 1030001) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1030002) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1030003) > 0)
            return false;

        //"include": "EVT?[1020015]",
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 1020015) > 0)
            return true;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible H = IWorldFungible(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ELEMENT_H));
        //"H": 10e18
        H.claim(_operator, _actor, 10e18);
    }

    // "branch": [
    //     "EVT?[1000024==3]=>1030003 on prob 0.3",
    //     "EVT?[1000024==2]=>1030002 on prob 0.3",
    //     "EVT?[1000024==1]=>1030001 on prob 0.3",
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IWorldRandom rand = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));
        uint256 ct = evts.actorEventCount(_actor, 1000024);
        if(ct == 3)
            if(rand.dn(_actor, 100) < 30)
                return 1030003;
        if(ct == 2)
            if(rand.dn(_actor+1, 100) < 30)
                return 1030002;
        if(ct == 1)
            if(rand.dn(_actor+2, 100) < 30)
                return 1030001;

        return 0;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1030001 is DefaultWorldEventProcessor {
    uint256[] public starActors;
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你成为一颗小恒星。
        return "\xE4\xBD\xA0\xE6\x88\x90\xE4\xB8\xBA\xE4\xB8\x80\xE9\xA2\x97\xE5\xB0\x8F\xE6\x81\x92\xE6\x98\x9F\xE3\x80\x82";
    }
    // "mint" : [
    //     "star type 100"  
    // ],
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        starActors.push(_actor);

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, 100, 100, 0, _actor);
    }
    function starNum() external view returns (uint256) {
        return starActors.length;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1030002 is DefaultWorldEventProcessor {
    uint256[] public starActors;
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你成为一颗中等大小恒星。
        return "\xE4\xBD\xA0\xE6\x88\x90\xE4\xB8\xBA\xE4\xB8\x80\xE9\xA2\x97\xE4\xB8\xAD\xE7\xAD\x89\xE5\xA4\xA7\xE5\xB0\x8F\xE6\x81\x92\xE6\x98\x9F\xE3\x80\x82";
    }
    // "mint" : [
    //     "star type 101"  
    // ],
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        starActors.push(_actor);

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, 101, 100, 0, _actor);
    }
    function starNum() external view returns (uint256) {
        return starActors.length;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1030003 is DefaultWorldEventProcessor {
    uint256[] public starActors;
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你成为一颗巨大恒星。
        return "\xE4\xBD\xA0\xE6\x88\x90\xE4\xB8\xBA\xE4\xB8\x80\xE9\xA2\x97\xE5\xB7\xA8\xE5\xA4\xA7\xE6\x81\x92\xE6\x98\x9F\xE3\x80\x82";
    }
    // "mint" : [
    //     "star type 102"  
    // ],
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        starActors.push(_actor);

        IWorldItems items = IWorldItems(worldRoute.modules(WorldConstants.WORLD_MODULE_ITEMS));
        items.mint(_operator, 102, 100, 0, _actor);
    }
    function starNum() external view returns (uint256) {
        return starActors.length;
    }
}
