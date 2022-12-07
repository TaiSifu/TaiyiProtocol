// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract WorldZoneTimelines is IWorldZoneTimelines, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => address) public override zoneTimelines; //zoneid -> timeline address
    mapping(address => uint256) public override timelineZones; //timeline address -> zoneid
    
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

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_ZONE_TIMELINES; }

    function setTimeline(uint256 _zoneId, address _timelineAddress) external override
        onlyPanGu
    {
        require(_timelineAddress != address(0), "timeline address is ZERO");
        require(_zoneId >=1, "zone id invalid");

        zoneTimelines[_zoneId] = _timelineAddress;
        timelineZones[_timelineAddress] = _zoneId;
    }

    /* **************
     * View Functions
     * **************
     */

    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) virtual external override view returns (string memory, uint256 _endY) {
        return ("", _startY);
    }

    function tokenJSON(uint256 /*_actor*/) virtual external override view returns (string memory) {
        return "{}";
    }
}
