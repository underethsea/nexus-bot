const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { GetCapitalPoolTvl } = require("../../../nexus.js");

const NXMTotalSupply = 6760845.2062690002;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bookvalue")
    .setDescription("Get NXM Book Value"),
  run: async (client, interaction) => {
    const capPoolData = await GetCapitalPoolTvl();
    const noData = false;
    if (noData) {
      interaction.reply("No data available right now");
    } else {
      let assetString = "";
      console.log(capPoolData);
      const ethPrice = capPoolData.assets.find(
        (asset) => asset.symbol === "ETH"
      ).price;
      const bookValue = capPoolData.tvl / ethPrice / NXMTotalSupply;
      const embed = new EmbedBuilder()
        .setColor("#ffd200")
        .setTitle(`Book Value`)
        .setDescription(bookValue.toFixed(5) + " ETH per NXM");

      const messageId = await interaction.reply({ embeds: [embed] });
    }
  },
};
