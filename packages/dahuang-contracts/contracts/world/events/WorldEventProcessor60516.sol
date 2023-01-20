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

contract WorldEventProcessor60516 is DefaultWorldEventProcessor {

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你提取了一些道理。
        return "\xE4\xBD\xA0\xE6\x8F\x90\xE5\x8F\x96\xE4\xBA\x86\xE4\xB8\x80\xE4\xBA\x9B\xE9\x81\x93\xE7\x90\x86\xE3\x80\x82";
    }

    //params = [数量]
    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length==1, "params is invalid");

        uint256 assetAmount = _uintParams[0];
        IWorldFungible assetDaoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        require(assetDaoli.balanceOfActor(_actor) >= assetAmount, "not enough daoli");
            
        assetDaoli.withdraw(_operator, _actor, assetAmount);
    }
}
