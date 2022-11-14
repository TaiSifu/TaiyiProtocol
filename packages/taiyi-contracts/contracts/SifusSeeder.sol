// SPDX-License-Identifier: MIT

/// @title The SifusToken pseudo-random seed generator

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

import { ISifusSeeder } from './interfaces/ISifusSeeder.sol';
import { ISifusDescriptor } from './interfaces/ISifusDescriptor.sol';

contract SifusSeeder is ISifusSeeder {
    /**
     * @notice Generate a pseudo-random Sifu seed using the previous blockhash and sifu ID.
     */
    // prettier-ignore
    function generateSeed(uint256 sifuId, ISifusDescriptor descriptor) external view override returns (Seed memory) {
        uint256 pseudorandomness = uint256(
            keccak256(abi.encodePacked(blockhash(block.number - 1), sifuId))
        );

        uint256 backgroundCount = descriptor.backgroundCount();
        uint256 part1Count = descriptor.part1Count();
        uint256 part2Count = descriptor.part2Count();
        uint256 part3Count = descriptor.part3Count();
        uint256 part4Count = descriptor.part4Count();

        return Seed({
            background: uint48(
                uint48(pseudorandomness) % backgroundCount
            ),
            part1: uint48(
                uint48(pseudorandomness >> 48) % part1Count
            ),
            part2: uint48(
                uint48(pseudorandomness >> 96) % part2Count
            ),
            part3: uint48(
                uint48(pseudorandomness >> 144) % part3Count
            ),
            part4: uint48(
                uint48(pseudorandomness >> 192) % part4Count
            )
        });
    }
}
