const dotenv = require("dotenv");
dotenv.config();
const ethers = require("ethers");

const ethereumEndpoint =
  "https://eth-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY;

const PROVIDERS = {
  ETHEREUM: new ethers.providers.JsonRpcProvider(ethereumEndpoint),
};

module.exports = { PROVIDERS };
