// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract ActorTimelineAges is IActorTimelineAges, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => mapping(address => uint256) ) public override actorTimelineLastAges; //actor -> timeline address -> last age
    
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

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_ACTOR_TIMELINE_LASTAGES; }

    function setActorTimelineLastAge(uint256 _operator, uint256 _actor, address _timelineAddress, uint256 _age) external override
        onlyYeMing(_operator)
    {        
        require(_timelineAddress != address(0), "timeline address is ZERO");
        require(_actor > 0, "actor invalid");

        actorTimelineLastAges[_actor][_timelineAddress] = _age;
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
