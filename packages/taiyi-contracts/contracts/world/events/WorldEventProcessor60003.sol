// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "./DefaultWorldEventProcessor.sol";
//import "hardhat/console.sol";

contract WorldEventProcessor60003 is DefaultWorldEventProcessor {

    constructor(address _worldRouteAddress) DefaultWorldEventProcessor(_worldRouteAddress, 60004) {}

    function eventInfo(uint256 _actor) external view override returns (string memory) {
        //你出生在${地点}。
        IActorBornPlaces bornPlaces = IActorBornPlaces(worldRoute.modules(WorldConstants.WORLD_MODULE_BORN_PLACES));
        uint256 born_place = bornPlaces.bornPlaces(_actor);
        if(born_place > 0) {
            IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
            return string(abi.encodePacked("\xE4\xBD\xA0\xE5\x87\xBA\xE7\x94\x9F\xE5\x9C\xA8", zones.names(born_place), "\xE3\x80\x82"));
        }
        else
            return "NA";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActorBornPlaces bornPlaces = IActorBornPlaces(worldRoute.modules(WorldConstants.WORLD_MODULE_BORN_PLACES));
        uint256 born_place = bornPlaces.bornPlaces(_actor);
        if(born_place > 0)
            return false;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override 
        onlyYeMing(_operator)
    {
        IActorBornPlaces bornPlaces = IActorBornPlaces(worldRoute.modules(WorldConstants.WORLD_MODULE_BORN_PLACES));
        require(bornPlaces.bornPlaces(_actor) == 0, "already born!");        

        IActorLocations locations = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        bornPlaces.bornActor(_operator, _actor, locations.actorLocations(_actor)[0]);
    }
}
