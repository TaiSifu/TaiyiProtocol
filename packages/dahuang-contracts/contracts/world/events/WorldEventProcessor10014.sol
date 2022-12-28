// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import '../../libs/DahuangConstants.sol';
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

contract WorldEventProcessor10014 is DefaultWorldEventProcessor, ERC721Holder {

    uint256 public eventOperator;
    mapping(uint256 => uint256[]) public actors_to_be_claimed;

    constructor(WorldContractRoute _route) DefaultWorldEventProcessor(_route, 0) {}

    function initOperator(uint256 _eventOperator) external 
        onlyOwner
    {
        require(eventOperator == 0, "event operator already initialized");
        IERC721(worldRoute.actorsAddress()).transferFrom(_msgSender(), address(this), _eventOperator);
        eventOperator = _eventOperator;

        //事件经手人掌握的道理授权给噎明
        uint256 _yeming = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
        IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN)).approveActor(eventOperator, _yeming, 1e29);
    }

    function eventInfo(uint256 /*_actor*/) external virtual view override returns (string memory) {
        //你父母又生了个儿子。
        return "\xE4\xBD\xA0\xE7\x88\xB6\xE6\xAF\x8D\xE5\x8F\x88\xE7\x94\x9F\xE4\xBA\x86\xE4\xB8\xAA\xE5\x84\xBF\xE5\xAD\x90\xE3\x80\x82";
    }
    //乾为天（乾卦）自强不息
    function trigrams(uint256 /*_actor*/) virtual external override view returns (uint256[] memory) {
        uint256[] memory _t = new uint256[](6);
        _t[0] = 1;
        _t[1] = 1;
        _t[2] = 1;
        _t[3] = 1;
        _t[4] = 1;
        _t[5] = 1;
        return _t;
    }
    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external view override returns (bool) {
        bool defaultRt = true;

        //check event operator
        if(eventOperator == 0)
            return false;

        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));
        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));

        //"(EVT?[10001,10125,10126,10014,10016,10017])|(TLT?[1011])"
        if(evts.actorEventCount(_actor, 10001) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10125) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10126) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10014) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10016) > 0)
            return false;
        if(evts.actorEventCount(_actor, 10017) > 0)
            return false;
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(tlts[i] == 1011)
                return false;
        }

        //验证角色所在时间线“道理”够不够
        uint256 YeMing = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        if(daoli.balanceOfActor(YeMing) < worldRoute.actors().actorPrice())
            return false;

        //"EVT?[10009]",
        defaultRt = false; //default should be fasle if have "include" conditions
        if(evts.actorEventCount(_actor, 10009) > 0)
            return true;

        return defaultRt;
    }

    function process(uint256 _operator, uint256 _actor, uint256 /*_age*/) external override
        onlyYeMing(_operator)
    {
        require(eventOperator > 0, "event operator not initialized");
        //时间线为该事件准备资金
        uint256 YeMing = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE)).operator();
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

        //pre set talents
        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));
        talents.setActorTalent(_operator, newActor, 1000); //生而平凡
        talents.setActorTalent(_operator, newActor, 1003); //生而为男
        talents.setActorTalent(_operator, newActor, 1017); //有哥哥姐姐

        //set relationship
        IActorRelationship relationship = IActorRelationship(worldRoute.modules(DahuangConstants.WORLD_MODULE_RELATIONSHIP));
        relationship.setActorRelation(_operator, _actor, newActor, 3); //姐弟
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
