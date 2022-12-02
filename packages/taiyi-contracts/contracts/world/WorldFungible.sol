// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../interfaces/WorldInterfaces.sol";
import "../base/ERC20.sol";
import "./WorldConfigurable.sol";

contract WorldFungible is IWorldFungible, ERC20, WorldConfigurable {

    uint256 public override moduleID;

    constructor(string memory _name, string memory _symbol, uint256 _moduleID, address _worldRouteAddress) ERC20(_name, _symbol) WorldConfigurable(_worldRouteAddress) {
        moduleID = _moduleID;
    }

    /* ****************
     * Public Functions
     * ****************
     */

    function claim(uint256 _operator, uint256 _actor, uint256 _amount) public virtual override
        onlyYeMing(_operator)
    {
        require(_amount > 0, "amount must not be zero");
        _mint(worldRoute.actors().getActor(_actor).account, _amount);
        emit FungibleTransfer(0, _actor, _amount);
    }

    function approveActor(uint256 _from, uint256 _spender, uint256 _amount) public virtual override
        onlyApprovedOrOwner(_from)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        address _spenderAccount = worldRoute.actors().getActor(_spender).account;
        _approve(_fromAccount, _spenderAccount, _amount);
        emit FungibleApproval(_from, _spender, _amount);
    }

    function transferActor(uint256 _from, uint256 _to, uint256 _amount) public virtual override
        onlyApprovedOrOwner(_from)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        address _toAccount = worldRoute.actors().getActor(_to).account;
        _transfer(_fromAccount, _toAccount, _amount);
        emit FungibleTransfer(_from, _to, _amount);
    }

    function transferFromActor(uint256 _executor, uint256 _from, uint256 _to, uint256 _amount) public virtual override
        onlyApprovedOrOwner(_executor)
    {
        address _fromAccount = worldRoute.actors().getActor(_from).account;
        address _toAccount = worldRoute.actors().getActor(_to).account;
        address _spenderAccount = worldRoute.actors().getActor(_executor).account;

        _transfer(_fromAccount, _toAccount, _amount);
        emit FungibleTransfer(_from, _to, _amount);

        uint256 _currentAllowance = _allowances[_fromAccount][_spenderAccount];        
        if (_spenderAccount != _fromAccount && _currentAllowance != type(uint).max) {
            require(_currentAllowance >= _amount, "transfer amount exceeds allowance");
            uint256 _newAllowance = _currentAllowance - _amount;
            unchecked {
                _approve(_fromAccount, _spenderAccount, _newAllowance);
            }
            emit FungibleApproval(_from, _executor, _newAllowance);
        }
    }

    function withdraw(uint256 _operator, uint256 _actor, uint256 _amount) public virtual override
        onlyYeMing(_operator)
        onlyApprovedOrOwner(_actor)
    {
        address _actorOwner = worldRoute.actors().getActor(_actor).owner;
        address _actorHolder = worldRoute.actors().getActor(_actor).account;

        _transfer(_actorHolder, _actorOwner, _amount);
        emit FungibleTransfer(_actor, 0, _amount); //actor #0 is not exist, so means withdraw and not burnt
    }

    /* **************
     * View Functions
     * **************
     */
    function balanceOfActor(uint256 _owner) external override view returns (uint) {
        return balanceOf(worldRoute.actors().getActor(_owner).account);
    }

    function allowanceActor(uint256 _owner, uint256 _spender) external override view returns (uint) {
        return allowance(worldRoute.actors().getActor(_owner).account, worldRoute.actors().getActor(_spender).account);
    }

    function tokenSVG(uint256 /*_actor*/, uint256 /*_startY*/, uint256 /*_lineHeight*/) public virtual override view returns (string memory, uint256 endY) {
        return ("", endY);
    }

    function tokenJSON(uint256 /*_actor*/) public virtual override view returns (string memory) {
        return "{}";
    }
}
