// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import '@taiyi/contracts/contracts/libs/Base64.sol';
import '@taiyi/contracts/contracts/world/WorldConfigurable.sol';
import '../../libs/DahuangConstants.sol';

contract ActorCoreAttributes is IActorAttributes, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    string[] public override attributeLabels = [
        "\xE8\x86\x82\xE5\x8A\x9B", //0.膂力
        "\xE4\xBD\x93\xE8\xB4\xA8", //1.体质
        "\xE7\x81\xB5\xE6\x95\x8F", //2.灵敏
        "\xE6\xA0\xB9\xE9\xAA\xA8", //3.根骨
        "\xE6\x82\x9F\xE6\x80\xA7", //4.悟性
        "\xE5\xAE\x9A\xE5\x8A\x9B" //5.定力
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

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {
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
            //核心属性：
            parts[0] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\xA0\xB8\xE5\xBF\x83\xE5\xB1\x9E\xE6\x80\xA7\xEF\xBC\x9A', '</text>'));
            _endY += _lineHeight;
            parts[1] = string(abi.encodePacked('<text x="20" y="', Strings.toString(_endY), '" class="base">'));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[DahuangConstants.ATTR_LVL - DahuangConstants.ATTR_BASE_CORE], "=", Strings.toString(attributesScores[DahuangConstants.ATTR_LVL][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[DahuangConstants.ATTR_TIZ - DahuangConstants.ATTR_BASE_CORE], "=", Strings.toString(attributesScores[DahuangConstants.ATTR_TIZ][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[DahuangConstants.ATTR_LIM - DahuangConstants.ATTR_BASE_CORE], "=", Strings.toString(attributesScores[DahuangConstants.ATTR_LIM][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[DahuangConstants.ATTR_GEG - DahuangConstants.ATTR_BASE_CORE], "=", Strings.toString(attributesScores[DahuangConstants.ATTR_GEG][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[DahuangConstants.ATTR_WUX - DahuangConstants.ATTR_BASE_CORE], "=", Strings.toString(attributesScores[DahuangConstants.ATTR_WUX][_actor]), "\xEF\xBC\x8C  "));
            parts[1] = string(abi.encodePacked(parts[1], attributeLabels[DahuangConstants.ATTR_DIL - DahuangConstants.ATTR_BASE_CORE], "=", Strings.toString(attributesScores[DahuangConstants.ATTR_DIL][_actor])));
            parts[1] = string(abi.encodePacked(parts[1], '</text>'));
            return (string(abi.encodePacked(parts[0], parts[1])), _endY);
        }
        else
            //核心属性未初始化。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\xA0\xB8\xE5\xBF\x83\xE5\xB1\x9E\xE6\x80\xA7\xE6\x9C\xAA\xE5\x88\x9D\xE5\xA7\x8B\xE5\x8C\x96\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string memory json = '';
        json = string(abi.encodePacked('{"LVL": ', Strings.toString(attributesScores[DahuangConstants.ATTR_LVL][_actor])));
        json = string(abi.encodePacked(json, ', "TIZ": ', Strings.toString(attributesScores[DahuangConstants.ATTR_TIZ][_actor])));
        json = string(abi.encodePacked(json, ', "LIM": ', Strings.toString(attributesScores[DahuangConstants.ATTR_LIM][_actor])));
        json = string(abi.encodePacked(json, ', "GEG": ', Strings.toString(attributesScores[DahuangConstants.ATTR_GEG][_actor])));
        json = string(abi.encodePacked(json, ', "WUX": ', Strings.toString(attributesScores[DahuangConstants.ATTR_WUX][_actor])));
        json = string(abi.encodePacked(json, ', "DIL": ', Strings.toString(attributesScores[DahuangConstants.ATTR_DIL][_actor]), '}'));
        return json;
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES; }

    function pointActor(uint256 _actor) external 
        onlyApprovedOrOwner(_actor)
    {        
        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));
        require(talents.actorTalentsInitiated(_actor), "talents have not initiated");
        require(!characterPointsInitiated[_actor], "already init points");

        IWorldRandom rand = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
        uint256 _maxPointBuy = talents.actorAttributePointBuy(_actor, DahuangConstants.WORLD_MODULE_CORE_ATTRIBUTES);
        uint256 lvl = 0;
        uint256 tiz = 0;
        uint256 lim = 0;
        uint256 geg = 0;
        uint256 wux = 0;
        uint256 dil = 0;
        if(_maxPointBuy > 0)
            lvl = rand.dn(_actor, _maxPointBuy);
        if((_maxPointBuy-lvl) > 0)
            tiz = rand.dn(_actor+1, _maxPointBuy-lvl);
        if((_maxPointBuy-lvl-tiz) > 0)
            lim = rand.dn(_actor+2, _maxPointBuy-lvl-tiz);
        if((_maxPointBuy-lvl-tiz-lim) > 0)
            geg = rand.dn(_actor+2, _maxPointBuy-lvl-tiz-lim);
        if((_maxPointBuy-lvl-tiz-lim-geg) > 0)
            wux = rand.dn(_actor+2, _maxPointBuy-lvl-tiz-lim-geg);
        dil = _maxPointBuy-lvl-tiz-lim-geg-wux;

        attributesScores[DahuangConstants.ATTR_LVL][_actor] = lvl;
        attributesScores[DahuangConstants.ATTR_TIZ][_actor] = tiz;
        attributesScores[DahuangConstants.ATTR_LIM][_actor] = lim;
        attributesScores[DahuangConstants.ATTR_GEG][_actor] = geg;
        attributesScores[DahuangConstants.ATTR_WUX][_actor] = wux;
        attributesScores[DahuangConstants.ATTR_DIL][_actor] = dil;

        characterPointsInitiated[_actor] = true;

        uint256[] memory atts = new uint256[](12);
        atts[0] = DahuangConstants.ATTR_LVL;
        atts[1] = attributesScores[DahuangConstants.ATTR_LVL][_actor];
        atts[2] = DahuangConstants.ATTR_TIZ;
        atts[3] = attributesScores[DahuangConstants.ATTR_TIZ][_actor];
        atts[4] = DahuangConstants.ATTR_LIM;
        atts[5] = attributesScores[DahuangConstants.ATTR_LIM][_actor];
        atts[6] = DahuangConstants.ATTR_GEG;
        atts[7] = attributesScores[DahuangConstants.ATTR_GEG][_actor];
        atts[8] = DahuangConstants.ATTR_WUX;
        atts[9] = attributesScores[DahuangConstants.ATTR_WUX][_actor];
        atts[10] = DahuangConstants.ATTR_DIL;
        atts[11] = attributesScores[DahuangConstants.ATTR_DIL][_actor];

        emit Created(msg.sender, _actor, atts);
    }

    function setAttributes(uint256 _operator, uint256 _actor, uint256[] memory _attributes) external override
        onlyYeMing(_operator)
        onlyPointsInitiated(_actor)
    {
        require(_attributes.length % 2 == 0, "max_point_buyattributes is invalid.");        

        bool updated = false;
        for(uint256 i=0; i<_attributes.length; i+=2) {
            if(_attributes[i] == DahuangConstants.ATTR_LVL) {
                attributesScores[DahuangConstants.ATTR_LVL][_actor] = _attributes[i+1];
                updated = true;
            }
            else if(_attributes[i] == DahuangConstants.ATTR_TIZ) {
                attributesScores[DahuangConstants.ATTR_TIZ][_actor] = _attributes[i+1];
                updated = true;
            }
            else if(_attributes[i] == DahuangConstants.ATTR_LIM) {
                attributesScores[DahuangConstants.ATTR_LIM][_actor] = _attributes[i+1];
                updated = true;
            }
            else if(_attributes[i] == DahuangConstants.ATTR_GEG) {
                attributesScores[DahuangConstants.ATTR_GEG][_actor] = _attributes[i+1];
                updated = true;
            }
            else if(_attributes[i] == DahuangConstants.ATTR_WUX) {
                attributesScores[DahuangConstants.ATTR_WUX][_actor] = _attributes[i+1];
                updated = true;
            }
            else if(_attributes[i] == DahuangConstants.ATTR_DIL) {
                attributesScores[DahuangConstants.ATTR_DIL][_actor] = _attributes[i+1];
                updated = true;
            }
        }

        if(updated) {
            uint256[] memory atts = new uint256[](12);
            atts[0] = DahuangConstants.ATTR_LVL;
            atts[1] = attributesScores[DahuangConstants.ATTR_LVL][_actor];
            atts[2] = DahuangConstants.ATTR_TIZ;
            atts[3] = attributesScores[DahuangConstants.ATTR_TIZ][_actor];
            atts[4] = DahuangConstants.ATTR_LIM;
            atts[5] = attributesScores[DahuangConstants.ATTR_LIM][_actor];
            atts[6] = DahuangConstants.ATTR_GEG;
            atts[7] = attributesScores[DahuangConstants.ATTR_GEG][_actor];
            atts[8] = DahuangConstants.ATTR_WUX;
            atts[9] = attributesScores[DahuangConstants.ATTR_WUX][_actor];
            atts[10] = DahuangConstants.ATTR_DIL;
            atts[11] = attributesScores[DahuangConstants.ATTR_DIL][_actor];

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
        uint256 lvl = attributesScores[DahuangConstants.ATTR_LVL][_actor];
        uint256 tiz = attributesScores[DahuangConstants.ATTR_TIZ][_actor];
        uint256 lim = attributesScores[DahuangConstants.ATTR_LIM][_actor];
        uint256 geg = attributesScores[DahuangConstants.ATTR_GEG][_actor];
        uint256 wux = attributesScores[DahuangConstants.ATTR_WUX][_actor];
        uint256 dil = attributesScores[DahuangConstants.ATTR_DIL][_actor];
        for(uint256 i=0; i<_modifiers.length; i+=2) {
            if(_modifiers[i] == int(DahuangConstants.ATTR_LVL)) {
                lvl = _attributeModify(lvl, _modifiers[i+1]);
                attributesModified = true;
            }
            else if(_modifiers[i] == int(DahuangConstants.ATTR_TIZ)) {
                tiz = _attributeModify(tiz, _modifiers[i+1]);
                attributesModified = true;
            }
            else if(_modifiers[i] == int(DahuangConstants.ATTR_LIM)) {
                lim = _attributeModify(lim, _modifiers[i+1]);
                attributesModified = true;
            }
            else if(_modifiers[i] == int(DahuangConstants.ATTR_GEG)) {
                geg = _attributeModify(geg, _modifiers[i+1]);
                attributesModified = true;
            }
            else if(_modifiers[i] == int(DahuangConstants.ATTR_WUX)) {
                wux = _attributeModify(wux, _modifiers[i+1]);
                attributesModified = true;
            }
            else if(_modifiers[i] == int(DahuangConstants.ATTR_DIL)) {
                dil = _attributeModify(dil, _modifiers[i+1]);
                attributesModified = true;
            }
        }

        uint256[] memory atts = new uint256[](12);
        atts[0] = DahuangConstants.ATTR_LVL;
        atts[1] = lvl;
        atts[2] = DahuangConstants.ATTR_TIZ;
        atts[3] = tiz;
        atts[4] = DahuangConstants.ATTR_LIM;
        atts[5] = lim;
        atts[6] = DahuangConstants.ATTR_GEG;
        atts[7] = geg;
        atts[8] = DahuangConstants.ATTR_WUX;
        atts[9] = wux;
        atts[10] = DahuangConstants.ATTR_DIL;
        atts[11] = dil;

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
