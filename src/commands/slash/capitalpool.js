const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { GetCapitalPoolTvl } = require("../../../nexus.js");

const formatEighteen = (num) => {
  num = parseFloat(num) / 1e18;
  if (num > 100) {
    return numberWithCommas(num.toFixed(0));
  }
  if (num > 0.1) {
    return num.toFixed(2);
  } else {
    return num;
  }
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("capitalpool")
    .setDescription("Get capital pool holdings"),
  run: async (client, interaction) => {
    const capPoolData = await GetCapitalPoolTvl();
    const noData = false;
    if (noData) {
      interaction.reply("No data available right now");
    } else {
      let assetString = "";
      console.log(capPoolData);
      // capPoolData.assets.map(asset=>{assetString += asset.symbol + " $" + numberWithCommas(parseFloat(asset.value.toFixed(0))) + " | "})

      const embed = new EmbedBuilder()
        .setColor("#ffd200")
        .setTitle(
          `Capital Pool TVL $${numberWithCommas(
            parseFloat(capPoolData.tvl.toFixed(0))
          )}`
        );

      capPoolData.assets.forEach((field) => {
        embed.addFields({
          name: field.symbol,
          value: "$" + numberWithCommas(parseFloat(field.value.toFixed(0))),
        });
      });
      const messageId = await interaction.reply({ embeds: [embed] });
    }
  },
};
