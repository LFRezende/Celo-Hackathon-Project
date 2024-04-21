require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

const CELO_RPC_URL = process.env.CELO_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    alfajores: {
      url: CELO_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 44787,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  customChains: [
    {
      network: "alfajores",
      chainId: 44787,
      urls: {
        apiURL:
          "https://explorer.celo.org/alfajores/api?module=contract&action=verifysourcecode&codeformat={solidity-standard-json-input}&contractaddress={contractaddress}&contractname={contractname}&compilerversion={compilerversion}&sourceCode={sourceCode}",
        browserURL: "https://explorer.celo.org/alfajores",
      },
    },
  ],
  sourcify: {
    enabled: true,
  },
};

/*?module=contract&action=verifysourcecode&codeformat={solidity-standard-json-input}&contractaddress={contractaddress}&contractname={contractname}&compilerversion={compilerversion}&sourceCode={sourceCode} */
