
const dotenv = require("dotenv");
dotenv.config();
const pgp = require("pg-promise")(/* initialization options */);
const { GetNftsHeld } = require("./getNftsHeld")
// dbdonkey ------------------------------------------->>>>>>>>>>> DM COVER ALERTS


const cn = {
    host: "localhost", // server name or IP address;
    port: 5432,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  };
  const db = pgp(cn);
  
  async function getUser(discord) {
  
    let queryUser =
      "SELECT id,eth_address,discord_id FROM alerts WHERE discord_id='" + discord + "';";
    try {
      let user = await db.any(queryUser);
      return user;
    } catch (error) {
      return {};
    }
  }
  async function RemoveWallet(discord, wallet) {
    try {
      let queryAddWallet =
        "DELETE FROM alerts WHERE discord_id='" +
        discord +
        "' AND eth_address='" +
        wallet +
        "';";
      //   console.log("deleting: ",queryAddWallet)
      let addWallet = await db.any(queryAddWallet);
      return "Wallet `" + wallet + "` deleted!";
    } catch (error) {
      console.log(error);
      return "Could not remove wallet friend, sorry!";
    }
  }
  
 async function AddWallet(discord, wallet,label) {
    try {
      let user = await getUser(discord);
      if (user.length > 5 && discord != '348242214968754178' && discord != '662117180158246926') {
        return "You have hit the maximum of 5 wallets tracking";
      }

let checkForWalletUrl = "SELECT * FROM alerts where discord_id='" + discord + "'  and address='" + wallet + "';"
console.log(checkForWalletUrl)
let checkForWallet = []
try{
checkForWallet = await db.any(checkForWalletUrl)
if(checkForWallet.length > 0){return "Wallet already in your !list";}

}catch(error){checkForWallet = []}
console.log(checkForWallet)

let walletLabel = ""
if ( label ) {walletLabel=label}

// add checking for if they have coverage?
let nftsHeld = await GetNftsHeld(wallet)
console.log("nfts held",nftsHeld)
console.log("nfts held length",nftsHeld.length) 
    if (nftsHeld.length > 0) {
        let queryAddWallet =
          "INSERT INTO alerts(discord_id,eth_address,label) values('" +
          discord +
          "','" +
          wallet +
          "','" + label + "');";
        //   console.log("adding: ",queryAddWallet)
        let addWallet = await db.any(queryAddWallet);
        if(walletLabel !== "") {walletLabel = "`"+walletLabel+"`"}
        return "Wallet `" + wallet + "` added! " + walletLabel;
      } else { return "No coverage found for address `" + wallet + "`" }
    } catch (error) {
      console.log(error);
      return "Could not add wallet friend, sorry";
    }
  }
  async function PlayerWallets(discord) {
    try {
      let playerWalletsQuery =
        "SELECT discord_id,eth_address,label from alerts WHERE discord_id ='" + discord + "';";
      let playerWalletsReturn = await db.any(playerWalletsQuery);
      //   console.log(playerWalletsReturn)
      let count = 1;
      let walletsString = "";
      playerWalletsReturn.forEach((x) => {
        walletsString += count + ":   `" + x.eth_address + "`"
      x.label !== null && x.label !== "" ? walletsString += " `" + x.label + "`" : ""
     walletsString += "\n";
        count += 1;
      });
      if (walletsString === "") {
        return "Could not find any wallets. try `!add <wallet address>`";
      } else {
        return walletsString;
      }
    } catch (error) {
      console.log(error);
      return "Could not find any wallets. try `!add <wallet address>`";
    }
  }
module.exports.PlayerWallets = PlayerWallets
module.exports.AddWallet = AddWallet
module.exports.RemoveWallet = RemoveWallet
