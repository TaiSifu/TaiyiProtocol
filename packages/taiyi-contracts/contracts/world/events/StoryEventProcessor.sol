// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./DefaultWorldEventProcessor.sol";
//import "hardhat/console.sol";

/*
default return init to be true;
check order:
    NoRadom --> false
    exclude --> false
    include --> set default return to be false, and return true if match condition
    return default
*/

abstract contract StoryEventProcessor is DefaultWorldEventProcessor {

    function eventAttributeModifiersToTrigger(uint256 /*_actor*/) public view virtual returns (int[] memory) {
        int256[] memory modifiers;
        return modifiers;
    }

    function nextStoryEventId(uint256 /*_actor*/) public view virtual returns (uint256) { return 0; }
}
