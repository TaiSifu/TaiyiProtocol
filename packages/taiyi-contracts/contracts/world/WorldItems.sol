// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../base/ERC721Enumerable.sol";
import "../interfaces/WorldInterfaces.sol";
import "../WorldConfigurable.sol";
import "../libs/Base64.sol";

contract WorldItems is IWorldItems, WorldConfigurable, ERC721Enumerable {

    /* *******
     * Globals
     * *******
     */

    uint256 public override nextItemId = 1;

    string[] public override shapeNames = [
        "\xE4\xB8\x8B\xC2\xB7\xE4\xB9\x9D\xE5\x93\x81", //0.下·九品
        "\xE4\xB8\xAD\xC2\xB7\xE5\x85\xAB\xE5\x93\x81", //1.中·八品
        "\xE4\xB8\x8A\xC2\xB7\xE4\xB8\x83\xE5\x93\x81", //2.上·七品
        "\xE5\xA5\x87\xC2\xB7\xE5\x85\xAD\xE5\x93\x81", //3.奇·六品
        "\xE7\xA7\x98\xC2\xB7\xE4\xBA\x94\xE5\x93\x81", //4.秘·五品
        "\xE6\x9E\x81\xC2\xB7\xE5\x9B\x9B\xE5\x93\x81", //5.极·四品
        "\xE8\xB6\x85\xC2\xB7\xE4\xB8\x89\xE5\x93\x81", //6.超·三品
        "\xE7\xBB\x9D\xC2\xB7\xE4\xBA\x8C\xE5\x93\x81", //7.绝·二品
        "\xE7\xA5\x9E\xC2\xB7\xE4\xB8\x80\xE5\x93\x81"  //8.神·一品
    ];

    mapping(uint256 => string) public override typeNames; //typeId => typeName
    mapping(uint256 => uint256) public override itemTypes;  // item => typeId
    mapping(uint256 => uint256) public override itemWears;
    mapping(uint256 => uint256) public override itemShapes;

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(address _worldRouteAddress) WorldConfigurable(_worldRouteAddress) ERC721("Taiyi Items", "TYITEM") {
    }     

    function mint(uint256 _operator, uint256 _typeId, uint256 _wear, uint256 _shape, uint256 _actor) public override 
        onlyYeMing(_operator)
        returns (uint256)
    {
        require(_shape <= 8, "invalid shape");
        //require(keccak256(abi.encodePacked(typeNames[typeId])) == keccak256(abi.encodePacked("")), "typeId invalid");
        IWorldTimeline timeline = IWorldTimeline(worldRoute.modules(WorldConstants.WORLD_MODULE_TIMELINE));
        require(timeline.characterBorn(_actor), 'character have not born in timeline');

        uint256 itemId = nextItemId;
        _mint(address(0), worldRoute.actors().getActor(_actor).account, itemId);
        nextItemId++;

        itemTypes[itemId] = _typeId;
        itemWears[itemId] = _wear;
        itemShapes[itemId] = _shape;
        
        emit ItemCreated(_actor, itemId, _typeId, typeNames[_typeId], _wear, _shape, shapeNames[_shape]);

        return itemId;
    }

    function setTypeName(uint256 _typeId, string memory _typeName) public
        onlyPanGu
    {
        require(_typeId > 0, "type id can not be zero");
        require(validateName(_typeName), 'invalid type name');

        typeNames[_typeId] = _typeName;
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

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_ITEMS; }    

    function modify(uint256 _operator, uint256 _itemId, uint256 _wear) external override 
        onlyYeMing(_operator)
    {
        uint256 typeId = itemTypes[_itemId];
        require(itemTypes[_itemId] > 0, "item not exist");

        itemWears[_itemId] = _wear;

        uint256 shape = itemShapes[_itemId];
        emit ItemChanged(_itemId, typeId, typeNames[typeId], _wear, shape, shapeNames[shape]);
    }

    function burn(uint256 _operator, uint256 _itemId) external override
        onlyYeMing(_operator)
    {
        address itemOwner = ownerOf(_itemId);
        IActors.Actor memory actor = worldRoute.actors().getActorByHolder(itemOwner);
        require(_isActorApprovedOrOwner(actor.actorId), "not approved or the owner of actor.");

        _burn(_itemId);

        emit ItemDestroyed(_itemId, itemTypes[_itemId], typeNames[itemTypes[_itemId]]);
    }

    function withdrawItem(uint256 _operator, uint256 _itemId) external override
        onlyYeMing(_operator)
    {
        address itemOwner = ownerOf(_itemId);
        IActors.Actor memory actor = worldRoute.actors().getActorByHolder(itemOwner);
        require(_isActorApprovedOrOwner(actor.actorId), "not approved or the owner of actor.");

        //transfer item token from current holder to actor owner
        _transfer(itemOwner, actor.owner, _itemId);
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
            //物品：
            parts[0] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE7\x89\xA9\xE5\x93\x81\xEF\xBC\x9A', '</text>'));
            for(uint256 i=0; i<count; i++) {
                uint256 itemId = tokenOfOwnerByIndex(holder, i);
                _endY += _lineHeight;
                parts[1] = string(abi.encodePacked(parts[1], '<text x="20" y="', Strings.toString(_endY), '" class="base">'));
                SItem memory _item = item(itemId);
                //{typeName}（#{itemId}），
                parts[1] = string(abi.encodePacked(parts[1], _item.typeName, '\xEF\xBC\x88', '#', Strings.toString(itemId), '\xEF\xBC\x89\xEF\xBC\x8C'));
                //{shapeName}，耐久为{wear}
                parts[1] = string(abi.encodePacked(parts[1], _item.shapeName, '\xEF\xBC\x8C\xE8\x80\x90\xE4\xB9\x85\xE4\xB8\xBA', Strings.toString(_item.wear)));
                parts[1] = string(abi.encodePacked(parts[1], '</text>'));
            }
            return (string(abi.encodePacked(parts[0], parts[1])), _endY);
        }
        else
            //没有物品。
            return (string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE6\xB2\xA1\xE6\x9C\x89\xE7\x89\xA9\xE5\x93\x81\xE3\x80\x82', '</text>')), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        address holder = worldRoute.actors().getActor(_actor).account;
        uint256 count = balanceOf(holder);
        string memory json = "[";
        for(uint256 i=0; i<count; i++) {
            uint256 itemId = tokenOfOwnerByIndex(holder, i);
            json = string(abi.encodePacked(json, Strings.toString(itemId)));
            if(i <= (count-1))
                json = string(abi.encodePacked(json, ','));
        }
        json = string(abi.encodePacked(json, ']'));
        return json;
    }

    /* **************
     * View Functions
     * **************
     */

    function item(uint256 _itemId) public override view returns (SItem memory _itemInfo) {
        _itemInfo.typeId = itemTypes[_itemId];
        _itemInfo.typeName = typeNames[_itemInfo.typeId];
        _itemInfo.shapeId = itemShapes[_itemId];
        _itemInfo.shapeName = shapeNames[_itemInfo.shapeId];
        _itemInfo.wear = itemWears[_itemId];
    }

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) public override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) public override view returns (string memory) {
        return _tokenJSON(_actor);
    }

    function tokenURI(uint256 _itemId) public override view returns (string memory) {
        string[7] memory parts;
        //start svg
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />';
        if (_itemId > 0) {
            SItem memory _item = item(_itemId);
            parts[1] = string(abi.encodePacked('<text x="10" y="20" class="base">Item #', Strings.toString(_itemId), '</text>'));
            parts[2] = string(abi.encodePacked('<text x="10" y="40" class="base">', _item.typeName, '</text>'));
            parts[3] = string(abi.encodePacked('<text x="10" y="60" class="base">', _item.shapeName, '</text>'));
            parts[4] = string(abi.encodePacked('<text x="10" y="80" class="base">', '\xE8\x80\x90\xE4\xB9\x85', '=', Strings.toString(_item.wear), '</text>'));
            uint256 actor = worldRoute.actors().getActorByHolder(ownerOf(_itemId)).actorId;
            parts[5] = string(abi.encodePacked('<text x="10" y="100" class="base">Belongs to actor#', Strings.toString(actor), '</text>'));
        }
        //end svg
        parts[6] = string(abi.encodePacked('</svg>'));
        string memory svg = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6]));

        //start json
        parts[0] = string(abi.encodePacked('{"name": "Taiyi Items #', Strings.toString(_itemId), '"'));
        parts[1] = ', "description": "This is not a game."';
        parts[2] = string(abi.encodePacked(', "data": { '));
        parts[2] = string(abi.encodePacked(parts[2], '"type":', Strings.toString(itemTypes[_itemId]),','));
        parts[2] = string(abi.encodePacked(parts[2], '"shape":', Strings.toString(itemShapes[_itemId]),','));
        parts[2] = string(abi.encodePacked(parts[2], '"wear":', Strings.toString(itemWears[_itemId]),''));
        parts[2] = string(abi.encodePacked(parts[2], '}'));

        //end json with svg
        parts[3] = string(abi.encodePacked(', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'));
        string memory json = Base64.encode(bytes(string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}