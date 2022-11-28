// SPDX-License-Identifier: MIT
/// @title The Taiyi DAO auction house

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

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';
import { ReentrancyGuardUpgradeable } from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import './interfaces/WorldInterfaces.sol';
import { ISifusToken } from './interfaces/ISifusToken.sol';
import './libs/Base64.sol';
import "./world/WorldContractRoute.sol";
import "./world/attributes/ActorAttributes.sol";
//import "hardhat/console.sol";

contract ShejiTu is IWorldTimeline, ERC165, IERC721Receiver, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    using EnumerableSet for EnumerableSet.AddressSet;

    /* *******
     * Globals
     * *******
     */

    // The Sifus ERC721 token contract
    ISifusToken public sifus;

    uint256 public override ACTOR_YEMING; //timeline administrator authority, 噎鸣

    //map age to event pool ids
    mapping(uint256 => uint256[]) private _eventIDs; //age to id list
    mapping(uint256 => uint256[]) private _eventProbs; //age to prob list

    EnumerableSet.AddressSet private _attributeModules;

    // Address of the World Contract Route
    address internal _worldRouteContract;
    WorldContractRoute internal worldRoute;

    /* *********
     * Modifiers
     * *********
     */

    modifier onlyApprovedOrOwner(uint _actor) {
        require(_isActorApprovedOrOwner(_actor), "not approved or owner of actor");
        _;
    }

    modifier onlyPanGu() {
        require(_isActorApprovedOrOwner(WorldConstants.ACTOR_PANGU), "only PanGu");
        _;
    }

    modifier onlyYeMing(uint256 _actor) {
        require(worldRoute.isYeMing(_actor), "only YeMing");
        require(_isActorApprovedOrOwner(_actor), "not YeMing's operator");
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
        ISifusToken _sifus,
        address _worldRouteAddress
    ) external initializer {
        __ReentrancyGuard_init();
        __Ownable_init();

        sifus = _sifus;

        require(_worldRouteAddress != address(0), "cannot set route contract as zero address");
        _worldRouteContract = _worldRouteAddress;
        worldRoute = WorldContractRoute(_worldRouteAddress);

        IActors actors = worldRoute.actors();
        ACTOR_YEMING = actors.nextActor();
        actors.mintActor(0);
    }

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_TIMELINE; }

    function bornActor(uint256 _actor) external
        onlyApprovedOrOwner(_actor)
    {
        return _bornActor(_actor);
    }

    function grow(uint256 _actor) external override
        onlyApprovedOrOwner(_actor)
    {
        IActorAttributes attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES));
        require(attributes.attributesScores(ActorAttributesConstants.HLH, _actor) > 0, "actor dead!");

        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        evts.grow(ACTOR_YEMING, _actor);

        //do new year age events
        _process(_actor, evts.ages(_actor));
    }

    function registerAttributeModule(address _attributeModule) external 
        onlyPanGu
    {
        require(_attributeModule != address(0), "input can not be ZERO address!");
        bool rt = _attributeModules.add(_attributeModule);
        require(rt == true, "module with same address is exist.");
    }

    function changeAttributeModule(address _oldAddress, address _newAddress) external
        onlyPanGu
    {
        require(_oldAddress != address(0), "input can not be ZERO address!");
        _attributeModules.remove(_oldAddress);
        if(_newAddress != address(0))
            _attributeModules.add(_newAddress);
    }

    function addAgeEvent(uint256 _age, uint256 _eventId, uint256 _eventProb) external 
        onlyPanGu
    {
        require(_eventId > 0, "event id must not zero");
        require(_eventIDs[_age].length == _eventProbs[_age].length, "internal ids not match probs");
        _eventIDs[_age].push(_eventId);
        _eventProbs[_age].push(_eventProb);
    }

    function setAgeEventProb(uint256 _age, uint256 _eventId, uint256 _eventProb) external 
        onlyPanGu
    {
        require(_eventId > 0, "event id must not zero");
        require(_eventIDs[_age].length == _eventProbs[_age].length, "internal ids not match probs");
        for(uint256 i=0; i<_eventIDs[_age].length; i++) {
            if(_eventIDs[_age][i] == _eventId) {
                _eventProbs[_age][i] = _eventProb;
                return;
            }
        }
        require(false, "can not find _eventId");
    }

    function activeTrigger(uint256 _eventId, uint256 _actor, uint256[] memory _uintParams, string[] memory _stringParams) external override
        onlyApprovedOrOwner(_actor)
    {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));

        address evtProcessorAddress = evts.eventProcessors(_eventId);
        require(evtProcessorAddress != address(0), "can not find event processor.");

        uint256 _age = evts.ages(_actor);
        require(evts.canOccurred(_actor, _eventId, _age), "event check occurrence failed.");
        uint256 branchEvtId = _processActiveEvent(_actor, _age, _eventId, _uintParams, _stringParams, 0);

        //only support two level branchs
        if(branchEvtId > 0 && evts.canOccurred(_actor, branchEvtId, _age)) {
            branchEvtId = _processActiveEvent(_actor, _age, branchEvtId, _uintParams, _stringParams, 1);
            if(branchEvtId > 0 && evts.canOccurred(_actor, branchEvtId, _age)) {
                branchEvtId = _processActiveEvent(_actor, _age, branchEvtId, _uintParams, _stringParams, 2);
                require(branchEvtId == 0, "only support two level branchs");
            }
        }
    }

    /* **************
     * View Functions
     * **************
     */

    function tokenSVG(uint256 /*_actor*/, uint256 /*_startY*/, uint256 /*_lineHeight*/) external virtual override view returns (string memory, uint256 _endY) {
        return ("", _endY);
    }

    function tokenJSON(uint256 /*_actor*/) external virtual override view returns (string memory) {
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
        require(ACTOR_YEMING > 0, "YeMing is not init");
        worldRoute.actors().approve(_processorAddress, ACTOR_YEMING);
        IActorTalentProcessor(_processorAddress).process(ACTOR_YEMING, _actor, _age); 
    }

    function _applyAttributeModifiers(uint256 _actor, uint256 _age, int[] memory _attrModifier) private {
        bool attributesModified = false;
        uint256[] memory attrib;
        for(uint256 i=0; i<_attributeModules.length(); i++) {
            IActorAttributes attributes = IActorAttributes(_attributeModules.at(i));
            (attrib, attributesModified) = attributes.applyModified(_actor, _attrModifier);
            if(attributesModified)            
                attributes.setAttributes(_actor, attrib); //this will trigger attribute uptate event
        }

        //check if change age
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        for(uint256 m=0; m<_attrModifier.length; m+=2) {
            if(_attrModifier[m] == int(ActorAttributesConstants.AGE)) {
                evts.changeAge(ACTOR_YEMING, _actor, uint256(_attributeModify(uint256(_age), _attrModifier[m+1])));
                break;
            }
        }
    }

    function _processTalents(uint256 _actor, uint256 _age) internal
        onlyApprovedOrOwner(_actor)
    {
        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));

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
        //worldRoute.actors().approve(_processorAddress, ACTOR_YEMING);
        IWorldEventProcessor evtProcessor = IWorldEventProcessor(_processorAddress);
        worldRoute.actors().setApprovalForAll(_processorAddress, true);
        evtProcessor.process(ACTOR_YEMING, _actor, _age); 
        worldRoute.actors().setApprovalForAll(_processorAddress, false);

        ITrigrams(worldRoute.modules(WorldConstants.WORLD_MODULE_TRIGRAMS)).addActorTrigrams(ACTOR_YEMING, _actor, evtProcessor.trigrams(_actor));
    }

    function _processEvent(uint256 _actor, uint256 _age, uint256 _eventId, uint256 _depth) private returns (uint256 _branchEvtId) {

        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        evts.addActorEvent(ACTOR_YEMING, _actor, _age, _eventId);

        int[] memory _attrModifier = evts.eventAttributeModifiers(_eventId, _actor);
        _applyAttributeModifiers(_actor, _age, _attrModifier);

        //process event if any processor
        address evtProcessorAddress = evts.eventProcessors(_eventId);
        if(evtProcessorAddress != address(0))
            _runEventProcessor(_actor, _age, evtProcessorAddress);

        if(_depth == 0)
            emit AgeEvent(_actor, _age, _eventId);
        else
            emit BranchEvent(_actor, _age, _eventId);

        //check branch
        return evts.checkBranch(_actor, _eventId, _age);
    }

    function _processEvents(uint256 _actor, uint256 _age) internal 
        onlyApprovedOrOwner(_actor)
    {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));

        //filter events for occurrence
        uint256[] memory _eventsFiltered = new uint256[](_eventIDs[_age].length);
        uint256 _eventsFilteredNum = 0;
        for(uint256 i=0; i<_eventIDs[_age].length; i++) {
            if(evts.canOccurred(_actor, _eventIDs[_age][i], _age)) {
                _eventsFiltered[_eventsFilteredNum] = i;
                _eventsFilteredNum++;
            }
        }

        uint256 pCt = 0;
        for(uint256 i=0; i<_eventsFilteredNum; i++) {
            pCt += _eventProbs[_age][_eventsFiltered[i]];
        }
        uint256 prob = 0;
        if(pCt > 0) {
            IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
            prob = random.dn(_actor, pCt);
        }
        
        pCt = 0;
        for(uint256 i=0; i<_eventsFilteredNum; i++) {
            pCt += _eventProbs[_age][_eventsFiltered[i]];
            if(pCt >= prob) {
                uint256 _eventId = _eventIDs[_age][_eventsFiltered[i]];
                uint256 branchEvtId = _processEvent(_actor, _age, _eventId, 0);

                //only support 3 level branchs
                if(branchEvtId > 0 && evts.canOccurred(_actor, branchEvtId, _age)) {
                    branchEvtId = _processEvent(_actor, _age, branchEvtId, 1);
                    if(branchEvtId > 0 && evts.canOccurred(_actor, branchEvtId, _age)) {
                        branchEvtId = _processEvent(_actor, _age, branchEvtId, 2);
                        if(branchEvtId > 0 && evts.canOccurred(_actor, branchEvtId, _age)) {
                            branchEvtId = _processEvent(_actor, _age, branchEvtId, 3);
                            require(branchEvtId == 0, "only support 3 level branchs");
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
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        require(evts.actorBorn(_actor), "WorldTimeline: actor have not born!");
        //require(_actorEvents[_actor][_age] == 0, "WorldTimeline: actor already have event!");
        require(_eventIDs[_age].length > 0, "WorldTimeline: not exist any event in this age!");

        _processTalents(_actor, _age);
        _processEvents(_actor, _age);
    }

    function _runActiveEventProcessor(uint256 _actor, uint256 /*_age*/, address _processorAddress, uint256[] memory _uintParams, string[] memory _stringParams) private {
        //approve event processor the authority of timeline(YeMing)
        //worldRoute.actors().approve(_processorAddress, ACTOR_YEMING);
        worldRoute.actors().setApprovalForAll(_processorAddress, true);
        IWorldEventProcessor(_processorAddress).activeTrigger(ACTOR_YEMING, _actor, _uintParams, _stringParams);
        worldRoute.actors().setApprovalForAll(_processorAddress, false);
    }

    function _processActiveEvent(uint256 _actor, uint256 _age, uint256 _eventId, uint256[] memory _uintParams, string[] memory _stringParams, uint256 _depth) private returns (uint256 _branchEvtId)
    {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        evts.addActorEvent(ACTOR_YEMING, _actor, _age, _eventId);

        int[] memory _attrModifier = evts.eventAttributeModifiers(_eventId, _actor);
        _applyAttributeModifiers(_actor, _age, _attrModifier);

        //process active event if any processor
        address evtProcessorAddress = evts.eventProcessors(_eventId);
        if(evtProcessorAddress != address(0))
            _runActiveEventProcessor(_actor, _age, evtProcessorAddress, _uintParams, _stringParams);

        if(_depth == 0)
            emit ActiveEvent(_actor, _age, _eventId);
        else
            emit BranchEvent(_actor, _age, _eventId);

        //check branch
        return evts.checkBranch(_actor, _eventId, _age);
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    function _isActorApprovedOrOwner(uint _actor) internal view returns (bool) {
        IActors actors = worldRoute.actors();
        return (actors.getApproved(_actor) == msg.sender || actors.ownerOf(_actor) == msg.sender) || actors.isApprovedForAll(actors.ownerOf(_actor), msg.sender);
    }

    function _bornActor(uint256 _actor) internal {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(WorldConstants.WORLD_MODULE_EVENTS));
        evts.bornActor(ACTOR_YEMING, _actor);
    }
}
