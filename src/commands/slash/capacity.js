const { EmbedBuilder, PermissionsBitField } = require("discord.js");
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
    .setName("capacity")
    .setDescription("Get capacity for any product Nexus offers")
    .addStringOption((option) =>
      option
        .setName("product")
        .setDescription("Enter a product name, ex: Abracadabra")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const product =
      interaction.options.getString("product") ?? "No product provided";
    const capacity = await GetCapacityForProduct(product);
    console.log("eth capacity ", capacity.availableCapacity[0].amount / 1e18);
    console.log("dai capacity ", capacity.availableCapacity[1].amount / 1e18);
    console.log("nxm capacity ", capacity.availableCapacity[2].amount / 1e18);
    const noCapacity =
      capacity.availableCapacity[0].amount === "0" &&
      capacity.availableCapacity[1].amount === "0";
    console.log("no capacity? ", noCapacity);
    if (noCapacity) {
      interaction.reply("No capacity for the product");
    } else {
      const embed = new EmbedBuilder()
        .setColor("#ffd200")
        .setTitle(`Capacity for ${capacity.name}`)
        .addFields(
          {
            name: "ETH",
            value: formatEighteen(capacity.availableCapacity[0].amount),
            inline: true,
          },
          {
            name: "DAI",
            value: formatEighteen(capacity.availableCapacity[1].amount),
            inline: true,
          }
          // { name: 'NXM', value: formatEighteen(capacity.availableCapacity[2].amount),inline: true  },
        );
      const messageId = await interaction.reply({ embeds: [embed] });
    }
  },
};
