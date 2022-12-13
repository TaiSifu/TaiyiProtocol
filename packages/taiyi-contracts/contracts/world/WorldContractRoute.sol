// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../interfaces/WorldInterfaces.sol";
import "../libs/WorldConstants.sol";
import "../base/Ownable.sol";

contract WorldContractRoute is Ownable
{ 
    uint256 public constant ACTOR_PANGU = 1;
    
    mapping(uint256 => address) public modules;
    address                     public actorsAddress;
    IActors                     public actors;
 
    /* *********
     * Modifiers
     * *********
     */

    modifier onlyValidAddress(address _address) {
        require(_address != address(0), "cannot set zero address");
        _;
    }

    modifier onlyPanGu() {
        require(_isActorApprovedOrOwner(ACTOR_PANGU), "only PanGu");
        _;
    }

    /* ****************
     * Internal Functions
     * ****************
     */

    function _isActorApprovedOrOwner(uint256 _actor) internal view returns (bool) {
        return (actors.getApproved(_actor) == msg.sender || actors.ownerOf(_actor) == msg.sender) || actors.isApprovedForAll(actors.ownerOf(_actor), msg.sender);
    }

    /* ****************
     * External Functions
     * ****************
     */

    function registerActors(address _address) external 
        onlyOwner
        onlyValidAddress(_address)
    {
        require(actorsAddress == address(0), "Actors address already registered.");
        actorsAddress = _address;
        actors = IActors(_address);
        modules[WorldConstants.WORLD_MODULE_ACTORS] = _address;
    }

    function registerModule(uint256 id, address _address) external 
        onlyPanGu
        onlyValidAddress(_address)
    {
        //require(modules[id] == address(0), "module address already registered.");
        require(IWorldModule(_address).moduleID() == id, "module id is not match.");
        modules[id] = _address;
    }
}
