const { MessageEmbed, SlashCommandBuilder } = require('discord.js');
const { readFileSync } = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gas')
    .setDescription('Shows the current gas price for the selected coin')
    .addSubcommand((subCommand) => subCommand
      .setName('ethereum')
      .setDescription('Shows the current ethereum gas price'))
    .addSubcommand((subCommand) => subCommand
      .setName('bitcoin')
      .setDescription('Shows the current bitcoin gas price')),

  async execute(interaction, client) {
    let gasembed = new MessageEmbed();
    switch (interaction.options.getSubcommand()) {
      case 'ethereum': {
        let rawdata = readFileSync('./src/coindata/ethereum.json');
        let data = JSON.parse(rawdata);

        let embedcolor;

        if (data.result.suggestBaseFee >= 90) {
          embedcolor = '#dd2f45';
        } else if (data.result.suggestBaseFee >= 45) {
          embedcolor = '#ffac32';
        } else {
          embedcolor = '#79b359';
        }

        let fastemoji = '#5865f4';
        if (data.result.FastGasPrice >= 100) {
          fastemoji = '🔴';
        } else if (data.result.FastGasPrice >= 50) {
          fastemoji = '🟠';
        } else {
          fastemoji = '🟢';
        }

        // Normal
        let normalemoji = '#5865f4';
        if (data.result.ProposeGasPrice >= 90) {
          normalemoji = '🔴';
        } else if (data.result.ProposeGasPrice >= 45) {
          normalemoji = '🟠';
        } else {
          normalemoji = '🟢';
        }

        // Slow
        let slowemoji = '#5865f4';
        if (data.result.SafeGasPrice >= 85) {
          slowemoji = '🔴';
        } else if (data.result.SafeGasPrice >= 40) {
          slowemoji = '🟠';
        } else {
          slowemoji = '🟢';
        }
        gasembed
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .setColor(embedcolor)
          .setTitle(`Last Block: **${data.result.LastBlock}**`)
          .setThumbnail(
            'https://cdn.discordapp.com/attachments/926292185748496446/972791200308416532/eth.png',
          )
          .setURL(`https://etherscan.io/block/${data.result.LastBlock}`)
          .setDescription('Current Ethereum transaction Price:')
          .addFields(
            {
              name: '⚡Fast',
              value: `> ${fastemoji} **${data.result.FastGasPrice}**gwei`,
              inline: true,
            },
            {
              name: '🚶Normal',
              value: `> ${normalemoji} **${data.result.ProposeGasPrice}**gwei`,
              inline: true,
            },
            {
              name: '🐢Slow',
              value: `> ${slowemoji} **${data.result.SafeGasPrice}**gwei`,
              inline: true,
            },
            {
              name: 'Suggested BaseFee',
              value: `> **${data.result.suggestBaseFee}**gwei`,
              inline: true,
            },
          )
          .setTimestamp()
          .setFooter({
            text: 'Crypto Helper made by Developer Dungeon Studios',
          });
        break;
      }
      case 'bitcoin': {
        gasembed
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .setColor('#5865f4')
          .setTitle('Bitcoin Fees')
          .setThumbnail(
            'https://imgs.search.brave.com/w_GvHFdrOmNalH99UCRvAnyRauMdsfrriLg__MAL8Gw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/c3BuZy5vcmcvZG93/bmxvYWQvYml0Y29p/bi9sb2dvLWJpdGNv/aW4tNDA5Ni5wbmc',
          )
          .setURL('https://wikipedia.org/wiki/Bitcoin')
          .setDescription('Current Bitcoin transaction price:')
          .addFields(
            {
              name: '⚡Fast',
              value: '> **102**satoshis/byte',
              inline: true,
            },
            {
              name: '🕧 Half hour',
              value: '> **102**satoshis/byte',
              inline: true,
            },
            {
              name: '🕛 Hour',
              value: '> **88**satoshis/byte',
              inline: true,
            },
          )
          .setTimestamp()
          .setFooter({
            text: 'Crypto Helper made by Developer Dungeon Studios',
          });
      }
        break;
      default:
        break;
    }
    interaction.reply({
      embeds: [gasembed],
    });
  },
};
