// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Fungible.sol";

contract NontransferableFungible is Fungible {

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(string memory _name, string memory _symbol, uint256 _moduleId, address _worldRouteAddress) Fungible(_name, _symbol, _moduleId, _worldRouteAddress) {
    }

    /* *****************
     * Private Functions
     * *****************
     */

    function _transfer(address _from, address _to, uint256 _amount) override internal {
        IWorldTimeline timeline = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE));
        require(_to == worldRoute.actors().getActor(timeline.ACTOR_YEMING()).account, "only tranfer to YeMing.");

        super._transfer(_from, _to, _amount);
    }
}
