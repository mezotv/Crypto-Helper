const { SlashCommandBuilder } = require("@discordjs/builders");
const { result } = require("../coindata/ethereum.json");
const { fastestFee, halfHourFee, hourFee} = require("../coindata/bitcoin.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gas")
    .setDescription("Shows the current gas price for the selected coin")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("ethereum")
        .setDescription("Shows the current ethereum gas price")
    )
    .addSubcommand((subCommand) =>
    subCommand
      .setName("bitcoin")
      .setDescription("Shows the current bitcoin gas price")
  ),

  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "ethereum": {
        var gasembed = new MessageEmbed()
          .setColor("#2e3036")
          .setTitle("Last Block: **" + result.LastBlock + "**")
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
          )
          .setURL("https://etherscan.io/block/" + `${result.LastBlock}`)
          .setDescription("Current Ethereum transaction Price:")
          .addFields(
            {
              name: "⚡Fast",
              value: `> **${result.FastGasPrice}**gwei`,
              inline: true,
            },
            {
              name: "🚶Normal",
              value: `> **${result.ProposeGasPrice}**gwei`,
              inline: true,
            },
            {
              name: "🐢Slow",
              value: `> **${result.SafeGasPrice}**gwei`,
              inline: true,
            }
          )
          .setTimestamp()
        break;
        }
        case "bitcoin": {
          var gasembed = new MessageEmbed()
            .setColor("#2e3036")
            .setTitle("Bitcoin Fees")
            .setThumbnail(
              "https://imgs.search.brave.com/w_GvHFdrOmNalH99UCRvAnyRauMdsfrriLg__MAL8Gw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/c3BuZy5vcmcvZG93/bmxvYWQvYml0Y29p/bi9sb2dvLWJpdGNv/aW4tNDA5Ni5wbmc"
            )
            .setURL("https://wikipedia.org/wiki/Bitcoin")
            .setDescription("Current Bitcoin transaction price:")
            .addFields(
              {
                name: "⚡Fast",
                value: `> **${fastestFee}**satoshis/byte`,
                inline: true,
              },
              {
                name: "🕧 Half hour",
                value: `> **${halfHourFee}**satoshis/byte`,
                inline: true,
              },
              {
                name: "🕛 Hour",
                value: `> **${hourFee}**satoshis/byte`,
                inline: true,
              }
            )
            .setTimestamp();
          }
          default:
            break; 
          }
          interaction.reply({
            embeds: [gasembed],
          });
          },
};
