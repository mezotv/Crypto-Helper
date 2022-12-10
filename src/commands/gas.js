const { Embed } = require('interactions.js');
const { readFileSync } = require('fs');

module.exports = {
  name: 'gas',
  description: 'Get the current gas price for the selected coin',
  options: [
    {
      name: 'ethereum',
      description: 'Shows the current ethereum gas price',
      type: 1,
    },
    {
      name: 'bitcoin',
      description: 'Shows the current bitcoin gas price',
      type: 1,
    },
  ],
  async execute(interaction, client) {

    let gasembed = new Embed();
    switch (interaction.data.options[0].name) {
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
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor(embedcolor)
          .setTitle(`Last Block: **${data.result.LastBlock}**`)
          .setThumbnail(
            'https://cdn.discordapp.com/attachments/926292185748496446/972791200308416532/eth.png',
          )
          .setURL(`https://etherscan.io/block/${data.result.LastBlock}`)
          .setDescription('Current Ethereum transaction Price:')
          .addFields([
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
          ])
          .setTimestamp()
          .setFooter('Crypto Helper made by Dominik#5555');
        break;
      }
      case 'bitcoin': {
        gasembed
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor('#5865f4')
          .setTitle('Bitcoin Fees')
          .setThumbnail(
            'https://imgs.search.brave.com/w_GvHFdrOmNalH99UCRvAnyRauMdsfrriLg__MAL8Gw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/c3BuZy5vcmcvZG93/bmxvYWQvYml0Y29p/bi9sb2dvLWJpdGNv/aW4tNDA5Ni5wbmc',
          )
          .setURL('https://wikipedia.org/wiki/Bitcoin')
          .setDescription('Current Bitcoin transaction price:')
          .addFields([
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
          ])
          .setTimestamp()
          .setFooter('Crypto Helper made by Dominik#5555');
      }
        break;
      default:
        break;
    }
    return interaction.editReply({
      embeds: [gasembed],
    });
  },
};
