// SPDX0License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    // Global Variables
    address public immutable delegator;
    address payable[] public delegated;
    address payable[] public allowed_rx;

    // Mappings
    mapping(address => uint256) public permitedAmount;

    // Constructor
    constructor(
        address payable[] memory _delegated,
        address payable[] memory _allowed_rx,
        uint256[] memory _amountRx
    ) {
        delegator = msg.sender;
        delegated = _delegated;
        allowed_rx = _allowed_rx;
        for (uint256 i = 0; i < _amountRx.length; i++) {
            permitedAmount[_allowed_rx[i]] = _amountRx[i];
        }
    }

    // Functions

    function transferToPermitted() public payable returns (bool success) {}
}
