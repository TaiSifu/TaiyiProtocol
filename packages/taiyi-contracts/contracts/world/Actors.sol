// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
import {toWadUnsafe, toDaysWadUnsafe} from "solmate/src/utils/SignedWadMath.sol";
import "../interfaces/WorldInterfaces.sol";
import "../base/ERC721Enumerable.sol";
import "../libs/Base64.sol";
import "../WorldConfigurable.sol";
import {LogisticVRGDA} from "../external/VRGDAs/LogisticVRGDA.sol";
//import "hardhat/console.sol";

contract Actors is IActors, ERC721Enumerable, LogisticVRGDA, WorldConfigurable {
    using EnumerableSet for EnumerableSet.AddressSet;

    /* *******
     * Globals
     * *******
     */
    
    /// @notice The address of the Daoli ERC20 token contract.
    address public immutable coin;

    // The Taiyi DAO address (creators org)
    address public taiyiDAO;

    /*//////////////////////////////////////////////////////////////
                            SUPPLY CONSTANTS
    //////////////////////////////////////////////////////////////*/

    /// @notice Maximum amount of actors that can be minted via VRGDA.
    // prettier-ignore
    uint256 public constant MAX_MINTABLE = 1000000000;

    /*//////////////////////////////////////////////////////////////
                            VRGDA INPUT STATE
    //////////////////////////////////////////////////////////////*/

    /// @notice Timestamp for the start of minting.
    uint256 public immutable mintStart;

    /*
     * Each actor has its own contract address deployed
     * This enables the NFT to actually own the resources and tokens
    */
    mapping (uint256 => address) internal _actorHolders;
    mapping (address => uint256) internal _holderActors;

    uint256 public override nextActor = 1; //0 is invalid

    mapping(uint256 => uint256) public mintTime;
    mapping(uint256 => uint256) public status;    //0=nonexist，1=dead（but exist），2=live active

    string[] private _statusLabels = [
        "\xE4\xB8\x8D\xE5\xAD\x98\xE5\x9C\xA8", //不存在 "Not Exist",
        "\xE6\xAD\xBB\xE4\xBA\xA1", //死亡 "Dead",
        "\xE6\xB4\xBB\xE7\x9D\x80" //活着 "Active"
    ];

    EnumerableSet.AddressSet internal _uriPartModules;

    mapping(uint256 => address) public renderModules;  //mode => module address
    mapping(uint256 => uint256) public actorRenderModes; //0 means default
    
    //compatible with opensea
    string private _contractURI;

    /* *********
     * Modifiers
     * *********
     */

    modifier onlyDeath(uint256 _actor) {
        require(status[_actor] == 1, "not death actor");
        _;
    }

    modifier onlyExist(uint256 _actor) {
        require(status[_actor] != 0, "not exist actor");
        _;
    }

    modifier onlyValidAddress(address _address) {
        require(_address != address(0), "cannot set zero address");
        _;
    }

    modifier onlyPanGu() {
        require(_isActorApprovedOrOwner(WorldConstants.ACTOR_PANGU), "only PanGu");
        _;
    }

    /**
     * @notice Require that the sender is the Taiyi DAO.
     */
    modifier onlyTaiyiDAO() {
        require(msg.sender == taiyiDAO, 'Sender is not the Taiyi DAO');
        _;
    }

    /* ****************
     * Public Functions
     * ****************
     */

    /// @param _mintStart Timestamp for the start of the VRGDA mint.
    /// @param _coin Address of the Coin(Daoli) ERC20 contract.
    constructor(
        address _taiyiDAO,
        uint256 _mintStart,
        address _coin,
        address _worldRouteAddress
    ) 
        WorldConfigurable(_worldRouteAddress) 
        ERC721("Taiyi Actor Manifested", "TYACTOR") 
        LogisticVRGDA(
            10.0e18, // Target price.
            0.31e18, // Price decay percent.
            // Max actors mintable via VRGDA.
            toWadUnsafe(MAX_MINTABLE),
            0.0005867e18 // Time scale.
        )
    {
        require(_taiyiDAO != address(0), "taiyiDao address can not be set zero.");
        taiyiDAO = _taiyiDAO;
        mintStart = _mintStart;
        coin = _coin;
    }

    /* *****************
     * Internal Functions
     * *****************
     */

    function _tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) internal view returns (string memory, uint256 _endY) {
        _endY = _startY;
        string[7] memory parts;
        //Mint time: 
        parts[0] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">','\xE9\x93\xB8\xE9\x80\xA0\xE6\x97\xB6\xE9\x97\xB4\xEF\xBC\x9A', Strings.toString(mintTime[_actor]), '</text>'));
        _endY += _lineHeight;
        //Status:
        parts[1] = string(abi.encodePacked('<text x="10" y="', Strings.toString(_endY), '" class="base">', '\xE7\x8A\xB6\xE6\x80\x81\xEF\xBC\x9A', _statusLabels[status[_actor]], '</text>'));
        return (string(abi.encodePacked(parts[0], parts[1])), _endY);
    }

    function _tokenJSON(uint256 _actor) internal view returns (string memory) {
        string[7] memory parts;
        parts[0] = string(abi.encodePacked('{', '"mintTime": ', Strings.toString(mintTime[_actor])));
        parts[1] = string(abi.encodePacked(', "status": ', Strings.toString(status[_actor]), '}'));
        return string(abi.encodePacked(parts[0], parts[1]));
    }

    /* ****************
     * External Functions
     * ****************
     */

    function moduleID() external override pure returns (uint256) { return WorldConstants.WORLD_MODULE_ACTORS; }

    function changeContractURI(string memory _uri) external
        onlyOwner
    {
        _contractURI = _uri;
    }

    /// @notice Mint a actor, paying with Taiyi Coin.
    /// @param maxPrice Maximum price to pay to mint the actor.
    /// @return actorId The id of the actor that was minted.
    function mintActor(uint256 maxPrice) external override returns(uint256 actorId)
    {
        //console.log("mint log");
        if(nextActor > 2) { //PanGu and YeMing are free
            // No need to check if we're at MAX_MINTABLE,
            // actorPrice() will revert once we reach it due to its
            // logistic nature. It will also revert prior to the mint start.
            uint256 currentPrice = actorPrice();

            // If the current price is above the user's specified max, revert.
            require(currentPrice <= maxPrice, "current actor price exceeded max");

            // Decrement the sender's coin ERC20 balance by the current price.
            // transfer them to fund receiver
            IERC20(coin).transferFrom(msg.sender, taiyiDAO, currentPrice);

            unchecked {
                emit ActorPurchased(msg.sender, nextActor, currentPrice);
            }
        }

        _safeMint(address(0), msg.sender, nextActor);
        mintTime[nextActor] = block.timestamp;
        status[nextActor] = 2;
        actorRenderModes[nextActor] = 0;

        // Create identifiable actor holder contract
        ActorHolder holder = new ActorHolder(_worldRouteContract, nextActor);
        _actorHolders[nextActor] = address(holder);
        _holderActors[address(holder)] = nextActor;

        emit ActorMinted(msg.sender, nextActor, mintTime[nextActor]);
        actorId = nextActor;
        nextActor++;
    }

    function registerURIPartModule(address _moduleAddress) external
        onlyPanGu()
        onlyValidAddress(_moduleAddress)
    {
        bool rt = _uriPartModules.add(_moduleAddress);
        require(rt == true, "module with same address is exist.");
    }

    function changeURIPartModule(address _oldAddress, address _newAddress) external
        onlyPanGu()
        onlyValidAddress(_oldAddress)
    {
        _uriPartModules.remove(_oldAddress);
        if(_newAddress != address(0))
            _uriPartModules.add(_newAddress);
    }

    function setRenderModule(uint256 _mode, address _address) external
        onlyPanGu()
        onlyValidAddress(_address)
    {
        require(_mode > 0, "render mode id invalid");
        require(IWorldModule(_address).moduleID() > 0, "address is not a render module");
        renderModules[_mode] = _address;
    }

    function changeActorRenderMode(uint256 _actor, uint256 _mode) external override
        onlyExist(_actor)
    {
        require(_isApprovedOrOwner(msg.sender, _actor), "not approved or owner");
        require(_mode==0 || renderModules[_mode] != address(0), "render mode invalid");
        actorRenderModes[_actor] = _mode;
    }

    /**
     * @notice Set the Taiyi DAO.
     * @dev Only callable by the Taiyi DAO when not locked.
     */
    function setTaiyiDAO(address _taiyiDAO) external override onlyTaiyiDAO {
        taiyiDAO = _taiyiDAO;
 
        emit TaiyiDAOUpdated(_taiyiDAO);
    }

    /* **************
     * View Functions
     * **************
     */

    //https://docs.opensea.io/docs/contract-level-metadata
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function actor(uint256 _actor) external override view returns (uint256 _mintTime, uint256 _status) 
    {
        _mintTime = mintTime[_actor];
        _status = status[_actor];
    }

    function tokenSVG(uint256 _actor, uint256 _startY, uint256 _lineHeight) external override view returns (string memory, uint256 _endY) {
        return _tokenSVG(_actor, _startY, _lineHeight);
    }

    function tokenJSON(uint256 _actor) external override view returns (string memory) {
        return _tokenJSON(_actor);
    }

    function tokenURI(uint256 _actor) public override view returns (string memory) {
        uint256 _renderMode = actorRenderModes[_actor];
        return tokenURIByMode(_actor, _renderMode);
    }

    function tokenURIByMode(uint256 _actor, uint256 _renderMode) public view returns (string memory) {
        //console.log("view log: _actor=%s, ", _actor);
        string[7] memory parts;
        //start svg
        string memory svg;
        if(_renderMode == 0) {
            parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 480 480"><style>.base { fill: white; font-family: serif; font-size: 10px; }</style><style>.base_nocolor { font-family: serif; font-size: 10px; }</style><rect width="100%" height="100%" fill="black" />';
            parts[1] = _tokenURISVGPart(_actor, 0, 12);
            //end svg
            svg = string(abi.encodePacked(parts[0], parts[1], '</svg>'));
        }
        else {
            uint256 endY = 0;
            (svg, endY) = IWorldModule(renderModules[_renderMode]).tokenSVG(_actor, endY, 12);
        }

        //start json
        string memory json = string(abi.encodePacked('{"name": "Taiyi Actor #', Strings.toString(_actor), '"'));
        json = string(abi.encodePacked(json, ', "description": "This is not a game."'));
        json = string(abi.encodePacked(json, ', "data": {'));
        json = string(abi.encodePacked(json, _tokenURIJSONPart(_actor)));
        json = string(abi.encodePacked(json, '}'));
        //end json with svg
        string memory uri = Base64.encode(bytes(string(abi.encodePacked(json, ', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'))));

        //final output
        return string(abi.encodePacked('data:application/json;base64,', uri));
    }

    /**
     * Load an actor, the owner and its identifiable address (account) on the blockchain
     */
    function getActor(uint256 _actor) public override view returns (Actor memory) {
        require(_actor > 0, "invalid actor");
        address owner = ownerOf(_actor);
        address account = _actorHolders[_actor];
        require(account != address(0), "need init actor account");

        return Actor({
            account: account,
            owner: owner,
            actorId: _actor
        });
    }

    function getActorByHolder(address _holder) public override view returns (Actor memory) {        
        require(_holder != address(0), "actor query holder is invalid");
        uint256 actorId = _holderActors[_holder];
        require(actorId > 0, "actor holder is not exist");
        address owner = ownerOf(actorId);

        return Actor({
            account: _holder,
            owner: owner,
            actorId: actorId
        });
    }

    /**
     * Get multiple actors for a single owner
     */
    function getActorsByOwner(address _owner) public override view returns (Actor[] memory) {
        uint256 balance = balanceOf(_owner);

        Actor[] memory accountActors = new Actor[](balance);
        for (uint256 i = 0; i < balance; i++) {
            uint256 actorId = tokenOfOwnerByIndex(_owner, i);
            accountActors[i] = Actor({
                actorId: actorId,
                account: _actorHolders[actorId],
                owner: _owner
            });
        }

        return accountActors;
    }

    /// @notice Actor pricing in terms of coin.
    /// @dev Will revert if called before minting starts
    /// or after all actors have been minted via VRGDA.
    /// @return Current price of a actor in terms of coin.
    function actorPrice() public view returns (uint256) {
        // We need checked math here to cause underflow
        // before minting has begun, preventing mints.
        uint256 timeSinceStart = block.timestamp - mintStart;

        return getVRGDAPrice(toDaysWadUnsafe(timeSinceStart), nextActor-1);
    }

    /* ****************
     * Private Functions
     * ****************
     */

    function _tokenURISVGPart(uint256 _actor, uint256 _startY, uint256 _lineHeight) private view returns (string memory) {
        string memory parts;
        uint256 endY = _startY;
        (parts, endY) = _tokenSVG(_actor, endY + _lineHeight, _lineHeight);

        //modules
        string memory moduleSVG;
        for(uint256 i=0; i<_uriPartModules.length(); i++) {
            (moduleSVG, endY) = IWorldModule(_uriPartModules.at(i)).tokenSVG(_actor, endY + _lineHeight, _lineHeight);
            parts = string(abi.encodePacked(parts, moduleSVG));
        }
        return parts;
    }

    function _tokenURIJSONPart(uint256 _actor) private view returns (string memory) {
        string memory json;
        json = string(abi.encodePacked(json, '"base": ', _tokenJSON(_actor)));
        //modules
        for(uint256 i=0; i<_uriPartModules.length(); i++) {
            IWorldModule mod = IWorldModule(_uriPartModules.at(i));
            json = string(abi.encodePacked(json, ', "m_', Strings.toString(mod.moduleID()),'": ', mod.tokenJSON(_actor)));
        }
        return json;
    }
}
///////////////////////////////////////////////////////////////////////////
contract ActorHolder is WorldConfigurable, ERC165, IERC721Receiver {
    IActors private actors;
    uint256 private actor;

    constructor(address _worldRouteAddress, uint256 _actor) WorldConfigurable(_worldRouteAddress) {
        actors = worldRoute.actors();
        actor = _actor;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC721Receiver).interfaceId || super.supportsInterface(interfaceId);
    }

    // Fallback function to help someone accidentally sending eth to this contract
    function withdraw() public {
        require(actors.ownerOf(actor) == msg.sender, "You are not the owner");
        payable(msg.sender).transfer(address(this).balance);
    }
}

