// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract TrigramsRender is ITrigramsRender, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    /* *****************
     * Private Functions
     * *****************
     */

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {}

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor) internal view returns (string memory) {
        string[7] memory parts;
        int[] memory _t = ITrigrams(worldRoute.modules(WorldConstants.WORLD_MODULE_TRIGRAMS)).actorTrigrams(_actor);
        //上
        parts[0] = string(abi.encodePacked('<path d="M175,212 ', _t[0]>0?'h674':'h300 m74,0 h300', '" stroke-width="80" stroke="#', toColorString(_t[0]),'"/>'));
        parts[1] = string(abi.encodePacked('<path d="M175,332 ', _t[1]>0?'h674':'h300 m74,0 h300', '" stroke-width="80" stroke="#', toColorString(_t[1]),'"/>'));
        parts[2] = string(abi.encodePacked('<path d="M175,452 ', _t[2]>0?'h674':'h300 m74,0 h300', '" stroke-width="80" stroke="#', toColorString(_t[2]),'"/>'));
        //下
        parts[3] = string(abi.encodePacked('<path d="M175,572 ', _t[3]>0?'h674':'h300 m74,0 h300', '" stroke-width="80" stroke="#', toColorString(_t[3]),'"/>'));
        parts[4] = string(abi.encodePacked('<path d="M175,692 ', _t[4]>0?'h674':'h300 m74,0 h300', '" stroke-width="80" stroke="#', toColorString(_t[4]),'"/>'));
        parts[5] = string(abi.encodePacked('<path d="M174,812 ', _t[5]>0?'h674':'h300 m74,0 h300', '" stroke-width="80" stroke="#', toColorString(_t[5]),'"/>'));
        return string(abi.encodePacked(parts[0],parts[1],parts[2],parts[3],parts[4],parts[5]));
    }

    function toColorString(int _t) internal pure returns (string memory _color) {
        if(_t > 0)
            _color = string(abi.encodePacked(toHexString(uint(_t)), toHexString(uint(_t)>>1), toHexString(uint(_t)>>2)));
        else
            _color = string(abi.encodePacked(toHexString(uint(-_t)>>2), toHexString(uint(-_t)>>1), toHexString(uint(-_t))));
    }

    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "00";
        }
        bytes memory buffer = new bytes(2);
        buffer[1] = _HEX_SYMBOLS[value & 0xf];
        value >>= 4;
        buffer[0] = _HEX_SYMBOLS[value & 0xf];
        return string(buffer);
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint) { return WorldConstants.WORLD_MODULE_TRIGRAMS_RENDER; }

    /* **************
     * View Functions
     * **************
     */

    function tokenSVG(uint256 _actor, uint /*_startY*/, uint /*_lineHeight*/) external override view returns (string memory, uint _endY) {
        string[7] memory parts;
        //start svg
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMinYMin meet" viewBox="0 0 1024 1024"><rect width="100%" height="100%" fill="black" />';
        parts[1] = _tokenSVG(_actor);
        //end svg
        parts[2] = '</svg>';
        return (string(abi.encodePacked(parts[0], parts[1], parts[2])), _endY);
    }

    function tokenJSON(uint256 /*_actor*/) virtual external override view returns (string memory) {
        return "{}";
    }
}
