const { network, ethers } = require("hardhat"); // BEWARE THE CURLY --> GRABS ONLY AN OBJECT FROM THE PACKAGE CALLED NETWORK.

const { getNamedAccounts } = require("hardhat"); // Always import it for getting names

module.exports = async ({ getNamedAccounts, deployments }) => {
  // Getting the deployment data from deployments
  const { deploy, log } = deployments;
  // Getting accounts named to deployed
  const { deployer } = await getNamedAccounts();
  // Getting the chain id
  const chainId = network.config.chainId;

  // Deploying the contract without the address in mind (modularized)
  const arguments = [];
  const fundMe = await deploy("Main", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
};
