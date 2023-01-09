// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";

interface IWorldSeasons is IWorldModule {

    function seasonLabels(uint256 _seasonId) external view returns (string memory);
    function actorBornSeasons(uint256 _actor) external view returns (uint256); // =0 means not born

    function bornActor(uint256 _operator, uint256 _actor, uint256 _seasonId) external;
}

interface IWorldZoneBaseResources is IWorldModule {

    event ZoneAssetGrown(uint256 indexed zone, uint256 gold, uint256 food, uint256 herb, uint256 fabric, uint256 wood);
    event ActorAssetCollected(uint256 indexed actor, uint256 gold, uint256 food, uint256 herb, uint256 fabric, uint256 wood);

    function ACTOR_GUANGONG() external view returns (uint256);

    function growAssets(uint256 _operator, uint256 _zoneId) external;
    function collectAssets(uint256 _operator, uint256 _actor, uint256 _zoneId) external;
}

interface IWorldVillages is IWorldModule {
    function isZoneVillage(uint256 _zoneId) external view returns (bool);
    function villageCreators(uint256 _zoneId) external view returns (uint256);

    function createVillage(uint256 _operator, uint256 _actor, uint256 _zoneId) external;
}

//building is an item
interface IWorldBuildings is IWorldModule {

    function typeNames(uint256 _typeId) external view returns (string memory);
    function buildingTypes(uint256 _zoneId) external view returns (uint256);
    function isZoneBuilding(uint256 _zoneId) external view returns (bool);

    function createBuilding(uint256 _operator, uint256 _actor, uint256 _typeId, uint256 _zoneId) external;
}

interface IWorldDeadActors is  IWorldModule {
    function deadNum() external view returns (uint256);

    function addDead(uint256 _operator, uint256 _actor) external;
}

interface IActorsGender is  IWorldModule {
    function maleNum() external view returns (uint256);
    function femaleNum() external view returns (uint256);
    function asexualNum() external view returns (uint256);
    function bisexualNum() external view returns (uint256);

    function addMale(uint256 _operator, uint256 _actor) external;
    function addFemale(uint256 _operator, uint256 _actor) external;
    function addAsexual(uint256 _operator, uint256 _actor) external;
    function addBisexual(uint256 _operator, uint256 _actor) external;
}

