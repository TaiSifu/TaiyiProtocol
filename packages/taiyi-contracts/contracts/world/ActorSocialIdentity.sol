// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../libs/Base64.sol";
import "./WorldNonfungible.sol";

contract ActorSocialIdentity is IActorSocialIdentity, WorldNonFungible {

    /* *******
     * Globals
     * *******
     */

    uint256 public override nextSID = 1;

    mapping(uint256 => string) public override names;
    mapping(uint256 => uint256) private _sidNameIds;  // token => name id

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route) WorldNonFungible("Taiyi Social Identity", "TYSID", _route) {
    }     

    // @dev Claim a sid for a actor. actor must hold the required gold.
    function claim(uint256 _operator, uint256 _nameId, uint256 _actor) public override
        onlyYeMing(_operator)
        returns (uint256 _sid)
    {
        //require(keccak256(abi.encodePacked(names[nameId])) == keccak256(abi.encodePacked("")), "ActorSocialIdentity: nameId invalid");
        //require(timeline.characterBorn(actor), 'ActorSocialIdentity: character have not born in timeline');

        _mint(address(0), worldRoute.actors().getActor(_actor).account, nextSID);
        _sid = nextSID;
        nextSID++;

        _sidNameIds[_sid] = _nameId;
        
        emit SIDClaimed(_actor, _sid, names[_nameId]);
    }

    function burn(uint256 _operator, uint256 _sid) external override
        onlyYeMing(_operator)
    {
        address itemOwner = ownerOf(_sid);
        IActors.Actor memory actor = worldRoute.actors().getActorByHolder(itemOwner);
        require(_isActorApprovedOrOwner(actor.actorId), "not approved or the owner of actor.");

        uint256 _nameId = _sidNameIds[_sid]; 
        _burn(_sid);

        emit SIDDestroyed(actor.actorId, _sid, names[_nameId]);
    }

    function setSIDName(uint256 _nameId, string memory _newName) public
        onlyPanGu
    {
        require(_nameId > 0, 'invalid _nameId');
        require(validateName(_newName), 'invalid name');

        names[_nameId] = _newName;
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
    // function toLower(string memory str) public pure returns (string memory) {
    //     bytes memory b_str = bytes(str);
    //     bytes memory b_lower = new bytes(b_str.length);
    //     for (uint256 i = 0; i < b_str.length; i++) {
    //         // Uppercase character
    //         if ((uint8(b_str[i]) >= 65) && (uint8(b_str[i]) <= 90)) {
    //             b_lower[i] = bytes1(uint8(b_str[i]) + 32);
    //         } else {
    //             b_lower[i] = b_str[i];
    //         }
    //     }
    //     return string(b_lower);
    // }

    /* *****************
     * Internal Functions
     * *****************
     */

    //Nontransferable
    function _transfer(address /*_from*/, address /*_to*/, uint256 /*_tokenId*/) internal override virtual {
        require(false, "can not transfer SBT.");
    }

    function _sidName(uint256 _sid) internal view returns (string memory) {
        uint256 _nameId = _sidNameIds[_sid];
        return names[_nameId];
    }

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        address holder = worldRoute.actors().getActor(_actor).account;
        uint256 count = balanceOf(holder);
        if(count > 0) {
            string[7] memory parts;
            //身份：
            parts[0] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE8\xBA\xAB\xE4\xBB\xBD\xEF\xBC\x9A', '</text>'));
            for(uint256 i=0; i<count; i++) {
                uint256 sid = tokenOfOwnerByIndex(holder, i);
                _endY += _lineHeight;
                parts[1] = string(abi.encodePacked(parts[1], string(abi.encodePacked('<text x="20" y="', Strings.toString(_endY), '" class="base_nocolor" fill="yellow">', _sidName(sid), '</text>'))));
            }
            return (string(abi.encodePacked(parts[0], parts[1])), _endY);
        }
        else
            //没有身份。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\xB2\xA1\xE6\x9C\x89\xE8\xBA\xAB\xE4\xBB\xBD\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        address holder = worldRoute.actors().getActor(_actor).account;
        uint256 count = balanceOf(holder);
        string memory json = "[";
        for(uint256 i=0; i<count; i++) {
            uint256 sid = tokenOfOwnerByIndex(holder, i);
            if(i < (count-1))
                json = string(abi.encodePacked(json, Strings.toString(sid), ','));
            else
                json = string(abi.encodePacked(json, Strings.toString(sid)));
        }
            json = string(abi.encodePacked(json, ']'));
        return json;
    }

    /* **************
     * View Functions
     * **************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_SIDS; }   

    function sidName(uint256 _sid) external override view returns (uint256 _nameId, string memory _name) {
        _nameId = _sidNameIds[_sid];
        _name = names[_nameId];
    }

    function haveName(uint256 _actor, uint256 _nameId) public override view returns (bool) {
        if(_nameId == 0)
            return false;
        address holder = worldRoute.actors().getActor(_actor).account;
        uint256 count = balanceOf(holder);
        for(uint256 i=0; i<count; i++) {
            if(_sidNameIds[tokenOfOwnerByIndex(holder, i)] == _nameId)
                return true;
        }
        return false;
    }

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) public override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) public override view returns (string memory) {
        return _tokenJSON(_actor);
    }

    function tokenURI(uint256 _sid) public override view returns (string memory) {
        string[7] memory parts;
        //start svg
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />';
        if (_sid > 0) {
            parts[1] = string(abi.encodePacked('<text x="10" y="20" class="base">SID #', Strings.toString(_sid), ':', _sidName(_sid), '</text>'));
            uint256 actor = worldRoute.actors().getActorByHolder(ownerOf(_sid)).actorId;
            parts[2] = string(abi.encodePacked('<text x="10" y="40" class="base">Belongs to actor#', Strings.toString(actor), '</text>'));
        }
        //end svg
        parts[3] = string(abi.encodePacked('</svg>'));
        string memory svg = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]));

         //start json
        parts[0] = string(abi.encodePacked('{"name": "Taiyi SID #', Strings.toString(_sid), '"'));
        parts[1] = ', "description": "This is not a game."';
        parts[2] = string(abi.encodePacked(', "data": { "name":"', _sidName(_sid),'"}'));

        //end json with svg
        parts[3] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}