// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import '../../libs/Base64.sol';
import '../WorldConfigurable.sol';

contract ActorAttributes is IActorAttributes, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */
    
    string[] public override attributeLabels = [
        "\xE5\xB9\xB4\xE9\xBE\x84", //年龄
        "\xE5\x81\xA5\xE5\xBA\xB7" //健康
    ];

    mapping(uint256 => mapping(uint256 => uint256)) public override attributesScores; //attributeId => (actor => score)
    mapping(uint256 => bool) public override characterPointsInitiated;

    /* *********
     * Modifiers
     * *********
     */

    modifier onlyPointsInitiated(uint256 _actor) {
        require(characterPointsInitiated[_actor], "points have not been initiated yet");
        _;
    }

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {}

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

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        if(characterPointsInitiated[_actor]) {
            //基础属性：
            string memory svg0 = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\x9F\xBA\xE7\xA1\x80\xE5\xB1\x9E\xE6\x80\xA7\xEF\xBC\x9A', '</text>'));
            _endY += _lineHeight;
            string memory svg1 = string(abi.encodePacked('<text x="20" y="', Strings.toString(_endY), '" class="base">', attributeLabels[WorldConstants.ATTR_HLH], "=", Strings.toString(attributesScores[WorldConstants.ATTR_HLH][_actor]), '</text>'));
            return (string(abi.encodePacked(svg0, svg1)), _endY);
        }
        else
            //基础属性未初始化。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\x9F\xBA\xE7\xA1\x80\xE5\xB1\x9E\xE6\x80\xA7\xE6\x9C\xAA\xE5\x88\x9D\xE5\xA7\x8B\xE5\x8C\x96\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string memory json = '';
        json = string(abi.encodePacked('{"HLH": ', Strings.toString(attributesScores[WorldConstants.ATTR_HLH][_actor]), '}'));
        return json;
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_ATTRIBUTES; }

    function pointActor(uint256 _actor) external 
        onlyApprovedOrOwner(_actor)
    {        
        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        require(talents.actorTalentsInitiated(_actor), "talents have not initiated");
        require(!characterPointsInitiated[_actor], "already init points");

        uint256 _maxPointBuy = talents.actorAttributePointBuy(_actor, WorldConstants.WORLD_MODULE_ATTRIBUTES);
        attributesScores[WorldConstants.ATTR_HLH][_actor] = 100;
        if(_maxPointBuy > 0)
            attributesScores[WorldConstants.ATTR_HLH][_actor] = _maxPointBuy;

        characterPointsInitiated[_actor] = true;

        uint256[] memory atts = new uint256[](2);
        atts[0] = WorldConstants.ATTR_HLH;
        atts[1] = attributesScores[WorldConstants.ATTR_HLH][_actor];
        emit Created(msg.sender, _actor, atts);
    }

    function setAttributes(uint256 _operator, uint256 _actor, uint256[] memory _attributes) external override
        onlyYeMing(_operator)
        onlyPointsInitiated(_actor)
    {
        require(_attributes.length % 2 == 0, "attributes is invalid.");        

        bool updated = false;
        for(uint256 i=0; i<_attributes.length; i+=2) {
            if(_attributes[i] == WorldConstants.ATTR_HLH) {
                attributesScores[WorldConstants.ATTR_HLH][_actor] = _attributes[i+1];
                updated = true;
                break;
            }
        }

        if(updated) {
            uint256[] memory atts = new uint256[](2);
            atts[0] = WorldConstants.ATTR_HLH;
            atts[1] = attributesScores[WorldConstants.ATTR_HLH][_actor];
            emit Updated(msg.sender, _actor, atts);
        }
    }

    /* **************
     * View Functions
     * **************
     */

    function applyModified(uint256 _actor, int[] memory _modifiers) external view override returns (uint256[] memory, bool) {
        require(_modifiers.length % 2 == 0, "modifiers is invalid.");        

        bool attributesModified = false;
        uint256 hlh = attributesScores[WorldConstants.ATTR_HLH][_actor];
        for(uint256 i=0; i<_modifiers.length; i+=2) {
            if(_modifiers[i] == int(WorldConstants.ATTR_HLH)) {
                hlh = _attributeModify(hlh, _modifiers[i+1]);
                attributesModified = true;
            }
        }

        uint256[] memory atts = new uint256[](2);
        atts[0] = WorldConstants.ATTR_HLH;
        atts[1] = hlh;
        return (atts, attributesModified);
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
        uint256 endY = 0;
        (parts[1], endY) = _tokenSVG(_actor, endY + 20, 20);
        //end svg
        parts[2] = '</svg>';
        string memory svg = string(abi.encodePacked(parts[0], parts[1], parts[2]));

        //start json
        parts[0] = string(abi.encodePacked('{"name": "Actor #', Strings.toString(_actor), ' attributes"'));
        parts[1] = ', "description": "This is not a game."';
        parts[2] = string(abi.encodePacked(', "data": ', _tokenJSON(_actor)));
        //end json with svg
        parts[3] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}
