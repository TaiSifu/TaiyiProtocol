// SPDX-License-Identifier: MIT

/// @title Interface for SifusToken

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

import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import { ISifusDescriptor } from './ISifusDescriptor.sol';
import { ISifusSeeder } from './ISifusSeeder.sol';
import { IWorldModule } from './WorldInterfaces.sol';

interface ISifusToken is IERC721, IWorldModule {

    event SifuCreated(address indexed owner, uint256 indexed sifu, ISifusSeeder.Seed seed);
    event SifuBurned(uint256 indexed sifu);
    event TaiyiDAOUpdated(address taiyiDAO);
    event MinterUpdated(address minter);
    event MinterLocked();
    event DescriptorUpdated(ISifusDescriptor descriptor);
    event DescriptorLocked();
    event SeederUpdated(ISifusSeeder seeder);
    event SeederLocked();

    function nextSifu() external view returns (uint256);

    function mint() external returns (uint256);
    function burn(uint256 _sifu) external;
    function setTaiyiDAO(address _taiyiDAO) external;
    function setMinter(address _minter) external;
    function lockMinter() external;

    function setDescriptor(ISifusDescriptor descriptor) external;
    function lockDescriptor() external;
    function setSeeder(ISifusSeeder seeder) external;
    function lockSeeder() external;
}
