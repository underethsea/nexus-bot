const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { GetMembers } = require("../../../nexus.js");

function numberWithCommas(x) {
  x = parseInt(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("members")
    .setDescription("Get current Nexus Mutual member count"),
  run: async (client, interaction) => {
    const members = await GetMembers();
    const embed = new EmbedBuilder()
      .setColor("#ffd200")
      .setTitle(`Nexus Members`)
      .setDescription(
        numberWithCommas(members.duneMemberCt)
        // { name: 'NXM', value: formatEighteen(capacity.capacity[2].amount),inline: true  },
      );
    const messageId = await interaction.reply({ embeds: [embed] });
    //  return {contractMemberCt: getMemberCount,duneMemberCt: duneResult.running_member_count}

    //   interaction.reply(members)
  },
};
