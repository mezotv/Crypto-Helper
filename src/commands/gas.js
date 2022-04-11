const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
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
        const data = await fetch(
          `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`
        ).then((res) => res.json());

        let gasembed = new MessageEmbed()
          // .setColor('#343434')
          .setTitle("Ethereum gas fees")
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
          )
          .addFields(
            {
              name: "⚡Fast",
              value: `> **${data.result.FastGasPrice}**gwei`,
              inline: false,
            },
            {
              name: "🚶Normal",
              value: `> **${data.result.ProposeGasPrice}**gwei`,
              inline: false,
            },
            {
              name: "🐢Slow",
              value: `> **${data.result.SafeGasPrice}**gwei`,
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
