const {
  EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Displays the clients ping'),

  async execute(interaction, client) {
    const pingembed = new EmbedBuilder()

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
          name: '**Api** latency',
          value: `> **${Math.round(client.ws.ping)}**ms`,
          inline: true,
        },
        {
          name: '**Total Shards**',
          value: `> **${client.cluster.info.TOTAL_SHARDS}**`,
          inline: true,
        },
      );

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Discord latency')
        .setStyle(5)
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
