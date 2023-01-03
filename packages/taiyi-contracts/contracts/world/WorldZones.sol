// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./WorldNonfungible.sol";
import "../libs/Base64.sol";

contract WorldZones is IWorldZones, WorldNonFungible {

    /* *******
     * Globals
     * *******
     */

    uint256 public override nextZone = 1;
    mapping(uint256 => string) public override names;  // token => name
    mapping(uint256 => address) public override timelines; //token => timeline address

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route) WorldNonFungible("Taiyi Zone", "TYZONE", _route) {
    }     

    // @dev Claim a zone for a actor.
    function claim(uint256 _operator, string memory _name, address _timelineAddress, uint256 _actor) public override 
        onlyYeMing(_operator)
        returns (uint256 _zoneId)
    {
        require(_timelineAddress != address(0), "invalid timeline address");
        require(validateName(_name), 'invalid name');

        _mint(address(0), worldRoute.actors().getActor(_actor).account, nextZone);
        _zoneId = nextZone;
        nextZone++;

        names[_zoneId] = _name;        
        timelines[_zoneId] = _timelineAddress;
        emit ZoneClaimed(_actor, _zoneId, _name);
    }

    // @dev Change the _name (as it is unique).
    function updateZone(uint256 _zoneOperator, uint256 _zoneId, string memory _newName) public 
        onlyApprovedOrOwner(_zoneOperator)
    {
        address operatorHost = worldRoute.actors().getActor(_zoneOperator).account;
        require(_isApprovedOrOwner(operatorHost, _zoneId), "not approved or the owner of zone");
        require(validateName(_newName), 'invalid name');
        string memory _name = names[_zoneId];
        require(keccak256(abi.encodePacked(toLower(_name))) != keccak256(abi.encodePacked(toLower(_newName))), 'new name already exist.');

        names[_zoneId] = _newName;

        emit ZoneUpdated(_zoneId, _name, _newName);
    }

    // @dev Check if the name string is valid (Alphanumeric and spaces without leading or trailing space)
    function validateName(string memory str) public pure returns (bool) {
        bytes memory b = bytes(str);
        if(b.length < 1) return false;
        if(b.length > 25) return false; // Cannot be longer than 25 characters
        if(b[0] == 0x20) return false; // Leading space
        if (b[b.length - 1] == 0x20) return false; // Trailing space

        bytes1 last_char = b[0];
        for(uint256 i; i<b.length; i++){
            bytes1 char = b[i];
            if (char == 0x20 && last_char == 0x20) return false; // Cannot contain continous spaces
            last_char = char;
        }

        return true;
    }

    // @dev Converts the string to lowercase
    function toLower(string memory str) public pure returns (string memory) {
        bytes memory b_str = bytes(str);
        bytes memory b_lower = new bytes(b_str.length);
        for (uint256 i = 0; i < b_str.length; i++) {
            // Uppercase character
            if ((uint8(b_str[i]) >= 65) && (uint8(b_str[i]) <= 90)) {
                b_lower[i] = bytes1(uint8(b_str[i]) + 32);
            } else {
                b_lower[i] = b_str[i];
            }
        }
        return string(b_lower);
    }

    /* *****************
     * External Functions
     * *****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_ZONES; }    

    function withdraw(uint256 _operator, uint256 _zoneId) external override
        onlyYeMing(_operator)
    {
        address zoneOwner = ownerOf(_zoneId);
        IActors.Actor memory actor = worldRoute.actors().getActorByHolder(zoneOwner);
        require(_isActorApprovedOrOwner(actor.actorId), "not approved or the owner of actor.");

        //transfer token from current holder to actor owner
        _transfer(zoneOwner, actor.owner, _zoneId);
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        address holder = worldRoute.actors().getActor(_actor).account;
        uint256 count = balanceOf(holder);
        if(count > 0) {
            string[7] memory parts;
            //拥有地区：
            parts[0] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\x8B\xA5\xE6\x9C\x89\xE5\x9C\xB0\xE5\x8C\xBA\xEF\xBC\x9A', '</text>'));
            for(uint256 i=0; i<count; i++) {
                uint256 _zoneId = tokenOfOwnerByIndex(holder, i);
                _endY += _lineHeight;
                parts[1] = string(abi.encodePacked(parts[1], string(abi.encodePacked('<text x="20" y="', Strings.toString(_endY), '" class="base_nocolor" fill="yellow">', names[_zoneId], '</text>'))));
            }
            return (string(abi.encodePacked(parts[0], parts[1])), _endY);
        }
        else
            //未拥有地区。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\x9C\xAA\xE6\x8B\xA5\xE6\x9C\x89\xE5\x9C\xB0\xE5\x8C\xBA\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        address holder = worldRoute.actors().getActor(_actor).account;
        uint256 count = balanceOf(holder);
        string memory json = "[";
        for(uint256 i=0; i<count; i++) {
            uint256 _zoneId = tokenOfOwnerByIndex(holder, i);
            if(i <= (count-1))
                json = string(abi.encodePacked(json, names[_zoneId], ','));
            else
                json = string(abi.encodePacked(json, names[_zoneId]));
        }
            json = string(abi.encodePacked(json, ']'));
        return json;
    }

    /* **************
     * View Functions
     * **************
     */

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) public override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) public override view returns (string memory) {
        return _tokenJSON(_actor);
    }

    function tokenURI(uint256 _zoneId) public override view returns (string memory) {
        string[7] memory parts;
        //start svg
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />';
        if (_zoneId > 0) {
            //区域 #ID：
            parts[1] = string(abi.encodePacked('<text x="10" y="20" class="base">', '\xE5\x8C\xBA\xE5\x9F\x9F\x20\x23', Strings.toString(_zoneId), '\xEF\xBC\x9A', names[_zoneId], '</text>'));
            uint256 actor = worldRoute.actors().getActorByHolder(ownerOf(_zoneId)).actorId;
            //属于角色#
            parts[2] = string(abi.encodePacked('<text x="10" y="40" class="base">', '\xE5\xB1\x9E\xE4\xBA\x8E\xE8\xA7\x92\xE8\x89\xB2\x23', Strings.toString(actor), '</text>'));
        }
        //end svg
        parts[3] = string(abi.encodePacked('</svg>'));
        string memory svg = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]));

         //start json
        parts[0] = string(abi.encodePacked('{"name": "Taiyi Zone #', Strings.toString(_zoneId), '"'));
        parts[1] = ', "description": "This is not a game."';
        parts[2] = string(abi.encodePacked(', "data": { "name":"', names[_zoneId],'"}'));

        //end json with svg
        parts[3] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}