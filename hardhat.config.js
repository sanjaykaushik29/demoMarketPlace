require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

require("@nomiclabs/hardhat-web3");
require("dotenv").config();

// task action function receives the Hardhat Runtime Environment as second argument
task("accounts", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());
});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  }


// networks: {
//   hardhat:{
//     forking:{
//       url :" https://eth-goerli.g.alchemy.com/v2/BuQ13s_SV0UFNJp8L0GJHTvyPrFxmxSz",
//       enabled: true
//     }
//   },
//   bscTestnet: {
//     url: "https://data-seed-prebsc-1-s1.binance.org:8545",
//     accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY1],
//   },
//   goerli: {
//       url: process.env.ALCHEMY_GOERLI_URL,
//       accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY1]
//     },
//   },
//   etherscan: {
//     apiKey: {
//       goerli: process.env.GORELI_API_KEY,
//       bscTestnet:process.env.BSCSCAN_API_KEY
//     }
//   }
};