// SPDX-License-Identifier: MIT
/// @title The Taiyi ShejiTu

/*********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░█████████░░█████████░░░░░ *
 * ░░░░█████████░░█████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 *********************************/

pragma solidity ^0.8.6;

import "./ShejiTu.sol";
//import "hardhat/console.sol";

contract StoryShejiTu is ShejiTu {

    function grow(uint256 _actor) external override
        onlyApprovedOrOwner(_actor)
    {
        _grow(_actor);
    }

    function activeTrigger(uint256 _eventId, uint256 _actor, uint256[] memory _uintParams, string[] memory _stringParams) external override
        onlyApprovedOrOwner(_actor)
    {
        _activeTrigger(_eventId, _actor, _uintParams, _stringParams);
    }
}
