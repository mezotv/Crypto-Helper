const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, version: djsversion } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of all commands supported by the bot"),

  async execute(interaction) {
    const pingembed = new MessageEmbed()

      .setColor("#2e3036")
      .setTitle(":newspaper: Commands!")
      .addFields(
        {
          name: "**/gas coin**",
          value: "> Shows the current transaction fee of the selected coin",
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
        }
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [pingembed],
    });
  },
};
