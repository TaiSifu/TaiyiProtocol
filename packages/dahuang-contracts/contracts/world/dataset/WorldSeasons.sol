// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import '@taiyi/contracts/contracts/libs/Base64.sol';
import '@taiyi/contracts/contracts/world/WorldConfigurable.sol';
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
//import "hardhat/console.sol";

contract WorldSeasons is IWorldSeasons, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    string[] public override seasonLabels = [
        "",                         //id 0 means NC
        "\xE5\x86\xAC\xE8\x87\xB3", //冬至
        "\xE5\xA4\xA7\xE9\x9B\xAA", //大雪
        "\xE5\xB0\x8F\xE9\x9B\xAA", //小雪
        "\xE7\xAB\x8B\xE5\x86\xAC", //立冬
        "\xE9\x9C\x9C\xE9\x99\x8D", //霜降
        "\xE5\xAF\x92\xE9\x9C\xB2", //寒露
        "\xE7\xA7\x8B\xE5\x88\x86", //秋分
        "\xE7\x99\xBD\xE9\x9C\xB2", //白露
        "\xE5\xA4\x84\xE6\x9A\x91", //处暑
        "\xE7\xAB\x8B\xE7\xA7\x8B", //立秋
        "\xE5\xA4\xA7\xE6\x9A\x91", //大暑
        "\xE5\xB0\x8F\xE6\x9A\x91", //小暑
        "\xE5\xA4\x8F\xE8\x87\xB3", //夏至
        "\xE8\x8A\x92\xE7\xA7\x8D", //芒种
        "\xE5\xB0\x8F\xE6\xBB\xA1", //小满
        "\xE7\xAB\x8B\xE5\xA4\x8F", //立夏
        "\xE8\xB0\xB7\xE9\x9B\xA8", //谷雨
        "\xE6\xB8\x85\xE6\x98\x8E", //清明
        "\xE6\x98\xA5\xE5\x88\x86", //春分
        "\xE6\x83\x8A\xE8\x9B\xB0", //惊蛰
        "\xE9\x9B\xA8\xE6\xB0\xB4", //雨水
        "\xE7\xAB\x8B\xE6\x98\xA5", //立春
        "\xE5\xA4\xA7\xE5\xAF\x92", //大寒
        "\xE5\xB0\x8F\xE5\xAF\x92" //小寒
    ];

    mapping(uint256 => uint256) public override actorBornSeasons;

    /* *********
     * Modifiers
     * *********
     */

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

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 /*_lineHeight*/) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        if(actorBornSeasons[_actor] > 0) {
            //出生时节：${时节}
            string memory svg = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\x87\xBA\xE7\x94\x9F\xE6\x97\xB6\xE8\x8A\x82\xEF\xBC\x9A', seasonLabels[actorBornSeasons[_actor]], '</text>'));
            return (svg, _endY);
        }
        else
            //出生时节未初始化。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\x87\xBA\xE7\x94\x9F\xE6\x97\xB6\xE8\x8A\x82\xE6\x9C\xAA\xE5\x88\x9D\xE5\xA7\x8B\xE5\x8C\x96\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string memory json = '';
        json = string(abi.encodePacked('{"bornSeason": ', Strings.toString(actorBornSeasons[_actor]), '}'));
        return json;
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return DahuangConstants.WORLD_MODULE_SEASONS; }

    function bornActor(uint256 _operator, uint256 _actor, uint256 _seasonId) external override
        onlyYeMing(_operator)
    {
        require(actorBornSeasons[_actor] == 0, "already born!");
        require(_seasonId >=1 && _seasonId <= 24, "season not in range");

        actorBornSeasons[_actor] = _seasonId;
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
