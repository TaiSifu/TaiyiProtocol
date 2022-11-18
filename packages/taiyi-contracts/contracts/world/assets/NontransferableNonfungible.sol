// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../../interfaces/WorldInterfaces.sol";
import "../../base/ERC721Enumerable.sol";
import "../../WorldConfigurable.sol";

contract NontransferableNonfungible is ERC721Enumerable, WorldConfigurable {

    /* ****************
     * Public Functions
     * ****************
     */
    constructor(string memory _name, string memory _symbol, address _worldRouteAddress) ERC721(_name, _symbol) WorldConfigurable(_worldRouteAddress) {
    }

    /* **************
     * Internal Functions
     * **************
     */

    function _transfer(address /*_from*/, address /*_to*/, uint256 /*_tokenId*/) internal override virtual 
    {
        require(false, "can not transfer since SBT.");
        //super._transfer(_from, _to, _tokenId);
    }
}
