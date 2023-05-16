const dotenv = require("dotenv");
const ethers = require("ethers");
dotenv.config();
const fetch = require("cross-fetch");

const { ADDRESS } = require("./constants/address.js");
const { Discord } = require("discord.js");
const { CONTRACTS } = require("./constants/contracts");
const { PROVIDERS } = require("./constants/providers.js");
const { GeckoPrices } = require("./geckoPrices.js");

const NXMTotalSupply = 6760845.2062690002;
function numberWithCommas(x) {
  x = parseFloat(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function membersFromDune() {
  try {
    let members = await fetch(
      "https://api.dune.com/api/v1/query/1894921/results?api_key=" +
        process.env.DUNE_KEY
    );
    members = await members.json();
    return members.result.rows[0];
  } catch (e) {
    console.log(e);
  }
}
function getAssetInfo(assetType) {
  if (assetType === 1 || assetType.toLowerCase() === "dai") {
    return { id: 1, symbol: "DAI" };
  } else if (assetType === 0 || assetType.toLowerCase() === "eth") {
    return { id: 0, symbol: "ETH" };
  } else if (assetType === 255 || assetType.toLowerCase() === "nxm") {
    return { id: 255, symbol: "NXM" };
  } else {
    return null; // Return null if an invalid assetType is provided
  }
}

async function GetMembers() {
  const getMemberCount = await CONTRACTS.MEMBERROLES.numberOfMembers(2);
  const duneResult = await membersFromDune();
  return {
    contractMemberCt: getMemberCount,
    duneMemberCt: duneResult.running_member_count,
  };
  //   return "Contract - "+ getMemberCount+"/n Dune - "+duneResult.day + " " + numberWithCommas(duneResult.running_member_count);
}
async function findProductIdByName(name) {
  try {
    const productsFetch = await fetch(
      "https://api.nexusmutual.io/sdk/products/products.json"
    );
    const products = await productsFetch.json();
    let bestMatch = null;
    const searchWords = name.toLowerCase().split(" ");
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      // Check if the product name contains all the search words
      const productName = product.name.toLowerCase();
      if (searchWords.every((word) => productName.includes(word))) {
        // If there is an exact match, return the product ID immediately
        if (productName === name.toLowerCase()) {
          return { name: product.name, id: product.id };
        }
        // Otherwise, keep track of the best match so far
        if (bestMatch === null || productName.length < bestMatch.name.length) {
          bestMatch = product;
        }
      }
    }
    if (bestMatch !== null) {
      return { name: bestMatch.name, id: bestMatch.id };
    } else {
      return null;
    }
  } catch (error) {
    console.log("find product id by name error ", error);
    return null;
  }
}
async function GetCapacityForProduct(product) {
  let productId = 0;
  let idResult = {};
  try {
    idResult = await findProductIdByName(product);
    productId = idResult.id;
  } catch (error) {
    console.log(error);
    return null;
  }
  try {
    const capacityFetch = await fetch(
      "https://api.nexusmutual.io/v2/capacity/"
    );
    const capacity = await capacityFetch.json();
    const capacityForProduct = capacity.find(
      (product) => product.productId === productId
    );
    // console.log(capacityForProduct);
    capacityForProduct.name = idResult.name;

    return capacityForProduct;
  } catch (error) {
    console.log("find product id by name error ", error);
    return null;
  }
}

async function getBalances(token, holder) {
  const balanceABI = [
    "function balanceOf(address) public view returns (uint256)",
  ];

  const contract = new ethers.Contract(token, balanceABI, PROVIDERS.ETHEREUM);
  const balance = await contract.balanceOf(ADDRESS.POOL);
  //   console.log("bal", balance.toString());
  return balance.toString();
}

async function GetCapitalPoolTvl() {
  // call enzyme calculator to get price per share of vault (in eth terms)
  const value =
    await CONTRACTS.ENZYMEVALUECALCULATOR.callStatic.calcGrossShareValue(
      ADDRESS.ENZYMEVAULT
    );
  //   console.log(value);
  //   console.log("enzyme value ", parseInt(value[1]) / 1e18);
  const enzymeEthPerShare = value[1] / 1e18;

  // get prices for other tokens in vault
  const tokenPrices = [];
  const contractAddresses = ADDRESS.POOLTOKENS.map((token) => token.address);
  const prices = await GeckoPrices(contractAddresses);

  const tokenWithPrices = ADDRESS.POOLTOKENS.map((token, index) => {
    const price = prices[index];
    return { ...token, price };
  });

  // get eth balance of vault and add to pool list
  const ethBalance = await PROVIDERS.ETHEREUM.getBalance(ADDRESS.POOL);
  for (const token of tokenWithPrices) {
    const balance = await getBalances(token.address, ADDRESS.POOL);
    if (token.isEth) {
      token.balance = ethBalance.toString();
    } else {
      token.balance = balance.toString();
    }
  }

  // use eth price to find $ value of nxmty and update list
  const wethToken = tokenWithPrices.find((token) => token.symbol === "ETH");
  const nxmtyToken = tokenWithPrices.find((token) => token.symbol === "NXMTY");

  const ethPrice = wethToken.price;
  nxmtyToken.price = enzymeEthPerShare * ethPrice;
  const updatedTokens = tokenWithPrices.map((token) =>
    token.symbol === "NXMTY" ? nxmtyToken : token
  );
  //   console.log(updatedTokens);

  // get $ values of all holdings and update list
  const tokensWithValues = updatedTokens.map((token) => {
    return { ...token, value: token.price * (token.balance / 1e18) };
  });

  let totalAssets = 0;
  tokensWithValues.forEach((asset) => {
    totalAssets = totalAssets + asset.value;
  });

  return { assets: tokensWithValues, tvl: totalAssets };
}

async function GetPriceQuote(name, amount, period, coverAsset) {
  // async function GetPriceQuote(name, amount, period, coverAsset, paymentAsset) {
  let id = await findProductIdByName(name);

  // console.log(id)

  const quoteFetchURL = `https://api.nexusmutual.io/v2/quote?productId=${
    id.id
  }&amount=${
    amount.toString() + "000000000000000000"
  }&period=${period}&coverAsset=${
    getAssetInfo(coverAsset).id
  }&paymentAsset=255`;
  console.log(quoteFetchURL);
  const quoteFetch = await fetch(quoteFetchURL);
  const quote = await quoteFetch.json();

  console.log(
    id.name,
    " quote for ",
    amount,
    " ",
    getAssetInfo(coverAsset).symbol,
    " for ",
    period,
    " days "
  );
  console.log(quote);
  console.log("quote in nxm ", quote.quote.premiumInNXM);
  console.log("quote in prem asset ", quote.quote.premiumInAsset);
  return {
    nxm: quote.quote.premiumInNXM,
    premiumAsset: quote.quote.premiumInAsset,
    product: id.name,
  };
}

module.exports = {
  GetMembers,
  GetCapacityForProduct,
  GetCapitalPoolTvl,
  GetPriceQuote,
};
