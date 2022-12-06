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

abstract contract DefaultWorldEventProcessorBoson is DefaultWorldEventProcessor {
    uint256[] public paticleActors;

    //"exclude": "TLT?[10003]"
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) virtual external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 10003)
                return false;
        }

        return defaultRt;
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
contract WorldEventProcessor1000002 is DefaultWorldEventProcessorBoson {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个光子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE5\x85\x89\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000003 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你发生了一次严重的衰变，耗散了不少能量。
        return "\xE4\xBD\xA0\xE5\x8F\x91\xE7\x94\x9F\xE4\xBA\x86\xE4\xB8\x80\xE6\xAC\xA1\xE4\xB8\xA5\xE9\x87\x8D\xE7\x9A\x84\xE8\xA1\xB0\xE5\x8F\x98\xEF\xBC\x8C\xE8\x80\x97\xE6\x95\xA3\xE4\xBA\x86\xE4\xB8\x8D\xE5\xB0\x91\xE8\x83\xBD\xE9\x87\x8F\xE3\x80\x82";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorAttributes attrs = IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES));

        //"exclude": "MAS>6",
        uint256 mas = attrs.attributesScores(ActorXumiAttributesConstants.MAS, _actor);
        if(mas > 6)
            return false;

        return defaultRt;
    }

    // "branch": [
            // "TLT?[10001]:1000004",
            // "MAS<2&ENG<3:1000000"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 10001)
                return 1000004;
        }

        IActorAttributes attrs = IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES));
        uint256 mas = attrs.attributesScores(ActorXumiAttributesConstants.MAS, _actor);
        uint256 eng = attrs.attributesScores(ActorXumiAttributesConstants.ENG, _actor);
        if(mas < 2 && eng < 3)
            return 1000000;

        return 0;
    }

    //"energy": -5e18
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible energy = IWorldFungible(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ENERGY));

        uint256 FEE = 5e18;
        if(energy.balanceOfActor(_actor) < FEE)
            energy.transferFromActor(_operator, _actor, _operator, energy.balanceOfActor(_actor));
        else
            energy.transferFromActor(_operator, _actor, _operator, FEE);
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000004 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //可能是上帝保佑，你没有消失。
        return "\xE5\x8F\xAF\xE8\x83\xBD\xE6\x98\xAF\xE4\xB8\x8A\xE5\xB8\x9D\xE4\xBF\x9D\xE4\xBD\x91\xEF\xBC\x8C\xE4\xBD\xA0\xE6\xB2\xA1\xE6\x9C\x89\xE6\xB6\x88\xE5\xA4\xB1\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000005 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //刚开始冷却下来，你意外到达密集区边缘，轻度耗散。
        return "\xE5\x88\x9A\xE5\xBC\x80\xE5\xA7\x8B\xE5\x86\xB7\xE5\x8D\xB4\xE4\xB8\x8B\xE6\x9D\xA5\xEF\xBC\x8C\xE4\xBD\xA0\xE6\x84\x8F\xE5\xA4\x96\xE5\x88\xB0\xE8\xBE\xBE\xE5\xAF\x86\xE9\x9B\x86\xE5\x8C\xBA\xE8\xBE\xB9\xE7\xBC\x98\xEF\xBC\x8C\xE8\xBD\xBB\xE5\xBA\xA6\xE8\x80\x97\xE6\x95\xA3\xE3\x80\x82";
    }

    //"exclude": "MAS>7",
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorAttributes attrs = IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES));
        uint256 mas = attrs.attributesScores(ActorXumiAttributesConstants.MAS, _actor);
        if(mas > 7)
            return false;

        return defaultRt;
    }

    //"ENG": "-1 on prob 0.1"
    function eventAttributeModifiers(uint256 _actor) external virtual view override returns (int256[] memory) {
        uint256 pp = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM)).dn(_actor, 100);
        int256[] memory atts = new int256[](2);
        atts[0] = int256(ActorXumiAttributesConstants.MAS);
        atts[1] = pp<15?int256(-1):int256(0);
        return atts;
    }

    // "branch": [
    // "TLT?[10001]:1000006",
    // "MAS<2&ENG<3:1000000"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 10001)
                return 1000006;
        }

        IActorAttributes attrs = IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES));
        uint256 mas = attrs.attributesScores(ActorXumiAttributesConstants.MAS, _actor);
        uint256 eng = attrs.attributesScores(ActorXumiAttributesConstants.ENG, _actor);
        if(mas < 2 && eng < 3)
            return 1000000;

        return 0;
    }

    //"energy": -5e18
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible energy = IWorldFungible(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ENERGY));

        uint256 FEE = 5e18;
        if(energy.balanceOfActor(_actor) < FEE)
            energy.transferFromActor(_operator, _actor, _operator, energy.balanceOfActor(_actor));
        else
            energy.transferFromActor(_operator, _actor, _operator, FEE);
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000006 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //引力将你吸引回高密度区，你没有脱离。
        return "\xE5\xBC\x95\xE5\x8A\x9B\xE5\xB0\x86\xE4\xBD\xA0\xE5\x90\xB8\xE5\xBC\x95\xE5\x9B\x9E\xE9\xAB\x98\xE5\xAF\x86\xE5\xBA\xA6\xE5\x8C\xBA\xEF\xBC\x8C\xE4\xBD\xA0\xE6\xB2\xA1\xE6\x9C\x89\xE8\x84\xB1\xE7\xA6\xBB\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000007 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你和周围的基本粒子产生了联系。
        return "\xE4\xBD\xA0\xE5\x92\x8C\xE5\x91\xA8\xE5\x9B\xB4\xE7\x9A\x84\xE5\x9F\xBA\xE6\x9C\xAC\xE7\xB2\x92\xE5\xAD\x90\xE4\xBA\xA7\xE7\x94\x9F\xE4\xBA\x86\xE8\x81\x94\xE7\xB3\xBB\xE3\x80\x82";
    }

    //"exclude": "(MAS<3)|(EVT?[1000007])"
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorAttributes attrs = IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES));
        uint256 mas = attrs.attributesScores(ActorXumiAttributesConstants.MAS, _actor);
        if(mas < 3)
            return false;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 1000007) > 0)
            return false;

        return defaultRt;
    }

    //"INF": 1
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory atts = new int256[](2);
        atts[0] = int256(ActorXumiAttributesConstants.INF);
        atts[1] = 1;
        return atts;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000008 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你一开始就出现在低密度区。
        return "\xE4\xBD\xA0\xE4\xB8\x80\xE5\xBC\x80\xE5\xA7\x8B\xE5\xB0\xB1\xE5\x87\xBA\xE7\x8E\xB0\xE5\x9C\xA8\xE4\xBD\x8E\xE5\xAF\x86\xE5\xBA\xA6\xE5\x8C\xBA\xE3\x80\x82";
    }

    // "include": "ENG<8",
    // "exclude": "EVT?[1000009]",
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 1000009) > 0)
            return false;

        defaultRt = false; //default should be fasle if have "include" conditions
        IActorAttributes attrs = IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES));
        uint256 eng = attrs.attributesScores(ActorXumiAttributesConstants.ENG, _actor);
        if(eng < 8)
            return true;

        return defaultRt;
    }

    //"energy": 10e18
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible energy = IWorldFungible(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ENERGY));
        energy.claim(_operator, _actor, 10e18);
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000009 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你一开始就出现在高密度区。
        return "\xE4\xBD\xA0\xE4\xB8\x80\xE5\xBC\x80\xE5\xA7\x8B\xE5\xB0\xB1\xE5\x87\xBA\xE7\x8E\xB0\xE5\x9C\xA8\xE9\xAB\x98\xE5\xAF\x86\xE5\xBA\xA6\xE5\x8C\xBA\xE3\x80\x82";
    }

    // "include": "ENG>6",
    // "exclude": "EVT?[1000008]",
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 1000008) > 0)
            return false;

        defaultRt = false; //default should be fasle if have "include" conditions
        IActorAttributes attrs = IActorAttributes(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES));
        uint256 eng = attrs.attributesScores(ActorXumiAttributesConstants.ENG, _actor);
        if(eng > 6)
            return true;

        return defaultRt;
    }

    //"energy": 20e18
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible energy = IWorldFungible(worldRoute.modules(XumiConstants.WORLD_MODULE_XUMI_ENERGY));
        energy.claim(_operator, _actor, 20e18);
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000010 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是极为罕见的希格斯粒子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE6\x9E\x81\xE4\xB8\xBA\xE7\xBD\x95\xE8\xA7\x81\xE7\x9A\x84\xE5\xB8\x8C\xE6\xA0\xBC\xE6\x96\xAF\xE7\xB2\x92\xE5\xAD\x90\xE3\x80\x82";
    }

    //"exclude": "TLT?[10002,10003]"
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 10002 || tlts[i] == 10003)
                return false;
        }

        return defaultRt;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000011 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //大爆炸把你推到初生宇宙边缘，直入虚空不再回头。
        return "\xE5\xA4\xA7\xE7\x88\x86\xE7\x82\xB8\xE6\x8A\x8A\xE4\xBD\xA0\xE6\x8E\xA8\xE5\x88\xB0\xE5\x88\x9D\xE7\x94\x9F\xE5\xAE\x87\xE5\xAE\x99\xE8\xBE\xB9\xE7\xBC\x98\xEF\xBC\x8C\xE7\x9B\xB4\xE5\x85\xA5\xE8\x99\x9A\xE7\xA9\xBA\xE4\xB8\x8D\xE5\x86\x8D\xE5\x9B\x9E\xE5\xA4\xB4\xE3\x80\x82";
    }

    //"include": "EVT?[1000002] in prob 0.2",
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        defaultRt = false; //default should be fasle if have "include" conditions
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        if(evts.actorEventCount(_actor, 1000002) > 0) {
            uint256 pp = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM)).dn(_actor, 100);
            if(pp > 20)
                return true;
        }

        return defaultRt;
    }

    // "branch": [
    //     "TLT?[10004]:1000012",
    //     "1000000"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 10004)
                return 1000012;
        }

        return 1000000;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000012 is DefaultWorldEventProcessor {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //发生了离奇的相变，你突然跃迁到宇宙中心区域。
        return "\xE5\x8F\x91\xE7\x94\x9F\xE4\xBA\x86\xE7\xA6\xBB\xE5\xA5\x87\xE7\x9A\x84\xE7\x9B\xB8\xE5\x8F\x98\xEF\xBC\x8C\xE4\xBD\xA0\xE7\xAA\x81\xE7\x84\xB6\xE8\xB7\x83\xE8\xBF\x81\xE5\x88\xB0\xE5\xAE\x87\xE5\xAE\x99\xE4\xB8\xAD\xE5\xBF\x83\xE5\x8C\xBA\xE5\x9F\x9F\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020012 is DefaultWorldEventProcessorBoson {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个胶子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE8\x83\xB6\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020013 is DefaultWorldEventProcessorBoson {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个引力子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE5\xBC\x95\xE5\x8A\x9B\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020014 is DefaultWorldEventProcessorBoson {
    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个Z玻色子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\x5A\xE7\x8E\xBB\xE8\x89\xB2\xE5\xAD\x90\xE3\x80\x82";
    }
}
