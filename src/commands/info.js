const { Embed } = require('interactions.js');

const os = require('os');
const { version } = require('../../package.json');

module.exports = {
  name: 'info',
  description: 'Shows some information about the bot.',
  async execute(interaction, client) {
    const core = os.cpus()[0];

    const infoEmbed = new Embed()
      .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
      .setColor('#5865f4')
      .setTitle('Bot Info')
      .setThumbnail('https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512')
      .addFields([
        {
          name: '> General',
          value: [
            '**❯  Discord:** [Server Invite](https://discord.gg/vMyXAxEznS)',
            '**❯  Client:** [Bot Invite](https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands)',
            `**❯  Bot Version:** v${version}`,
            `**❯  Node.js:** ${process.version}`,
            '**❯  Interactions.js:** v1.1.1',
          ].join('\n'),
        },
       ])
      .setFooter('Crypto Helper made by Dominik#5555')
      .setTimestamp();

    interaction.editReply({
      embeds: [infoEmbed],
      ephemeral: false,
    });
  },
};
