// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
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
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 public eventOperator;
    EnumerableSet.AddressSet private _attributeModules;

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

    function registerAttributeModule(address _attributeModule) external 
        onlyOwner
    {
        require(_attributeModule != address(0), "input can not be ZERO address!");
        bool rt = _attributeModules.add(_attributeModule);
        require(rt == true, "module with same address is exist.");
    }

    function changeAttributeModule(address _oldAddress, address _newAddress) external
        onlyOwner
    {
        require(_oldAddress != address(0), "input can not be ZERO address!");
        _attributeModules.remove(_oldAddress);
        if(_newAddress != address(0))
            _attributeModules.add(_newAddress);
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

    function _genName(IActorNames _names) internal view returns(string memory _firstName, string memory _lastName) {
        INameGenerator nameGen = INameGenerator(worldRoute.modules(225));
        uint256 _nameSeed = 0;
        do {
            string[] memory name = nameGen.genName(1, 0, 0, "", "", "", _nameSeed);
            require(name.length == 3, "name generator error");
            _firstName = string(abi.encodePacked(name[1], name[2]));
            _lastName = name[0];
            _nameSeed++;
            require(_nameSeed <=5, "name generate failed!");
        }
        while(_names.isNameClaimed(_firstName, _lastName));
    }

    function _newActor(uint256 _operator, IWorldFungible _daoli, IActors _actors) internal returns (uint256 newActor) {
        uint256 actorPrice = _actors.actorPrice();
        _daoli.transferActor(_operator, eventOperator, actorPrice);
        _daoli.withdraw(_operator, eventOperator, actorPrice);

        newActor = _actors.nextActor();
        IERC20(address(_daoli)).approve(address(_actors), actorPrice);
        _actors.mintActor(actorPrice);

        //命名
        IActorNames names = IActorNames(worldRoute.modules(WorldConstants.WORLD_MODULE_NAMES));
        (string memory _firstName, string memory _lastName) = _genName(names);
        names.claim(_firstName, _lastName, newActor);

        IWorldYemings yemings = IWorldYemings(worldRoute.modules(WorldConstants.WORLD_MODULE_YEMINGS));
        IWorldTimeline timeline = IWorldTimeline(yemings.YeMings(_operator));
        _actors.approve(address(timeline), newActor);
        timeline.bornActor(newActor);
        timeline.grow(newActor);
    }

    function eventAttributeModifiersToTrigger(uint256 _evtId, uint256 _actor, IWorldEvents _events) internal view returns (int[] memory) {
        address _evtProc = _events.eventProcessors(_evtId);
        if(_evtProc != address(0))
            return StoryEventProcessor(_evtProc).eventAttributeModifiersToTrigger(_actor);
        int[] memory modifiers;
        return modifiers;
    }

    function _attributeModify(uint256 _attr, int _modifier) internal pure returns (uint256) {
        if(_modifier > 0)
            _attr += uint256(_modifier); 
        else {
            if(_attr < uint256(-_modifier))
                _attr = 0;
            else
                _attr -= uint256(-_modifier); 
        }
        return _attr;
    }

    function _applyAttributeModifiers(uint256 _operator, uint256 _actor, uint256 _age, int[] memory _attrModifier, IWorldEvents _events) internal {
        bool attributesModified = false;
        uint256[] memory attrib;
        for(uint256 i=0; i<_attributeModules.length(); i++) {
            IActorAttributes attrs = IActorAttributes(_attributeModules.at(i));
            (attrib, attributesModified) = attrs.applyModified(_actor, _attrModifier);
            if(attributesModified)            
                attrs.setAttributes(_operator, _actor, attrib); //this will trigger attribute uptate event
        }

        //check if change age
        for(uint256 m=0; m<_attrModifier.length; m+=2) {
            if(_attrModifier[m] == int(WorldConstants.ATTR_AGE)) {
                _events.changeAge(_operator, _actor, uint256(_attributeModify(uint256(_age), _attrModifier[m+1])));
                break;
            }
        }
    }

    function _newStory(uint256 _operator, uint256 _actor, uint256 _storyEvtId, IParameterizedStorylines _globalStory, IWorldEvents _events) internal {
        IActors actors = worldRoute.actors();
        IWorldFungible daoli = IWorldFungible(worldRoute.modules(WorldConstants.WORLD_MODULE_COIN));
        if(daoli.balanceOfActor(_operator) >= actors.actorPrice()) { //enough daoli
            uint256 newActor = _newActor(_operator, daoli, actors);

            //将新角色所有权交给全局剧情合约
            actors.transferFrom(address(this), address(_globalStory), newActor);

            _newStoryWithActor(_operator, _actor, _storyEvtId, newActor, _globalStory, _events);
        }
    }

    function _newStoryWithActor(uint256 _operator, uint256 _actor, uint256 _storyEvtId, uint256 _storyActor, IParameterizedStorylines _globalStory, IWorldEvents _events) internal {
        //启动剧情
        _globalStory.triggerActorEvent(_operator, _storyActor, _actor, _storyEvtId);
        _globalStory.setActorStory(_operator, _storyActor, _storyEvtId, _storyEvtId);

        //记录剧情角色
        IWorldStoryActors(worldRoute.modules(226)).addStoryActor(_operator, _storyEvtId, _storyActor);

        //对角色的影响
        int[] memory _attrModifier = eventAttributeModifiersToTrigger(_storyEvtId, _actor, _events);
        _applyAttributeModifiers(_operator, _actor, _events.ages(_actor), _attrModifier, _events);
    }

    function _triggerActorStory(uint256 _operator, uint256 _actor) internal {
        IParameterizedStorylines globalStory = IParameterizedStorylines(worldRoute.modules(223));
        IGlobalStoryRegistry globalStoryReg = IGlobalStoryRegistry(worldRoute.modules(224));
        uint256 storyIndex = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM)).dn(_actor, globalStoryReg.storyNum());
        uint256 storyEvtId = globalStoryReg.storyByIndex(storyIndex);
            
        IWorldEvents events = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));
        if(!globalStory.isStoryExist(storyEvtId)) { 
            //当前不在进行中的剧情
            if(!globalStoryReg.canStoryRepeat(storyEvtId) && globalStory.storyHistoryNum(storyEvtId) > 0)
                return; //不允许重复历史

            address _evtProc = events.eventProcessors(storyEvtId);
            if(_evtProc != address(0)) {
                int256 _needActor = StoryEventProcessor(_evtProc).needActor();
                if(_needActor < 0) {
                    //创建新角色，开启新剧情
                    if(events.canOccurred(worldRoute.actors().nextActor(), storyEvtId, 0))
                        _newStory(_operator, _actor, storyEvtId, globalStory, events);
                }
                else if(_needActor > 0) {
                    //以指定角色，开启新剧情
                    if(events.canOccurred(uint256(_needActor), storyEvtId, events.ages(uint256(_needActor))))
                        _newStoryWithActor(_operator, _actor, storyEvtId, uint256(_needActor), globalStory, events);
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
                if(events.canOccurred(storyActor, nextEvtId, events.ages(storyActor))) {
                    globalStory.triggerActorEvent(_operator, storyActor, _actor, nextEvtId);
                    globalStory.setActorStory(_operator, storyActor, storyEvtId, nextEvtId);

                    //对角色的影响
                    int[] memory _attrModifier = eventAttributeModifiersToTrigger(nextEvtId, _actor, events);
                    _applyAttributeModifiers(_operator, _actor, events.ages(_actor), _attrModifier, events);
                }
            }
        }
    }
}
