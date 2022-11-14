// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @dev String operations.
 */
library TaiyiStrings {
    
    function toString(int value) internal pure returns (string memory) {
        string memory _string = '';
        if (value < 0) {
            _string = '-';
            value = value * -1;
        }
        return string(abi.encodePacked(_string, Strings.toString(uint(value))));
    }
}
