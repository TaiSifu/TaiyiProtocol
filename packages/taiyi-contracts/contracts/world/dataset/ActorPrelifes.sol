// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract ActorPrelifes is IActorPrelifes, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => uint256) public override preLifes;  //前世
    mapping(uint256 => uint256) public override postLifes; //后世
    
    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        string[7] memory parts;
        //前世：
        if(preLifes[_actor] > 0) {        
            parts[0] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">',
                '\xE5\x89\x8D\xE4\xB8\x96\xEF\xBC\x9A', Strings.toString(preLifes[_actor]), '</text>'));
            _endY += _lineHeight;
        }
        return (string(abi.encodePacked(parts[0])), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string[7] memory parts;
        parts[0] = string(abi.encodePacked('{', '"prelife": ', Strings.toString(preLifes[_actor]), '}'));
        return string(abi.encodePacked(parts[0]));
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_PRELIFES; }

    function setPrelife(uint256 _operator, uint256 _actor, uint256 _prelife) external override
        onlyYeMing(_operator)
    {
        IActors actors = worldRoute.actors();
        require(actors.mintTime(_actor) != 0, "non exist actor");
        require(actors.mintTime(_prelife) != 0, "non exist prelife");
        require(postLifes[_prelife] == 0, "prelife is reincarnation.");
        IActorAttributes attributes = IActorAttributes(worldRoute.modules(WorldConstants.WORLD_MODULE_ATTRIBUTES));
        require(attributes.attributesScores(WorldConstants.ATTR_HLH, _prelife) == 0, "prelife actor is alive.");

        preLifes[_actor] = _prelife;
        postLifes[_prelife] = _actor;

        emit Reincarnation(_prelife, _actor);
    }

    /* **************
     * View Functions
     * **************
     */

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) external override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) external override view returns (string memory) {
        return _tokenJSON(_actor);
    }

    /* ****************
     * Private Functions
     * ****************
     */
}
