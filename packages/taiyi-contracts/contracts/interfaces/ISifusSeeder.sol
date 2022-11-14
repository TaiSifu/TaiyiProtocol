// SPDX-License-Identifier: MIT

/// @title Interface for SifusSeeder

/*********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░█████████░░█████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░█████████░░█████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░████████████████████░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 *********************************/

pragma solidity ^0.8.6;

import { ISifusDescriptor } from './ISifusDescriptor.sol';

interface ISifusSeeder {
    struct Seed {
        uint48 background;
        uint48 part1;
        uint48 part2;
        uint48 part3;
        uint48 part4;
    }

    function generateSeed(uint256 sifuId, ISifusDescriptor descriptor) external view returns (Seed memory);
}
