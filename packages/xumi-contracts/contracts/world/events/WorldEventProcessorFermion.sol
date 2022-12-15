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

abstract contract DefaultWorldEventProcessorFermion is DefaultWorldEventProcessor {
    uint256[] public paticleActors;

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) virtual external view override returns (bool) {
        bool defaultRt = true;

        IActorTalents talents = IActorTalents(worldRoute.modules(XumiConstants.WORLD_MODULE_TALENTS));

        //"exclude": "TLT?[10002]"
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 10002)
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
contract WorldEventProcessor1000001 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个电子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE7\x94\xB5\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020001 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个μ子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xCE\xBC\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020002 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个τ子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xCF\x84\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020003 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个电子中微子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE7\x94\xB5\xE5\xAD\x90\xE4\xB8\xAD\xE5\xBE\xAE\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020004 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个μ子中微子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xCE\xBC\xE5\xAD\x90\xE4\xB8\xAD\xE5\xBE\xAE\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020005 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个τ子中微子。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xCF\x84\xE5\xAD\x90\xE4\xB8\xAD\xE5\xBE\xAE\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020006 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个上夸克。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE4\xB8\x8A\xE5\xA4\xB8\xE5\x85\x8B\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020007 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个下夸克。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE4\xB8\x8B\xE5\xA4\xB8\xE5\x85\x8B\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020008 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个粲夸克。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE7\xB2\xB2\xE5\xA4\xB8\xE5\x85\x8B\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020009 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个奇夸克。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE5\xA5\x87\xE5\xA4\xB8\xE5\x85\x8B\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020010 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个顶夸克。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE9\xA1\xB6\xE5\xA4\xB8\xE5\x85\x8B\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1020011 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你出现了，是个底夸克。
        return "\xE4\xBD\xA0\xE5\x87\xBA\xE7\x8E\xB0\xE4\xBA\x86\xEF\xBC\x8C\xE6\x98\xAF\xE4\xB8\xAA\xE5\xBA\x95\xE5\xA4\xB8\xE5\x85\x8B\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000013 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 1000000) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你遭遇一个反粒子，发生了激烈的湮灭，彼此化为一抹能量。
        return "\xE4\xBD\xA0\xE9\x81\xAD\xE9\x81\x87\xE4\xB8\x80\xE4\xB8\xAA\xE5\x8F\x8D\xE7\xB2\x92\xE5\xAD\x90\xEF\xBC\x8C\xE5\x8F\x91\xE7\x94\x9F\xE4\xBA\x86\xE6\xBF\x80\xE7\x83\x88\xE7\x9A\x84\xE6\xB9\xAE\xE7\x81\xAD\xEF\xBC\x8C\xE5\xBD\xBC\xE6\xAD\xA4\xE5\x8C\x96\xE4\xB8\xBA\xE4\xB8\x80\xE6\x8A\xB9\xE8\x83\xBD\xE9\x87\x8F\xE3\x80\x82";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[1000013, 1000002, 1000010, 1020012, 1020013, 1020014]",
        if(evts.actorEventCount(_actor, 1000013) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1000002) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1000010) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1020012) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1020013) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1020014) > 0)
            return false;

        return defaultRt;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000014 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你遇到了其他夸克，彼此结合。
        return "\xE4\xBD\xA0\xE9\x81\x87\xE5\x88\xB0\xE4\xBA\x86\xE5\x85\xB6\xE4\xBB\x96\xE5\xA4\xB8\xE5\x85\x8B\xEF\xBC\x8C\xE5\xBD\xBC\xE6\xAD\xA4\xE7\xBB\x93\xE5\x90\x88\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //MAS: 1
        int256[] memory atts = new int256[](2);
        atts[0] = int256(XumiConstants.ATTR_MAS);
        atts[1] = 1;
        return atts;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[1000014,1000015,1000016,1000017]",
        if(evts.actorEventCount(_actor, 1000014) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1000015) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1000016) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1000017) > 0)
            return false;

        //"include": "EVT?[1000007]&&EVT?[1020006,1020007,1020008,1020009,1020010,1020011]",
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 1000007) > 0) {
            if(evts.actorEventCount(_actor, 1020006) > 0)
                return true;
            if(evts.actorEventCount(_actor, 1020007) > 0)
                return true;
            if(evts.actorEventCount(_actor, 1020008) > 0)
                return true;
            if(evts.actorEventCount(_actor, 1020009) > 0)
                return true;
            if(evts.actorEventCount(_actor, 1020010) > 0)
                return true;
            if(evts.actorEventCount(_actor, 1020011) > 0)
                return true;
        }
        
        return defaultRt;
    }

    // "branch": [
    //     "10015 on prob 0.15",
    //     "10016 on prob 0.15",
    //     "10017 on prob 0.15"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        uint256 pp = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM)).dn(_actor, 100);
        if(pp < 15)
            return 1000015;
        else if(pp < 30)
            return 1000016;
        else if(pp < 45)
            return 1000017;

        return 0;
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000015 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你成为了一个质子。
        return "\xE4\xBD\xA0\xE6\x88\x90\xE4\xB8\xBA\xE4\xBA\x86\xE4\xB8\x80\xE4\xB8\xAA\xE8\xB4\xA8\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000016 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你成为了一个中子。
        return "\xE4\xBD\xA0\xE6\x88\x90\xE4\xB8\xBA\xE4\xBA\x86\xE4\xB8\x80\xE4\xB8\xAA\xE4\xB8\xAD\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000017 is DefaultWorldEventProcessorFermion {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你成为了一个介子。
        return "\xE4\xBD\xA0\xE6\x88\x90\xE4\xB8\xBA\xE4\xBA\x86\xE4\xB8\x80\xE4\xB8\xAA\xE4\xBB\x8B\xE5\xAD\x90\xE3\x80\x82";
    }
}
//-----------------------------------------------------------------------------------------------
contract WorldEventProcessor1000022 is DefaultWorldEventProcessor {
    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //周围温度继续降低，你和质子的这种关系竟然稳定了下来。
        return "\xE5\x91\xA8\xE5\x9B\xB4\xE6\xB8\xA9\xE5\xBA\xA6\xE7\xBB\xA7\xE7\xBB\xAD\xE9\x99\x8D\xE4\xBD\x8E\xEF\xBC\x8C\xE4\xBD\xA0\xE5\x92\x8C\xE8\xB4\xA8\xE5\xAD\x90\xE7\x9A\x84\xE8\xBF\x99\xE7\xA7\x8D\xE5\x85\xB3\xE7\xB3\xBB\xE7\xAB\x9F\xE7\x84\xB6\xE7\xA8\xB3\xE5\xAE\x9A\xE4\xBA\x86\xE4\xB8\x8B\xE6\x9D\xA5\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        //INF: 1
        int256[] memory atts = new int256[](2);
        atts[0] = int256(XumiConstants.ATTR_INF);
        atts[1] = 1;
        return atts;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));

        //"exclude": "EVT?[1000016,1000022]",
        if(evts.actorEventCount(_actor, 1000016) > 0)
            return false;
        if(evts.actorEventCount(_actor, 1000022) > 0)
            return false;

        //"include": "EVT?[1000018]",
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 1000018) > 0)
            return true;
        
        return defaultRt;
    }

    // "branch": [
    //     "EVT?[1000018==3]=>1020017",
    //     "EVT?[1000018==2]=>1020016",
    //     "EVT?[1000018==1]=>1020015",
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(XumiConstants.WORLD_MODULE_EVENTS));
        uint256 ct = evts.actorEventCount(_actor, 1000018);
        if(ct == 3)
            return 1020017;
        if(ct == 2)
            return 1020016;

        return 1020015;
    }
}
