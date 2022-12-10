const { Embed } = require('interactions.js');

module.exports = {
  name: 'vote',
  description: 'Vote for me!',
  async execute(interaction, client) {
    const votemebed = new Embed()
      .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512')
      .setColor('#5865f4')
      .setTitle('Voting helps **Crypto Helper** gain more users! So make sure to vote every day!',)
      .addFields([{
        name: 'Top.gg',
        value: '> [ Click to vote  ](https://top.gg/bot/747050613656911892/vote)',
        inline: true,
      }])
      .setThumbnail('https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512')
      .setFooter('Crypto Helper made by Dominik#5555');
    return interaction.editReply({
      embeds: [votemebed],
    });
  },
};
