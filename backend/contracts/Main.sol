// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Proxy.sol";

contract Main {
    // Boss delegates to a subordinate an amount (to be transfered to new contract)

    function delegate(
        address payable[] calldata _delegate,
        address payable[] calldata _allowedRx, uint256[] calldata _amountRx
    ) public payable returns (bool success) {
        Proxy proxy_contract = new Proxy(_delegate, _allowedRx, _amountRx); // New contract
    }
}
