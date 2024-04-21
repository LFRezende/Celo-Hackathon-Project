import { ethers } from "./ethers-5.7.esm.min.js";
import { contractAddress, abi, proxyAbi } from "./constants.js";
/** Test wallets */
/*
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
0x70997970C51812dc3A010C7d01b50e0d17dc79C8
0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
1000000000000000000
*/

// Input proxy address to find delegate contract information
let inputProxyAddress = document.getElementById("inputFindDelegateDelegate");
let retrieveButton = document.getElementById("retrieveDataDelegate");
let retrieveDataDivDelegate = document.getElementById(
  "retrieveDataDivDelegate"
);
retrieveButton.onclick = retrieveData;

// Proxy for Payment of next wallet
let inputProxyContractAddress = document.getElementById(
  "inputProxyContractAddress"
);
let inputAllowedRxAddress = document.getElementById("inputAllowedRxAddress");
let inputAmountToAllowedRx = document.getElementById("inputAmountToAllowedRx");
let transferToAllowedRxButton = document.getElementById(
  "transferToAllowedRxButton"
);
let txErrorDelegate = document.getElementById("txErrorDelegate");

transferToAllowedRxButton.onclick = transferToAllowedRx;

// ---------- Web 3 Integration Functions ------------ //

async function retrieveData() {
  // For this, we need the address of the contract, given solely by the input value.
  // Not only that but also the proxyAbi.

  if (typeof window.ethereum != "undefined") {
    console.log("Detected web3Provider -- do proceed.");
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const wallet = await signer.getAddress();
    const proxyAddress = inputProxyAddress.value;

    const MainContract = new ethers.Contract(contractAddress, abi, signer);
    const proxyContract = new ethers.Contract(proxyAddress, proxyAbi, signer);

    try {
      console.log("Entrou no try do retrieve :)");

      console.log(proxyAddress);
      const proxyData = await MainContract.getDelegateContractData(
        proxyAddress
      );
      returnRetrieveData(proxyData);
    } catch (e) {
      console.log("Entrou no catch do retrieve :(");
      console.log(e);
    }
  }
}

async function transferToAllowedRx() {
  const proxyAddress = inputProxyContractAddress.value;
  const allowedRxAddress = inputAllowedRxAddress.value;
  let amountToAllowedRx = inputAmountToAllowedRx.value;
  // Correction to Wei
  amountToAllowedRx = ethers.utils.parseEther(amountToAllowedRx);
  if (typeof window.ethereum != "undefined") {
    console.log("There is a provider - do proceed my son.");
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const wallet = await signer.getAddress();
    const proxyContract = new ethers.Contract(proxyAddress, proxyAbi, signer);
    console.log("showwwwww");
    try {
      const txResponse = await proxyContract.transferToPermitted(
        allowedRxAddress,
        amountToAllowedRx
      );
      console.log(
        `Transfer from ${wallet} to ${allowedRxAddress} of ${amountToAllowedRx} done.`
      );
      console.log(`Value of txResponse: ${txResponse}`);
      txErrorDelegate.innerHTML = "✅ Transaction Approved! ✅";
    } catch (e) {
      console.log(e);
      txErrorDelegate.innerHTML = "❌ Transaction Rejected ❌ ";
    }
  }
}

// ---------------- Web2 Functions -------------- //
function returnRetrieveData(proxy_Data) {
  let proxy_Balance;
  let proxy_Delegator;
  let proxy_Delegated;
  let proxy_AllowedRx;

  [proxy_Balance, proxy_Delegator, proxy_Delegated, proxy_AllowedRx] =
    proxy_Data;
  retrieveDataDivDelegate.innerHTML =
    "<div class='box center'><div><p class='bold'>Balance: <div>" +
    proxy_Balance +
    "</div></p></div><div><p class='bold way-smaller'>Owner:<div class = 'way-smaller'> " +
    proxy_Delegator +
    "</div></p></div><div><p class='bold way-smaller'>Delegated:<div class = 'way-smaller'>" +
    proxy_Delegated +
    "</div></p></div><div><p class='bold way-smaller'>Receiver(s):<div class = 'way-smaller'>" +
    proxy_AllowedRx +
    "</div></p></div></div>";
}
