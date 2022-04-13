const { SlashCommandBuilder } = require("@discordjs/builders");
const { result } = require("../coindata/ethereum.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gas")
    .setDescription("Shows the current gas price for the selected coin")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("ethereum")
        .setDescription("Shows the current ethereum gas price")
    ),

  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "ethereum": {
        let gasembed = new MessageEmbed()
          .setColor("#2e3036")
          .setTitle("Last Block: **" + result.LastBlock + "**")
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
          )
          .setURL("https://etherscan.io/block/" + `${result.LastBlock}`)
          .setDescription("Current Ethereum Gas Price:")
          .addFields(
            {
              name: "⚡Fast",
              value: `> **${result.FastGasPrice}**gwei`,
              inline: false,
            },
            {
              name: "🚶Normal",
              value: `> **${result.ProposeGasPrice}**gwei`,
              inline: false,
            },
            {
              name: "🐢Slow",
              value: `> **${result.SafeGasPrice}**gwei`,
              inline: false,
            }
          )
          .setTimestamp();

        interaction.reply({
          embeds: [gasembed],
        });
      }
    }
  },
};
