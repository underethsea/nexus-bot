const { EmbedBuilder, PermissionsBitField } = require("discord.js");
// const {PlayerWallets} = require("../../../dbdonkey")
const {DB} = require("../../../dbconnection")
const allowList = ["662117180158246926", "799061525582315520"];


module.exports = {
    name: "requests",
    aliases: ["listrequests"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
           console.log(message.author.id," looking at requests")
        if(allowList.includes(message.author.id)) {

            let returnCount = 5
            if(args[0]){ if(args[0]>0 && args[0]<20){returnCount=args[0]}else{returnCount = 10}}
            console.log("getting capacity requests from db for ",message.author.id)

      let requestsReturn = await getRequests(returnCount)
      message.reply(requestsReturn) }
      
            
        
    }
 };

 async function getRequests(count) {
try{
    const queryString = "SELECT date,discord_id,amount,cover_asset,product FROM requests" + " LIMIT " + count
    let requestsResult = await DB.any(queryString);

let requestsString = ""
    let counter = 1
    requestsResult.forEach((x) => {
        requestsString += counter + ":   `" + x.date.toLocaleString() + "`" + " " + x.discord_id + " " + x.amount + " " + x.cover_asset + " " + x.product
      
     requestsString += "\n";
     counter += 1;})
     return requestsString
}catch(error){console.log(error)}
 }
