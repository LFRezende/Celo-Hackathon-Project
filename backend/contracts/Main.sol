// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Proxy.sol";

contract Main {
    // Boss delegates to a subordinate an amount (to be transfered to new contract)

    // Mappings Main
    mapping(address => mapping(uint256 => address)) public ownerToContract;
    mapping(address => uint256) public amountOfContracts;
    mapping(address => address) public ownerOfContract; // Gets the owner of the contract
    mapping(address => bool) public addressDelegated;
    mapping(address => bool) public addressReceived;

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

    modifier alreadyDelegated(address payable _delegated) {
        require(
            !addressDelegated[_delegated],
            "Address already delegated - no re-ups."
        );
        _;
    }

    modifier alreadyReceived(address payable _rx) {
        require(
            !addressReceived[_rx],
            "Address of receiver has already been appended - no re-ups."
        );
        _;
    }

    function delegate(
        address payable[] calldata _delegate,
        address payable[] calldata _allowedRx,
        uint256[] calldata _amountRx
    ) public returns (address payable) {
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
        for (uint256 j = 0; j < _delegate.length; j++) {
            addressDelegated[_delegate[j]] = true;
        }
        for (uint256 k = 0; k < _allowedRx.length; k++) {
            addressReceived[_allowedRx[k]] = true;
        }

        emit delegationConfirmed(msg.sender, _delegate, _allowedRx);
        return proxy_address;
    }

    function fundContract(
        address payable _rxContract
    ) public payable onlyOwner(_rxContract) returns (bool success) {
        (success, ) = _rxContract.call{value: msg.value}("");
        require(success, "Transaction Failed my son");
        return success;
    }

    function addDelegated(
        address payable _newDelegate,
        address payable _contractAddress
    ) public onlyOwner(_contractAddress) alreadyDelegated(_newDelegate) {
        Proxy proxy = Proxy(_contractAddress);
        proxy.insertDelegated(_newDelegate);
        addressDelegated[_newDelegate] = true;
    }

    function addReceiver(
        address payable _rx,
        address payable _contractAddress
    ) public onlyOwner(_contractAddress) alreadyReceived(_rx) {
        Proxy proxy = Proxy(_contractAddress);
        proxy.insertReceiver(_rx);
        addressReceived[_rx] = true;
    }

    function deleteReceiver(
        address payable _rx,
        address payable _contractAddress
    ) public onlyOwner(_contractAddress) {
        require(
            addressReceived[_rx],
            "Can't delete receiver that has not been appended."
        );
        Proxy proxy = Proxy(_contractAddress);
        proxy.eraseReceiver(_rx);
        addressReceived[_rx] = false;
    }

    function deleteDelegate(
        address payable _delegate,
        address payable _contractAddress
    ) public onlyOwner(_contractAddress) {
        require(
            addressReceived[_delegate],
            "Can't delete receiver that has not been appended."
        );
        Proxy proxy = Proxy(_contractAddress);
        proxy.eraseDelegate(_delegate);
        addressDelegated[_delegate] = false;
    }

    function getLastDelegateContract(
        address payable owner
    ) public view returns (address) {
        require(ownerToContract[owner][0] != address(0), "Nope.");
        uint256 index;
        for (uint256 j = 0; ownerToContract[owner][j] != address(0); j++) {
            index = j;
        }
        return ownerToContract[owner][index];
    }

    fallback() external payable virtual {}

    receive() external payable virtual {}
}
