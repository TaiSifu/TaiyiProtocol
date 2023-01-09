// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import '@taiyi/contracts/contracts/libs/Base64.sol';
import '@taiyi/contracts/contracts/world/WorldConfigurable.sol';
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
//import "hardhat/console.sol";

contract ActorsGender is IActorsGender, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    uint256 public override maleNum = 0;
    mapping(uint256 => bool) public maleActors; //actor -> male or not
    uint256 public override femaleNum = 0;
    mapping(uint256 => bool) public femaleActors; //actor -> female or not
    uint256 public override asexualNum = 0;
    mapping(uint256 => bool) public asexualActors; //actor -> asexual or not
    uint256 public override bisexualNum = 0;
    mapping(uint256 => bool) public bisexualActors; //actor -> asexual or not
    
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

    function moduleID() external override pure returns (uint256) { return 220; }

    function addMale(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        require(_actor > 0, "actor id invalid");
        require(maleActors[_actor] == false && femaleActors[_actor] == false && asexualActors[_actor] == false && bisexualActors[_actor] == false, "already added gender");

        maleActors[_actor] = true;
        maleNum += 1;
    }

    function addFemale(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        require(_actor > 0, "actor id invalid");
        require(maleActors[_actor] == false && femaleActors[_actor] == false && asexualActors[_actor] == false && bisexualActors[_actor] == false, "already added gender");

        femaleActors[_actor] = true;
        femaleNum += 1;
    }

    function addAsexual(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        require(_actor > 0, "actor id invalid");
        require(maleActors[_actor] == false && femaleActors[_actor] == false && asexualActors[_actor] == false && bisexualActors[_actor] == false, "already added gender");

        asexualActors[_actor] = true;
        asexualNum += 1;
    }

    function addBisexual(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        require(_actor > 0, "actor id invalid");
        require(maleActors[_actor] == false && femaleActors[_actor] == false && asexualActors[_actor] == false && bisexualActors[_actor] == false, "already added gender");

        bisexualActors[_actor] = true;
        bisexualNum += 1;
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
