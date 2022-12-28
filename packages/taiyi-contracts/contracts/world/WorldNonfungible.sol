// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../interfaces/WorldInterfaces.sol";
import "../base/ERC721Enumerable.sol";
import "./WorldConfigurable.sol";

contract WorldNonFungible is IWorldNonfungible, WorldConfigurable, ERC721Enumerable {

    constructor(string memory _name, string memory _symbol, WorldContractRoute _route) WorldConfigurable(_route) ERC721(_name, _symbol) {
    }     

    /* ****************
     * Public Functions
     * ****************
     */

    function approveActor(uint256 _from, uint256 _to, uint256 _tokenId) public virtual override
        onlyApprovedOrOwner(_from)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        address _toAccount = worldRoute.actors().getActor(_to).account;
        address owner = ERC721.ownerOf(_tokenId);
        require(owner == _fromAccount, 'approve caller is not owner');
        require(_toAccount != owner, 'approval to current owner');

        _approve(_toAccount, _tokenId);
        emit NonfungibleApproval(_from, _to, _tokenId);
    }

    function setApprovalForAllActor(uint256 _from, uint256 _operator, bool _approved) public virtual override
        onlyApprovedOrOwner(_from)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        address _operatorAccount = worldRoute.actors().getActor(_operator).account;
        require(_operatorAccount != _fromAccount, 'approve to from actor');

        _operatorApprovals[_fromAccount][_operatorAccount] = _approved;
        emit ApprovalForAll(_fromAccount, _operatorAccount, _approved);
        emit NonfungibleApprovalForAll(_from, _operator, _approved);
    }

    function safeTransferActor(uint256 _from, uint256 _to, uint256 _tokenId, bytes memory _data) public virtual override
        onlyApprovedOrOwner(_from)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        require(_isApprovedOrOwner(_fromAccount, _tokenId), 'from actor is not owner nor approved');
        address _toAccount = worldRoute.actors().getActor(_to).account;

        _safeTransfer(_fromAccount, _toAccount, _tokenId, _data);
        emit NonfungibleTransfer(_from, _to, _tokenId);
    }

    function safeTransferActor(uint256 _from, uint256 _to, uint256 _tokenId) public virtual override
    {
        safeTransferActor(_from, _to, _tokenId, '');
    }

    function transferActor(uint256 _from, uint256 _to, uint256 _tokenId) public virtual override
        onlyApprovedOrOwner(_from)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        require(_isApprovedOrOwner(_fromAccount, _tokenId), 'from actor is not owner nor approved');
        address _toAccount = worldRoute.actors().getActor(_to).account;

        _transfer(_fromAccount, _toAccount, _tokenId);
        emit NonfungibleTransfer(_from, _to, _tokenId);
    }

    function safeTransferFromActor(uint256 _executor, uint256 _from, uint256 _to, uint256 _tokenId, bytes memory _data) public virtual override
        onlyApprovedOrOwner(_executor)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        address _toAccount = worldRoute.actors().getActor(_to).account;
        address _executorAccount = worldRoute.actors().getActor(_executor).account;
        require(_isApprovedOrOwner(_executorAccount, _tokenId), 'executor is not owner nor approved');

        _safeTransfer(_fromAccount, _toAccount, _tokenId, _data);
        emit NonfungibleTransfer(_from, _to, _tokenId);
    }

    function safeTransferFromActor(uint256 _executor, uint256 _from, uint256 _to, uint256 _tokenId) public virtual override
    {
        safeTransferFromActor(_executor, _from, _to, _tokenId, '');
    }

    function transferFromActor(uint256 _executor, uint256 _from, uint256 _to, uint256 _tokenId) public virtual override
        onlyApprovedOrOwner(_executor)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        address _toAccount = worldRoute.actors().getActor(_to).account;
        address _executorAccount = worldRoute.actors().getActor(_executor).account;
        require(_isApprovedOrOwner(_executorAccount, _tokenId), 'executor is not owner nor approved');

        _transfer(_fromAccount, _toAccount, _tokenId);
        emit NonfungibleTransfer(_from, _to, _tokenId);
    }

    /* **************
     * View Functions
     * **************
     */
    function tokenOfActorByIndex(uint256 _owner, uint256 _index) external override view returns (uint256) {
        return tokenOfOwnerByIndex(worldRoute.actors().getActor(_owner).account, _index);
    }

    function balanceOfActor(uint256 _owner) external override view returns (uint256) {
        return balanceOf(worldRoute.actors().getActor(_owner).account);
    }

    function ownerActorOf(uint256 _tokenId) external override view returns (uint256) {
        address owner = ERC721.ownerOf(_tokenId);
        return worldRoute.actors().getActorByHolder(owner).actorId;
    }

    function getApprovedActor(uint256 _tokenId) external override view returns (uint256) {
        address approved = getApproved(_tokenId);
        return worldRoute.actors().getActorByHolder(approved).actorId;
    }

    function isApprovedForAllActor(uint256 _owner, uint256 _operator) external override view returns (bool) {
        address _ownerAccount = worldRoute.actors().getActor(_owner).account;
        address _operatorAccount = worldRoute.actors().getActor(_operator).account;
        return isApprovedForAll(_ownerAccount, _operatorAccount);
    }
}
