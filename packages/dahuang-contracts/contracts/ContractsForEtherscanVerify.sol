// SPDX-License-Identifier: MIT
//these contract code are just compiled for verify etherscan
pragma solidity ^0.8.6;

import "@taiyi/contracts/contracts/world/WorldContractRoute.sol";
import "@taiyi/contracts/contracts/world/WorldFungible.sol";
import "@taiyi/contracts/contracts/world/WorldNontransferableFungible.sol";
import "@taiyi/contracts/contracts/world/dataset/ActorBornPlaces.sol";
import "@taiyi/contracts/contracts/world/dataset/ActorRelationship.sol";

contract FakeWorldContractRoute is WorldContractRoute { 
    uint256 public fake;
}

contract FakeWorldFungible is WorldFungible {
    uint256 public fake;
    constructor(string memory _name, string memory _symbol, uint256 _moduleID, WorldContractRoute _route) WorldFungible(_name, _symbol, _moduleID, _route) {}
}

contract FakeWorldNontransferableFungible is WorldNontransferableFungible
{
    uint256 public fake;
    constructor(string memory _name, string memory _symbol, uint256 _moduleID, WorldContractRoute _route) WorldNontransferableFungible(_name, _symbol, _moduleID, _route) {}
}

contract FakeActorBornPlaces is ActorBornPlaces {
    uint256 public fake;
    constructor(WorldContractRoute _route, uint256 _moduleID) ActorBornPlaces(_route, _moduleID) {}
}

contract FakeActorRelationship is ActorRelationship {
    uint256 public fake;
    constructor(WorldContractRoute _route, uint256 _moduleID) ActorRelationship(_route, _moduleID) {}
}
