// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../../interfaces/WorldInterfaces.sol";
import '../../libs/WorldConstants.sol';

contract WorldRandom is IWorldRandom {
    string constant public index = "Base";
    string constant public class = "Random";

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_RANDOM; }

    function tokenSVG(uint256 /*_actor*/, uint256 _startY, uint256 /*_lineHeight*/) external virtual override view returns (string memory, uint256 _endY) {
        _endY = _startY;
        return ("", _endY);
    }

    function tokenJSON(uint256 /*_actor*/) external virtual override view returns (string memory) {
        return "{}";
    }

    function d100(uint256 _actor) external view returns (uint256) {
        return _dn(_actor, 100);
    }

    function d20(uint256 _actor) external override view returns (uint256) {
        return _dn(_actor, 20);
    }

    function d12(uint256 _actor) external view returns (uint256) {
        return _dn(_actor, 12);
    }

    function d10(uint256 _actor) external view returns (uint256) {
        return _dn(_actor, 10);
    }

    function d8(uint256 _actor) external view returns (uint256) {
        return _dn(_actor, 8);
    }

    function d6(uint256 _actor) external view returns (uint256) {
        return _dn(_actor, 6);
    }

    function d4(uint256 _actor) external view returns (uint256) {
        return _dn(_actor, 4);
    }

    function dn(uint256 _actor, uint256 _number) external override view returns (uint256) {
        return _dn(_actor, _number);
    }

    function _dn(uint256 _actor, uint256 _number) public view returns (uint256) {
        return _seed(_actor) % _number;
    }

    function _random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function _seed(uint256 _actor) internal view returns (uint256 rand) {
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
