// SPDX0License-Identifier: MIT

pragma solidity ^0.8.0;

contract Proxy {
    // Global Variables
    address public immutable delegator;
    address payable[] public delegated;
    address payable[] public allowed_rx;

    // Mappings
    mapping(address => uint256) public permittedAmount;
    mapping(address => bool) public rxAllowed;

    // Modifiers:

    modifier AllowedRx(address payable _wallet) {
        require(
            rxAllowed[_wallet],
            "Receiver is not allowed - talk to delegator. "
        );
        _;
    }

    modifier AmountPermitted(uint256 _amount, address payable _wallet) {
        require(
            _amount <= permittedAmount[_wallet],
            "Surpasses allowed bugdet"
        );
        _;
    }

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
            permittedAmount[_allowed_rx[i]] = _amountRx[i];
            rxAllowed[_allowed_rx[i]] = true;
        }
    }

    // Functions

    function transferToPermitted(
        address payable  _rx
    )
        public
        payable
        AllowedRx(_rx)
        AmountPermitted(msg.value, _rx)
        returns (bool success)
    {}
}
