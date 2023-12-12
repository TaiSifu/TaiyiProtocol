// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "../../interfaces/WorldInterfaces.sol";
import '../../libs/WorldConstants.sol';
import "../WorldConfigurable.sol";

contract ActorNameGenerator is IActorNameGenerator, WorldConfigurable {

    /* *********
     * Modifiers
     * *********
     */

    /* ****************
     * Public Functions
     * ****************
     */

    constructor(WorldContractRoute _route) WorldConfigurable(_route) {}

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
        IActorNameRegistry namereg = IActorNameRegistry(worldRoute.modules(227));
        require(gender <= namereg.genderCount(), "invalid gender");

        string[] memory _names = new string[](number*3); 

        uint256 _gender = gender>0?(gender-1):0;
        uint256 _ct = ct;
        string memory _family = family;
        string memory _middle = middle;
        string memory _given = given;

        for(uint256 i=0; i<number; i++) {
            if(gender == 0)
                _gender = _dn(1733+i+seed, namereg.genderCount());
            if(bytes(family).length == 0)
                _family = namereg.family(_dn(2287+i+seed, namereg.familyCount()));
            if(ct == 0)
                _ct = _dn(4253+i+seed, 2) + 1;

            if(_ct == 1) {
                _middle = "";
            }
            else {
                if(bytes(middle).length == 0)
                    _middle = namereg.middle(_dn(10151+i+seed, namereg.middleCount()));
            }

            if(bytes(given).length == 0)
                _given = namereg.given(_gender, _dn(13913+i+seed, namereg.givenCount(_gender)));

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
