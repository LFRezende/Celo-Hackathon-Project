// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Proxy.sol";

contract Main {
    // Boss delegates to a subordinate an amount (to be transfered to new contract)

    // Mappings Main
    mapping(address => mapping(uint256 => address)) public ownerToContract;
    mapping(address => uint256) public amountOfContracts;
    mapping(address => address) public ownerOfContract; // Gets the owner of the contract
    //mapping(address => uint256) public amountFundedByOwner;

    // Events
    event delegationConfirmed(
        address indexed owner,
        address payable[] indexed delegated,
        address payable[] indexed receivers
    );

    // Modifiers:
    modifier onlyOwner(address payable _rxContract) {
        require(
            ownerOfContract[_rxContract] == msg.sender,
            "Only owner can call this function"
        );
        _;
    }

    /*  modifier hasDepositedEnough(uint256 _fundAmount) {
        require(
            amountFundedByOwner[msg.sender] >= _fundAmount,
            "Not enough funds for this. Deposit some more."
        );
        _;
    }*/

    function delegate(
        address payable[] calldata _delegate,
        address payable[] calldata _allowedRx,
        uint256[] calldata _amountRx
    ) public {
        Proxy proxy_contract = new Proxy(
            payable(msg.sender),
            _delegate,
            _allowedRx,
            _amountRx
        ); // New contract
        address payable proxy_address = payable(address(proxy_contract));

        ownerToContract[msg.sender][
            amountOfContracts[msg.sender]
        ] = proxy_address;
        amountOfContracts[msg.sender] += 1;
        ownerOfContract[proxy_address] = msg.sender;
        //(success, ) = proxy_address.call{value: msg.value}("");
        emit delegationConfirmed(msg.sender, _delegate, _allowedRx);
    }

    function fundContract(
        address payable _rxContract
    ) public payable onlyOwner(_rxContract) returns (bool success) {
        (success, ) = _rxContract.call{value: msg.value}("");
        require(success, "Transaction Failed");
        return success;
    }
}
