// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
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

contract WorldEventProcessor60517 is DefaultWorldEventProcessor {

    uint256 public eventOperator;

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function initOperator(uint256 _eventOperator) external 
        onlyOwner
    {
        require(eventOperator == 0, "event operator already initialized");
        IERC721(worldRoute.actorsAddress()).transferFrom(_msgSender(), address(this), _eventOperator);
        eventOperator = _eventOperator;

        uint256 _yeming = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
        //事件经手人掌握的道理授权给噎明
        IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN)).approveActor(eventOperator, _yeming, 1e29);
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你提取了一些道理。
        return "\xE4\xBD\xA0\xE6\x8F\x90\xE5\x8F\x96\xE4\xBA\x86\xE4\xB8\x80\xE4\xBA\x9B\xE9\x81\x93\xE7\x90\x86\xE3\x80\x82";
    }

    function checkOccurrence(uint256 /*_actor*/, uint256 /*_age*/) external virtual view override returns (bool) {
        //check event operator
        if(eventOperator == 0)
            return false;

        return true;
    }

    //params = [数量]
    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(eventOperator > 0, "event operator not initialized");
        require(_uintParams.length==1, "params is invalid");

        uint256 assetAmount = _uintParams[0];
        IWorldFungible assetDaoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        require(assetDaoli.balanceOfActor(_actor) >= assetAmount, "not enough daoli");

        //先转给经手人            
        assetDaoli.transferFromActor(_operator, _actor, eventOperator, assetAmount);
        //在从经手人提出来转给角色所有人地址
        assetDaoli.withdraw(_operator, eventOperator, assetAmount);
        IActors actors = IActors(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTORS));
        IERC20(address(assetDaoli)).transfer(actors.getActor(_actor).owner, assetAmount);
    }
}
