// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";

contract ActorLocations is IActorLocations, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => mapping(uint256 => uint256[])) private _locationActors;      // A -> B -> actors
    mapping(uint256 => uint256[]) private _actorLocations;                       // actor => [A, B]
    mapping(uint256 => uint256) public override actorFreeTimes;                 // 角色解冻时间（0 means no lock)

    /* *********
     * Modifiers
     * *********
     */

    modifier onlyActorUnlocked(uint256 _actor) {
        require(actorFreeTimes[_actor] == 0 || block.timestamp > actorFreeTimes[_actor], "actor is locked");
        _;
    }

    modifier onlyActorLocked(uint256 _actor) {
        require(actorFreeTimes[_actor] > 0 && actorFreeTimes[_actor] <= block.timestamp, "actor is unlocked");
        _;
    }

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(address _worldRouteAddress) WorldConfigurable(_worldRouteAddress) {
    }

    /* *****************
     * Private Functions
     * *****************
     */

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        string memory svg;
        //所在地区：
        svg = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\x89\x80\xE5\x9C\xA8\xE5\x9C\xB0\xE5\x8C\xBA\xEF\xBC\x9A', '</text>'));
        _endY += _lineHeight;
        uint256[] memory lc = _actorLocations[_actor];
        if(lc.length == 0)
            //无信息
            svg = string(abi.encodePacked(svg, '<text x="20" y="', Strings.toString(_endY), '" class="base_nocolor" fill="yellow">', '\xE6\x97\xA0\xE4\xBF\xA1\xE6\x81\xAF', '</text>'));
        else {
            IWorldZones zones = IWorldZones(worldRoute.modules(WorldConstants.WORLD_MODULE_ZONES));
            if(lc[0] == lc[1]) {
                //${zoneName}
                svg = string(abi.encodePacked(svg, '<text x="20" y="', Strings.toString(_endY), '" class="base_nocolor" fill="yellow">',
                    zones.names(lc[0]), '</text>'));
            }
            else {
                //在${A}和${B}之间的区域
                svg = string(abi.encodePacked(svg, '<text x="20" y="', Strings.toString(_endY), '" class="base_nocolor" fill="yellow">',
                    '\xE5\x9C\xA8'));
                svg = string(abi.encodePacked(svg, zones.names(lc[0]), '\xE5\x92\x8C', zones.names(lc[1]), '\xE4\xB9\x8B\xE9\x97\xB4\xE7\x9A\x84\xE5\x8C\xBA\xE5\x9F\x9F',
                    '</text>'));
            }
        }
        return (svg, _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        uint256[] memory lc = _actorLocations[_actor];
        if(lc.length == 0)
            return "{}";
        return string(abi.encodePacked('{ \"A\":', Strings.toString(lc[0]), ', \"B\":', Strings.toString(lc[1]), '}'));
    }

    function _setActorLocation(uint256 _actor, uint256 _A, uint256 _B) internal
    {
        uint256[] memory currentLocation = _actorLocations[_actor]; 
        if(currentLocation.length == 2) {
            if(currentLocation[0] == _A && currentLocation[1] == _B)
                require(false, "already here");
            //remove from old location
            uint256[] memory actors = _locationActors[currentLocation[0]][currentLocation[1]];
            for(uint256 i=0; i<actors.length; i++) {
                if(actors[i] == _actor) {
                    _locationActors[currentLocation[0]][currentLocation[1]][i] = _locationActors[currentLocation[0]][currentLocation[1]][actors.length-1];
                    _locationActors[currentLocation[0]][currentLocation[1]].pop();
                    break;
                }
            }
        }
        _locationActors[_A][_B].push(_actor);

        delete _actorLocations[_actor];
        _actorLocations[_actor].push(_A);
        _actorLocations[_actor].push(_B);

        if(currentLocation.length == 2)
            emit ActorLocationChanged(_actor, currentLocation[0], currentLocation[1], _A, _B);
        else
            emit ActorLocationChanged(_actor, _A, _B, _A, _B);
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_ACTOR_LOCATIONS; }

    function setActorLocation(uint256 _operator, uint256 _actor, uint256 _A, uint256 _B) external override
        onlyYeMing(_operator)
    {
        require(_A > 0 && _B > 0, "invalid A or B");
        _setActorLocation(_actor, _A, _B);
    }

    function lockActor(uint256 _operator, uint256 _actor, uint256 _freeTime) external override
        onlyYeMing(_operator)
    {
        actorFreeTimes[_actor] = _freeTime;
    }

    function unlockActor(uint256 _operator, uint256 _actor) external override
        onlyYeMing(_operator)
    {
        actorFreeTimes[_actor] = 0;
    }

    //any one can invoke this method
    function finishActorTravel(uint256 _actor) external override
    {
        require(_actor > 0, "invalid actor");
        if(actorFreeTimes[_actor] == 0)
            return; //no need do anything
        if(block.timestamp >= actorFreeTimes[_actor]) {
            actorFreeTimes[_actor] = 0;
            uint256[] memory lc = _actorLocations[_actor];
            if(lc.length == 2) {
                if(lc[0] != lc[1])
                    _setActorLocation(_actor, lc[1], lc[1]);
            }
        }
    }

    /* **************
     * View Functions
     * **************
     */

    function locationActors(uint256 _A, uint256 _B) external override view returns (uint256[] memory) {
        return _locationActors[_A][_B];
    }

    function actorLocations(uint256 _actor) external override view returns (uint256[] memory) {
        return _actorLocations[_actor];
    }

    function isActorLocked(uint256 _actor) public override view returns (bool) {
        return actorFreeTimes[_actor] >= block.timestamp;
    }

    function isActorUnlocked(uint256 _actor) public override view returns (bool) {
        return actorFreeTimes[_actor] == 0 || block.timestamp > actorFreeTimes[_actor];
    }

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) public override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) public override view returns (string memory) {
        return _tokenJSON(_actor);
    }

    function tokenURI(uint256 _actor) public view returns (string memory) {
        string[7] memory parts;
        //start svg
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />';
        uint256 _endY = 0;
        (parts[1], _endY) = _tokenSVG(_actor, _endY + 20, 20);
        //end svg
        parts[2] = '</svg>';
        string memory svg = string(abi.encodePacked(parts[0], parts[1], parts[2]));

        //start json
        parts[0] = string(abi.encodePacked('{"name": "Actor #', Strings.toString(_actor), ' locations"'));
        parts[1] = ', "description": "This is not a game."';
        parts[2] = string(abi.encodePacked(', "data": ', _tokenJSON(_actor)));
        //end json with svg
        parts[3] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}
