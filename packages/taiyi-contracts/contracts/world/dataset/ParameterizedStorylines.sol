// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./WorldStorylines.sol";

contract ParameterizedStorylines is IParameterizedStorylines, WorldStorylines, ERC721Holder {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => uint256[]) internal _storyUIntParams; //map story to uint256 parameters
    mapping(uint256 => string[]) internal _storyStringParams; //map story to string parameters
    
    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route, uint256 _moduleID) WorldStorylines(_route, _moduleID) {}

    /* ****************
     * External Functions
     * ****************
     */

    function setStoryParameters(uint256 _operator, uint256 _storyEvtId, string[] memory _params) external override 
        onlyYeMing(_operator)
    {
        require(isStoryExist(_storyEvtId), "story not exist");
        _storyStringParams[_storyEvtId] = _params;

    }

    function setStoryParameters(uint256 _operator, uint256 _storyEvtId, uint256[] memory _params) external override 
        onlyYeMing(_operator)
    {
        require(isStoryExist(_storyEvtId), "story not exist");
        _storyUIntParams[_storyEvtId] = _params;
    }

    function setActorStory(uint256 _operator, uint256 _actor, uint256 _storyEvtId, uint256 _eventId) public override(IWorldStorylines, WorldStorylines) {
        WorldStorylines.setActorStory(_operator, _actor, _storyEvtId, _eventId);

        if(_storyActors[_storyEvtId].length == 0) {
            //no actors, no story
            delete _storyStringParams[_storyEvtId];
            delete _storyUIntParams[_storyEvtId];
        }
    }


    /* **************
     * View Functions
     * **************
     */

    function storyStringParameters(uint256 _storyEvtId) external view override returns (string[] memory) {
        return _storyStringParams[_storyEvtId];
    }

    function storyUIntParameters(uint256 _storyEvtId) external view override returns (uint256[] memory) {
        return _storyUIntParams[_storyEvtId];
    }

    /* *****************
     * Private Functions
     * *****************
     */
}
