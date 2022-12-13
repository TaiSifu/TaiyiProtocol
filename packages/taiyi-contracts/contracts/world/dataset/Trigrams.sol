// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract Trigrams is ITrigrams, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => int256[]) internal _actorTrigrams;

    mapping(uint256 => uint256) public actor_trigrams_line1_pos; //初爻 阳
    mapping(uint256 => uint256) public actor_trigrams_line1_neg; //初爻 阴
    
    mapping(uint256 => uint256) public actor_trigrams_line2_pos;
    mapping(uint256 => uint256) public actor_trigrams_line2_neg;

    mapping(uint256 => uint256) public actor_trigrams_line3_pos;
    mapping(uint256 => uint256) public actor_trigrams_line3_neg;

    mapping(uint256 => uint256) public actor_trigrams_line4_pos;
    mapping(uint256 => uint256) public actor_trigrams_line4_neg;

    mapping(uint256 => uint256) public actor_trigrams_line5_pos;
    mapping(uint256 => uint256) public actor_trigrams_line5_neg;

    mapping(uint256 => uint256) public actor_trigrams_line6_pos;
    mapping(uint256 => uint256) public actor_trigrams_line6_neg;

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {}

    /* *****************
     * Private Functions
     * *****************
     */

    /* *****************
     * Internal Functions
     * *****************
     */

    function _calulateTrigramLine(uint256 _actor, uint256 _line, uint256 _pos, uint256 _neg) internal view returns (int256) {
        if(_pos == _neg) {
            IWorldRandom random = IWorldRandom(worldRoute.modules(WorldConstants.WORLD_MODULE_RANDOM));
            return (random.dn(_actor+_line+39541, 100)>50?int256(128):int256(-128));
        }

        if(_pos > _neg)
            return int256((_pos-_neg)*255/_pos);
        else            
            return -int256((_neg-_pos)*255/_neg);
    }
    
    function _generateActorTrigrams(uint256 _actor) internal view returns (int256[] memory) {
        int256[] memory _trigrams = new int256[](6); 
        _trigrams[0] = _calulateTrigramLine(_actor, 0, actor_trigrams_line1_pos[_actor], actor_trigrams_line1_neg[_actor]);
        _trigrams[1] = _calulateTrigramLine(_actor, 1, actor_trigrams_line2_pos[_actor], actor_trigrams_line2_neg[_actor]);
        _trigrams[2] = _calulateTrigramLine(_actor, 2, actor_trigrams_line3_pos[_actor], actor_trigrams_line3_neg[_actor]);
        _trigrams[3] = _calulateTrigramLine(_actor, 3, actor_trigrams_line4_pos[_actor], actor_trigrams_line4_neg[_actor]);
        _trigrams[4] = _calulateTrigramLine(_actor, 4, actor_trigrams_line5_pos[_actor], actor_trigrams_line5_neg[_actor]);
        _trigrams[5] = _calulateTrigramLine(_actor, 5, actor_trigrams_line6_pos[_actor], actor_trigrams_line6_neg[_actor]);
        return _trigrams;
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_TRIGRAMS; }

    function addActorTrigrams(uint256 _operator, uint256 _actor, uint256[] memory _trigramsData) external override
        onlyYeMing(_operator)
    {
        require(_trigramsData.length == 6, "trigrams data invalid");

        uint256 _tri = 0;
        if(_trigramsData[0] > 0) {
            actor_trigrams_line1_pos[_actor]++;
            _tri |= 0x1;
        }
        else
            actor_trigrams_line1_neg[_actor]++;

        if(_trigramsData[1] > 0) {
            actor_trigrams_line2_pos[_actor]++;
            _tri |= 0x2;
        }
        else
            actor_trigrams_line2_neg[_actor]++;

        if(_trigramsData[2] > 0) {
            actor_trigrams_line3_pos[_actor]++;
            _tri |= 0x4;
        }
        else
            actor_trigrams_line3_neg[_actor]++;

        if(_trigramsData[3] > 0) {
            actor_trigrams_line4_pos[_actor]++;
            _tri |= 0x8;
        }
        else
            actor_trigrams_line4_neg[_actor]++;

        if(_trigramsData[4] > 0) {
            actor_trigrams_line5_pos[_actor]++;
            _tri |= 0x16;
        }
        else
            actor_trigrams_line5_neg[_actor]++;

        if(_trigramsData[5] > 0) {
            actor_trigrams_line6_pos[_actor]++;
            _tri |= 0x32;
        }
        else
            actor_trigrams_line6_neg[_actor]++;

        _actorTrigrams[_actor] = _generateActorTrigrams(_actor);

        emit TrigramsOut(_actor, _tri);
    }

    /* **************
     * View Functions
     * **************
     */

    function actorTrigrams(uint256 _actor) external override view returns (int256[] memory) {
        return _actorTrigrams[_actor];
    }

    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) virtual external override view returns (string memory, uint256 _endY) {
        return ("", _startY);
    }

    function tokenJSON(uint256 /*_actor*/) virtual external override view returns (string memory) {
        return "{}";
    }
}
