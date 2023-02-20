// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../../interfaces/WorldInterfaces.sol";
import '../../libs/WorldConstants.sol';
import "../WorldConfigurable.sol";

contract NameGenerator is INameGenerator, WorldConfigurable {

    /* *******
     * Globals
     * *******
     */

    string[] internal _genders;
    mapping(string => uint256) internal _genderIndices; //map gender string to (index+1) in _genders, 0 means not exist

    string[] internal _families;
    mapping(string => uint256) internal _familyIndices; //map family string to (index+1) in _families, 0 means not exist

    string[] internal _mids;
    mapping(string => uint256) internal _midIndices; //map middle string to (index+1) in _mids, 0 means not exist

    string[][] internal _givens;
    mapping(string => mapping(string => uint256)) internal _givenIndices; //map gender string to a map (given string to (index+1)) in _givens, 0 means not exist

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {}

    function registerGender(uint256 _operator, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            require(validateName(strs[i]), 'invalid gender');
            require(_genderIndices[strs[i]] == 0, "gender already exist");

            _genderIndices[strs[i]] = _genders.length + 1; //index + 1
            _genders.push(strs[i]);
            
            _givens.push(new string[](0));
        }
    }

    function removeGender(uint256 _operator, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            uint256 genderId = _genderIndices[strs[i]];
            require(genderId > 0, "gender not exist");

            _genders[genderId - 1] = _genders[_genders.length - 1];
            _genders.pop();
            delete _genderIndices[strs[i]];
        }
    }

    function registerFamily(uint256 _operator, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            require(validateName(strs[i]), 'invalid family');
            require(_familyIndices[strs[i]] == 0, "family already exist");

            _familyIndices[strs[i]] = _families.length + 1; //index + 1
            _families.push(strs[i]);
        }
    }

    function removeFamily(uint256 _operator, string[] memory strs) public override
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            require(_familyIndices[strs[i]] > 0, "family not exist");

            _families[_familyIndices[strs[i]] - 1] = _families[_families.length - 1];
            _families.pop();
            delete _familyIndices[strs[i]];
        }
    }


    function registerMiddle(uint256 _operator, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            require(validateName(strs[i]), 'invalid middle');
            require(_midIndices[strs[i]] == 0, "middle already exist");

            _midIndices[strs[i]] = _mids.length + 1; //index + 1
            _mids.push(strs[i]);
        }
    }

    function removeMiddle(uint256 _operator, string[] memory strs) public override
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            require(_midIndices[strs[i]] > 0, "middle not exist");

            _mids[_midIndices[strs[i]] - 1] = _mids[_mids.length - 1];
            _mids.pop();
            delete _midIndices[strs[i]];
        }
    }

    function registerGiven(uint256 _operator, string memory gender, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        uint256 genderId = _genderIndices[gender];
        require(genderId > 0, "gender not exist");
        require(genderId <= _givens.length, "internal error");
        genderId -= 1; //index

        for(uint256 i=0; i<strs.length; i++) {
            require(validateName(strs[i]), 'invalid given');
            require(_givenIndices[gender][strs[i]] == 0, "given already exist");

            _givenIndices[gender][strs[i]] = _givens[genderId].length + 1; //index + 1
            _givens[genderId].push(strs[i]);        
        }
    }

    function removeGiven(uint256 _operator, string memory gender, string[] memory strs) public override
        onlyYeMing(_operator)
    {
        uint256 genderId = _genderIndices[gender];
        require(genderId > 0, "gender not exist");
        require(genderId <= _givens.length, "internal error");
        genderId -= 1; //index

        for(uint256 i=0; i<strs.length; i++) {
            require(_givenIndices[gender][strs[i]] > 0, "given not exist");

            _givens[genderId][_givenIndices[gender][strs[i]] - 1] = _givens[genderId][_givens[genderId].length - 1];
            _givens[genderId].pop();
            delete _givenIndices[gender][strs[i]];
        }
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return 225; }

    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) external virtual override view returns (string memory, uint256 _endY) {
        _endY = _startY;
        return ("", _endY);
    }

    function tokenJSON(uint256 /*_actor*/) external virtual override view returns (string memory) {
        return "{}";
    }

    /* **************
     * View Functions
     * **************
     */

    //数量，性别（0随机），字数（0随机，1一字，2二字），姓（“”随机），辈分（“”随机），名（“”随机）
    //返回字符串数组，[名称0的姓,名称0的辈分,名称0的名,...]
    function genName(uint256 number,
        uint256 gender,
        uint256 ct, 
        string memory family, 
        string memory middle, 
        string memory given, 
        uint256 seed) external view override returns(string[] memory) 
    {
        require(ct <= 2, "invalid ct");
        require(number > 0, "invalid number");
        require(gender <= _genders.length, "invalid gender");

        string[] memory _names = new string[](number*3); 

        uint256 _gender = gender>0?(gender-1):0;
        uint256 _ct = ct;
        string memory _family = family;
        string memory _middle = middle;
        string memory _given = given;

        for(uint256 i=0; i<number; i++) {
            if(gender == 0)
                _gender = _dn(1733+i+seed, _genders.length);
            if(bytes(family).length == 0)
                _family = _families[_dn(2287+i+seed, _families.length)];
            if(ct == 0)
                _ct = _dn(4253+i+seed, 2) + 1;

            if(_ct == 1) {
                _middle = "";
            }
            else {
                if(bytes(middle).length == 0)
                    _middle = _mids[_dn(10151+i+seed, _mids.length)];            
            }

            if(bytes(given).length == 0)
                _given = _givens[_gender][_dn(13913+i+seed, _givens[_gender].length)];            

            _names[3*i + 0] = _family;
            _names[3*i + 1] = _middle;
            _names[3*i + 2] = _given;
        }

        return _names;
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    // @dev Check if the name string is valid (Alphanumeric and spaces without leading or trailing space)
    function validateName(string memory str) internal pure returns (bool) {
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

    function _dn(uint256 _s, uint256 _number) internal view returns (uint256) {
        return _seed(_s) % _number;
    }

    function _random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function _seed(uint256 _s) internal view returns (uint256 rand) {
        rand = _random(
            string(
                abi.encodePacked(
                    block.timestamp,
                    blockhash(block.number - 1),
                    _s,
                    msg.sender
                )
            )
        );
    }
}
