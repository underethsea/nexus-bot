const { DB } = require("./dbconnection");
const { GetNftsHeld } = require("./getNftsHeld");
const {
  EmbedBuilder,
  PermissionsBitField,
  Client,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  shards: "auto",
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
});
const fetch = require("cross-fetch");
const dotenv = require("dotenv");
dotenv.config();

let token = process.env.DISCORD_KEY;
client.login(token);
// sea brave
 const alertMembers = ["662117180158246926", "799061525582315520"];
//const alertMembers = ["662117180158246926"];
async function runAlerts() {
  try {
    let walletsQuery = "SELECT discord_id, eth_address, label from alerts";
    let walletsReturn = await DB.any(walletsQuery);
    let count = 1;
    let numberOfAlerts = 0;
    let adminAlert = "";

    for (const wallet of walletsReturn) {
      const coverage = await GetNftsHeld(wallet.eth_address);
      console.log(
        wallet.eth_address,
        " holds ",
        coverage.length,
        " coverage policies "
      );

      if (coverage.length > 0) {
        for (const cover of coverage) {
          const nftId = cover.nftId;
          const coverStart = parseInt(cover.start);
          const coverPeriod = parseInt(cover.period);
          const productId = parseInt(cover.productId);
          const daysRemaining = Math.floor(
            (coverStart + coverPeriod - Math.floor(Date.now() / 1000)) / 86400
          );
          let embed = new EmbedBuilder().setColor("#ffd200");

          if (isExpired(coverStart, coverPeriod)) {
            if(await needsAlert(wallet.discord_id,wallet.eth_address,nftId,"expired")) {
            const product = await findProductById(productId);
            embed.setTitle("Nexus Mutual Coverage Expired")
              .setDescription(
                 "`"+product.name +"` cover expired for \n" + 
                  wallet.eth_address 
              )

              
            let alert = await message(wallet.discord_id, embed, true);

            adminAlert +=
              "`Alert sent | NFT ID " +
              nftId +
              "` " +
              `Coverage for ${wallet.discord_id} for product ${product.name} has expired\n`;
            numberOfAlerts++;
            await updateAlerted(wallet.discord_id,wallet.eth_address,nftId,"expired")            
        }
          } else if (isWithin14Days(coverStart, coverPeriod)) {
            if(await needsAlert(wallet.discord_id,wallet.eth_address,nftId,"14day")) {

            const product = await findProductById(productId);
            embed
            .setDescription(
                "`"+product.name +"` cover expires in 2 weeks for \n" + 
                 wallet.eth_address 
             )
              .setTitle("Nexus Mutual Coverage Alert");
            let alert = await message(wallet.discord_id, embed, true);

            adminAlert +=
              "`Alert sent | NFT ID " +
              nftId +
              "` " +
              `Coverage for ${wallet.discord_id} for product ${product.name} is expiring in < 14 days\n`;
            numberOfAlerts++;
await updateAlerted(wallet.discord_id,wallet.eth_address,nftId,"14day")            }
          } else {
            console.log(
              "NFT ID " + nftId + " no alert for start ",
              coverStart,
              " period ",
              coverPeriod,
              " days remaining ",
              daysRemaining
            );
          }
        }
      }

      count += 1;
    }

    adminAlert += numberOfAlerts + " alerts sent today";
    if (adminAlert.length > 0) {
      adminAlert = `-----------------------\n${adminAlert}`;
      try {
        for (x = 0; x < alertMembers.length; x++) {
          let alert = await message(alertMembers[x], adminAlert);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(adminAlert);
    }

    return;
  } catch (error) {
    console.log(error);

    try {
      for (x = 0; x < alertMembers.length; x++) {
        let alert = await message(
          alertMembers[x],
          "error processing coverage expiration alerts - " + error
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function findProductById(id) {
  try {
    const productsFetch = await fetch(
      "https://api.nexusmutual.io/sdk/products/products.json"
    );
    const products = await productsFetch.json();
    const product = products.find((p) => p.id === id);
    console.log("id", id);
    console.log("product name from getname", product.name);
    if (product) {
      return { name: product.name, id: product.id };
    } else {
      return null;
    }
  } catch (error) {
    console.log("find product by ID error: ", error);
    return null;
  }
}

async function needsAlert(discordId, address, nftId, alert) {
    let alertType = "";
    if (alert === "expired") {
        alertType = "alertexpired = true";
    } else {
        alertType = "alert14day = true";
    }
    let hasAlertQuery = `SELECT * FROM alerted WHERE discord_id = '${discordId}' AND eth_address = '${address}' AND nft_id = '${nftId}' AND ${alertType};`;
    let results = await DB.any(hasAlertQuery);
    if (results.length > 0) {
        return false;
    } else {
        return true;
    }
}

async function updateAlerted(discordId, address, nftId, alert) {
    try {
      let alertType = "";
      if (alert === "expired") {
        alertType = "alertexpired";
      } else {
        alertType = "alert14day";
      }
      let checkQuery = `SELECT * FROM alerted WHERE discord_id = '${discordId}' AND eth_address = '${address}' AND nft_id = '${nftId}';`;
      let existingRow = await DB.any(checkQuery);
      if (existingRow.length === 0) {
        let insertQuery = `INSERT INTO alerted (discord_id, eth_address, nft_id, ${alertType}) VALUES ('${discordId}', '${address}', '${nftId}', true);`;
        await DB.none(insertQuery);
      } else {
        let updateQuery = `UPDATE alerted SET ${alertType} = true WHERE discord_id = '${discordId}' AND eth_address = '${address}' AND nft_id = '${nftId}';`;
        await DB.none(updateQuery);
      }
    } catch (e) {
      console.log(e);
    }
  }
  
function isWithin14Days(coverageStart, coveragePeriod) {
  const now = Math.floor(Date.now() / 1000); // Convert current time to seconds
  const fourteenDaysInSeconds = 14 * 24 * 60 * 60; // 14 days in seconds
  const endingTime = coverageStart + coveragePeriod;
  // Check if the difference between the ending time and current time is within 14 days
  return endingTime >= now && endingTime <= now + fourteenDaysInSeconds;
}
function isExpired(coverageStart, coveragePeriod) {
  const now = Math.floor(Date.now() / 1000); // Convert current time to seconds
  const endingTime = coverageStart + coveragePeriod;
  return endingTime <= now;
}
async function message(user, message, isEmbed) {
  const userForMsg = await client.users.fetch(user);
  if (message) {
    if (isEmbed) {
      userForMsg.send({ embeds: [message] });
    } else {
        userForMsg.send(message);
    }
  }
  return;
}

runAlerts();
