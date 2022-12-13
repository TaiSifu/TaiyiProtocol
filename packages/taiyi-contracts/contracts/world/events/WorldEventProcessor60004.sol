// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor60004 is DefaultWorldEventProcessor {

    uint256 public genesis_left = 100;
    mapping(uint256 => uint256) public genesis_numbers;  //actor => genesisNo

    string[] internal numLabels = [
        "\xE9\x9B\xB6", //0.零
        "\xE4\xB8\x80", //1.一
        "\xE4\xBA\x8C", //2.二
        "\xE4\xB8\x89", //3.三
        "\xE5\x9B\x9B", //4.四
        "\xE4\xBA\x94", //5.五
        "\xE5\x85\xAD", //6.六
        "\xE4\xB8\x83", //7.七
        "\xE5\x85\xAB", //8.八
        "\xE4\xB9\x9D", //9.九
        "\xE5\x8D\x81" //10.十
    ];

    function _num_to_string(uint256 n) internal view returns (string memory) {
        if(n <= 10)
            return numLabels[n];
        else if(n < 20)
            return string(abi.encodePacked(numLabels[10], numLabels[n-10]));
        else if(n % 10 == 0)
            return string(abi.encodePacked(numLabels[n/10], numLabels[10]));
        else if(n < 100)
            return string(abi.encodePacked(numLabels[n/10], numLabels[10], numLabels[n%10]));
        
        return "";
    }

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {
    }

    function eventInfo(uint256 _actor) external virtual view override returns (string memory) {
        uint256 genesisNo = genesis_numbers[_actor];
        if(genesisNo == 0) {
            //你已开始一个新的身份。
            return "\xE4\xBD\xA0\xE5\xB7\xB2\xE5\xBC\x80\xE5\xA7\x8B\xE4\xB8\x80\xE4\xB8\xAA\xE6\x96\xB0\xE7\x9A\x84\xE8\xBA\xAB\xE4\xBB\xBD\xE3\x80\x82";
        }
        else {
            //太乙元初，有百位先祖异人自世外而至，你便是这其中之{i}。
            return string(abi.encodePacked("\xE5\xA4\xAA\xE4\xB9\x99\xE5\x85\x83\xE5\x88\x9D\xEF\xBC\x8C\xE6\x9C\x89\xE7\x99\xBE\xE4\xBD\x8D\xE5\x85\x88\xE7\xA5\x96\xE5\xBC\x82\xE4\xBA\xBA\xE8\x87\xAA\xE4\xB8\x96\xE5\xA4\x96\xE8\x80\x8C\xE8\x87\xB3\xEF\xBC\x8C\xE4\xBD\xA0\xE4\xBE\xBF\xE6\x98\xAF\xE8\xBF\x99\xE5\x85\xB6\xE4\xB8\xAD\xE4\xB9\x8B",
                _num_to_string(genesisNo-1), "\xE3\x80\x82"));
        }
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers;
        return modifiers;
    }

    function checkOccurrence(uint256 /*_actor*/, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;
        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override 
        onlyYeMing(_operator)
    {
        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        IActorSocialIdentity sids = IActorSocialIdentity(worldRoute.modules(WorldConstants.WORLD_MODULE_SIDS));

        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        uint256[] memory tlts = talents.actorTalents(_actor);
        bool isPreNormal = false;
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1000) {
                isPreNormal = true; //平凡人，不会是太乙百子
                break;
            }
        }

        if(!isPreNormal && genesis_left > 0) {
            //创世人
            uint256[11] memory genesis_nameids = [uint256(5), uint256(6), uint256(7), uint256(8),
                uint256(9), uint256(10), uint256(11), uint256(12), uint256(13), uint256(14), uint256(15)];
            sids.claim(_operator, genesis_nameids[random.dn(_actor, genesis_nameids.length)], _actor);
            if(!sids.haveName(_actor, 49)) {
                //创建一个新太乙百子。如果有预设身份，则一定是继承的太乙百子
                genesis_left--;
                genesis_numbers[_actor] = 100 - genesis_left;
                
                sids.claim(_operator, 49, _actor); //特殊太乙百子身份
            }

            //太乙百子开始就有极大威望
            IWorldFungible prestige = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_PRESTIGE));
            prestige.claim(_operator, _actor, 1000e18);
        }
        else {
            //普通人
            uint256[4] memory normal_nameids = [uint256(1), uint256(2), uint256(3), uint256(4)];
            sids.claim(_operator, normal_nameids[random.dn(_actor, normal_nameids.length)], _actor);
        }
    }
}
