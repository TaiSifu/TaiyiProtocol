// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";

contract ActorTalents is IActorTalents, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    uint256[]                  public talentIDs;
    mapping(uint256 => string) public talentNames;
    mapping(uint256 => string) public talentDescriptions;
    mapping(uint256 => uint256[]) internal _talentExclusivity;
    mapping(uint256 => mapping(uint256 => int256))  public override talentAttrPointsModifiers; //talent => (attribute moduleId => modifier)
    mapping(uint256 => int256[]) internal _talentAttributeModifiers; //talent => [attributeId, modifier...]
    mapping(uint256 => address) public override talentProcessors;

    //map actor to talents 
    mapping(uint256 => uint256[]) internal _actorTalents;
    mapping(uint256 => mapping(uint256 => bool)) public actorTalentMap;
    mapping(uint256 => bool) public override actorTalentsInitiated;

    /* *********
     * Modifiers
     * *********
     */

    modifier onlyTalentsInitiated(uint256 _actor) {
        require(actorTalentsInitiated[_actor], "talents not initiated yet");
        _;
    }

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(address _worldRouteAddress) WorldConfigurable(_worldRouteAddress) {
    }

    /* *****************
     * Private Functions
     * *****************
     */

    function _pointModify(uint256 _p, int _modifier) internal pure returns (uint256) {
        if(_modifier > 0)
            _p += uint256(_modifier); 
        else {
            if(_p < uint256(-_modifier))
                _p = 0;
            else
                _p -= uint256(-_modifier); 
        }
        return _p;
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        if(actorTalentsInitiated[_actor]) {
            if(_actorTalents[_actor].length > 0) {
                string[7] memory parts;
                //Talents:
                parts[0] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\xA4\xA9\xE8\xB5\x8B\xEF\xBC\x9A', '</text>'));
                for(uint256 i=0; i<_actorTalents[_actor].length; i++) {
                    uint256 tlt = _actorTalents[_actor][i];
                    _endY += _lineHeight;
                    parts[1] = string(abi.encodePacked(parts[1], string(abi.encodePacked('<text x="20" y="', Strings.toString(_endY), '" class="base_nocolor" fill="yellow">', talentNames[tlt], '</text>'))));
                    _endY += _lineHeight;
                    parts[1] = string(abi.encodePacked(parts[1], string(abi.encodePacked('<text x="20" y="', Strings.toString(_endY), '" class="base">', talentDescriptions[tlt], '</text>'))));
                }
                return (string(abi.encodePacked(parts[0], parts[1])), _endY);
            }
            else
                //No Talents. 无天赋。
                return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\xB2\xA1\xE6\x9C\x89\xE5\xA4\xA9\xE8\xB5\x8B\xE3\x80\x82', '</text>')), _endY);
        }
        else
            //Talents have not been initiated. 天赋未初始化。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\xA4\xA9\xE8\xB5\x8B\xE6\x9C\xAA\xE5\x88\x9D\xE5\xA7\x8B\xE5\x8C\x96\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string memory tltJson = '';
        for(uint256 i=0; i<_actorTalents[_actor].length; i++) {
            uint256 tlt = _actorTalents[_actor][i];
            tltJson = string(abi.encodePacked(tltJson, Strings.toString(tlt)));
            if(i < (_actorTalents[_actor].length-1))
                tltJson = string(abi.encodePacked(tltJson, ','));
        }
        return string(abi.encodePacked('[', tltJson, ']'));
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_TALENTS; }

    function setTalent(uint256 _id, string memory _name, string memory _description, int[] memory _modifiers, int[] memory _attrPointModifiers) external override
        onlyPanGu
    {
        require(keccak256(abi.encodePacked(_name)) != keccak256(abi.encodePacked("")), "invalid name");
        //require(keccak256(abi.encodePacked(talentNames[_id])) == keccak256(abi.encodePacked("")), "already have talent");
        require(_modifiers.length % 2 == 0, "modifiers is invalid.");        
        require(_attrPointModifiers.length % 2 == 0, "_attrPointModifiers is invalid.");        

        if(keccak256(abi.encodePacked(talentNames[_id])) == keccak256(abi.encodePacked(""))) {
            //first time
            talentIDs.push(_id);
        }

        talentNames[_id] = _name;
        talentDescriptions[_id] = _description;

        _talentAttributeModifiers[_id] = _modifiers;        
        for(uint256 m=0; m<_attrPointModifiers.length; m+=2)
            talentAttrPointsModifiers[_id][uint256(_attrPointModifiers[m])] = _attrPointModifiers[m+1];
    }

    function setTalentExclusive(uint256 _id, uint256[] memory _exclusive) external override
        onlyPanGu
    {
        require(keccak256(abi.encodePacked(talentNames[_id])) != keccak256(abi.encodePacked("")), "talent have not set");
        _talentExclusivity[_id] = _exclusive;
    }

    function setTalentProcessor(uint256 _id, address _processorAddress) external override
        onlyPanGu
    {
        require(keccak256(abi.encodePacked(talentNames[_id])) != keccak256(abi.encodePacked("")), "talent have not set");
        talentProcessors[_id] = _processorAddress;        
    }

    function talentActor(uint256 _actor) external 
        onlyApprovedOrOwner(_actor)
    {        
        require(!actorTalentsInitiated[_actor], "already init talents");

        IWorldRandom rand = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        uint256 tltCt = rand.dn(_actor, 4);
        if(tltCt > talentIDs.length)
            tltCt = talentIDs.length;
        if(tltCt > 0) {
            for(uint256 i=0; i<tltCt; i++) {
                uint256 ch = rand.dn(_actor+i, talentIDs.length);
                uint256 _id = talentIDs[ch];
                //REVIEW: check exclusivity at first
                bool isConflicted = false;
                if(_talentExclusivity[_id].length > 0) {
                    for(uint256 k=0; k<_talentExclusivity[_id].length; k++) {
                        for(uint256 j=0; j<_actorTalents[_actor].length; j++) {
                            if(_actorTalents[_actor][j] == _talentExclusivity[_id][k]) {
                                isConflicted = true;
                                break;
                            }
                        }
                        if(isConflicted)
                            break;
                    }
                }

                if(!isConflicted && !actorTalentMap[_actor][_id]) {
                    actorTalentMap[_actor][_id] = true;
                    _actorTalents[_actor].push(_id);
                }
            }
        }

        actorTalentsInitiated[_actor] = true;

        emit Created(msg.sender, _actor, _actorTalents[_actor]);
    }

    function setActorTalent(uint256 _operator, uint256 _actor, uint256 _tid) external override
        onlyYeMing(_operator)
    {
        require(actorTalentMap[_actor][_tid] == false, "actor talent is already exist.");

        actorTalentMap[_actor][_tid] = true;
        _actorTalents[_actor].push(_tid);
    }

    /* **************
     * View Functions
     * **************
     */

    function talentAttributeModifiers(uint256 _id) external view override returns (int256[] memory) {
        return _talentAttributeModifiers[_id];
    }

    function actorAttributePointBuy(uint256 _actor, uint256 _attributeModuleId) external view override returns (uint256) {
        uint256 point = 100;
        for(uint256 i=0; i<_actorTalents[_actor].length; i++) {
            uint256 tlt = _actorTalents[_actor][i];
            point = _pointModify(point, talentAttrPointsModifiers[tlt][_attributeModuleId]);
        }
        return point;
    }

    function actorTalents(uint256 _actor) external view override returns (uint256[] memory) {
        return _actorTalents[_actor];
    }

    function actorTalentsExist(uint256 _actor, uint256[] memory _talents) external view override returns (bool[] memory) {
        bool[] memory exists = new bool[](_talents.length);
        for(uint256 i=0; i<_talents.length; i++)
            exists[i] = actorTalentMap[_actor][_talents[i]];
        return exists;
    }

    function talentExclusivity(uint _id) external view override returns (uint256[] memory) {
        return _talentExclusivity[_id];
    }

    function talents(uint256 _id) external view override returns (string memory _name, string memory _description) {
        _name = talentNames[_id];
        _description = talentDescriptions[_id];
    }

    function canOccurred(uint256 _actor, uint256 _id, uint256 _age) external view override
        onlyTalentsInitiated(_actor)
        returns (bool)
    {
        //REVIEW: check exclusivity at first
        if(_talentExclusivity[_id].length > 0) {
            for(uint256 i=0; i<_talentExclusivity[_id].length; i++) {
                for(uint256 j=0; j<_actorTalents[_actor].length; j++) {
                    if(_actorTalents[_actor][j] == _talentExclusivity[_id][i])
                        return false;
                }
            }
        }

        if(talentProcessors[_id] == address(0)) {
            if(_age == 0) //no processor and only age 0
                return true;
            else
                return false;
        }

        return IActorTalentProcessor(talentProcessors[_id]).checkOccurrence(_actor, _age);
    }

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) external override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) external override view returns (string memory) {
        return _tokenJSON(_actor);
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
        parts[0] = string(abi.encodePacked('{"name": "Actor #', Strings.toString(_actor), ' talents"'));
        parts[1] = ', "description": "This is not a game."';
        parts[2] = string(abi.encodePacked(', "data": {', '"TLT": ', _tokenJSON(_actor), '}'));
        //end json with svg
        parts[3] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}
