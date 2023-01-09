// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import '@taiyi/contracts/contracts/libs/Base64.sol';
import '@taiyi/contracts/contracts/world/WorldConfigurable.sol';
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
//import "hardhat/console.sol";

contract WorldDeadActors is IWorldDeadActors, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    uint256 public override deadNum = 0;
    mapping(uint256 => bool) public deadActors; //actor -> dead or not
    
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

    function moduleID() external override pure returns (uint256) { return 219; }

    function addDead(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        require(_actor > 0, "actor id invalid");
        require(deadActors[_actor] == false, "already added dead actor");

        deadActors[_actor] = true;
        deadNum += 1;
    }

    /* **************
     * View Functions
     * **************
     */

    function tokenSVG(uint256 /*_actor*/, uint256 startY, uint256 /*lineHeight*/) virtual external override view returns (string memory, uint256 endY) {
        return ("", startY);
    }

    function tokenJSON(uint256 /*_actor*/) virtual external override view returns (string memory) {
        return "{}";
    }
}
