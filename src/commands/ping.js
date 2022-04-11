const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, version: djsversion } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot's ping status"),

  async execute(interaction, client) {
    const pingembed = new MessageEmbed()

      //.setColor("Red")
      .setTitle(":ping_pong:  Pong!")
      .addFields(
        {
          name: "**Shard 0** latency",
          value: `> **${Date.now() - interaction.createdTimestamp}**ms`,
          inline: false,
        },
        {
          name: "**Api** latency",
          value: `> **${Math.round(client.ws.ping)}**ms`,
          inline: false,
        }
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [pingembed],
    });
  },
};
