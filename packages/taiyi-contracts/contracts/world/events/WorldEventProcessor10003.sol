// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
import "../attributes/ActorAttributes.sol";
import "../attributes/ActorMoodAttributes.sol";
import "../attributes/ActorCoreAttributes.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor10003 is DefaultWorldEventProcessor {

    uint256 public immutable FEE = 5e18;

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 0) {}
    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你生了场重病，家里花了不少钱。
        return "\xE4\xBD\xA0\xE7\x94\x9F\xE4\xBA\x86\xE5\x9C\xBA\xE9\x87\x8D\xE7\x97\x85\xEF\xBC\x8C\xE5\xAE\xB6\xE9\x87\x8C\xE8\x8A\xB1\xE4\xBA\x86\xE4\xB8\x8D\xE5\xB0\x91\xE9\x92\xB1\xE3\x80\x82";
    }
    //水山蹇
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 0;
        _t[1] = 1;
        _t[2] = 0;
        _t[3] = 1;
        _t[4] = 0;
        _t[5] = 0;
        return _t;
    }
    function eventAttributeModifiers(uint256 _actor) external virtual view override returns (int256[] memory) {
        IWorldFungible coin = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        if(coin.balanceOfActor(_actor) < FEE) {
            //XIQ: -5, HLH random -50
            int256[] memory atts = new int256[](4);
            atts[0] = int256(ActorMoodAttributesConstants.XIQ);
            atts[1] = -5;
            atts[2] = int256(ActorAttributesConstants.HLH);
            IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
            atts[3] = -int256(random.dn(_actor, 50));
            return atts;
        }
        else {
            //XIQ: -5
            int256[] memory atts = new int256[](2);
            atts[0] = int256(ActorMoodAttributesConstants.XIQ);
            atts[1] = -5;
            return atts;
        }
    }
    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorAttributes core_attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_CORE_ATTRIBUTES));

        //"exclude": "TIZ>30",
        uint256 tiz = core_attributes.attributesScores(ActorCoreAttributesConstants.TIZ, _actor);
        if(tiz > 30)
            return false;

        return defaultRt;
    }
    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        IWorldFungible coin = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));

        //"coin": -FEE
        if(coin.balanceOfActor(_actor) < FEE)
            coin.transferFromActor(_operator, _actor, _operator, coin.balanceOfActor(_actor));
        else
            coin.transferFromActor(_operator, _actor, _operator, FEE);
    }
    // "branch": [
    //     "TLT?[1001]:10004",
    //     "TIZ<10:10000"
    // ]
    function checkBranch(uint256 _actor, uint256 /*_age*/) external view override returns (uint256) {
        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        IActorAttributes core_attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_CORE_ATTRIBUTES));

        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1001)
                return 10004;
        }

        uint256 tiz = core_attributes.attributesScores(ActorCoreAttributesConstants.TIZ, _actor);
        if(tiz < 10)
            return 10000;

        return defaultBranchEvent;
    }
}
