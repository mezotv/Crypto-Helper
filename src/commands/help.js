const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, version: djsversion } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of all commands supported by the bot"),

  async execute(interaction) {
    const pingembed = new MessageEmbed()

      .setColor("#5865f4")
      .setTitle(":newspaper: Commands!")
      .addFields(
        {
          name: "**/gas [selected coin]**",
          value: "> Shows the current transaction fee of the selected coin",
          inline: false,
        },
        {
          name: "**/miner [selected miner]**",
          value: "> Shows a setup for the selected miner",
          inline: false,
        },
        {
          name: "**/lhr**",
          value: "> Shows info about Nvidias LHR Graphics Cards",
          inline: false,
        },
        {
          name: "**/info**",
          value: "> Shows some info about the bot",
          inline: false,
        },
        {
          name: "**/ping**",
          value: "> Shows the api and shard latency",
          inline: false,
        },
        {
          name: "**/vote**",
          value: "> Shows the link to vote for the bot",
          inline: false,
        }
      )
      .setFooter("Crypto Helper made by Mezo#0001")
      .setTimestamp();

    await interaction.reply({
      embeds: [pingembed],
    });
  },
};
