// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract WorldVillages is IWorldVillages, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => uint256) public override villageCreators; //zoneid -> actor
    
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

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_VILLAGES; }

    function createVillage(uint256 _operator, uint256 _actor, uint256 _zoneId) external override
        onlyYeMing(_operator)
    {
        require(villageCreators[_zoneId] == 0, "zone already created!");
        require(_zoneId >=1, "zone id invalid");

        villageCreators[_zoneId] = _actor;
    }

    /* **************
     * View Functions
     * **************
     */

    function isZoneVillage(uint256 _zoneId) public override view returns (bool) {
        return villageCreators[_zoneId] > 0;        
    }

    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) virtual external override view returns (string memory, uint256 _endY) {
        return ("", _startY);
    }

    function tokenJSON(uint256 /*_actor*/) virtual external override view returns (string memory) {
        return "{}";
    }
}
