// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you’ll find the Hardhat
// Runtime Environment’s members available in the global scope.
const { upgrades } = require('hardhat');
const hre = require('hardhat');

async function main() {
 
  
  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace")
  const marketPlace = await upgrades.upgradeProxy("0x473F94773f52E8F4967EE7F91650a90cc85f03b7", MarketPlace)
  
  await marketPlace.deployed();
  console.log("Updated")

console.log("MarketPlace deployed to:", marketPlace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });







