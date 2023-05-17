const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const {RemoveWallet} = require("../../../dbdonkey")
module.exports = {
    name: "removewallet",
    aliases: ["remove"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
      let walletsReturn = await RemoveWallet(message.author.id,args[0])
      console.log("removing",args[0],"wallet for ",message.author.id)
      message.reply(walletsReturn)
    }
 };
