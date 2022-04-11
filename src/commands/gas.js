const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { result } = require("../coindata/ethereum.json");
const { MessageEmbed, version: djsversion } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gas")
    .setDescription("Shows the current ethereum gas price")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("ethereum")
        .setDescription("Shows the current ethereum gas price")
    ),

  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "ethereum": {
        let gasembed = new MessageEmbed()
          // .setColor('#343434')
          .setTitle("Ethereum gas fees")
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
          )
          .setDescription("Last Block: **" + result.LastBlock + "**")
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
