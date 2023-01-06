// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import '@taiyi/contracts/contracts/libs/Base64.sol';
import '@taiyi/contracts/contracts/world/WorldConfigurable.sol';
import "@taiyi/contracts/contracts/base/DateTimeLibrary.sol";
import "@taiyi/contracts/contracts/base/Ownable.sol";
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
//import "hardhat/console.sol";

contract WorldZoneBaseResources is IWorldZoneBaseResources, WorldConfigurable, Ownable {

    /* *******
     * Globals
     * *******
     */

    uint256 public override ACTOR_GUANGONG; //武财神之一：关公
    uint256 public immutable GROW_TIME_DAY; //资源生长周期（秒）
    uint256 public immutable GROW_QUANTITY_SCALE; //资源生长倍率(3位精度, 1000=1.0)
    uint256 public GOLD_GROW_QUANTITY;
    uint256 public FOOD_GROW_QUANTITY;
    uint256 public WOOD_GROW_QUANTITY;
    uint256 public FABRIC_GROW_QUANTITY;
    uint256 public HERB_GROW_QUANTITY;

    mapping(uint256 => uint256) public lastGrowTimeStamps; //各地区资产生长时间戳
    mapping(uint256 => mapping(uint256 => uint256)) public zoneAssets; //各地区资产存量(zoneid => (asset module id => amount))

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(uint256 _growTimeDay, uint256 _growQuantityScale, WorldContractRoute _route) WorldConfigurable(_route) {
        GROW_TIME_DAY = _growTimeDay;
        GROW_QUANTITY_SCALE = _growQuantityScale;
    }

    /* *****************
     * Private Functions
     * *****************
     */

    /* *****************
     * Internal Functions
     * *****************
     */

    //生长资源增加地区存量
    function _growAssets(uint256 _operator, uint256 _zoneId, uint256 _dt) internal {
        IWorldFungible gold = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD));
        IWorldFungible food = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_FOOD));
        IWorldFungible herb = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_HERB));
        IWorldFungible wood = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_WOOD));
        IWorldFungible fabric = IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_FABRIC));

        if(_dt >= GROW_TIME_DAY) {
            uint256 grownGold = _dt / GROW_TIME_DAY * GOLD_GROW_QUANTITY * GROW_QUANTITY_SCALE / 1000;
            gold.claim(_operator, ACTOR_GUANGONG, grownGold);
            zoneAssets[_zoneId][DahuangConstants.WORLD_MODULE_GOLD] += grownGold;

            uint256 grownFood = _dt / GROW_TIME_DAY * FOOD_GROW_QUANTITY * GROW_QUANTITY_SCALE / 1000;
            food.claim(_operator, ACTOR_GUANGONG, grownFood);
            zoneAssets[_zoneId][DahuangConstants.WORLD_MODULE_FOOD] += grownFood;

            uint256 grownHerb = _dt / GROW_TIME_DAY * HERB_GROW_QUANTITY * GROW_QUANTITY_SCALE / 1000;
            herb.claim(_operator, ACTOR_GUANGONG, grownHerb);
            zoneAssets[_zoneId][DahuangConstants.WORLD_MODULE_HERB] += grownHerb;

            uint256 grownFabric = _dt / GROW_TIME_DAY * FABRIC_GROW_QUANTITY * GROW_QUANTITY_SCALE / 1000;
            fabric.claim(_operator, ACTOR_GUANGONG, grownFabric);
            zoneAssets[_zoneId][DahuangConstants.WORLD_MODULE_FABRIC] += grownFabric;

            uint256 grownWood = _dt / GROW_TIME_DAY * WOOD_GROW_QUANTITY * GROW_QUANTITY_SCALE / 1000;
            wood.claim(_operator, ACTOR_GUANGONG, grownWood);
            zoneAssets[_zoneId][DahuangConstants.WORLD_MODULE_WOOD] += grownWood;

            emit ZoneAssetGrown(_zoneId, grownGold, grownFood, grownHerb, grownFabric, grownWood);

            lastGrowTimeStamps[_zoneId] = (block.timestamp / GROW_TIME_DAY) * GROW_TIME_DAY; 
        }
    }

    //采集资源
    function _collectAsset(uint256 _actor, uint256 _zoneId, uint256 _assetModuleId, uint256 _seed, uint256 _growQuantity, uint256 _ACTOR_YEMING) internal returns (uint256) {
        require(_growQuantity != 0, "grow asset quantity can not be ZERO!");

        //计算采集量
        IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        uint256 collection_asset = random.dn(_actor+_seed, _growQuantity * GROW_QUANTITY_SCALE / 1000) + 1e18;
        if(collection_asset > zoneAssets[_zoneId][_assetModuleId])
            collection_asset = zoneAssets[_zoneId][_assetModuleId];
        if(collection_asset > 0) {
            IWorldFungible asset = IWorldFungible(worldRoute.modules(_assetModuleId));
            if(asset.allowanceActor(ACTOR_GUANGONG, _ACTOR_YEMING) < 1e29)
                asset.approveActor(ACTOR_GUANGONG, _ACTOR_YEMING, 1e29);
            asset.transferFromActor(_ACTOR_YEMING, ACTOR_GUANGONG, _actor, collection_asset);
            zoneAssets[_zoneId][_assetModuleId] -= collection_asset;
        }

        return collection_asset;
    }

    function _collectAssets(uint256 _operator, uint256 _actor, uint256 _zoneId) internal {
        uint256 collection_gold = _collectAsset(_actor, _zoneId, DahuangConstants.WORLD_MODULE_GOLD, 0, GOLD_GROW_QUANTITY, _operator);
        uint256 collection_food = _collectAsset(_actor, _zoneId, DahuangConstants.WORLD_MODULE_FOOD, 1, FOOD_GROW_QUANTITY, _operator);
        uint256 collection_wood = _collectAsset(_actor, _zoneId, DahuangConstants.WORLD_MODULE_WOOD, 2, WOOD_GROW_QUANTITY, _operator);
        uint256 collection_fabric = _collectAsset(_actor, _zoneId, DahuangConstants.WORLD_MODULE_FABRIC, 3, FABRIC_GROW_QUANTITY, _operator);
        uint256 collection_herb = _collectAsset(_actor, _zoneId, DahuangConstants.WORLD_MODULE_HERB, 4, HERB_GROW_QUANTITY, _operator);

        if(collection_gold > 0 || collection_food > 0 || collection_herb > 0 || collection_fabric > 0 || collection_wood > 0)
            emit ActorAssetCollected(_actor, collection_gold, collection_food, collection_herb, collection_fabric, collection_wood);
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return DahuangConstants.WORLD_MODULE_ZONE_BASE_RESOURCES; }

    function initOperator(uint256 _operator) external 
        onlyOwner
    {
        require(ACTOR_GUANGONG == 0, "operator already initialized");
        IActors(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTORS)).transferFrom(_msgSender(), address(this), _operator);
        ACTOR_GUANGONG = _operator;

        //授权关公的资源给时间线（一千亿）
        uint256 _yeming = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD)).approveActor(ACTOR_GUANGONG, _yeming, 1e29);
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_FOOD)).approveActor(ACTOR_GUANGONG, _yeming, 1e29);
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_HERB)).approveActor(ACTOR_GUANGONG, _yeming, 1e29);
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_WOOD)).approveActor(ACTOR_GUANGONG, _yeming, 1e29);
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_FABRIC)).approveActor(ACTOR_GUANGONG, _yeming, 1e29);
    }

    function growAssets(uint256 _operator, uint256 _zoneId) external override
        onlyYeMing(_operator)
    {
        require(ACTOR_GUANGONG > 0, "operator not initialized");

        //check zone is in Dahuang
        require(IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES)).timelines(_zoneId) == 
            worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE), "can not grow assets outside Dahuang.");

        if(lastGrowTimeStamps[_zoneId] == 0)
            lastGrowTimeStamps[_zoneId] = (block.timestamp / GROW_TIME_DAY) * GROW_TIME_DAY;

        require(block.timestamp >= lastGrowTimeStamps[_zoneId], "grow timestamp error!");
        uint256 _dt = block.timestamp - lastGrowTimeStamps[_zoneId];

        _growAssets(_operator, _zoneId, _dt);
    }

    function collectAssets(uint256 _operator, uint256 _actor, uint256 _zoneId) external override
        onlyYeMing(_operator)
    {
        require(ACTOR_GUANGONG > 0, "operator not initialized");
        //check zone is in Dahuang
        require(IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES)).timelines(_zoneId) == 
            worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE), "can not collect assets outside Dahuang.");

        _collectAssets(_operator, _actor, _zoneId);
    }

    /* ****************
     * View Functions
     * ****************
     */
    
    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) virtual external override view returns (string memory, uint256) {
        return ("", _startY);
    }

    function tokenJSON(uint256 /*_actor*/) virtual external override view returns (string memory) {
        return "";
    }
}
