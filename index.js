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

launchAppButton.onclick = connectWallet;

// ---------- Web 3 Integration Functions ------------ //
async function connectWallet() {
  if (typeof window.ethereum != "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    if (window.ethereum.isMiniPay) {
      console.log("MiniPayWallet detected.");
    }
    launchAppButton.innerHTML = "Connected Wallet";
    launchAppParagraph.innerHTML =
      "Congratulations! Now you can use the app as an Owner or as a Delegate.";
    launchAppContainerDiv.innerHTML =
      "<div class='box center'><a href='owner.html'> <div><button class='button'>Use as Owner</button> </a><a href='delegate.html'><button class='button'>Use as Delegate</button></a></div> </div>";
  }
}
