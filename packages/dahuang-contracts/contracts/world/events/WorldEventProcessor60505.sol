// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@taiyi/contracts/contracts/world/events/DefaultWorldEventProcessor.sol";
import "@taiyi/contracts/contracts/world/events/StoryEventProcessor.sol";
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

contract WorldEventProcessor60505 is DefaultWorldEventProcessor, ERC721Holder {

    uint256 public eventOperator;

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
        //你进行了原始的野外采集活动。
        return "\xE4\xBD\xA0\xE8\xBF\x9B\xE8\xA1\x8C\xE4\xBA\x86\xE5\x8E\x9F\xE5\xA7\x8B\xE7\x9A\x84\xE9\x87\x8E\xE5\xA4\x96\xE9\x87\x87\xE9\x9B\x86\xE6\xB4\xBB\xE5\x8A\xA8\xE3\x80\x82";
    }

    function eventAttributeModifiers(uint256 /*_actor*/) external virtual view override returns (int256[] memory) {
        int256[] memory modifiers = new int256[](2);
        modifiers[0] = int256(DahuangConstants.ATTR_ACT);
        modifiers[1] = -1;
        return modifiers;
    }

    function checkOccurrence(uint256 _actor, uint256 /*_age*/) external virtual view override returns (bool) {
        IActorAttributes baseAttr = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES));
        uint256 _hlh = baseAttr.attributesScores(WorldConstants.ATTR_HLH, _actor);

        IActorBehaviorAttributes behavior = IActorBehaviorAttributes(worldRoute.modules(DahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES));
        uint256 _act = behavior.attributesScores(DahuangConstants.ATTR_ACT, _actor);
        
        return (_hlh > 0 && _act >= 1);
    }

    function activeTrigger(uint256 _operator, uint256 _actor, uint256[] memory _uintParams, string[] memory /*_stringParams*/) external override 
        onlyYeMing(_operator)
    {
        require(_uintParams.length>0, "params is invalid");
        uint256 zoneId = _uintParams[0];
        require(zoneId >=1, "collect zone is not valid");
        //IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
        //require(bytes(zones.names(zoneId)).length > 0, "zone is not exist");

        IActorLocations lcs = IActorLocations(worldRoute.modules(WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS));
        uint256[] memory lc = lcs.actorLocations(_actor);
        require(zoneId == lc[1], "must collect at actor located zone");

        //approve zone res module the authority of timeline operator
        address zoneResAddress = worldRoute.modules(DahuangConstants.WORLD_MODULE_ZONE_BASE_RESOURCES);
        worldRoute.actors().approve(zoneResAddress, _operator);

        IWorldZoneBaseResources zoneRes = IWorldZoneBaseResources(zoneResAddress);
        zoneRes.growAssets(_operator, zoneId); //trigger grow asset
        zoneRes.collectAssets(_operator, _actor, zoneId);

        //激活全局剧情
        if(eventOperator > 0)
            _triggerActorStory(_operator, _actor);
    }

    function _triggerActorStory(uint256 _operator, uint256 _actor) internal {
        IParameterizedStorylines globalStory = IParameterizedStorylines(worldRoute.modules(223));
        IGlobalStoryRegistry globalStoryReg = IGlobalStoryRegistry(worldRoute.modules(224));
        uint256 storyIndex = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM)).dn(_actor, globalStoryReg.storyNum());
        uint256 storyEvtId = globalStoryReg.storyByIndex(storyIndex);
            
        IWorldEvents events = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));
        if(!globalStory.isStoryExist(storyEvtId)) { //当前进行中的剧情
            if(!globalStoryReg.canStoryRepeat(storyEvtId) && globalStory.storyHistoryNum(storyEvtId) > 0)
                return; //不允许重复历史

            //创建新角色，开启新剧情
            if(events.canOccurred(_actor, storyEvtId, events.ages(_actor))) {
                IActors actors = worldRoute.actors();
                IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
                if(daoli.balanceOfActor(_operator) >= actors.actorPrice()) { //enough daoli
                    uint256 actorPrice = actors.actorPrice();
                    daoli.transferActor(_operator, eventOperator, actorPrice);
                    daoli.withdraw(_operator, eventOperator, actorPrice);

                    uint256 newActor = actors.nextActor();
                    IERC20(address(daoli)).approve(address(actors), actorPrice);
                    actors.mintActor(actorPrice);

                    //TODO: 命名 【剧角N】
                    IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES)).claim(string(abi.encodePacked("\xE8\xA7\x92", Strings.toString(newActor), "\xE3\x80\x91")),
                        "\xE3\x80\x90\xE5\x89\xA7", newActor);

                    IWorldYemings yemings = IWorldYemings(worldRoute.modules(WorldConstants.WORLD_MODULE_YEMINGS));
                    IWorldTimeline timeline = IWorldTimeline(yemings.YeMings(_operator));
                    actors.approve(address(timeline), newActor);
                    timeline.bornActor(newActor);
                    timeline.grow(newActor);

                    //将新角色所有权交给全局剧情合约
                    actors.transferFrom(address(this), address(globalStory), newActor);

                    //启动剧情
                    globalStory.triggerActorEvent(_operator, _actor, storyEvtId);
                    globalStory.setActorStory(_operator, newActor, storyEvtId, storyEvtId);

                    //剧情角色也有该事件历史
                    events.addActorEvent(_operator, newActor, 0, storyEvtId);
                }
            }
        }
        else {
            //正在进行的剧情，下一事件
            uint256 storyActor = globalStory.currentStoryActorByIndex(storyEvtId, 0);
            require(storyActor>0, "story internal error");
            uint256 currentEvtId = globalStory.currentActorEventByStoryId(storyActor, storyEvtId);
            uint256 nextEvtId = StoryEventProcessor(events.eventProcessors(currentEvtId)).nextStoryEventId(_actor);
            if(nextEvtId == 0) {
                //end story
                globalStory.setActorStory(_operator, storyActor, storyEvtId, 0);
            }
            else {
                if(events.canOccurred(_actor, nextEvtId, events.ages(_actor))) {
                    globalStory.triggerActorEvent(_operator, _actor, nextEvtId);
                    globalStory.setActorStory(_operator, storyActor, storyEvtId, nextEvtId);
                    //剧情角色也有该事件历史
                    events.addActorEvent(_operator, storyActor, events.ages(storyActor), nextEvtId);
                }
            }
        }
    }
}
