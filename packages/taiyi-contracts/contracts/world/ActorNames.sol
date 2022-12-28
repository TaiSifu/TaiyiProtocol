// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../libs/Base64.sol";
import "./WorldNonfungible.sol";

contract ActorNames is IActorNames, WorldNonFungible 
{
    /* *******
     * Globals
     * *******
     */

    uint256 public override nextName = 1;

    mapping(uint256 => string) public names;  // token => name
    mapping(uint256 => string) public firstNames;  // token => first_name
    mapping(uint256 => string) public lastNames;  // token => last_name
    mapping(uint256 => uint) public actorToNameIDs; // actor => token
    mapping(uint256 => uint) public nameIDToActors; // token => actor
    mapping(string => bool) private _isNameClaimed;

    //compatible with opensea
    string private _contractURI;

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    // @dev Claim a name for a actor.
    function claim(string memory _firstName, string memory _lastName, uint256 _actor) public override returns (uint256 _nameId)
    {
        //require(worldRoute.timeline().characterBorn(actor), 'character have not born in timeline');
        string memory name = string(abi.encodePacked(_lastName, _firstName));
        require(validateName(name), 'invalid name');
        string memory lowerName = toLower(name);
        require(!_isNameClaimed[lowerName], 'name taken');

        _mint(address(0), msg.sender, nextName);
        _nameId = nextName;
        nextName++;
        names[_nameId] = name;
        firstNames[_nameId] = _firstName;
        lastNames[_nameId] = _lastName;
        _isNameClaimed[lowerName] = true;
        
        emit NameClaimed(msg.sender, _actor, _nameId, name, _firstName, _lastName);

        if(_actor > 0)
            assignName(_nameId, _actor);            
    }

    // @dev assign a name to a (new) actor
    function assignName(uint256 _nameId, uint256 _actor) public override
        onlyApprovedOrOwner(_actor)
    {
        require(_isApprovedOrOwner(msg.sender, _nameId), "!owner or approved name");
        require(actorToNameIDs[_actor] == 0, "actor already named");
        uint256 from = nameIDToActors[_nameId];
        if (from > 0)
            actorToNameIDs[from] = 0;
        actorToNameIDs[_actor] = _nameId;
        nameIDToActors[_nameId] = _actor;

        //transfer name token from current owner to actor holder
        transferFrom(ownerOf(_nameId), worldRoute.actors().getActor(_actor).account, _nameId);

        emit NameAssigned(_nameId, from, _actor);
    }

    // @dev Unlink a name from a actor while transferring it from actor holder.
    //      Use assign_name to reassign the name.
    function withdraw(uint256 _operator, uint256 _actor) public override
        onlyYeMing(_operator)
    {
        require(_isActorApprovedOrOwner(_actor), "not approved or owner of actor.");

        uint256 _nameId = actorToNameIDs[_actor];
        address actorHolder = worldRoute.actors().getActor(_actor).account;
        require(_isApprovedOrOwner(actorHolder, _nameId), "actor has not been named appropriately.");

        actorToNameIDs[_actor] = 0;
        nameIDToActors[_nameId] = 0;

        //transfer name token from current holder to actor owner
        address actorOwner = worldRoute.actors().getActor(_actor).owner;
        _transfer(ownerOf(_nameId), actorOwner, _nameId);

        emit NameAssigned(_nameId, _actor, 0);
    }

    // @dev Change the capitalization (as it is unique).
    //      Can't change the name.
    function updateCapitalization(uint256 _nameId, string memory _newName) public {
        require(_isApprovedOrOwner(msg.sender, _nameId), "!owner or approved name");
        require(validateName(_newName), 'invalid name');
        string memory name = names[_nameId];
        require(keccak256(abi.encodePacked(toLower(name))) == keccak256(abi.encodePacked(toLower(_newName))), 'name different');
        names[_nameId] = _newName;

        emit NameUpdated(_nameId, name, _newName);
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
     * Private Functions
     * *****************
     */

    constructor(WorldContractRoute _route) WorldNonFungible("Taiyi Actor Names", "TYNAMES", _route) {
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 /*_lineHeight*/) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        uint256 id = actorToNameIDs[_actor];
        if(id > 0)
            //Name: 
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE5\xA7\x93\xE5\x90\x8D\xEF\xBC\x9A', names[id], ' (#', Strings.toString(id), ')</text>')), _endY);
        else
            //No Name. 无姓名。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\x97\xA0\xE5\xA7\x93\xE5\x90\x8D\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        uint256 id = actorToNameIDs[_actor];
        string[7] memory parts;
        parts[0] = string(abi.encodePacked('{', '"fullName": "', names[id]));
        parts[1] = string(abi.encodePacked('", "firstName": "', firstNames[id]));
        parts[2] = string(abi.encodePacked('", "lastName": "', lastNames[id], '"}'));
        return string(abi.encodePacked(parts[0], parts[1], parts[2]));
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint) { return WorldConstants.WORLD_MODULE_NAMES; }

    function changeContractURI(string memory _uri) external
        onlyOwner
    {
        _contractURI = _uri;
    }

    /* **************
     * View Functions
     * **************
     */

    //https://docs.opensea.io/docs/contract-level-metadata
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function actorName(uint256 _actor) public override view returns (string memory _name, string memory _firstName, string memory _lastName){
        uint256 id = actorToNameIDs[_actor];
        _name = names[id];
        _firstName = firstNames[id];
        _lastName = lastNames[id];
    }

    function isNameClaimed(string memory _firstName, string memory _lastName) external view returns(bool _isClaimed) {
        _isClaimed = _isNameClaimed[toLower(string(abi.encodePacked(_lastName, _firstName)))];
    }

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) external override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) external override view returns (string memory) {
        return _tokenJSON(_actor);
    }

    function tokenURI(uint256 _nameId) public override view returns (string memory) {
        string[7] memory parts;
        //start svg
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />';
        uint256 actor = nameIDToActors[_nameId];
        if (actor > 0) {
            parts[1] = string(abi.encodePacked('<text x="10" y="20" class="base">Name #', Strings.toString(_nameId), ':', names[_nameId], '</text>'));
            parts[2] = string(abi.encodePacked('<text x="10" y="40" class="base">Belongs to actor#', Strings.toString(actor), '</text>'));
        }
        //end svg
        parts[3] = string(abi.encodePacked('</svg>'));
        string memory svg = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]));

         //start json
        parts[0] = string(abi.encodePacked('{"name": "RareTaiwu Name #', Strings.toString(_nameId), '"'));
        parts[1] = ', "description": "This is not a game."';
        parts[2] = string(abi.encodePacked(', "data": ', _tokenJSON(actor)));

        //end json with svg
        parts[3] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}