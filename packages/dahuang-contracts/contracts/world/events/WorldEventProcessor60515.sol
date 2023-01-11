// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
import './WorldEventProcessor60514.sol';
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor60515 is DefaultWorldEventProcessor {

    uint256 public isFundInPosition = 0;
    address public immutable evt60514Address;


    uint256 public immutable taiyiZone; //太乙村区域号
    uint256 public eventOperator;

    constructor(uint256 _taiyiZone, address _evt60514Address, WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {
        taiyiZone = _taiyiZone;
        evt60514Address = _evt60514Address;
    }

    function initOperator(uint256 _eventOperator) external 
        onlyOwner
    {
        require(eventOperator == 0, "event operator already initialized");
        IERC721(worldRoute.actorsAddress()).transferFrom(_msgSender(), address(this), _eventOperator);
        eventOperator = _eventOperator;

        //事件经手人掌握的资源授权给噎明
        uint256 _yeming = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_GOLD)).approveActor(eventOperator, _yeming, 1e29);
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_FOOD)).approveActor(eventOperator, _yeming, 1e29);
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_WOOD)).approveActor(eventOperator, _yeming, 1e29);
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_FABRIC)).approveActor(eventOperator, _yeming, 1e29);
        IWorldFungible(worldRoute.modules(DahuangConstants.WORLD_MODULE_HERB)).approveActor(eventOperator, _yeming, 1e29);

        //事件经手人掌握的道理授权给噎明
        IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN)).approveActor(eventOperator, _yeming, 1e29);
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你在太乙村兑换了一些资源。
        return "\xE4\xBD\xA0\xE5\x9C\xA8\xE5\xA4\xAA\xE4\xB9\x99\xE6\x9D\x91\xE5\x85\x91\xE6\x8D\xA2\xE4\xBA\x86\xE4\xB8\x80\xE4\xBA\x9B\xE8\xB5\x84\xE6\xBA\x90\xE3\x80\x82";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        //check event operator
        if(eventOperator == 0)
            return false;

        IActorLocations lcs = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        if(lcs.isActorLocked(_actor))
            return false;
        uint256[] memory lc = lcs.actorLocations(_actor);
        
        return (lc[1] == taiyiZone);
    }

    //how many Daoli per 1e18 asset
    function getPrice(uint256 _assetModuleId) public pure returns (uint256) {
        if(_assetModuleId == DahuangConstants.WORLD_MODULE_GOLD)
            return 1e17; //0.1
        else if(_assetModuleId == DahuangConstants.WORLD_MODULE_FOOD)
            return 1e16; //0.01
        else if(_assetModuleId == DahuangConstants.WORLD_MODULE_WOOD)
            return 1e16; //0.01
        else if(_assetModuleId == DahuangConstants.WORLD_MODULE_FABRIC)
            return 5e16; //0.05
        else if(_assetModuleId == DahuangConstants.WORLD_MODULE_HERB)
            return 8e16; //0.08
        else {
            require(false, "not supported asset id");
            return 0;
        }
    }

    function calcDaoliByAssets(uint256 _assetModuleId, uint256 _assetAmount) public pure returns (uint256) {
        return _assetAmount * getPrice(_assetModuleId) / 1e18;
    }

    //params = [资源模块ID，数量，资源模块ID，数量...]
    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(eventOperator > 0, "event operator not initialized");
        require(_uintParams.length>0 && _uintParams.length%2==0, "params is invalid");

        //首次执行事件时从60514事件的经手人转移资金到新的经手人
        if(isFundInPosition == 0) {
            isFundInPosition = 1;
            WorldEventProcessor60515 evt60514 = WorldEventProcessor60515(evt60514Address);
            IWorldFungible assetDaoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
            uint256 amount = assetDaoli.balanceOfActor(evt60514.eventOperator());
            assetDaoli.transferFromActor(_operator, evt60514.eventOperator(), eventOperator, amount);
        }

        uint256 daoli = 0;
        uint256 assetModuleId = 0; 
        uint256 assetAmount = 0;
        for(uint256 i=0; i<_uintParams.length; i+=2) {
            assetModuleId = _uintParams[i];
            IWorldFungible assets = IWorldFungible(worldRoute.modules(assetModuleId));
            assetAmount = _uintParams[i+1];
            require(assets.balanceOfActor(_actor) >= assetAmount, "asset is low");            
            assets.transferFromActor(_operator, _actor, eventOperator, assetAmount);
            daoli += calcDaoliByAssets(assetModuleId, assetAmount);
        }

        if(daoli > 0)
            IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN)).transferFromActor(_operator, eventOperator, _actor, daoli);
    }
}
