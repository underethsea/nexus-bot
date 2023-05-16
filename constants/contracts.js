const ethers = require("ethers");
const { ABI } = require("./abi.js");
const { ADDRESS } = require("./address.js");
const { PROVIDERS } = require("./providers.js");

const CONTRACTS = {
  POOL: 
   new ethers.Contract(
      ADDRESS.POOL,
      ABI.POOL,
      PROVIDERS.ETHEREUM
    ),
    MEMBERROLES:
    new ethers.Contract(
        ADDRESS.MEMBERROLES,
        ABI.MEMBERROLES,
        PROVIDERS.ETHEREUM
      ),
      ENZYMEVALUECALCULATOR: 
      new ethers.Contract(
        ADDRESS.ENZYMEVALUECALCULATOR,
        ABI.ENZYMEVALUECALCULATOR,
        PROVIDERS.ETHEREUM
      ),COVERVIEWER: 
      new ethers.Contract(
        ADDRESS.COVERVIEWER,
        ABI.COVERVIEWER,
        PROVIDERS.ETHEREUM
      ),

   }

   module.exports = { CONTRACTS };
