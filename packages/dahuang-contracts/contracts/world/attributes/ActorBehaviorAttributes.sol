// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import '@taiyi/contracts/contracts/libs/Base64.sol';
import '@taiyi/contracts/contracts/world/WorldConfigurable.sol';
import '../../libs/DahuangConstants.sol';

contract ActorBehaviorAttributes is IActorBehaviorAttributes, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    uint256 public immutable ACT_RECOVER_TIME_DAY; //行动力恢复周期（秒）

    string[] public override attributeLabels = [
        "\xE8\xA1\x8C\xE5\x8A\xA8\xE5\x8A\x9B" //行动力
    ];

    mapping(uint256 => mapping(uint256 => uint256)) public override attributesScores; //attributeId => (actor => score)
    mapping(uint256 => uint256) public lastActRecoverTimeStamps; //上次行动力恢复时间戳 (actor => time)
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

    constructor(uint256 _actRecoverTimeDay, WorldContractRoute _route) WorldConfigurable(_route) {
        ACT_RECOVER_TIME_DAY = _actRecoverTimeDay;
    }

    function canRecoverAct(uint256 _actor) virtual public override view returns (bool) {
        if(lastActRecoverTimeStamps[_actor] == 0)
            return true;

        uint256 _dt = block.timestamp - lastActRecoverTimeStamps[_actor];        
        return _dt >=ACT_RECOVER_TIME_DAY;
    }

    function getActorMaxRecoverAct(uint256 _actor) public view returns (uint256) {
        IWorldEvents evts = IWorldEvents(worldRoute.modules(DahuangConstants.WORLD_MODULE_EVENTS));
        uint256 _age = evts.ages(_actor);
        if(_age <= 4)
            return 10;
        else if(_age <= 14)
            return 20;
        else if(_age <= 49)
            return 30;
        else if(_age <= 89)
            return 20;
        else
            return 10;
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
            //行动属性：
            string memory svg0 = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE8\xA1\x8C\xE5\x8A\xA8\xE5\xB1\x9E\xE6\x80\xA7\xEF\xBC\x9A', '</text>'));
            _endY += _lineHeight;
            string memory svg1 = string(abi.encodePacked('<text x="20" y="', Strings.toString(_endY), '" class="base">', attributeLabels[DahuangConstants.ATTR_ACT - DahuangConstants.ATTR_BASE_BEHAVIOR], "=", Strings.toString(attributesScores[DahuangConstants.ATTR_ACT][_actor]), '</text>'));
            return (string(abi.encodePacked(svg0, svg1)), _endY);
        }
        else
            //行动属性未初始化。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE8\xA1\x8C\xE5\x8A\xA8\xE5\xB1\x9E\xE6\x80\xA7\xE6\x9C\xAA\xE5\x88\x9D\xE5\xA7\x8B\xE5\x8C\x96\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string memory json = '';
        json = string(abi.encodePacked('{"ACT": ', Strings.toString(attributesScores[DahuangConstants.ATTR_ACT][_actor]), '}'));
        return json;
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return DahuangConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES; }

    function pointActor(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {        
        IActorTalents talents = IActorTalents(worldRoute.modules(DahuangConstants.WORLD_MODULE_TALENTS));
        require(talents.actorTalentsInitiated(_actor), "talents have not initiated");
        require(!characterPointsInitiated[_actor], "already init points");

        attributesScores[DahuangConstants.ATTR_ACT][_actor] = 0;
        characterPointsInitiated[_actor] = true;

        uint256[] memory atts = new uint256[](2);
        atts[0] = DahuangConstants.ATTR_ACT;
        atts[1] = attributesScores[DahuangConstants.ATTR_ACT][_actor];
        emit Created(msg.sender, _actor, atts);
    }

    function setAttributes(uint256 _operator, uint256 _actor, uint256[] memory _attributes) external override
        onlyYeMing(_operator)
        onlyPointsInitiated(_actor)
    {
        require(_attributes.length % 2 == 0, "attributes is invalid.");        

        bool updated = false;
        for(uint256 i=0; i<_attributes.length; i+=2) {
            if(_attributes[i] == DahuangConstants.ATTR_ACT) {
                attributesScores[DahuangConstants.ATTR_ACT][_actor] = _attributes[i+1];
                updated = true;
                break;
            }
        }

        if(updated) {
            uint256[] memory atts = new uint256[](2);
            atts[0] = DahuangConstants.ATTR_ACT;
            atts[1] = attributesScores[DahuangConstants.ATTR_ACT][_actor];
            emit Updated(msg.sender, _actor, atts);
        }
    }

    function recoverAct(uint256 _actor) override external 
        onlyPointsInitiated(_actor)
    {
        //IWorldTimeline timeline = IWorldTimeline(worldRoute.modules(DahuangConstants.WORLD_MODULE_TIMELINE));
        //require(_isActorApprovedOrOwner(timeline.operator()), "not approved or owner of timeline");

        if(lastActRecoverTimeStamps[_actor] == 0) {
            lastActRecoverTimeStamps[_actor] = (block.timestamp / ACT_RECOVER_TIME_DAY) * ACT_RECOVER_TIME_DAY;
            
            uint256 act = getActorMaxRecoverAct(_actor);
            attributesScores[DahuangConstants.ATTR_ACT][_actor] = act;
            emit ActRecovered(_actor, act);            
        }

        uint256 _dt = block.timestamp - lastActRecoverTimeStamps[_actor];
        if(_dt >= ACT_RECOVER_TIME_DAY) {
            lastActRecoverTimeStamps[_actor] = (block.timestamp / ACT_RECOVER_TIME_DAY) * ACT_RECOVER_TIME_DAY;

            uint256 act = getActorMaxRecoverAct(_actor);
            attributesScores[DahuangConstants.ATTR_ACT][_actor] = act;
            emit ActRecovered(_actor, act);
        }
    }

    /* **************
     * View Functions
     * **************
     */

    function applyModified(uint256 _actor, int[] memory _modifiers) external view override returns (uint256[] memory, bool) {
        require(_modifiers.length % 2 == 0, "modifiers is invalid.");        

        bool attributesModified = false;
        uint256 act = attributesScores[DahuangConstants.ATTR_ACT][_actor];
        for(uint256 i=0; i<_modifiers.length; i+=2) {
            if(_modifiers[i] == int(DahuangConstants.ATTR_ACT)) {
                act = _attributeModify(act, _modifiers[i+1]);
                attributesModified = true;
            }
        }

        uint256[] memory atts = new uint256[](2);
        atts[0] = DahuangConstants.ATTR_ACT;
        atts[1] = act;
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
