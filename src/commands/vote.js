const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("vote").setDescription("Vote for me!"),

  async execute(interaction, client) {
    const votemebed = new MessageEmbed()
    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
      .setColor("#5865f4")
      .setTitle("Vote for **Crypto Helper**")
      .setDescription(
        "Click" +
          "[ here ](https://top.gg/bot/747050613656911892/vote)" +
          "to vote for me!"
      )
      .setURL("https://top.gg/bot/747050613656911892/vote")
      .setFooter("Crypto Helper made by Mezo#0001")
      .setThumbnail(client.user.displayAvatarURL());

    await interaction.reply({
      embeds: [votemebed],
    });
  },
};
