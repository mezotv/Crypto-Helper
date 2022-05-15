const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote for me!"),

  async execute(interaction, client) {
    const votemebed = new MessageEmbed()
      .setAuthor({
        name: `${client.user.username}`,
        iconURL: client.user.avatarURL(),
      })
      .setColor("#5865f4")
      .setTitle(
        "Voting helps **Crypto Helper** gain more users! So make sure to vote every day!"
      )
      .addFields(
        {
          name: "VoidBots",
          value: `> [ Vote for me on **VoidBots** ](https://voidbots.net/bot/747050613656911892/vote)`,
          inline: false,
        },
        {
          name: "Botlist.me",
          value: `> [ Vote for me on **Botlist.me** ](https://botlist.me/bots/747050613656911892/vote)`,
          inline: false,
        },
        {
          name: "Infinity Bot List",
          value: `> [ Vote for me on **Infinity Bot Lists** ](https://infinitybots.gg/bots/747050613656911892/vote)`,
          inline: false,
        },
        {
          name: "Top.gg",
          value: `> [ Vote for me on **Top.gg** ](https://top.gg/bot/747050613656911892/vote)`,
          inline: false,
        }
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: "Crypto Helper made by Mezo#0001" });

    await interaction.reply({
      embeds: [votemebed],
    });
  },
};
