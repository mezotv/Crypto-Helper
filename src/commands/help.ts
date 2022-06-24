import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get a list of all commands supported by the bot')
    .addSubcommand((subCommand) => subCommand.setName('utility').setDescription('List of all utility commands'))
    .addSubcommand((subCommand) => subCommand.setName('miner').setDescription('List of all miner commands'))
    .addSubcommand((subCommand) => subCommand.setName('economy').setDescription('List of all economy commands')),

  async execute(interaction: any, client: any) {
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
      case 'miner': {
        helpembed
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .setColor('#5865f4')
          .setTitle('⛏️ Miner Commands!')
          .addFields(
            {
              name: '**/lhr**',
              value: '> Get info about nvidias lhr mode',
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
      case 'economy': {
        helpembed
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .setColor('#5865f4')
          .setTitle('🪙 Economy Commands!')
          .addFields(
            {
              name: '**/bal [wallet/bank]**',
              value: '> Get your current balance',
              inline: true,
            },
            {
              name: '**/mine **',
              value: '> Go mine some bitcoin and ethereum',
              inline: true,
            },
            {
              name: '**/beg **',
              value: '> Beg someone for some crypto',
              inline: true,
            },
            {
              name: '**/send [user]**',
              value: '> Send crypto to a friend',
              inline: true,
            },
            {
              name: '**/buy**',
              value: '> Buy an item with your balance',
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
