// SPDX-License-Identifier: MIT
//该合约有Bug，但是在测试网大荒上已经成为历史事实，入驻的操作员无法取出，资金也全部在操作员身上
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor60518 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //要求太乙村村长捐出一定的资源作为社会建设基金。
        return "\xE8\xA6\x81\xE6\xB1\x82\xE5\xA4\xAA\xE4\xB9\x99\xE6\x9D\x91\xE6\x9D\x91\xE9\x95\xBF\xE6\x8D\x90\xE5\x87\xBA\xE4\xB8\x80\xE5\xAE\x9A\xE7\x9A\x84\xE8\xB5\x84\xE6\xBA\x90\xE4\xBD\x9C\xE4\xB8\xBA\xE7\xA4\xBE\xE4\xBC\x9A\xE5\xBB\xBA\xE8\xAE\xBE\xE5\x9F\xBA\xE9\x87\x91\xE3\x80\x82";
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        bool defaultRt = true;

        if(_actor != WorldConstants.ACTOR_PANGU) //限定盘古
            return false;

        return defaultRt;
    }

    //params = [村长ID，资源模块ID，数量]
    function activeTrigger(uint256 _operator, uint256 /*_actor*/, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length==3, "params is invalid");

        uint256 fromActor = _uintParams[0];
        uint256 assetModuleId = _uintParams[1];
        uint256 assetAmount = _uintParams[2];
        IWorldFungible assets = IWorldFungible(worldRoute.modules(assetModuleId));
        require(assets.balanceOfActor(fromActor) >= assetAmount, "asset is not enough");            
        assets.transferFromActor(_operator, fromActor, _operator, assetAmount);
    }
}
