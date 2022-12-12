// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import '@taiyi/contracts/contracts/libs/Base64.sol';
import '@taiyi/contracts/contracts/world/WorldConfigurable.sol';
import '../../libs/XumiConstants.sol';

library ActorXumiAttributesConstants {
    //主要属性
    uint256 public constant _BASE = 1000; // ID起始值
    uint256 public constant INF = _BASE;        // 信息 information INF
    uint256 public constant MAS = _BASE + 1;    // 质量 mass MAS
    uint256 public constant ENG = _BASE + 2;    // 能量 energy ENG
    uint256 public constant STB = _BASE + 3;    // 稳定性 stability STB
}

contract ActorXumiAttributes is IActorAttributes, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    string[] public override attributeLabels = [
        "\xE4\xBF\xA1\xE6\x81\xAF", //0.信息
        "\xE8\xB4\xA8\xE9\x87\x8F", //1.质量
        "\xE8\x83\xBD\xE9\x87\x8F", //2.能量
        "\xE7\xA8\xB3\xE5\xAE\x9A\xE6\x80\xA7" //3.稳定性
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

    constructor(address _worldRouteAddress) WorldConfigurable(_worldRouteAddress) {
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

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        if(characterPointsInitiated[_actor]) {
            string[7] memory parts;
            //粒子属性：
            parts[0] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', 
                '\xE7\xB2\x92\xE5\xAD\x90\xE5\xB1\x9E\xE6\x80\xA7\xEF\xBC\x9A', '</text>'));
            _endY += _lineHeight;
            parts[1] = string(abi.encodePacked('<text x="20" y="', Strings.toString(_endY), '" class="base">'));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[ActorXumiAttributesConstants.INF - ActorXumiAttributesConstants._BASE], "=", Strings.toString(attributesScores[ActorXumiAttributesConstants.INF][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[ActorXumiAttributesConstants.MAS - ActorXumiAttributesConstants._BASE], "=", Strings.toString(attributesScores[ActorXumiAttributesConstants.MAS][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[ActorXumiAttributesConstants.ENG - ActorXumiAttributesConstants._BASE], "=", Strings.toString(attributesScores[ActorXumiAttributesConstants.ENG][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[ActorXumiAttributesConstants.STB - ActorXumiAttributesConstants._BASE], "=", Strings.toString(attributesScores[ActorXumiAttributesConstants.STB][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], '</text>'));
            return (string(abi.encodePacked(parts[0], parts[1])), _endY);
        }
        else
            //粒子属性未初始化。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">',
                '\xE7\xB2\x92\xE5\xAD\x90\xE5\xB1\x9E\xE6\x80\xA7\xE6\x9C\xAA\xE5\x88\x9D\xE5\xA7\x8B\xE5\x8C\x96\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string memory json = '';
        json = string(abi.encodePacked('{"INF": ', Strings.toString(attributesScores[ActorXumiAttributesConstants.INF][_actor])));
        json = string(abi.encodePacked(json, ', "MAS": ', Strings.toString(attributesScores[ActorXumiAttributesConstants.MAS][_actor])));
        json = string(abi.encodePacked(json, ', "ENG": ', Strings.toString(attributesScores[ActorXumiAttributesConstants.ENG][_actor])));
        json = string(abi.encodePacked(json, ', "STB": ', Strings.toString(attributesScores[ActorXumiAttributesConstants.STB][_actor]), '}'));
        return json;
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES; }

    function pointActor(uint256 _actor) external 
        onlyApprovedOrOwner(_actor)
    {        
        IActorTalents talents = IActorTalents(worldRoute.modules(WorldConstants.WORLD_MODULE_TALENTS));
        require(talents.actorTalentsInitiated(_actor), "talents have not initiated");
        require(!characterPointsInitiated[_actor], "already init points");

        IWorldRandom rand = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        uint256 _maxPointBuy = talents.actorAttributePointBuy(_actor, XumiConstants.WORLD_MODULE_XUMI_ATTRIBUTES);
        uint256 inf = 0;
        uint256 mas = 0;
        uint256 eng = 0;
        uint256 stb = 0;
        if(_maxPointBuy > 0)
            inf = rand.dn(_actor, _maxPointBuy);
        if((_maxPointBuy-inf) > 0)
            mas = rand.dn(_actor+1, _maxPointBuy-inf);
        if((_maxPointBuy-inf-mas) > 0)
            eng = rand.dn(_actor+2, _maxPointBuy-inf-mas);
        stb = _maxPointBuy-inf-mas-eng;

        attributesScores[ActorXumiAttributesConstants.INF][_actor] = inf;
        attributesScores[ActorXumiAttributesConstants.MAS][_actor] = mas;
        attributesScores[ActorXumiAttributesConstants.ENG][_actor] = eng;
        attributesScores[ActorXumiAttributesConstants.STB][_actor] = stb;

        characterPointsInitiated[_actor] = true;

        uint256[] memory atts = new uint256[](8);
        atts[0] = ActorXumiAttributesConstants.INF;
        atts[1] = attributesScores[ActorXumiAttributesConstants.INF][_actor];
        atts[2] = ActorXumiAttributesConstants.MAS;
        atts[3] = attributesScores[ActorXumiAttributesConstants.MAS][_actor];
        atts[4] = ActorXumiAttributesConstants.ENG;
        atts[5] = attributesScores[ActorXumiAttributesConstants.ENG][_actor];
        atts[6] = ActorXumiAttributesConstants.STB;
        atts[7] = attributesScores[ActorXumiAttributesConstants.STB][_actor];

        emit Created(msg.sender, _actor, atts);
    }

    function setAttributes(uint256 _operator, uint256 _actor, uint256[] memory _attributes) external override
        onlyYeMing(_operator)
        onlyPointsInitiated(_actor)
    {
        require(_attributes.length % 2 == 0, "max_point_buyattributes is invalid.");        

        bool updated = false;
        for(uint256 i=0; i<_attributes.length; i+=2) {
            if(_attributes[i] == ActorXumiAttributesConstants.INF) {
                attributesScores[ActorXumiAttributesConstants.INF][_actor] = _attributes[i+1];
                updated = true;
            }
            else if(_attributes[i] == ActorXumiAttributesConstants.MAS) {
                attributesScores[ActorXumiAttributesConstants.MAS][_actor] = _attributes[i+1];
                updated = true;
            }
            else if(_attributes[i] == ActorXumiAttributesConstants.ENG) {
                attributesScores[ActorXumiAttributesConstants.ENG][_actor] = _attributes[i+1];
                updated = true;
            }
            else if(_attributes[i] == ActorXumiAttributesConstants.STB) {
                attributesScores[ActorXumiAttributesConstants.STB][_actor] = _attributes[i+1];
                updated = true;
            }
        }

        if(updated) {
            uint256[] memory atts = new uint256[](8);
            atts[0] = ActorXumiAttributesConstants.INF;
            atts[1] = attributesScores[ActorXumiAttributesConstants.INF][_actor];
            atts[2] = ActorXumiAttributesConstants.MAS;
            atts[3] = attributesScores[ActorXumiAttributesConstants.MAS][_actor];
            atts[4] = ActorXumiAttributesConstants.ENG;
            atts[5] = attributesScores[ActorXumiAttributesConstants.ENG][_actor];
            atts[6] = ActorXumiAttributesConstants.STB;
            atts[7] = attributesScores[ActorXumiAttributesConstants.STB][_actor];

            emit Updated(msg.sender, _actor, atts);
        }
    }

    /* **************
     * View Functions
     * **************
     */

    function applyModified(uint256 _actor, int[] memory _modifiers) external view override returns (uint256[] memory, bool) {
        require(_modifiers.length % 2 == 0, "ActorCoreAttributes: modifiers is invalid.");        
        bool attributesModified = false;
        uint256 inf = attributesScores[ActorXumiAttributesConstants.INF][_actor];
        uint256 mas = attributesScores[ActorXumiAttributesConstants.MAS][_actor];
        uint256 eng = attributesScores[ActorXumiAttributesConstants.ENG][_actor];
        uint256 stb = attributesScores[ActorXumiAttributesConstants.STB][_actor];
        for(uint256 i=0; i<_modifiers.length; i+=2) {
            if(_modifiers[i] == int(ActorXumiAttributesConstants.INF)) {
                inf = _attributeModify(inf, _modifiers[i+1]);
                attributesModified = true;
            }
            else if(_modifiers[i] == int(ActorXumiAttributesConstants.MAS)) {
                mas = _attributeModify(mas, _modifiers[i+1]);
                attributesModified = true;
            }
            else if(_modifiers[i] == int(ActorXumiAttributesConstants.ENG)) {
                eng = _attributeModify(eng, _modifiers[i+1]);
                attributesModified = true;
            }
            else if(_modifiers[i] == int(ActorXumiAttributesConstants.STB)) {
                stb = _attributeModify(stb, _modifiers[i+1]);
                attributesModified = true;
            }
        }

        uint256[] memory atts = new uint256[](8);
        atts[0] = ActorXumiAttributesConstants.INF;
        atts[1] = inf;
        atts[2] = ActorXumiAttributesConstants.MAS;
        atts[3] = mas;
        atts[4] = ActorXumiAttributesConstants.ENG;
        atts[5] = eng;
        atts[6] = ActorXumiAttributesConstants.STB;
        atts[7] = stb;

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
        uint256 _endY = 0;
        (parts[1], _endY) = _tokenSVG(_actor, _endY + 20, 20);
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
