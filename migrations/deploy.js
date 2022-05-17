async function main() {
  // We get the contract to deploy
  const MintShaderToken = await ethers.getContractFactory("MintShaderToken");
  const mintShaderToken = await MintShaderToken.deploy("Hello, Hardhat!");

  await mintShaderToken.deployed();

  console.log("MintShaderToken deployed to:", mintShaderToken.address);

  const TradeShaderToken = await ethers.getContractFactory("TradeShaderToken");
  const tradeShaderToken = await TradeShaderToken.deploy("Hello, Hardhat!");

  await tradeShaderToken.deployed();

  console.log("TradeShaderToken deployed to:", tradeShaderToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
