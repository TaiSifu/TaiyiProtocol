// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../../libs/Base64.sol";

contract ActorRelationship is IActorRelationship, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    mapping(uint256 => string) public override relations;              // rsid -> rsname
    mapping(uint256 => address) public override relationProcessors;   // rsid -> rs_processor

    //map actors to relations 
    mapping(uint256 => mapping(uint256 => uint256)) public override actorRelations; //actor -> (actor -> rsid)
    mapping(uint256 => mapping(uint256 => uint256[])) internal _actorRelationPeople;  //actor -> (rsid -> target_actor_list)

    /* *********
     * Modifiers
     * *********
     */

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

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_RELATIONSHIP; }

    function setRelation(uint256 _rsid, string memory _name) external override
        onlyPanGu
    {
        require(_rsid > 0, "invalid rsid");
        require(keccak256(abi.encodePacked(_name)) != keccak256(abi.encodePacked("")), "invalid name");
        relations[_rsid] = _name;
    }

    function setRelationProcessor(uint256 _rsid, address _processorAddress) external override
        onlyPanGu
    {
        require(_rsid > 0, "invalid rsid");
        require(keccak256(abi.encodePacked(relations[_rsid])) != keccak256(abi.encodePacked("")), "relation def have not set");
        relationProcessors[_rsid] = _processorAddress;        
    }

    function setActorRelation(uint256 _operator, uint256 _actor, uint256 _target, uint256 _rsid) external override
        onlyYeMing(_operator)
    {        
        uint256 old_rsid = actorRelations[_actor][_target];
        actorRelations[_actor][_target] = _rsid;
        actorRelations[_target][_actor] = _rsid;

        if(old_rsid > 0) {
            for(uint256 i=0; i<_actorRelationPeople[_actor][old_rsid].length; i++) {
                if(_target == _actorRelationPeople[_actor][old_rsid][i]) {
                    _actorRelationPeople[_actor][old_rsid][i] = _actorRelationPeople[_actor][old_rsid][_actorRelationPeople[_actor][old_rsid].length-1];
                    _actorRelationPeople[_actor][old_rsid].pop();
                }
            }
            for(uint256 i=0; i<_actorRelationPeople[_target][old_rsid].length; i++) {
                if(_actor == _actorRelationPeople[_target][old_rsid][i]) {
                    _actorRelationPeople[_target][old_rsid][i] = _actorRelationPeople[_target][old_rsid][_actorRelationPeople[_target][old_rsid].length-1];
                    _actorRelationPeople[_target][old_rsid].pop();
                }
            }
        }

        if(_rsid > 0) {
            _actorRelationPeople[_actor][_rsid].push(_target);
            _actorRelationPeople[_target][_rsid].push(_actor);
        }

        emit RelationUpdated(_actor, _target, _rsid, relations[_rsid]);
    }

    /* **************
     * View Functions
     * **************
     */

    function actorRelationPeople(uint256 _actor, uint256 _rsid) external override view returns (uint256[] memory) {
        return _actorRelationPeople[_actor][_rsid];
    }

    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) virtual external override view returns (string memory, uint256) {
        return ("", _startY);
    }

    function tokenJSON(uint256 /*_actor*/) virtual external override view returns (string memory) {
        return "";
    }
}
