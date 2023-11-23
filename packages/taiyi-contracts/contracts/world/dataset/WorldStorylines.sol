// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";
//import "hardhat/console.sol";

contract WorldStorylines is IWorldStorylines, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */
    uint256 public override moduleID;

    uint256[] internal _stories;
    mapping(uint256 => uint256) internal _storyIndices; //map storyid to (index+1) in _stories, 0 means no story
    mapping(uint256 => uint256) internal _storyHistory; //map storyid to count happend, 0 means no story

    mapping(uint256 => uint256[]) internal _actorStories; //map actor to storyids
    mapping(uint256 => uint256[]) internal _storyActors; //map story to actors
    mapping(uint256 => mapping(uint256 => uint256)) internal _actorStoryEvents; //map actor to story to current event
                                                                                //event=0 means end story, end story should be deleted.
    mapping(uint256 => mapping(uint256 => uint256)) internal _actorStoryMasks;  //map actor to story to mask
                                                                                //mask: (index in _actorStories)*10e18 + (index in _storyActors)
    
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

    //set eventId to ZERO means end of this story, should delete info for this story
    function setActorStory(uint256 _operator, uint256 _actor, uint256 _storyEvtId, uint256 _eventId) public override virtual
        onlyYeMing(_operator)
    {
        require(_actor>0, "invalid actor");
        require(_storyEvtId>0, "invalid story");

        if(_actorStoryEvents[_actor][_storyEvtId] == 0) {
            //new story
            if(_eventId == 0)
                return;

            if(_storyIndices[_storyEvtId] == 0) {
                _storyIndices[_storyEvtId] = _stories.length + 1; //index + 1
                _stories.push(_storyEvtId);
                _storyHistory[_storyEvtId] += 1;
            }

            _actorStoryEvents[_actor][_storyEvtId] = _eventId;
            _actorStoryMasks[_actor][_storyEvtId] = _actorStories[_actor].length * 10e18 + _storyActors[_storyEvtId].length;
            _actorStories[_actor].push(_storyEvtId);
            _storyActors[_storyEvtId].push(_actor);
        }
        else {
            //change story
            require(_storyIndices[_storyEvtId] != 0, "internal error");

            if(_eventId > 0) {
                _actorStoryEvents[_actor][_storyEvtId] = _eventId;
            }
            else {
                //end story, del it
                uint256 indexInActorStories = _actorStoryMasks[_actor][_storyEvtId] / 10e18;
                uint256 indexInStoryActors = _actorStoryMasks[_actor][_storyEvtId] % 10e18;

                _actorStories[_actor][indexInActorStories] = _actorStories[_actor][_actorStories[_actor].length-1];
                _actorStories[_actor].pop();
                _storyActors[_storyEvtId][indexInStoryActors] = _storyActors[_storyEvtId][_storyActors[_storyEvtId].length-1];
                _storyActors[_storyEvtId].pop();

                delete _actorStoryEvents[_actor][_storyEvtId];
                delete _actorStoryMasks[_actor][_storyEvtId];

                if(_storyActors[_storyEvtId].length == 0) {
                    //no actors, no story
                    _stories[_storyIndices[_storyEvtId]-1] = _stories[_stories.length-1];
                    _stories.pop();
                    delete _storyIndices[_storyEvtId];
                }
            }
        }
    }

    function triggerActorEvent(uint256 _operator, uint256 _actor, uint256 _triggerActor, uint256 _eventId) public override
        onlyYeMing(_operator)
    {
        require(_actor>0, "invalid actor");
        require(_eventId>0, "invalid event");

        IWorldYemings yemings = IWorldYemings(worldRoute.modules(WorldConstants.WORLD_MODULE_YEMINGS));
        IWorldTimeline timeline = IWorldTimeline(yemings.YeMings(_operator));
        uint256[] memory p1 = new uint256[](1);
        p1[0] = _triggerActor;
        string[] memory p2;
        worldRoute.actors().approve(address(timeline), _actor);
        timeline.activeTrigger(_eventId, _actor, p1, p2);
    }

    /* **************
     * View Functions
     * **************
     */

    function currentStoryNum() public view override returns (uint256) {
        return _stories.length;
    }

    function currentStoryByIndex(uint256 _index) public view override returns (uint256) {
        return _stories[_index];
    }

    function isStoryExist(uint256 _storyEvtId) public view override returns (bool) {
        return _storyIndices[_storyEvtId] != 0;
    }

    /** storyEvtId is the start event id of this story **/

    function currentActorStoryNum(uint256 _actor) public view override returns (uint256) {
        return _actorStories[_actor].length;
    }

    function currentActorStoryByIndex(uint256 _actor, uint256 _index) public view override returns (uint256) {
        return _actorStories[_actor][_index];
    }

    function currentActorEventByStoryId(uint256 _actor, uint256 _storyEvtId) public view override returns (uint256) {
        return _actorStoryEvents[_actor][_storyEvtId];
    }

    function isActorInStory(uint256 _actor, uint256 _storyEvtId) public view override returns (bool) {
        return _actorStoryEvents[_actor][_storyEvtId] != 0;
    }

    function currentStoryActorNum(uint256 _storyEvtId) public view override returns (uint256) {
        return _storyActors[_storyEvtId].length;
    }

    function currentStoryActorByIndex(uint256 _storyEvtId, uint256 _index) public view override returns (uint256) {
        return _storyActors[_storyEvtId][_index];
    }

    function storyHistoryNum(uint256 _storyEvtId) public view override returns (uint256) {
        return _storyHistory[_storyEvtId];
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
