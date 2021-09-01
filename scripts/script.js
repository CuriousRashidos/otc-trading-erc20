// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const OTCOptions = await hre.ethers.getContractFactory("OTCOptions");
  const ERC20CallOption = await hre.ethers.getContractFactory(
    "ERC20CallOption"
  );
  const ERC20PutOption = await hre.ethers.getContractFactory("ERC20PutOption");

  const otcOptions = await OTCOptions.deploy();
  const erc20CallOption = await ERC20CallOption.deploy();
  const erc20PutOption = await ERC20PutOption.deploy();

  await otcOptions.deployed();
  await erc20CallOption.deployed();
  await erc20PutOption.deployed();

  console.log("OTC Options trading deployed to:", otcOptions.address);
  console.log("ERC20 Call Option deployed to:", erc20CallOption.address);
  console.log("ERC20 Put Option deployed to:", erc20PutOption.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
