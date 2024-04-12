// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Proxy {
    // Global Variables
    address public immutable delegator;
    address payable[] public delegated;
    address payable[] public allowed_rx;

    // Mappings
    mapping(address => uint256) public permittedAmount;
    mapping(address => bool) public rxAllowed;
    mapping(address => bool) public isDelegated;

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

    modifier OnlyDelegated() {
        require(
            isDelegated[msg.sender],
            "This account is not delegated - permission denied."
        );
        _;
    }

    // Constructor
    constructor(
        address payable _delegator,
        address payable[] memory _delegated,
        address payable[] memory _allowed_rx,
        uint256[] memory _amountRx
    ) {
        delegator = _delegator; // Beware: Msg.sender is the contract, not the owner.
        delegated = _delegated;
        allowed_rx = _allowed_rx;
        for (uint256 i = 0; i < _amountRx.length; i++) {
            permittedAmount[_allowed_rx[i]] = _amountRx[i];
            rxAllowed[_allowed_rx[i]] = true;
        }
        for (uint256 j = 0; j < _delegated.length; j++) {
            isDelegated[_delegated[j]] = true;
        }
        // The owner is not allowed to receive it back from the delegate, but is allowed to withdraw at any time.
        // After all, if he could not, we would burn cash.
    }

    // Functions

    function transferToPermitted(
        address payable _rx,
        uint256 _amount
    )
        public
        payable
        OnlyDelegated
        AllowedRx(_rx)
        AmountPermitted(_amount, _rx)
        returns (bool success)
    {
        // At every transaction, to a specific address, the limited budget decreases. It will require more
        // cash from the owner and a further permission to use it later.
        (success, ) = _rx.call{value: _amount}("");
        require(success, "Transfer failed");
        permittedAmount[_rx] -= _amount;
        return success;
    }

    fallback() external payable virtual {}

    receive() external payable virtual {}
}
