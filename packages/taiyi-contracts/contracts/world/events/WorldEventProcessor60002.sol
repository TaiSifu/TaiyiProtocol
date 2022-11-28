// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
//import "hardhat/console.sol";

contract WorldEventProcessor60002 is DefaultWorldEventProcessor {

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 60003) {}

    function eventInfo(uint256 _actor) external view override returns (string memory) {
        //你在${节气}出生。
        IWorldSeasons seasons = IWorldSeasons(worldRoute.modules(WorldConstants.WORLD_MODULE_SEASONS));
        uint256 born_season = seasons.actorBornSeasons(_actor);
        if(born_season > 0)
            return string(abi.encodePacked("\xE4\xBD\xA0\xE5\x9C\xA8", seasons.seasonLabels(born_season), "\xE5\x87\xBA\xE7\x94\x9F\xE3\x80\x82"));
        else
            return "NA";
    }

    function trigrams(uint256 _actor) virtual external override view returns (uint256[] memory) {
        IWorldSeasons seasons = IWorldSeasons(worldRoute.modules(WorldConstants.WORLD_MODULE_SEASONS));
        uint256 born_season = seasons.actorBornSeasons(_actor);
        uint256[] memory _t = randomTrigrams(_actor);
        if(born_season == 1 || born_season == 2) {
            _t[0] = 0; _t[1] = 0; _t[2] = 0; _t[3] = 0; _t[4] = 0; _t[5] = 1;
        }
        else if(born_season == 3 || born_season == 4) {
            _t[0] = 0; _t[1] = 0; _t[2] = 0; _t[3] = 0; _t[4] = 0; _t[5] = 0;
        }
        else if(born_season == 5 || born_season == 6) {
            _t[0] = 1; _t[1] = 0; _t[2] = 0; _t[3] = 0; _t[4] = 0; _t[5] = 0;
        }
        else if(born_season == 7 || born_season == 8) {
            _t[0] = 1; _t[1] = 1; _t[2] = 0; _t[3] = 0; _t[4] = 0; _t[5] = 0;
        }
        else if(born_season == 9 || born_season == 10) {
            _t[0] = 1; _t[1] = 1; _t[2] = 1; _t[3] = 0; _t[4] = 0; _t[5] = 0;
        }
        else if(born_season == 11 || born_season == 12) {
            _t[0] = 1; _t[1] = 1; _t[2] = 1; _t[3] = 1; _t[4] = 0; _t[5] = 0;
        }
        else if(born_season == 13 || born_season == 14) {
            _t[0] = 1; _t[1] = 1; _t[2] = 1; _t[3] = 1; _t[4] = 1; _t[5] = 0;
        }
        else if(born_season == 15 || born_season == 16) {
            _t[0] = 1; _t[1] = 1; _t[2] = 1; _t[3] = 1; _t[4] = 1; _t[5] = 1;
        }
        else if(born_season == 17 || born_season == 18) {
            _t[0] = 0; _t[1] = 1; _t[2] = 1; _t[3] = 1; _t[4] = 1; _t[5] = 1;
        }
        else if(born_season == 19 || born_season == 20) {
            _t[0] = 0; _t[1] = 0; _t[2] = 1; _t[3] = 1; _t[4] = 1; _t[5] = 1;
        }
        else if(born_season == 21 || born_season == 22) {
            _t[0] = 0; _t[1] = 0; _t[2] = 0; _t[3] = 1; _t[4] = 1; _t[5] = 1;
        }
        else if(born_season == 23 || born_season == 24) {
            _t[0] = 0; _t[1] = 0; _t[2] = 0; _t[3] = 0; _t[4] = 1; _t[5] = 1;
        }
        return _t;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IWorldSeasons seasons = IWorldSeasons(worldRoute.modules(WorldConstants.WORLD_MODULE_SEASONS));
        if(seasons.actorBornSeasons(_actor) > 0)
            return false;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        //random time
        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        uint256 _time = 1 + random.dn(_actor, 24);

        IWorldSeasons seasons = IWorldSeasons(worldRoute.modules(WorldConstants.WORLD_MODULE_SEASONS));
        seasons.bornActor(_operator, _actor, _time);
    }
}
