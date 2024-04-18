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
let fundDelegateButton = document.getElementById("fundDelegateButton");
let inputFundDelAddress = document.getElementById("inputFundDelAddress");
let launchAppParagraph = document.getElementById("launch-app-paragraph");
let launchAppContainerDiv = document.getElementById("launch-app-container-div");

inputDelegateButton.onclick = createDelegation;
fundDelegateButton.onclick = fundDelegateContract;

// ---------- Web 3 Integration Functions ------------ //

async function createDelegation() {
  const delegateAddress = inputDelegate.value;
  const rxAddress = inputRx.value;
  const rxAmount = ethers.utils.parseEther(inputRxAmount.value);
  if (typeof window.ethereum != "undefined") {
    console.log("There is a wallet connected, proceed.");
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const wallet = await signer.getAddress();
    console.log("Heeeeere");
    console.log(wallet);
    console.log("Heeeeere");

    // Let's get the contract from the components.
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Listen for the response of the transaction
    try {
      console.log("entrou");
      const txResponse = await contract.delegate(
        [delegateAddress],
        [rxAddress],
        [rxAmount]
      );
      console.log(txResponse);
    } catch (e) {
      console.log(e);
    }

    console.log("yoooooo");
    try {
      const delAddress = await contract.getLastDelegateContract(wallet);
      console.log(delAddress);
      changeDelegateDiv(delAddress);
    } catch (e) {
      console.log(e);
    }
  }
}

async function fundDelegateContract() {
  const ethAmount = inputFundDelegateContract.value;
  const rxAddress = inputFundDelAddress.value;
  if (typeof window.ethereum != "undefined") {
    console.log("There is a wallet connected, proceed.");
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const wallet = await signer.getAddress();

    // Let's get the contract from the components.
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const txResponse = await contract.fundContract(rxAddress, {
        value: ethers.utils.parseEther(ethAmount),
      });
      console.log("Transfer done.");
    } catch (e) {
      console.log(e);
    }
  }
}

async function retrieveData() {}

// ---------------- Web2 Functions -------------- //

function changeDelegateDiv(contractAddress) {
  let delegateDivContent = document.getElementById("delegateDiv");

  delegateDivContent.innerHTML =
    "<div><div><p class='bold'>You successfully created a Proxy Pay Contract! </p><p class='smaller-text'>" +
    contractAddress +
    "</p></div></div>";
}
