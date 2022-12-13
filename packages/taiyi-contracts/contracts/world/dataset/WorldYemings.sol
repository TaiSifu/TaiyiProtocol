// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../../interfaces/WorldInterfaces.sol";
import "../../libs/WorldConstants.sol";

contract WorldYemings is IWorldYemings
{
    mapping(uint256 => address) public override YeMings; //Yeming actor id => Timeline    
    address public taiyiDAO; // The taisifus DAO address


    /* *********
     * Modifiers
     * *********
     */

    /**
     * @notice Require that the sender is the taiyi DAO.
     */
    modifier onlyTaiyiDAO() {
        require(msg.sender == taiyiDAO, 'Sender is not Taiyi DAO');
        _;
    }


    /* ****************
     * Public Functions
     * ****************
     */
    constructor(address _taiyiDAO) {
        taiyiDAO = _taiyiDAO;
    }

    /* ****************
     * External Functions
     * ****************
     */

    /**
     * @notice Set the Taiyi DAO.
     * @dev Only callable by the Taiyi DAO.
     */
    function setTaiyiDAO(address _taiyiDAO) external override onlyTaiyiDAO {
        taiyiDAO = _taiyiDAO;

        emit TaiyiDAOUpdated(_taiyiDAO);
    }

    //set address = 0 means disable this actor as yeming
    function setYeMing(uint256 _actor, address _timelineAddress) external 
        onlyTaiyiDAO
    {
        require(_actor != 0, "invalid actor.");
        YeMings[_actor] = _timelineAddress;
    }

    /* ****************
     * View Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_YEMINGS; }

    function tokenSVG(uint256 /*_actor*/, uint /*_startY*/, uint /*_lineHeight*/) external virtual override view returns (string memory, uint _endY) {
        return ("", _endY);
    }

    function tokenJSON(uint256 /*_actor*/) external virtual override view returns (string memory) {
        return "{}";
    }

    function isYeMing(uint256 _actor) override public view returns (bool) {
        return (_actor!=0 && YeMings[_actor] != address(0));
    }
}
