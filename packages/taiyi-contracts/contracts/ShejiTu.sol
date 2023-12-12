// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

/// @title The Taiyi ShejiTu

/*********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░█████████░░█████████░░░░░ *
 * ░░░░█████████░░█████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 *********************************/

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import { ReentrancyGuardUpgradeable } from '@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol';
import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import './interfaces/WorldInterfaces.sol';
import './libs/Base64.sol';
import "./world/attributes/ActorAttributes.sol";
//import "hardhat/console.sol";

contract ShejiTu is IWorldTimeline, ERC165, IERC721Receiver, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    using EnumerableSet for EnumerableSet.AddressSet;

    /* *******
     * Globals
     * *******
     */

    IActors public actors;
    IActorLocations public locations;
    IWorldZones public zones;
    IActorAttributes public attributes;
    IWorldEvents public override events;
    IActorTalents public talents;
    ITrigrams public trigrams;
    IWorldRandom public random;

    string public override name;
    string public override description;
    uint256 public override moduleID;

    uint256 public override operator; //timeline administrator authority, 噎鸣

    uint256 public startZone; //actors in this timeline born in this zone

    //map age to event pool ids
    mapping(uint256 => uint256[]) public eventIDs; //age to id list
    mapping(uint256 => uint256[]) public eventProbs; //age to prob list

    EnumerableSet.AddressSet private _attributeModules;

    /* *********
     * Modifiers
     * *********
     */

    modifier onlyApprovedOrOwner(uint _actor) {
        require(_isActorApprovedOrOwner(_actor), "not approved or owner of actor");
        _;
    }

    //角色位置和时间线校验
    modifier onlyCurrentTimeline(uint256 _actor) {
        require(locations.isActorUnlocked(_actor), "actor is locked by location");
        uint256[] memory lcs = locations.actorLocations(_actor);
        require(lcs.length == 2, "actor location invalid");
        require(lcs[0] == lcs[1] && lcs[0] > 0, "actor location unstable");
        address zta = zones.timelines(lcs[0]);
        require(zta == address(this), "not in current timeline");
        _;
    }

    /* ****************
     * Public Functions
     * ****************
     */

    /* ****************
     * External Functions
     * ****************
     */

    /**
     * @notice Initialize the ShejiTu and base contracts,
     * populate configuration values and init YeMing.
     * @dev This function can only be called once.
     */
    function initialize(
        string memory _name,
        string memory _desc,
        uint256 _moduleID,
        IActors _actors,
        IActorLocations _locations,
        IWorldZones _zones,
        IActorAttributes _attributes,
        IWorldEvents _evts,
        IActorTalents _talents,
        ITrigrams _trigrams,
        IWorldRandom _random
    ) external initializer {
        __ReentrancyGuard_init();
        __Ownable_init(_msgSender());

        name = _name;
        description = _desc;
        moduleID = _moduleID;

        actors = _actors;
        locations = _locations;
        zones = _zones;
        attributes = _attributes;
        events = _evts;
        talents = _talents;
        trigrams = _trigrams;
        random = _random;
    }

    function setStartZone(uint256 _zoneId) external 
        onlyOwner
    {
        require(_zoneId > 0, "zoneId invalid");
        startZone = _zoneId;
    }

    function initOperator(uint256 _operator) external 
        onlyOwner
    {
        require(operator == 0, "operator already initialized");
        actors.transferFrom(_msgSender(), address(this), _operator);
        operator = _operator;
    }

    function bornActor(uint256 _actor) external override
        onlyApprovedOrOwner(_actor)
    {
        return _bornActor(_actor);
    }

    function grow(uint256 _actor) external override virtual
        onlyApprovedOrOwner(_actor)
        onlyCurrentTimeline(_actor)
    {
        _grow(_actor);
    }

    function _grow(uint256 _actor) internal {
        require(operator > 0, "operator not initialized");
        if(attributes.characterPointsInitiated(_actor))
            require(attributes.attributesScores(WorldConstants.ATTR_HLH, _actor) > 0, "actor dead!");

        events.grow(operator, _actor);

        //do year age events
        _process(_actor, events.ages(_actor));
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

    function addAgeEvent(uint256 _age, uint256 _eventId, uint256 _eventProb) external 
        onlyOwner
    {
        require(_eventId > 0, "event id must not zero");
        require(eventIDs[_age].length == eventProbs[_age].length, "internal ids not match probs");
        eventIDs[_age].push(_eventId);
        eventProbs[_age].push(_eventProb);
    }

    function getAgeEventIds(uint256 _age) public view returns (uint256[] memory) {
        return eventIDs[_age];
    }

    function setAgeEventProb(uint256 _age, uint256 _eventId, uint256 _eventProb) external 
        onlyOwner
    {
        require(_eventId > 0, "event id must not zero");
        require(eventIDs[_age].length == eventProbs[_age].length, "internal ids not match probs");
        for(uint256 i=0; i<eventIDs[_age].length; i++) {
            if(eventIDs[_age][i] == _eventId)
                eventProbs[_age][i] = _eventProb;
        }
    }

    function getAgeEventProbs(uint256 _age) public view returns (uint256[] memory) {
        return eventProbs[_age];
    }

    function activeTrigger(uint256 _eventId, uint256 _actor, uint256[] memory _uintParams, string[] memory _stringParams) external override virtual
        onlyApprovedOrOwner(_actor)
        onlyCurrentTimeline(_actor)
    {
        _activeTrigger(_eventId, _actor, _uintParams, _stringParams);
    }

    function _activeTrigger(uint256 _eventId, uint256 _actor, uint256[] memory _uintParams, string[] memory _stringParams) internal {
        require(operator > 0, "operator not initialized");
        require(events.eventProcessors(_eventId) != address(0), "can not find event processor.");

        uint256 _age = events.ages(_actor);
        require(events.canOccurred(_actor, _eventId, _age), "event check occurrence failed.");
        uint256 branchEvtId = _processActiveEvent(_actor, _age, _eventId, _uintParams, _stringParams, 0);

        //only support two level branchs
        if(branchEvtId > 0 && events.canOccurred(_actor, branchEvtId, _age)) {
            branchEvtId = _processActiveEvent(_actor, _age, branchEvtId, _uintParams, _stringParams, 1);
            if(branchEvtId > 0 && events.canOccurred(_actor, branchEvtId, _age)) {
                branchEvtId = _processActiveEvent(_actor, _age, branchEvtId, _uintParams, _stringParams, 2);
                if(branchEvtId > 0 && events.canOccurred(_actor, branchEvtId, _age)) {
                    branchEvtId = _processActiveEvent(_actor, _age, branchEvtId, _uintParams, _stringParams, 3);
                    if(branchEvtId > 0 && events.canOccurred(_actor, branchEvtId, _age)) {
                        branchEvtId = _processActiveEvent(_actor, _age, branchEvtId, _uintParams, _stringParams, 4);
                        require(branchEvtId == 0, "only support 4 level branchs");
                    }
                }
            }
        }
    }

    /* **************
     * View Functions
     * **************
     */

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) external virtual override view returns (string memory, uint256 _endY) {
        if(_isActorInCurrentTimeline(_actor))
            return _tokenURISVGPart(_actor, _startY, _lineHeight);
        else
            return ("", _startY);
    }

    function tokenJSON(uint256 _actor) external virtual override view returns (string memory) {
        if(_isActorInCurrentTimeline(_actor))
            return _tokenURIJSONPart(_actor);
        else
            return "{}";
}

    function onERC721Received(address, address, uint256, bytes calldata) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC721Receiver).interfaceId || super.supportsInterface(interfaceId);
    }

    /* *****************
     * Private Functions
     * *****************
     */

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

    function _runTalentProcessor(uint256 _actor, uint256 _age, address _processorAddress) private {
        //approve talent processor the authority of timeline
        require(operator > 0, "Operator is not init");
        actors.approve(_processorAddress, operator);
        IActorTalentProcessor(_processorAddress).process(operator, _actor, _age); 
    }

    function _applyAttributeModifiers(uint256 _actor, uint256 _age, int[] memory _attrModifier) private {
        bool attributesModified = false;
        uint256[] memory attrib;
        for(uint256 i=0; i<_attributeModules.length(); i++) {
            IActorAttributes attrs = IActorAttributes(_attributeModules.at(i));
            (attrib, attributesModified) = attrs.applyModified(_actor, _attrModifier);
            if(attributesModified)            
                attrs.setAttributes(operator, _actor, attrib); //this will trigger attribute uptate event
        }

        //check if change age
        for(uint256 m=0; m<_attrModifier.length; m+=2) {
            if(_attrModifier[m] == int(WorldConstants.ATTR_AGE)) {
                events.changeAge(operator, _actor, uint256(_attributeModify(uint256(_age), _attrModifier[m+1])));
                break;
            }
        }
    }

    function _processTalents(uint256 _actor, uint256 _age) internal
        onlyApprovedOrOwner(_actor)
    {
        uint256[] memory tlts = talents.actorTalents(_actor);
        for(uint256 i=0; i<tlts.length; i++) {
            if(talents.canOccurred(_actor, tlts[i], _age)) {
                int[] memory _attrModifier = talents.talentAttributeModifiers(tlts[i]);
                _applyAttributeModifiers(_actor, _age, _attrModifier);

                //process talent if any processor
                address tltProcessorAddress = talents.talentProcessors(tlts[i]);
                if(tltProcessorAddress != address(0))
                    _runTalentProcessor(_actor, _age, tltProcessorAddress);
            }
        }
    }

    function _runEventProcessor(uint256 _actor, uint256 _age, address _processorAddress) private {
        //approve event processor the authority of timeline
        //worldRoute.actors().approve(_processorAddress, operator);
        IWorldEventProcessor evtProcessor = IWorldEventProcessor(_processorAddress);
        actors.setApprovalForAll(_processorAddress, true);
        evtProcessor.process(operator, _actor, _age); 
        actors.setApprovalForAll(_processorAddress, false);

        trigrams.addActorTrigrams(operator, _actor, evtProcessor.trigrams(_actor));
    }

    function _processEvent(uint256 _actor, uint256 _age, uint256 _eventId, uint256 _depth) private returns (uint256 _branchEvtId) {

        events.addActorEvent(operator, _actor, _age, _eventId);

        int[] memory _attrModifier = events.eventAttributeModifiers(_eventId, _actor);
        _applyAttributeModifiers(_actor, _age, _attrModifier);

        //process event if any processor
        address evtProcessorAddress = events.eventProcessors(_eventId);
        if(evtProcessorAddress != address(0))
            _runEventProcessor(_actor, _age, evtProcessorAddress);

        if(_depth == 0)
            emit AgeEvent(_actor, _age, _eventId);
        else
            emit BranchEvent(_actor, _age, _eventId);

        //check branch
        return events.checkBranch(_actor, _eventId, _age);
    }

    function _processEvents(uint256 _actor, uint256 _age) internal 
        onlyApprovedOrOwner(_actor)
    {
        //filter events for occurrence
        uint256[] memory _eventsFiltered = new uint256[](eventIDs[_age].length);
        uint256 _eventsFilteredNum = 0;
        for(uint256 i=0; i<eventIDs[_age].length; i++) {
            if(events.canOccurred(_actor, eventIDs[_age][i], _age)) {
                _eventsFiltered[_eventsFilteredNum] = i;
                _eventsFilteredNum++;
            }
        }

        uint256 pCt = 0;
        for(uint256 i=0; i<_eventsFilteredNum; i++) {
            pCt += eventProbs[_age][_eventsFiltered[i]];
        }
        uint256 prob = 0;
        if(pCt > 0)
            prob = random.dn(_actor, pCt);
        
        pCt = 0;
        for(uint256 i=0; i<_eventsFilteredNum; i++) {
            pCt += eventProbs[_age][_eventsFiltered[i]];
            if(pCt >= prob) {
                uint256 _eventId = eventIDs[_age][_eventsFiltered[i]];
                uint256 branchEvtId = _processEvent(_actor, _age, _eventId, 0);

                //only support 3 level branchs
                if(branchEvtId > 0 && events.canOccurred(_actor, branchEvtId, _age)) {
                    branchEvtId = _processEvent(_actor, _age, branchEvtId, 1);
                    if(branchEvtId > 0 && events.canOccurred(_actor, branchEvtId, _age)) {
                        branchEvtId = _processEvent(_actor, _age, branchEvtId, 2);
                        if(branchEvtId > 0 && events.canOccurred(_actor, branchEvtId, _age)) {
                            branchEvtId = _processEvent(_actor, _age, branchEvtId, 3);
                            if(branchEvtId > 0 && events.canOccurred(_actor, branchEvtId, _age)) {
                                branchEvtId = _processEvent(_actor, _age, branchEvtId, 4);
                                require(branchEvtId == 0, "only support 4 level branchs");
                            }
                        }
                    }
                }

                break;
            }
        }
    }

    function _process(uint256 _actor, uint256 _age) internal
        onlyApprovedOrOwner(_actor)
    {
        require(events.actorBorn(_actor), "actor have not born!");
        //require(_actorEvents[_actor][_age] == 0, "actor already have event!");
        require(eventIDs[_age].length > 0, "not exist any event in this age!");

        _processTalents(_actor, _age);
        _processEvents(_actor, _age);
    }

    function _runActiveEventProcessor(uint256 _actor, uint256 /*_age*/, address _processorAddress, uint256[] memory _uintParams, string[] memory _stringParams) private {
        //approve event processor the authority of timeline(YeMing)
        //worldRoute.actors().approve(_processorAddress, operator);
        actors.setApprovalForAll(_processorAddress, true);
        IWorldEventProcessor(_processorAddress).activeTrigger(operator, _actor, _uintParams, _stringParams);
        actors.setApprovalForAll(_processorAddress, false);
    }

    function _processActiveEvent(uint256 _actor, uint256 _age, uint256 _eventId, uint256[] memory _uintParams, string[] memory _stringParams, uint256 _depth) private returns (uint256 _branchEvtId)
    {
        events.addActorEvent(operator, _actor, _age, _eventId);

        int[] memory _attrModifier = events.eventAttributeModifiers(_eventId, _actor);
        _applyAttributeModifiers(_actor, _age, _attrModifier);

        //process active event if any processor
        address evtProcessorAddress = events.eventProcessors(_eventId);
        if(evtProcessorAddress != address(0))
            _runActiveEventProcessor(_actor, _age, evtProcessorAddress, _uintParams, _stringParams);

        if(_depth == 0)
            emit ActiveEvent(_actor, _age, _eventId);
        else
            emit BranchEvent(_actor, _age, _eventId);

        //check branch
        return events.checkBranch(_actor, _eventId, _age);
    }

    /* ****************
     * Private Functions
     * ****************
     */

    function _tokenURISVGPart(uint256 _actor, uint256 _startY, uint256 _lineHeight) private view returns (string memory, uint256 endY) {
        string memory parts;
        endY = _startY;
        (parts, endY) = _tokenSVG(_actor, endY + _lineHeight, _lineHeight);

        string memory moduleSVG;
        //talents
        (moduleSVG, endY) = talents.tokenSVG(_actor, endY + _lineHeight, _lineHeight);
        parts = string(abi.encodePacked(parts, moduleSVG));
        //attributes
        for(uint256 i=0; i<_attributeModules.length(); i++) {
            (moduleSVG, endY) = IWorldModule(_attributeModules.at(i)).tokenSVG(_actor, endY + _lineHeight, _lineHeight);
            parts = string(abi.encodePacked(parts, moduleSVG));
        }
        //events
        (moduleSVG, endY) = events.tokenSVG(_actor, endY + _lineHeight, _lineHeight);
        parts = string(abi.encodePacked(parts, moduleSVG));
        return (parts, endY);
    }

    function _tokenURIJSONPart(uint256 _actor) private view returns (string memory) {
        string memory json;
        json = string(abi.encodePacked(json, '{"base": ', _tokenJSON(_actor)));
        //talents
        json = string(abi.encodePacked(json, ', "m_', Strings.toString(talents.moduleID()),'": ', talents.tokenJSON(_actor)));
        //attributes
        for(uint256 i=0; i<_attributeModules.length(); i++) {
            IWorldModule mod = IWorldModule(_attributeModules.at(i));
            json = string(abi.encodePacked(json, ', "m_', Strings.toString(mod.moduleID()),'": ', mod.tokenJSON(_actor)));
        }
        //events
        json = string(abi.encodePacked(json, ', "m_', Strings.toString(events.moduleID()),'": ', events.tokenJSON(_actor)));
        json = string(abi.encodePacked(json, '}'));
        return json;
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', description,'</text>')), _endY);
    }

    function _tokenJSON(uint256 /*_actor*/) internal view returns (string memory) {
        return string(abi.encodePacked('{"name":  "', name,'"}'));
    }

    function _isActorApprovedOrOwner(uint _actor) internal view returns (bool) {
        return (actors.getApproved(_actor) == msg.sender || actors.ownerOf(_actor) == msg.sender) || actors.isApprovedForAll(actors.ownerOf(_actor), msg.sender);
    }

    function _bornActor(uint256 _actor) internal {
        events.bornActor(operator, _actor);

        require(startZone > 0, "start zone invalid");
        locations.setActorLocation(operator, _actor, startZone, startZone);
    }

    function _isActorInCurrentTimeline(uint256 _actor) internal view returns (bool) {
        uint256[] memory lcs = locations.actorLocations(_actor);        
        if(lcs.length != 2)
            return false;
        if(zones.timelines(lcs[0]) == address(this))
            return true;
        if(zones.timelines(lcs[1]) == address(this))
            return true;

        return false;
    }
}
