const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { GetPriceQuote } = require("../../../nexus.js");

const formatEighteen = (num) => {
  num = parseFloat(num) / 1e18;
  if (num > 100) {
    return numberWithCommas(num.toFixed(0));
  }
  if (num > 0.1) {
    return num.toFixed(2);
  }
  if (num > 0.009) {
    return num.toFixed(5);
  } else {
    return num;
  }
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Get a price quote")
    .addStringOption((option) =>
      option
        .setName("product")
        .setDescription("Enter a product name, ex: Abracadabra")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Enter amount of coverage")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("cover_asset")
        .setDescription("Choose asset coverage is in")
        .addChoices(
          { name: "ETH", value: "ETH" },
          { name: "DAI", value: "DAI" }
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("period")
        .setDescription("Enter a coverage period in days")
        .setRequired(true)
    ),

  // .addStringOption(option =>
  //   option.setName('payment_asset')
  //   .setDescription('Payment in NXM or DAI')
  //     .addChoices(
  //     { name: 'ETH', value: 'ETH' },
  //     { name: 'DAI', value: 'DAI' },
  //     { name: 'NXM', value: 'NXM' },
  //     )
  //     .setRequired(true)
  //     ),
  run: async (client, interaction) => {
    const product =
      interaction.options.getString("product") ?? "No product provided";
    const amount =
      interaction.options.getInteger("amount") ?? "No amount provided";
    const period =
      interaction.options.getInteger("period") ?? "No period provided";
    //   const paymentAsset = interaction.options.getString('payment_asset') ?? 'No period provided';
    const coverAsset =
      interaction.options.getString("cover_asset") ?? "No period provided";

    // async function GetPriceQuote(name, amount, period, coverAsset, paymentAsset) {

    const quote = await GetPriceQuote(product, amount, period, coverAsset);

    //   const quote = await GetPriceQuote(product,amount,period,coverAsset,paymentAsset)
    console.log(quote);
    //   return {nxm:quote.quote.premiumInNXM,premiumAsset:quote.quote.premiumInAsset }

    if (!quote) {
      interaction.reply("No quote available for the product");
    } else {
      const quoteNxmFormatted = quote.nxm / 1e18;
      const quotePremiumAssetFormatted = quote.premiumAsset / 1e18;
      const adjustedNxmQuote =
        quoteNxmFormatted +
        quoteNxmFormatted * 0.1765 +
        quoteNxmFormatted * 0.001;
      const adjustedPremiumAsssetQuote =
        quotePremiumAssetFormatted +
        quotePremiumAssetFormatted * 0.1765 +
        quoteNxmFormatted * 0.001;
      const timeAdjustment = 365 / period;
      console.log("time adjust", timeAdjustment);
      const rate = (adjustedPremiumAsssetQuote / amount) * timeAdjustment * 100;
      const embed = new EmbedBuilder()
        .setColor("#ffd200")
        .setTitle(`Quote for ${quote.product}`)
        .setDescription(
          `${numberWithCommas(amount)} ${coverAsset} cover for ${period} days`
        )
        .addFields(
          { name: "NXM", value: adjustedNxmQuote.toFixed(2), inline: true },
          {
            name: coverAsset,
            value: adjustedPremiumAsssetQuote.toFixed(2),
            inline: true,
          }
        )
        .setFooter({ text: rate.toFixed(2) + "% per year" });

      const messageId = await interaction.reply({ embeds: [embed] });
    }
  },
};
