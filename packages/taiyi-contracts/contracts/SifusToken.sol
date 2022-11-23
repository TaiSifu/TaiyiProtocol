// SPDX-License-Identifier: MIT

/// @title The Actors ERC-721 token

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
import { ERC721 } from './base/ERC721.sol';
import { ERC721Checkpointable } from './base/ERC721Checkpointable.sol';
import { ISifusDescriptor } from './interfaces/ISifusDescriptor.sol';
import { ISifusSeeder } from './interfaces/ISifusSeeder.sol';
import './interfaces/ISifusToken.sol';
//import { IProxyRegistry } from './external/opensea/IProxyRegistry.sol';
import './libs/Base64.sol';
import './libs/Strings.sol';
import './WorldConfigurable.sol';
//import "hardhat/console.sol";

contract SifusToken is ISifusToken, ERC721Checkpointable, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    // The Taiyi DAO address (creators org)
    address public taiyiDAO;
    // An address who has permissions to mint Sifus
    address public minter;

    // The Sifus token URI descriptor
    ISifusDescriptor public descriptor;

    // The Sifus token seeder
    ISifusSeeder public seeder;

    // Whether the minter can be updated
    bool public isMinterLocked;

    // Whether the descriptor can be updated
    bool public isDescriptorLocked;

    // Whether the seeder can be updated
    bool public isSeederLocked;

    // The sifu seeds
    mapping(uint256 => ISifusSeeder.Seed) public seeds;

    // The internal sifu ID tracker
    uint256 public override nextSifu;

    // IPFS content hash of contract-level metadata
    string private _contractURIHash = 'QmUXSbKuptaT3kt6wrN16zE7bdBBCFzVcUttZDp4osjhtU';

    // OpenSea's Proxy Registry
    //IProxyRegistry public immutable proxyRegistry;

    /* *********
     * Modifiers
     * *********
     */

    /**
     * @notice Require that the minter has not been locked.
     */
    modifier whenMinterNotLocked() {
        require(!isMinterLocked, 'Minter is locked');
        _;
    }

    /**
     * @notice Require that the descriptor has not been locked.
     */
    modifier whenDescriptorNotLocked() {
        require(!isDescriptorLocked, 'Descriptor is locked');
        _;
    }

    /**
     * @notice Require that the seeder has not been locked.
     */
    modifier whenSeederNotLocked() {
        require(!isSeederLocked, 'Seeder is locked');
        _;
    }

    /**
     * @notice Require that the sender is the Taiyi DAO.
     */
    modifier onlyTaiyiDAO() {
        require(msg.sender == taiyiDAO, 'Sender is not the Taiyi DAO');
        _;
    }

    /**
     * @notice Require that the sender is the minter.
     */
    modifier onlyMinter() {
        require(msg.sender == minter, 'Sender is not the minter');
        _;
    }

    modifier onlyValidAddress(address _address) {
        require(_address != address(0), "cannot set as zero address");
        _;
    }

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(
        address _taiyiDAO,
        address _minter,
        ISifusDescriptor _descriptor,
        ISifusSeeder _seeder,
        address _worldRouteAddress
        //IProxyRegistry _proxyRegistry
    ) ERC721('Taiyi Sifus', 'SIFU') WorldConfigurable(_worldRouteAddress) {
        taiyiDAO = _taiyiDAO;
        minter = _minter;
        descriptor = _descriptor;
        seeder = _seeder;
        //proxyRegistry = _proxyRegistry;
    }

    /**
     * @notice The IPFS URI of contract-level metadata.
     */
    function contractURI() public view returns (string memory) {
        return string(abi.encodePacked('ipfs://', _contractURIHash));
    }

    /**
     * @notice Set the _contractURIHash.
     * @dev Only callable by the owner.
     */
    function setContractURIHash(string memory newContractURIHash) external onlyOwner {
        _contractURIHash = newContractURIHash;
    }

    /** 
     * @notice Override isApprovedForAll to whitelist special accounts to enable special purpose.
     */
    function isApprovedForAll(address owner, address operator) public view override(IERC721, ERC721) returns (bool) {
        // Whitelist OpenSea proxy contract for easy trading.
        // if (proxyRegistry.proxies(owner) == operator) {
        //     return true;
        // }

        // Whitelist Minter for some soul recover purpose. ref: Weyl, Eric Glen and Ohlhaver, Puja and Buterin,
        // Vitalik, Decentralized Society: Finding Web3's Soul (May 10, 2022). 4.3 Not Losing Your Soul
        // Available at SSRN: https://ssrn.com/abstract=4105763
        if (minter == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    /**
     * @notice Mint a Sifu to the minter, along with a possible taisifus reward
     * Sifu. Taisifus reward Sifus are minted every 10 Sifus, starting at 0,
     * until 183 taisifu Sifus have been minted (5 years w/ 24 hour auctions).
     * @dev Call _mintTo with the to address(es).
     */
    function mint() public override onlyMinter returns (uint256) {
        if (nextSifu <= 1820 && nextSifu % 10 == 0) {
            _mintTo(taiyiDAO, nextSifu++);
        }
        return _mintTo(minter, nextSifu++);
    }

    /**
     * @notice Burn a sifu.
     */
    function burn(uint256 _sifu) public override onlyMinter {
        _burn(_sifu);
        emit SifuBurned(_sifu);
    }

    /* ****************
     * External Functions
     * ****************
     */

    /**
     * @notice Set the Taiyi DAO.
     * @dev Only callable by the Taiyi DAO when not locked.
     */
    function setTaiyiDAO(address _taiyiDAO) external override onlyTaiyiDAO {
        taiyiDAO = _taiyiDAO;

        emit TaiyiDAOUpdated(_taiyiDAO);
    }

    /**
     * @notice Set the token minter.
     * @dev Only callable by the owner when not locked.
     */
    function setMinter(address _minter) external override onlyOwner whenMinterNotLocked {
        minter = _minter;

        emit MinterUpdated(_minter);
    }

    /**
     * @notice Lock the minter.
     * @dev This cannot be reversed and is only callable by the owner when not locked.
     */
    function lockMinter() external override onlyOwner whenMinterNotLocked {
        isMinterLocked = true;

        emit MinterLocked();
    }

    /**
     * @notice Set the token URI descriptor.
     * @dev Only callable by the owner when not locked.
     */
    function setDescriptor(ISifusDescriptor _descriptor) external override onlyOwner whenDescriptorNotLocked {
        descriptor = _descriptor;

        emit DescriptorUpdated(_descriptor);
    }

    /**
     * @notice Lock the descriptor.
     * @dev This cannot be reversed and is only callable by the owner when not locked.
     */
    function lockDescriptor() external override onlyOwner whenDescriptorNotLocked {
        isDescriptorLocked = true;

        emit DescriptorLocked();
    }

    /**
     * @notice Set the token seeder.
     * @dev Only callable by the owner when not locked.
     */
    function setSeeder(ISifusSeeder _seeder) external override onlyOwner whenSeederNotLocked {
        seeder = _seeder;

        emit SeederUpdated(_seeder);
    }

    /**
     * @notice Lock the seeder.
     * @dev This cannot be reversed and is only callable by the owner when not locked.
     */
    function lockSeeder() external override onlyOwner whenSeederNotLocked {
        isSeederLocked = true;

        emit SeederLocked();
    }

    /* **************
     * View Functions
     * **************
     */
    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_SIFUS; }

    function tokenSVG(uint256 /*_actor*/, uint /*_startY*/, uint /*_lineHeight*/) external virtual override view returns (string memory, uint _endY) {
        return ("", _endY);
    }

    function tokenJSON(uint256 /*_actor*/) external virtual override view returns (string memory) {
        return "{}";
    }

    /**
     * @notice A distinct Uniform Resource Identifier (URI) for a given asset.
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 _sifu) public override view returns (string memory) {
        require(_exists(_sifu), 'URI query for nonexistent token');
        //console.log("view log: _sifu=%s, ", _sifu);
        //svg
        string memory svg = descriptor.generateSVGImage(seeds[_sifu]);

        //data json
        string memory json = string(abi.encodePacked('{"name": "Taiyi Sifu ', Strings.toString(_sifu), '"'));
        json = string(abi.encodePacked(json, ', "description": "Taiyi Sifu ', Strings.toString(_sifu), ' is a member of the Taiyi DAO."'));
        json = string(abi.encodePacked(json, ', "attributes": ['));
        //json = string(abi.encodePacked(json, '{ "trait_type": "WorldSecret", "value": "', Strings.toString(_worldSecret(_sifu)),'"}'));
        json = string(abi.encodePacked(json, ']'));
        //end json with svg
        string memory uri = Base64.encode(bytes(string(abi.encodePacked(json, ', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', uri));
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    /**
     * @notice Mint a Sifu with `sifuId` to the provided `to` address.
     */
    function _mintTo(address to, uint256 sifuId) internal returns (uint256) {
        ISifusSeeder.Seed memory seed = seeds[sifuId] = seeder.generateSeed(sifuId, descriptor);

        //console.log("mint log");
        _mint(owner(), to, sifuId);

        emit SifuCreated(to, sifuId, seed);

        return sifuId;
    }

    /* ****************
     * Private Functions
     * ****************
     */
}
