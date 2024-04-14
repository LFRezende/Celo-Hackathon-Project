// Remember: From every new alteration, the ABI changes as well as the Bytecode.
// For every new deployment or hardhat node shut down, the ADDRESS changes as well.
export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address payable[]",
        name: "delegated",
        type: "address[]",
      },
      {
        indexed: true,
        internalType: "address payable[]",
        name: "receivers",
        type: "address[]",
      },
    ],
    name: "delegationConfirmed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_newDelegate",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "addDelegated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_rx",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "addReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressDelegated",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressReceived",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "amountOfContracts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable[]",
        name: "_delegate",
        type: "address[]",
      },
      {
        internalType: "address payable[]",
        name: "_allowedRx",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amountRx",
        type: "uint256[]",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_delegate",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "deleteDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_rx",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_contractAddress",
        type: "address",
      },
    ],
    name: "deleteReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_rxContract",
        type: "address",
      },
    ],
    name: "fundContract",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ownerOfContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ownerToContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
