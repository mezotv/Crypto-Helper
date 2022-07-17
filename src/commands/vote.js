const { MessageEmbed, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote for me!'),
  async execute(interaction, client) {
    const votemebed = new MessageEmbed()
      .setAuthor({
        name: `${client.user.username}`,
        iconURL: client.user.avatarURL(),
      })
      .setColor('#5865f4')
      .setTitle(
        'Voting helps **Crypto Helper** gain more users! So make sure to vote every day!',
      )
      .addFields(
        {
          name: 'VoidBots',
          value: '> [ Click to vote ](https://voidbots.net/bot/747050613656911892/vote)',
          inline: true,
        },
        {
          name: 'Botlist.me',
          value: '> [ Click to vote  ](https://botlist.me/bots/747050613656911892/vote)',
          inline: true,
        },
        {
          name: 'Radar Bot Directory',
          value: '> [ Click to vote  ](https://radarbotdirectory.xyz/bot/747050613656911892/vote)',
          inline: true,
        },
        {
          name: 'Flow Bots',
          value: '> [ Click to vote  ](https://www.flowbots.net/bot/747050613656911892/vote)',
          inline: true,
        },
        {
          name: 'Infinity Bot List',
          value: '> [ Click to vote  ](https://infinitybots.gg/bots/747050613656911892/vote)',
          inline: true,
        },
        {
          name: 'Top.gg',
          value: '> [ Click to vote  ](https://top.gg/bot/747050613656911892/vote)',
          inline: true,
        },
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: 'Crypto Helper made by Developer Dungeon Studios' });
    await interaction.reply({
      embeds: [votemebed],
    });
  },
};
