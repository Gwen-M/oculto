const hre = require("hardhat");
const fs = require("fs");

async function main() {

  // Contract deployment
  const directory = "../frontend/src/artifacts/";
  const SwapAndTransfer = await hre.ethers.getContractFactory("SwapAndTransfer");
  const swapAndTransfer = await SwapAndTransfer.deploy();
  await swapAndTransfer.deployed();

  console.log(
    `SwapAndTransfer deployed to ${swapAndTransfer.address}`
  );

  fs.writeFileSync(
    "../frontend/src/artifacts/SwapAndTransfer_address.json",
    JSON.stringify({ address: swapAndTransfer.address }, undefined, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
