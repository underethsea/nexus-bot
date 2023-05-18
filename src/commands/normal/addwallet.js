const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const {AddWallet} = require("../../../dbdonkey")
module.exports = {
    name: "addwallet",
    aliases: ["add"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
let label = ""
	if (args[1]) {label=args[1]}
      let walletsReturn = await AddWallet(message.author.id,args[0],label)
      console.log("addding",args[0],"wallet for ",message.author.id)
      message.reply(walletsReturn)
    }
 };
