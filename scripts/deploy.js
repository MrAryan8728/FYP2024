const hre = require("hardhat");

async function main() {
  // Deploy the contract (optional, if not already deployed)
  const CampaignFactory = await hre.ethers.deployContract("CampaignFactory");
  await CampaignFactory.waitForDeployment();

  console.log("Contract deployed to : " + CampaignFactory.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
