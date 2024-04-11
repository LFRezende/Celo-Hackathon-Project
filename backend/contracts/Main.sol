// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Proxy.sol";

contract Main {
    // Boss delegates to a subordinate an amount (to be transfered to new contract)

    // Mappings Main
    mapping(address => mapping(uint256 => address)) public ownerToContract;
    mapping(address => uint256) public amountOfContracts;

    // Events

    event delegationConfirmed(
        address indexed owner,
        address payable[] indexed delegated,
        address payable[] indexed receivers
    );

    function delegate(
        address payable[] calldata _delegate,
        address payable[] calldata _allowedRx,
        uint256[] calldata _amountRx
    ) public payable returns (bool success) {
        Proxy proxy_contract = new Proxy(_delegate, _allowedRx, _amountRx); // New contract
        address payable proxy_address = payable(address(proxy_contract));

        ownerToContract[msg.sender][
            amountOfContracts[msg.sender]
        ] = proxy_address;
        amountOfContracts[msg.sender] += 1;

        (success, ) = proxy_address.call{value: msg.value}("");
        emit delegationConfirmed(msg.sender, _delegate, _allowedRx);

        return success;
    }
}
