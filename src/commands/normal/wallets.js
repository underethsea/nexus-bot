const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const {PlayerWallets} = require("../../../dbdonkey")
module.exports = {
    name: "wallets",
    aliases: ["listwallets"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
      let walletsReturn = await PlayerWallets(message.author.id)
      console.log("getting wallets from db for ",message.author.id)
      message.reply(walletsReturn)
    }
 };
