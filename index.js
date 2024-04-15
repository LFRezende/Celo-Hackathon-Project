import { ethers } from "./ethers-5.7.esm.min.js";
import { contractAddress, abi } from "./constants.js";
/** Test wallets */
/*
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
0x70997970C51812dc3A010C7d01b50e0d17dc79C8
0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
1000000000000000000
*/
let launchAppButton = document.getElementById("launch-app-button");
let inputDelegate = document.getElementById("inputDelegate");
let inputRx = document.getElementById("inputRx");
let inputRxAmount = document.getElementById("inputRxAmount");
let inputDelegateButton = document.getElementById("delegateButton");
let inputFundDelegateContract = document.getElementById("inputFundDelegate");

launchAppButton.onclick = connectWallet;
inputDelegateButton.onclick = createDelegation;
inputFundDelegateContract.onclick = fundDelegateContract;

async function connectWallet() {
  if (typeof window.ethereum != "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    launchAppButton.innerHTML = "Connected Wallet";
  }
}

async function createDelegation() {
  const delegateAddress = inputDelegate.value;
  const rxAddress = inputRx.value;
  const rxAmount = inputRxAmount.value;
  console.log(delegateAddress);
  if (typeof window.ethereum != "undefined") {
    console.log("There is a wallet connected, proceed.");
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    console.log([web3Provider, signer]);

    // Let's get the contract from the components.
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Listen for the response of the transaction
    try {
      const txResponse = await contract.delegate(
        [delegateAddress],
        [rxAddress],
        [rxAmount]
      );
    } catch (e) {
      console.log(e);
    }
  }
}

async function fundDelegateContract() {
  const ethAmount = inputFundDelegateContract.value;
  if (typeof window.ethereum != "undefined") {
    console.log("There is a wallet connected, proceed.");
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    console.log([web3Provider, signer]);

    // Let's get the contract from the components.
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const txResponse = await contract.fundContract({
        value: ethers.utils.parseEther(ethAmount),
      });
      console.log("Transfer done.");
    } catch (e) {
      console.log(e);
    }
  }
}
