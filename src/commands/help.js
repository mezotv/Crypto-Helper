const { MessageEmbed, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get a list of all commands supported by the bot')
    .addSubcommand((subCommand) => subCommand.setName('utility').setDescription('List of all utility commands'))
    .addSubcommand((subCommand) => subCommand.setName('crypto').setDescription('List of all crypto commands')),

  async execute(interaction, client) {
    let helpembed = new MessageEmbed();
    switch (interaction.options.getSubcommand()) {
      case 'utility': {
        helpembed
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .setColor('#5865f4')
          .setTitle('📰 Utility Commands!')
          .addFields(
            {
              name: '**/ping**',
              value: '> Shows the api and client latency',
              inline: true,
            },
            {
              name: '**/hashify [string]**',
              value: '> Generate a hash for the given string',
              inline: true,
            },
            {
              name: '**/info**',
              value: '> Shows some info about the bot',
              inline: true,
            },
            {
              name: '**/help [category]**',
              value: '> Shows this info',
              inline: true,
            },
            {
              name: '**/vote**',
              value: '> Shows the link to vote for the bot',
              inline: true,
            },
          )
          .setFooter({ text: 'Crypto Helper made by Developer Dungeon Studios' })
          .setTimestamp();
        break;
      }
      case 'crypto': {
        helpembed
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .setColor('#5865f4')
          .setTitle('⛏️ Crypto Commands!')
          .addFields(
            {
              name: '**/lhr**',
              value: '> Get info about nvidias lhr mode',
              inline: true,
            },
            {
              name: '**/gas [bitcoin/ethereum]**',
              value: '> Shows the current gas price for the selected coin',
              inline: true,
            },
            {
              name: '**/coin [any crypto coin]**',
              value: '> Get advanced info about a crypto currenzy',
              inline: true,
            },
            {
              name: '**/global**',
              value: '> Global Info about cryptocurrencies',
              inline: true,
            },
            {
              name: '**/miner [selected miner]**',
              value: '> Shows a setup guide for the selected miner aswell as some info',
              inline: true,
            },
          )
          .setFooter({ text: 'Crypto Helper made by Developer Dungeon Studios' })
          .setTimestamp();
        break;
      }
      default:
        break;
    }
    await interaction.reply({
      embeds: [helpembed],
    });
  },
};
