const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Displays the clients ping'),

  async execute(interaction, client) {
    const pingembed = new MessageEmbed()

      .setColor('#5865f4')
      .setTitle(':ping_pong:  Pong!')
      .setDescription(`You are on cluster: **#${client.cluster.id + 1}** out of **2** clusters`)
      .addFields(
        {
          name: '**Cluster** latency',
          value: `> **${Math.abs(
            Date.now() - interaction.createdTimestamp,
          )}**ms`,
          inline: true,
        },
        {
          name: '**API** latency',
          value: `> **${Math.round(client.ws.ping)}**ms`,
          inline: true,
        },
        {
          name: '**Total shards**',
          value: `> **${client.cluster.info.TOTAL_SHARDS}**`,
          inline: true,
        },
      );

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Discord latency')
        .setStyle('LINK')
        .setEmoji('💻')
        .setURL(
          'https://discordstatus.com/',
        ),
    );

    await interaction.reply({
      embeds: [pingembed],
      components: [button],
    });
  },
};
