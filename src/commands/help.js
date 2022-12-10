const { Embed } = require('interactions.js');

module.exports = {
  name: 'help',
  description: 'Get a list of all commands supported by the bot.',
  options: [
    {
      name: 'utility',
      description: 'List of all utility commands',
      type: 1,
    },
    {
      name: 'crypto',
      description: 'List of all crypto commands',
      type: 1,
    },
  ],
  async execute(interaction, client) {
    let helpembed = new Embed();
    switch (interaction.data.options[0].name) {
      case 'utility': {
        helpembed
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor('#5865f4')
          .setTitle('📰 Utility Commands!')
          .addFields([
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
          ])
          .setFooter('Crypto Helper made by Dominik#5555')
          .setTimestamp();
        break;
      }
      case 'crypto': {
        helpembed
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor('#5865f4')
          .setTitle('⛏️ Crypto Commands!')
          .addFields([
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
          ])
          .setFooter('Crypto Helper made by Dominik#5555')
          .setTimestamp();
        break;
      }
      default:
        break;
    }
    return interaction.editReply({
      embeds: [helpembed],
    });
  },
};
