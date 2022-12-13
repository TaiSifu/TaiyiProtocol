// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./WorldFungible.sol";

contract WorldNontransferableFungible is WorldFungible {

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(string memory _name, string memory _symbol, uint256 _moduleId, WorldContractRoute _route) WorldFungible(_name, _symbol, _moduleId, _route) {
    }

    function transferActor(uint256 _from, uint256 _to, uint256 _amount) public virtual override {
        require(false, "can not transfer between actor");
        super.transferActor(_from, _to, _amount);
    }

    function transferFromActor(uint256 _executor, uint256 _from, uint256 _to, uint256 _amount) public virtual override 
        onlyYeMing(_executor)
    {
        super.transferFromActor(_executor, _from, _to, _amount);
    }

    /* ****************
     * External Functions
     * ****************
     */
    function withdraw(uint256 _operator, uint256 _actor, uint256 _amount) public virtual override {
        require(false, "can not withdraw");
        super.withdraw(_operator, _actor, _amount);
    }


    /* *****************
     * Private Functions
     * *****************
     */

    // function _transfer(address _from, address _to, uint256 _amount) override internal {
    //     require(false, "can not transfer between address");
    //     super._transfer(_from, _to, _amount);
    // }
}
