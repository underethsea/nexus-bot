const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { GetMembers } = require("../../../nexus.js");
const dotenv = require("dotenv");

dotenv.config();
const fetch = require("cross-fetch");

function numberWithCommas(x) {
  x = parseInt(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
async function getActiveCover() {
  try {
    let cover = await fetch(
      "https://api.dune.com/api/v1/query/1423736/results?api_key=" +
        process.env.DUNE_KEY
    );
    cover = await cover.json();
    return {
      dai: cover.result.rows[0].total_dai_display_curr,
      eth: cover.result.rows[0].total_eth_display_curr,
      total: cover.result.rows[0].total_display_curr,
    };
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("activecover")
    .setDescription("Get current Nexus Mutual active cover"),
  run: async (client, interaction) => {
    if (!interaction.guild) {
      interaction.reply("Commands not avail in DMs, please use in the public server")
      return;}
    const cover = await getActiveCover();
    const embed = new EmbedBuilder()
      .setColor("#ffd200")
      .setTitle(`Nexus Active Cover`)
      .setDescription(
        // numberWithCommas(members.duneMemberCt)
        "`ETH` " +
          numberWithCommas(cover.eth) + "\n" +
          "`DAI` " +
          numberWithCommas(cover.dai)  + "\n" +
          "`TOTAL` " +
          numberWithCommas(cover.total)
      );
    const messageId = await interaction.reply({ embeds: [embed] });
    //  return {contractMemberCt: getMemberCount,duneMemberCt: duneResult.running_member_count}

    //   interaction.reply(members)
  },
};
