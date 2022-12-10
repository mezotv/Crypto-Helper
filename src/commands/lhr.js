const { Embed } = require('interactions.js');

module.exports = {
  name: 'lhr',
  description: 'Gives info about Nvidia\'s LHR Graphics Cards!',
  async execute(interaction, client) {
    const lhrembed = new Embed()
      .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
      .setColor('#77b800')
      .setTitle('What even is LHR')
      .setDescription('LHR stands for **L**ite **H**ash **R**ate')
      .setThumbnail(
        'https://imgs.search.brave.com/YW3ZYjQ-nZmN3KbfHUZJHz-_5l-J5BJzxMwR7qRIm18/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE0/LzA5L252aWRpYS1s/b2dvLTAucG5n',
      )
      .addFields([
        {
          name: 'How to detect LHR',
          value:
            [
              'If you have a 30/40 series card you may have lhr which slows down the Ethereum mining process. In order to make some of this lost power back, you can use the  t-rex lhr unlock (https://github.com/trexminer/T-Rex/wiki/LHR).',
              '',
              'In order to figure out if you have LHR you can follow this handy dandy guide!',
              '',
              'On Windows, right click on the Windows logo and select **\'Device Manager\'** then click on Display adapters and select your GPU, right-click and select properties. Now in the top bar select **\'details\'** and in the drop down menu find and select **\'Hardware Ids\'** Now you see a bunch of characters, but don\'t get nervous! All you have to do is look at the number after **10DE** and compare it to this table: ',
            ].join('\n'),
        },
      ])
      .setImage(
        'https://cdn.discordapp.com/attachments/926292185748496446/974383813218152468/lhr.png',
      )
      .setFooter('Crypto Helper made by Dominik#5555')
      .setTimestamp();

    await interaction.editReply({
      embeds: [lhrembed],
    });
  },
};
