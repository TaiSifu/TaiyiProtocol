// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./WorldFungible.sol";

contract AssetDaoli is WorldFungible {

    constructor(string memory _name, string memory _symbol, uint256 _moduleID, WorldContractRoute _route) WorldFungible(_name, _symbol, _moduleID, _route) {
    }

    function claim(uint256 _operator, uint256 _actor, uint256 _amount) public virtual override
        onlyPanGu
    {
        require(_operator == WorldConstants.ACTOR_PANGU, "operator must be PanGu");
        require(_amount > 0, "amount must not be zero");
        _mint(worldRoute.actors().getActor(_actor).account, _amount);
        emit FungibleTransfer(0, _actor, _amount);
    }
}
