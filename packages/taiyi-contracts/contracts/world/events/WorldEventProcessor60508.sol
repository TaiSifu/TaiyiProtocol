// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
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

contract WorldEventProcessor60508 is DefaultWorldEventProcessor, ERC721Holder {

    uint256 public eventOperator;
    mapping(uint256 => uint256[]) public actors_to_be_claimed;

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function initOperator(uint256 _eventOperator) external 
        onlyOwner
    {
        require(eventOperator == 0, "event operator already initialized");
        IERC721(worldRoute.actorsAddress()).transferFrom(_msgSender(), address(this), _eventOperator);
        eventOperator = _eventOperator;
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你转世投胎了。
        return "\xE4\xBD\xA0\xE8\xBD\xAC\xE4\xB8\x96\xE6\x8A\x95\xE8\x83\x8E\xE4\xBA\x86\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        IActors rl = worldRoute.actors();
        uint256 mt; uint256 st;
        (mt , st) = rl.actor(_actor);
        if(st == 0) //non exist actor
            return false;

        IActorPrelifes prelifes = IActorPrelifes(worldRoute.modules(WorldConstants.WORLD_MODULE_PRELIFES));
        if(prelifes.postLifes(_actor) > 0)
            return false; //actor is reincarnation
        IActorAttributes attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES));
        if(attributes.attributesScores(WorldConstants.ATTR_HLH, _actor) > 0)
            return false; //actor is alive

        //验证角色所在时间线“道理”够不够
        uint256 YeMing = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE)).operator();
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        if(daoli.balanceOfActor(YeMing) < worldRoute.actors().actorPrice())
            return false;

        return defaultRt;
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory /*_uintParams*/, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(eventOperator > 0, "event operator not initialized");
        //时间线为该事件准备资金
        uint256 YeMing = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE)).operator();
        require(_operator == YeMing, "not at actor's timeline");
        IActors actors = worldRoute.actors();
        uint256 actorPrice = actors.actorPrice();
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        daoli.transferActor(_operator, eventOperator, actorPrice);
        daoli.withdraw(_operator, eventOperator, actorPrice);

        uint256 newActor = actors.nextActor();
        IERC20(address(daoli)).approve(address(actors), actorPrice);
        actors.mintActor(actorPrice);
        actors_to_be_claimed[_actor].push(newActor);

        IActorPrelifes prelifes = IActorPrelifes(worldRoute.modules(WorldConstants.WORLD_MODULE_PRELIFES));
        prelifes.setPrelife(_operator, newActor, _actor);

        IActorSocialIdentity sids = IActorSocialIdentity(worldRoute.modules(WorldConstants.WORLD_MODULE_SIDS));
        if(sids.haveName(_actor, 49)) {
            //太乙百子
            sids.claim(_operator, 49, newActor);
        }
    }

    function claimActor(uint256 _actor) external
        onlyApprovedOrOwner(_actor)
    {
        require(actors_to_be_claimed[_actor].length > 0, "no actors need to claim.");

        IActors rl = worldRoute.actors();
        for(uint256 i=0; i<actors_to_be_claimed[_actor].length; i++) {
            rl.transferFrom(address(this), msg.sender, actors_to_be_claimed[_actor][i]);
        }

        delete actors_to_be_claimed[_actor];
    }
}
