const nftContractAddress = "0xcafeaCa76be547F14D0220482667B42D8E7Bc3eb";
const user = "0xf944069B489F1ebfF4C3C6a6014d58cBEf7C7009";
const dotenv = require("dotenv");
const { CONTRACTS } = require("./constants/contracts");
// const ethers = require("ethers");
dotenv.config();

async function getNftsHeld(address) {
  try {
    const link = `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_KEY}/getNFTs?owner=${user}&contractAddresses\[\]=${nftContractAddress}&withMetadata=true&pageSize=100`;
    const nftsFetch = await fetch(link);
    const nftsResult = await nftsFetch.json();
    const tokenIds = nftsResult.ownedNfts.map((nft) =>
      parseInt(nft.id.tokenId, 16)
    );
    console.log(nftsResult);
    console.log(tokenIds);
    await getCoverageForIds(tokenIds);
  } catch (error) {
    console.log(error);
  }
}

async function getCoverageForIds(ids) {
  const coverData = await CONTRACTS.COVERVIEWER.getCovers(ids);
  console.log(Number(coverData[0].productId));

  console.log(Number(coverData[0].segments[0].amount));

  console.log(Number(coverData[0].segments[0].start));
  console.log(Number(coverData[0].segments[0].period));
  console.log(Number(coverData[0].segments[0].gracePeriod));
}
getNftsHeld();
