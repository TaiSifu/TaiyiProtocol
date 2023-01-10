// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@taiyi/contracts/contracts/interfaces/WorldInterfaces.sol";
import '@taiyi/contracts/contracts/libs/Base64.sol';
import '@taiyi/contracts/contracts/world/WorldConfigurable.sol';
import '../../libs/DahuangConstants.sol';
import '../../interfaces/DahuangWorldInterfaces.sol';
//import "hardhat/console.sol";

contract ActorBornFamilies is IActorBornFamilies, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    uint256 public override cityNum = 0;
    mapping(uint256 => bool) public cityActors; //actor -> city or not
    uint256 public override countryNum = 0;
    mapping(uint256 => bool) public countryActors; //actor -> country or not
    uint256 public override sectarianNum = 0;
    mapping(uint256 => bool) public sectarianActors; //actor -> sectarian or not
    
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

    function moduleID() external override pure returns (uint256) { return 221; }

    function addCity(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        require(_actor > 0, "actor id invalid");
        require(cityActors[_actor] == false && countryActors[_actor] == false && sectarianActors[_actor] == false, "already added born family");

        cityActors[_actor] = true;
        cityNum += 1;
    }

    function addCountry(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        require(_actor > 0, "actor id invalid");
        require(cityActors[_actor] == false && countryActors[_actor] == false && sectarianActors[_actor] == false, "already added born family");

        countryActors[_actor] = true;
        countryNum += 1;
    }

    function addSectarian(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        require(_actor > 0, "actor id invalid");
        require(cityActors[_actor] == false && countryActors[_actor] == false && sectarianActors[_actor] == false, "already added born family");

        sectarianActors[_actor] = true;
        sectarianNum += 1;
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
