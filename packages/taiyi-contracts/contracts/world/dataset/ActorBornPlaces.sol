// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract ActorBornPlaces is IActorBornPlaces, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => uint256) public override bornPlaces;
    
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

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 /*_lineHeight*/) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        uint256 _bornPlace = bornPlaces[_actor];
        if(_bornPlace > 0) {
            //出生地点：${地点s}
            IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
            string memory svg = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\x87\xBA\xE7\x94\x9F\xE5\x9C\xB0\xE7\x82\xB9\xEF\xBC\x9A', zones.names(_bornPlace), '</text>'));
            return (svg, _endY);
        }
        else
            //出生地点未初始化。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\x87\xBA\xE7\x94\x9F\xE5\x9C\xB0\xE7\x82\xB9\xE6\x9C\xAA\xE5\x88\x9D\xE5\xA7\x8B\xE5\x8C\x96\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string memory json = '';
        json = string(abi.encodePacked('{"bornPlace": ', Strings.toString(bornPlaces[_actor]), '}'));
        return json;
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_BORN_PLACES; }

    function bornActor(uint256 _operator, uint256 _actor, uint256 _zoneId) external override
        onlyYeMing(_operator)
    {
        require(bornPlaces[_actor] == 0, "already born!");
        require(_zoneId >=1, "zone id not in range");

        bornPlaces[_actor] = _zoneId;
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
