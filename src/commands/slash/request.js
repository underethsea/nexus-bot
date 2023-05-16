const { EmbedBuilder, PermissionsBitField, Client } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { GetCapacityForProduct } = require("../../../nexus.js");

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
    .setName("request")
    .setDescription("Request capacity for any product Nexus offers")
    .addStringOption((option) =>
      option
        .setName("product")
        .setDescription("Enter a product name, ex: Abracadabra")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount requesting")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("cover_asset")
        .setDescription("Choose asset for coverage request")
        .addChoices(
          { name: "ETH", value: "ETH" },
          { name: "DAI", value: "DAI" }
        )
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const user = interaction.user;

    const product =
      interaction.options.getString("product") ?? "No product provided";
    const amount =
      interaction.options.getInteger("amount") ?? "No amount provided";
    const coverAsset =
      interaction.options.getString("cover_asset") ?? "No cover_asset provided";

    const capacity = await GetCapacityForProduct(product);

    if (capacity === null) {
      await interaction.reply("Product not found");
      return;
    }
    const noCapacity =
      capacity.capacity[0].amount === "0" &&
      capacity.capacity[1].amount === "0";
    console.log("no capacity? ", noCapacity);
    let embed = new EmbedBuilder().setColor("#ffd200");
    if (noCapacity) {
      embed.setDescription("Currently no capacity for the product");
    } else {
      embed.setDescription(`Current Capacity for ${capacity.name}`).addFields(
        {
          name: "ETH",
          value: formatEighteen(capacity.capacity[0].amount),
          inline: true,
        },
        {
          name: "DAI",
          value: formatEighteen(capacity.capacity[1].amount),
          inline: true,
        }
        // { name: 'NXM', value: formatEighteen(capacity.capacity[2].amount),inline: true  },
      );
    }
    const requestString = `Requesting ${numberWithCommas(
      amount
    )} ${coverAsset} capacity for ${capacity.name}`;
    embed.setTitle(requestString);
    embed.setFooter({ text: "Your request has been forwarded to the team" });

    // undersea
    // const memberID = '662117180158246926'
    // brave
    // const memberID = '799061525582315520'
    const alertMembers = ["662117180158246926", "799061525582315520"];
    try {
      for (x = 0; x < length.alertMembers; x++) {
        let alert = await client.users.send(
          alertMembers[x],
          `@${user.username} ${requestString}`
        );
      }
      const messageId = await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
