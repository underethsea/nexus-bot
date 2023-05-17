const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const {AddWallet} = require("../../../dbdonkey")
module.exports = {
    name: "addwallet",
    aliases: ["add"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
      let walletsReturn = await AddWallet(message.author.id,args[0])
      console.log("addding",args[0],"wallet for ",message.author.id)
      message.reply(walletsReturn)
    }
 };
