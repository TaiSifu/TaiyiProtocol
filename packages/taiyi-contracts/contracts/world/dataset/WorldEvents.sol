// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";

contract WorldEvents is IWorldEvents, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */
    uint256 public override moduleID;

    uint256 immutable public ONE_AGE_VSECOND; //how many seconds in real means 1 age in rarelife
    mapping(uint256 => uint256) public bornTimeStamps;
    mapping(uint256 => bool) public override actorBorn;
    mapping(uint256 => bool) public override actorBirthday; //have at least one birthday

    mapping(uint256 => uint256) public override ages; //actor current age
    mapping(uint256 => mapping(uint256 => uint256[])) private _actorEvents; //map actor to age to event    
    mapping(uint256 => mapping(uint256 => uint256)) private _actorEventsHistory; //map actor to event to count

    mapping(uint256 => address) public override eventProcessors;
    
    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(uint256 _oneAgeVSecond, WorldContractRoute _route, uint256 _moduleID) WorldConfigurable(_route) 
    {
        ONE_AGE_VSECOND = _oneAgeVSecond;
        moduleID = _moduleID;
    }

    /* *****************
     * Private Functions
     * *****************
     */

    /* ****************
     * External Functions
     * ****************
     */

    function setEventProcessor(uint256 _id, address _address) external override
        onlyPanGu
    {
        eventProcessors[_id] = _address;        
    }

    function bornActor(uint256 _operator, uint256 _actor) external override 
        onlyYeMing(_operator)
        onlyApprovedOrOwner(_actor)
    {
        require(!actorBorn[_actor], "already born!");
        actorBorn[_actor] = true;
        bornTimeStamps[_actor] = block.timestamp;

        emit Born(_actor);
    }

    function grow(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
        onlyApprovedOrOwner(_actor)
    {
        require(actorBorn[_actor], "actor have not born");
        require(actorBirthday[_actor] == false || ages[_actor] < _expectedAge(_actor), "actor grow time have not come");

        if(actorBirthday[_actor]) {
            //grow one year
            ages[_actor] += 1;
        }
        else {
            //need first birthday
            ages[_actor] = 0;
            actorBirthday[_actor] = true;
        }
    }

    function changeAge(uint256 _operator, uint256 _actor, uint256 _age) external override
        onlyYeMing(_operator)
    {
        ages[_actor] = _age;
        if(_age == 0)
            actorBirthday[_actor] = false; //reset birthday
    }

    function addActorEvent(uint256 _operator, uint256 _actor, uint256 _age, uint256 _eventId) external override
        onlyYeMing(_operator)
    {
        _actorEvents[_actor][_age].push(_eventId);
        _actorEventsHistory[_actor][_eventId] += 1;
    }

    /* **************
     * View Functions
     * **************
     */

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) external override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) external override view returns (string memory) {
        return _tokenJSON(_actor);
    }

    function eventInfo(uint256 _id, uint256 _actor) public view override returns (string memory) {
        string memory info;
        if(eventProcessors[_id] != address(0))
            info = IWorldEventProcessor(eventProcessors[_id]).eventInfo(_actor);
        return info;
    }

    function eventAttributeModifiers(uint256 _id, uint256 _actor) external view override returns (int[] memory) {
        if(eventProcessors[_id] != address(0))
            return IWorldEventProcessor(eventProcessors[_id]).eventAttributeModifiers(_actor);
        int[] memory modifiers;
        return modifiers;
    }

    function canOccurred(uint256 _actor, uint256 _id, uint256 _age) external view override returns (bool) {
        if(eventProcessors[_id] == address(0))
            return true;
        return IWorldEventProcessor(eventProcessors[_id]).checkOccurrence(_actor, _age);
    }

    function checkBranch(uint256 _actor, uint256 _id, uint256 _age) external view override returns (uint256) {
        if(eventProcessors[_id] == address(0))
            return 0;
        return IWorldEventProcessor(eventProcessors[_id]).checkBranch(_actor, _age); 
    }

    function expectedAge(uint256 _actor) external override view returns (uint256) {
        return _expectedAge(_actor);
    }

    function actorEvent(uint256 _actor, uint256 _age) external override view returns (uint256[] memory) {
        return _actorEvents[_actor][_age];
    }

    function actorEventCount(uint256 _actor, uint256 _eventId) external override view returns (uint256) {
        return _actorEventsHistory[_actor][_eventId];
    }

    function tokenURI(uint256 _actor) public view returns (string memory) {
        string[7] memory parts;
        //start svg
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />';
        uint256 _endY = 0;
        (parts[1], _endY) = _tokenSVG(_actor, _endY + 20, 20);
        //end svg
        parts[2] = '</svg>';
        string memory svg = string(abi.encodePacked(parts[0], parts[1], parts[2]));

        //start json
        parts[0] = string(abi.encodePacked('{"name": "Actor #', Strings.toString(_actor), '"'));
        parts[1] = ', "description": "This is not a game"';
        parts[2] = string(abi.encodePacked(', "data": ', _tokenJSON(_actor)));
        //end json with svg
        parts[4] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    function tokenURIByAge(uint256 _actor, uint256 _age) public view returns (string memory) {
        string[7] memory parts;
        //start svg
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />';
        //Age:
        parts[1] = string(abi.encodePacked('<text x="10" y="20" class="base">', '\xE5\xB9\xB4\xE9\xBE\x84\xEF\xBC\x9A', Strings.toString(_age), '</text>'));
        parts[2] = '';
        string memory evtJson = '';
        for(uint256 i=0; i<_actorEvents[_actor][_age].length; i++) {
            uint256 _eventId = _actorEvents[_actor][_age][i];
            uint256 y = 20*i;
            parts[2] = string(abi.encodePacked(parts[2],
                string(abi.encodePacked('<text x="10" y="', Strings.toString(40+y), '" class="base">', eventInfo(_eventId, _actor), '</text>'))));
            evtJson = string(abi.encodePacked(evtJson, Strings.toString(_eventId), ','));
        }
        //end svg
        parts[3] = string(abi.encodePacked('</svg>'));
        string memory svg = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]));

        //start json
        parts[0] = string(abi.encodePacked('{"name": "Actor #', Strings.toString(_actor), '"'));
        parts[1] = ', "description": "This is not a game"';
        parts[2] = string(abi.encodePacked(', "data": {', '"age": ', Strings.toString(_age)));
        parts[3] = string(abi.encodePacked(', "events": [', evtJson, ']}'));
        //end json with svg
        parts[4] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    /* *****************
     * Private Functions
     * *****************
     */

    function _expectedAge(uint256 _actor) internal view returns (uint256) {
        require(actorBorn[_actor], "have not born!");
        uint256 _dt = block.timestamp - bornTimeStamps[_actor];
        return _dt / ONE_AGE_VSECOND;
    }

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        if(actorBorn[_actor]) {
            uint256 _age = ages[_actor];
            //Age: 
            string memory svg = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\xB9\xB4\xE9\xBE\x84\xEF\xBC\x9A', Strings.toString(ages[_actor]), '</text>'));
            uint256 evtCt = _actorEvents[_actor][_age].length;
            if(evtCt > 0) {
                uint256 _eventId = _actorEvents[_actor][_age][evtCt-1];
                _endY += _lineHeight;
                svg = string(abi.encodePacked(svg, string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', eventInfo(_eventId, _actor), '</text>'))));
            }
            return (svg, _endY);
        }
        else
            //Character have not born. 角色未出生。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE8\xA7\x92\xE8\x89\xB2\xE6\x9C\xAA\xE5\x87\xBA\xE7\x94\x9F\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        uint256 _age = ages[_actor];
        string memory json = string(abi.encodePacked('{"age": ', Strings.toString(_age)));
        json = string(abi.encodePacked(json, ', "bornTime": ', Strings.toString(bornTimeStamps[_actor])));
        json = string(abi.encodePacked(json, ', "events": ['));
        for(uint256 i=0; i<_actorEvents[_actor][_age].length; i++) {
            uint256 _eventId = _actorEvents[_actor][_age][i];
            json = string(abi.encodePacked(json, Strings.toString(_eventId)));
            if(i < (_actorEvents[_actor][_age].length-1))
                json = string(abi.encodePacked(json, ','));
        }
        return string(abi.encodePacked(json, ']}'));
    }
}
