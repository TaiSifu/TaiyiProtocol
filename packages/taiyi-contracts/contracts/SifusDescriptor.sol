// SPDX-License-Identifier: MIT

/// @title The Sifus NFT descriptor

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

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { Strings } from '@openzeppelin/contracts/utils/Strings.sol';
import { ISifusDescriptor } from './interfaces/ISifusDescriptor.sol';
import { ISifusSeeder } from './interfaces/ISifusSeeder.sol';
import { MultiPartRLEToSVG } from './libs/MultiPartRLEToSVG.sol';

contract SifusDescriptor is ISifusDescriptor, Ownable {
    using Strings for uint256;

    // prettier-ignore
    // https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt
    bytes32 constant COPYRIGHT_CC0_1_0_UNIVERSAL_LICENSE = 0xa2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499;

    // Whether or not new Sifu parts can be added
    bool public override arePartsLocked;

    // Sifu Color Palettes (Index => Hex Colors)
    mapping(uint8 => string[]) public override palettes;

    // Sifu Backgrounds (Hex Colors)
    string[] public override backgrounds;

    // Sifu Part1s (Custom RLE)
    bytes[] public override part1s;

    // Sifu Part2s (Custom RLE)
    bytes[] public override part2s;

    // Sifu Part3s (Custom RLE)
    bytes[] public override part3s;

    // Sifu Part4s (Custom RLE)
    bytes[] public override part4s;

    /**
     * @notice Require that the parts have not been locked.
     */
    modifier whenPartsNotLocked() {
        require(!arePartsLocked, 'Parts are locked');
        _;
    }

    /**
     * @notice Get the number of available Sifu `backgrounds`.
     */
    function backgroundCount() external view override returns (uint256) { return backgrounds.length; }

    /**
     * @notice Get the number of available Sifu `part1s`.
     */
    function part1Count() external view override returns (uint256) { return part1s.length; }

    /**
     * @notice Get the number of available Sifu `part2s`.
     */
    function part2Count() external view override returns (uint256) { return part2s.length; }

    /**
     * @notice Get the number of available Sifu `part3s`.
     */
    function part3Count() external view override returns (uint256) { return part3s.length; }

    /**
     * @notice Get the number of available Sifu `part4s`.
     */
    function part4Count() external view override returns (uint256) { return part4s.length; }

    /**
     * @notice Add colors to a color palette.
     * @dev This function can only be called by the owner.
     */
    function addManyColorsToPalette(uint8 paletteIndex, string[] calldata newColors) external override onlyOwner {
        require(palettes[paletteIndex].length + newColors.length <= 256, 'Palettes can only hold 256 colors');
        for (uint256 i = 0; i < newColors.length; i++) {
            _addColorToPalette(paletteIndex, newColors[i]);
        }
    }

    /**
     * @notice Batch add Sifu backgrounds.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyBackgrounds(string[] calldata _backgrounds) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _backgrounds.length; i++) {
            _addBackground(_backgrounds[i]);
        }
    }

    /**
     * @notice Batch add Sifu part1s.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyPart1s(bytes[] calldata _parts) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _parts.length; i++) {
            _addPart1(_parts[i]);
        }
    }

    /**
     * @notice Batch add Sifu part2s.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyPart2s(bytes[] calldata _parts) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _parts.length; i++) {
            _addPart2(_parts[i]);
        }
    }

    /**
     * @notice Batch add Sifu part3s.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyPart3s(bytes[] calldata _parts) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _parts.length; i++) {
            _addPart3(_parts[i]);
        }
    }

    /**
     * @notice Batch add Sifu part4s.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyPart4s(bytes[] calldata _parts) external override onlyOwner whenPartsNotLocked {
        for (uint256 i = 0; i < _parts.length; i++) {
            _addPart4(_parts[i]);
        }
    }

    /**
     * @notice Add a single color to a color palette.
     * @dev This function can only be called by the owner.
     */
    function addColorToPalette(uint8 _paletteIndex, string calldata _color) external override onlyOwner {
        require(palettes[_paletteIndex].length <= 255, 'Palettes can only hold 256 colors');
        _addColorToPalette(_paletteIndex, _color);
    }

    /**
     * @notice Add a Sifu background.
     * @dev This function can only be called by the owner when not locked.
     */
    function addBackground(string calldata _background) external override onlyOwner whenPartsNotLocked {
        _addBackground(_background);
    }

    /**
     * @notice Add a Sifu part1.
     * @dev This function can only be called by the owner when not locked.
     */
    function addPart1(bytes calldata _part) external override onlyOwner whenPartsNotLocked {
        _addPart1(_part);
    }

    /**
     * @notice Add a Sifu part2.
     * @dev This function can only be called by the owner when not locked.
     */
    function addPart2(bytes calldata _part) external override onlyOwner whenPartsNotLocked {
        _addPart2(_part);
    }

    /**
     * @notice Add a Sifu part3.
     * @dev This function can only be called by the owner when not locked.
     */
    function addPart3(bytes calldata _part) external override onlyOwner whenPartsNotLocked {
        _addPart3(_part);
    }

    /**
     * @notice Add a Sifu part4.
     * @dev This function can only be called by the owner when not locked.
     */
    function addPart4(bytes calldata _part) external override onlyOwner whenPartsNotLocked {
        _addPart4(_part);
    }

    /**
     * @notice Lock all Sifu parts.
     * @dev This cannot be reversed and can only be called by the owner when not locked.
     */
    function lockParts() external override onlyOwner whenPartsNotLocked {
        arePartsLocked = true;
        emit PartsLocked();
    }

    /**
     * @notice Given a seed, construct a SVG image.
     */
    function generateSVGImage(ISifusSeeder.Seed memory seed) external view override returns (string memory) {
        MultiPartRLEToSVG.SVGParams memory params = MultiPartRLEToSVG.SVGParams({
            parts: _getPartsForSeed(seed),
            background: backgrounds[seed.background]
        });
        return MultiPartRLEToSVG.generateSVG(params, palettes);
    }

    /**
     * @notice Add a single color to a color palette.
     */
    function _addColorToPalette(uint8 _paletteIndex, string calldata _color) internal {
        palettes[_paletteIndex].push(_color);
    }

    /**
     * @notice Add a Sifu background.
     */
    function _addBackground(string calldata _background) internal {
        backgrounds.push(_background);
    }

    /**
     * @notice Add a Sifu part1.
     */
    function _addPart1(bytes calldata _part) internal {
        part1s.push(_part);
    }

    /**
     * @notice Add a Sifu part2.
     */
    function _addPart2(bytes calldata _part) internal {
        part2s.push(_part);
    }

    /**
     * @notice Add a Sifu part3.
     */
    function _addPart3(bytes calldata _part) internal {
        part3s.push(_part);
    }

    /**
     * @notice Add a Sifu part4.
     */
    function _addPart4(bytes calldata _part) internal {
        part4s.push(_part);
    }

    /**
     * @notice Get all Sifu parts for the passed `seed`.
     */
    function _getPartsForSeed(ISifusSeeder.Seed memory seed) internal view returns (bytes[] memory) {
        bytes[] memory _parts = new bytes[](4);
        _parts[0] = part1s[seed.part1];
        _parts[1] = part2s[seed.part2];
        _parts[2] = part3s[seed.part3];
        _parts[3] = part4s[seed.part4];
        return _parts;
    }
}
