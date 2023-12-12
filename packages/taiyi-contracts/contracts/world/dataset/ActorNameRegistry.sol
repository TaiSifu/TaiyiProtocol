// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "../../interfaces/WorldInterfaces.sol";
import '../../libs/WorldConstants.sol';
import "../WorldConfigurable.sol";

contract ActorNameRegistry is IActorNameRegistry, WorldConfigurable {

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

    function genderCount() public view returns (uint256) {
        return _genders.length;
    }

    function gender(uint256 _index) public view returns (string memory) {
        return _genders[_index];
    }

    function registerGender(uint256 _operator, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            require(validateName(strs[i]), 'invalid gender');
            if(_genderIndices[strs[i]] == 0) {
                _genderIndices[strs[i]] = _genders.length + 1; //index + 1
                _genders.push(strs[i]);
                
                _givens.push(new string[](0));
            }
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

    function familyCount() public view returns (uint256) {
        return _families.length;
    }

    function family(uint256 _index) public view returns (string memory) {
        return _families[_index];
    }

    function registerFamily(uint256 _operator, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            require(validateName(strs[i]), 'invalid family');
            if(_familyIndices[strs[i]] == 0) {
                _familyIndices[strs[i]] = _families.length + 1; //index + 1
                _families.push(strs[i]);
            }
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


    function middleCount() public view returns (uint256) {
        return _mids.length;
    }

    function middle(uint256 _index) public view returns (string memory) {
        return _mids[_index];
    }

    function registerMiddle(uint256 _operator, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        for(uint256 i=0; i<strs.length; i++) {
            require(validateName(strs[i]), 'invalid middle');
            if(_midIndices[strs[i]] == 0) {
                _midIndices[strs[i]] = _mids.length + 1; //index + 1
                _mids.push(strs[i]);
            }
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

    function givenCount(uint256 _genderId) public view returns (uint256) {
        return _givens[_genderId].length;
    }

    function givenCount(string memory _gender) public view returns (uint256) {
        uint256 genderId = _genderIndices[_gender];
        if(genderId == 0)
            return 0;
        return _givens[genderId].length;
    }

    function given(uint256 _genderId, uint256 _index) public view returns (string memory) {
        return _givens[_genderId][_index];
    }

    function given(string memory _gender, uint256 _index) public view returns (string memory) {
        uint256 genderId = _genderIndices[_gender];
        if(genderId == 0)
            return "";
        return _givens[genderId][_index];
    }

    function registerGiven(uint256 _operator, string memory _gender, string[] memory strs) public override 
        onlyYeMing(_operator)
    {
        uint256 genderId = _genderIndices[_gender];
        require(genderId > 0, "gender not exist");
        require(genderId <= _givens.length, "internal error");
        genderId -= 1; //index

        for(uint256 i=0; i<strs.length; i++) {
            require(validateName(strs[i]), 'invalid given');
            if(_givenIndices[_gender][strs[i]] == 0) {
                _givenIndices[_gender][strs[i]] = _givens[genderId].length + 1; //index + 1
                _givens[genderId].push(strs[i]);        
            }
        }
    }

    function removeGiven(uint256 _operator, string memory _gender, string[] memory strs) public override
        onlyYeMing(_operator)
    {
        uint256 genderId = _genderIndices[_gender];
        require(genderId > 0, "gender not exist");
        require(genderId <= _givens.length, "internal error");
        genderId -= 1; //index

        for(uint256 i=0; i<strs.length; i++) {
            require(_givenIndices[_gender][strs[i]] > 0, "given not exist");

            _givens[genderId][_givenIndices[_gender][strs[i]] - 1] = _givens[genderId][_givens[genderId].length - 1];
            _givens[genderId].pop();
            delete _givenIndices[_gender][strs[i]];
        }
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return 227; }

    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) external virtual override view returns (string memory, uint256 _endY) {
        _endY = _startY;
        return ("", _endY);
    }

    function tokenJSON(uint256 /*_actor*/) external virtual override view returns (string memory) {
        return "{}";
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
}
