// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./interfaces/WorldInterfaces.sol";
import "./libs/WorldConstants.sol";

contract WorldContractRoute 
{
    // Deployment Address
    address internal _owner;    
 
    mapping(uint => address)    public modules;
    address                     public actorsAddress;
    IActors                     public actors;
 
    constructor() {
        _owner = msg.sender;
    }

    /* *********
     * Modifiers
     * *********
     */

    modifier onlyContractOwner() {
        require(msg.sender == _owner, "Only contract owner");
        _;
    }

    modifier onlyValidAddress(address _address) {
        require(_address != address(0), "cannot set module as zero address");
        _;
    }

    modifier onlyDesigner() {
        require(_isActorApprovedOrOwner(WorldConstants.ACTOR_PANGU), "Only Designer");
        _;
    }

    /* ****************
     * Internal Functions
     * ****************
     */

    function _isActorApprovedOrOwner(uint _actor) internal view returns (bool) {
        return (actors.getApproved(_actor) == msg.sender || actors.ownerOf(_actor) == msg.sender) || actors.isApprovedForAll(actors.ownerOf(_actor), msg.sender);
    }

    /* ****************
     * External Functions
     * ****************
     */

    function registerActors(address _address) external 
        onlyContractOwner()
        onlyValidAddress(_address)
    {
        require(actorsAddress == address(0), "Actors address already registered.");
        actorsAddress = _address;
        actors = IActors(_address);
        modules[WorldConstants.WORLD_MODULE_ACTORS] = _address;
    }

    function registerModule(uint id, address _address) external 
        onlyDesigner()
        onlyValidAddress(_address)
    {
        //require(modules[id] == address(0), "module address already registered.");
        require(IWorldModule(_address).moduleID() == id, "module id is not match.");
        modules[id] = _address;
    }
}
