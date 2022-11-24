// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract WorldBuildings is IWorldBuildings, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => string) public override typeNames; //typeId => typeName
    mapping(uint256 => uint256) public override buildingTypes; //zone id -> typeId
    
    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(address _worldRouteAddress) WorldConfigurable(_worldRouteAddress) {}

    /* *****************
     * Private Functions
     * *****************
     */

    /* *****************
     * Internal Functions
     * *****************
     */

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_BUILDINGS; }

    function createBuilding(uint256 _operator, uint256 /*_actor*/, uint256 _typeId, uint256 _zoneId) external override
        onlyYeMing(_operator)
    {
        require(buildingTypes[_zoneId] == 0, "building already created!");
        require(_zoneId >=1, "zone id invalid");
        //require(keccak256(abi.encodePacked(typeNames[typeId])) == keccak256(abi.encodePacked("")), "typeId invalid");

        buildingTypes[_zoneId] = _typeId;
    }

    function setTypeName(uint256 _typeId, string memory _typeName) public
        onlyPanGu
    {
        require(_typeId > 0, "type id can not be zero");
        require(validateName(_typeName), 'invalid type name');

        typeNames[_typeId] = _typeName;
    }

    // @dev Check if the name string is valid (Alphanumeric and spaces without leading or trailing space)
    function validateName(string memory str) public pure returns (bool) {
        bytes memory b = bytes(str);
        if(b.length < 1) return false;
        if(b.length > 25) return false; // Cannot be longer than 25 characters
        if(b[0] == 0x20) return false; // Leading space
        if (b[b.length - 1] == 0x20) return false; // Trailing space

        bytes1 last_char = b[0];
        for(uint256 i; i<b.length; i++){
            bytes1 char = b[i];
            if (char == 0x20 && last_char == 0x20) return false; // Cannot contain continous spaces
            last_char = char;
        }

        return true;
    }

    // @dev Converts the string to lowercase
    function toLower(string memory str) public pure returns (string memory) {
        bytes memory b_str = bytes(str);
        bytes memory b_lower = new bytes(b_str.length);
        for (uint256 i = 0; i < b_str.length; i++) {
            // Uppercase character
            if ((uint8(b_str[i]) >= 65) && (uint8(b_str[i]) <= 90)) {
                b_lower[i] = bytes1(uint8(b_str[i]) + 32);
            } else {
                b_lower[i] = b_str[i];
            }
        }
        return string(b_lower);
    }

    /* **************
     * View Functions
     * **************
     */

    function isZoneBuilding(uint256 _zoneId) public override view returns (bool) {
        return buildingTypes[_zoneId] != 0;        
    }

    function tokenSVG(uint256 /*_actor*/, uint256 startY, uint256 /*lineHeight*/) virtual external override view returns (string memory, uint256 endY) {
        return ("", startY);
    }

    function tokenJSON(uint256 /*_actor*/) virtual external override view returns (string memory) {
        return "{}";
    }
}
