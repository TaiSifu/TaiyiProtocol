// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";

contract GlobalStoryRegistry is IGlobalStoryRegistry, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */
    uint256 public override moduleID;

    uint256[] internal _stories;
    mapping(uint256 => uint256) internal _storyIndices; //map storyid to (index+1) in _stories, 0 means no story
    mapping(uint256 => uint256) internal _storyRepeatability;
    
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

    function registerStory(uint256 _operator, uint256 _storyEvtId, uint256 _canRepeat) public override virtual
        onlyYeMing(_operator)
    {
        require(_storyEvtId>0, "invalid story");

        if(_storyIndices[_storyEvtId] == 0) {
            _storyIndices[_storyEvtId] = _stories.length + 1; //index + 1
            _stories.push(_storyEvtId);
            _storyRepeatability[_storyEvtId] = _canRepeat;
        }
    }

    function removeStory(uint256 _operator, uint256 _storyEvtId) public override virtual
        onlyYeMing(_operator)
    {
        require(_storyEvtId>0, "invalid story");

        if(_storyIndices[_storyEvtId] != 0) {
            _stories[_storyIndices[_storyEvtId]-1] = _stories[_stories.length-1];
            _stories.pop();
            delete _storyIndices[_storyEvtId];
        }
    }

    /* **************
     * View Functions
     * **************
     */

    function storyNum() public view override returns (uint256) {
        return _stories.length;
    }

    function storyByIndex(uint256 _index) public view override returns (uint256) {
        return _stories[_index];
    }

    function hasStory(uint256 _storyEvtId) public view override returns (bool) {
        return _storyIndices[_storyEvtId] != 0;
    }

    function canStoryRepeat(uint256 _storyEvtId) public view override returns (bool) {
        return _storyRepeatability[_storyEvtId] != 0;
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
