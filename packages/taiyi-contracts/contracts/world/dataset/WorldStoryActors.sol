// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract WorldStoryActors is IWorldStoryActors, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */
    uint256 public override moduleID;

    mapping(uint256 => uint256[]) internal _storyActors; //map story to actors
    mapping(uint256 => mapping(uint256 => uint256)) internal _storyActorMasks;  //map story to actor to (index+1) in _storyActors
    
    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route, uint256 _moduleID) WorldConfigurable(_route) {
        moduleID = _moduleID;
    }

    /* ****************
     * External Functions
     * ****************
     */

    function addStoryActor(uint256 _operator, uint256 _storyEvtId, uint256 _actor) public override virtual
        onlyYeMing(_operator)
    {
        require(_actor>0, "invalid actor");
        require(_storyEvtId>0, "invalid story");

        if(_storyActorMasks[_storyEvtId][_actor] == 0) {
            //new actor
            _storyActorMasks[_storyEvtId][_actor] = _storyActors[_storyEvtId].length + 1;
            _storyActors[_storyEvtId].push(_actor);
        }
    }

    /* **************
     * View Functions
     * **************
     */

    function hasActor(uint256 _storyEvtId, uint256 _actor) public view override returns (bool) {
        return _storyActorMasks[_storyEvtId][_actor] != 0;
    }

    /** storyEvtId is the start event id of this story **/

    function storyActorNum(uint256 _storyEvtId) public view override returns (uint256) {
        return _storyActors[_storyEvtId].length;
    }

    function storyActorByIndex(uint256 _storyEvtId, uint256 _index) public view override returns (uint256) {
        return _storyActors[_storyEvtId][_index];
    }

    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) public override view virtual returns (string memory, uint256 _endY) {
        _endY = _startY;
        return ("", _endY);
    }

    function tokenJSON(uint256 /*_actor*/) public override view virtual returns (string memory) {
        return "{}";
    }

    /* *****************
     * Private Functions
     * *****************
     */
}
