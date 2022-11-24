// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../../interfaces/WorldInterfaces.sol";
import '../../libs/WorldConstants.sol';

contract WorldRandom is IWorldRandom {
    string constant public index = "Base";
    string constant public class = "Random";

    function moduleID() external override pure returns (uint) { return WorldConstants.WORLD_MODULE_RANDOM; }

    function tokenSVG(uint256 /*_actor*/, uint /*_startY*/, uint /*_lineHeight*/) external virtual override view returns (string memory, uint _endY) {
        return ("", _endY);
    }

    function tokenJSON(uint256 /*_actor*/) external virtual override view returns (string memory) {
        return "{}";
    }

    function d100(uint _actor) external view returns (uint) {
        return _dn(_actor, 100);
    }

    function d20(uint _actor) external override view returns (uint) {
        return _dn(_actor, 20);
    }

    function d12(uint _actor) external view returns (uint) {
        return _dn(_actor, 12);
    }

    function d10(uint _actor) external view returns (uint) {
        return _dn(_actor, 10);
    }

    function d8(uint _actor) external view returns (uint) {
        return _dn(_actor, 8);
    }

    function d6(uint _actor) external view returns (uint) {
        return _dn(_actor, 6);
    }

    function d4(uint _actor) external view returns (uint) {
        return _dn(_actor, 4);
    }

    function dn(uint _actor, uint _number) external override view returns (uint) {
        return _dn(_actor, _number);
    }

    function _dn(uint _actor, uint _number) public view returns (uint) {
        return _seed(_actor) % _number;
    }

    function _random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function _seed(uint _actor) internal view returns (uint rand) {
        rand = _random(
            string(
                abi.encodePacked(
                    block.timestamp,
                    blockhash(block.number - 1),
                    _actor,
                    msg.sender
                )
            )
        );
    }
}
