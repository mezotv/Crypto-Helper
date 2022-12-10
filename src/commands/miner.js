const { Embed } = require('interactions.js');

module.exports = {
  name: 'miner',
  description: 'Shows a setup for the selected miner!',
  options: [
    {
      name: 'phoenixminer',
      description: 'Setup for Phoenix miner',
      type: 1,
    },
    {
      name: 'trexminer',
      description: 'Setup for T-rex Miner',
      type: 1,
    },
    {
      name: 'nbminer',
      description: 'Setup for NbMiner',
      type: 1,
    },
    {
      name: 'teamredminer',
      description: 'Setup for Team Red Miner',
      type: 1,
    },
    {
      name: 'xmrig',
      description: 'Setup for XMRig',
      type: 1,
    },
  ],
  async execute(interaction, client) {
    let minerembed = new Embed();
    switch (interaction.data.options[0].name) {
      case 'phoenixminer': {
        minerembed
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor('#212020')
          .setTitle('**Phoenix Miner**')
          .setURL('https://phoenixminer.org/')
          .addFields([
            {
              name: '**Info**',
              value:
                '> PhoenixMiner is fast (arguably the fastest) Ethash (Ethereum, ETC, etc.) miner that supports both AMD and Nvidia cards (including in mixed mining rigs). It runs under Windows x64 and Linux x64',
              inline: false,
            },
            {
              name: '**DevFee**',
              value:
                '> The lowest dev-fee of 0.9% (35 seconds define mining per each 65 minutes)',
              inline: false,
            },
            {
              name: 'Mining Setup',
              value: [
                '**Note!** You can get the pool address from the its like **https://ethermine.org/**.',
                '**1.** Install **PhoenixMiner** from the url in the **title**. ',
                '**2.** **Open** or **create** any bat file and paste the following code:',
                '```PhoenixMiner.exe -pool <pool> -pool2 <backupPool> -wal <YourWalletAddress>.<WorkerName>```',
                '**3.** Change <pool> to your desired pool. If you want you can remove the second backup pool or change it aswell.',
                '**4.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name. The worker name is optional.',
                '**🥳Done!** Run that bat file and enjoy!',
              ].join('\n'),
            }])
          .setThumbnail(
            'https://cdn.discordapp.com/attachments/926292185748496446/972791200308416532/eth.png',
          )
          .setFooter('Crypto Helper made by Dominik#5555')
          .setTimestamp();
        break;
      }
      case 'trexminer': {
        minerembed
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor('#6a4e38')
          .setTitle('**T-Rex Miner**')
          .setURL('https://github.com/trexminer/T-Rex/releases/tag/0.25.15')
          .addFields(
            {
              name: '**Info**',
              value:
                '> T-Rex is a versatile cryptocurrency mining software. It supports a variety of algorithms. T-Rex is currently supported on NVIDIA GPUs only.',
              inline: false,
            },
            {
              name: '**DevFee**',
              value:
                '> Developer fee is 1% (2% for Octopus, Autolykos2, and their dual mining modes).',
              inline: false,
            },
          )
          .addFields({
            name: 'Mining Setup',
            value: [
              '**Note!** You can get the pool address from the ites like **https://ethermine.org/**.',
              '**1.** Install **T-Rex** from the url in the title. ',
              '**2.** **Open** or **create** any bat file and paste the folowing code:',
              '```t-rex -a <algo> -o <pool> -u <YourWalletAddress> -p x -w <WorkerName>```',
              '**3.** Change **<algo>** to your desired algorithm. ',
              '**4.** Change **<pool>** to your desired pool.',
              '**5.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name.',
              '**Optional** Go to **http://127.0.0.1:4067/** to see your miner stats.',
              '**🥳Done!** Run that bat file and enjoy!',
            ].join('\n'),
          })
          .setThumbnail('https://trex-miner.com/img/t-rex.png')
          .setFooter('Crypto Helper made by Dominik#5555')
          .setTimestamp();
        break;
      }
      case 'nbminer': {
        minerembed
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor('#fefffe')
          .setTitle('**NBMiner**')
          .setURL('https://github.com/NebuTech/NBMiner/releases')
          .addFields(
            {
              name: '**Info**',
              value:
                '> NBMiner comes with multiple different files that say start_ all those files are pre-made templates for mining different cryptocurrencies.',
              inline: false,
            },
            {
              name: '**DevFee**',
              value:
                '> Depending on your choosen algorythm, the developer fee is between 1% and 3%.',
              inline: false,
            },
          )
          .addFields({
            name: 'Mining Setup',
            value: [
              '**Note!** You can get the pool address from the ites like **https://ethermine.org/**.',
              '**1.** Install **T-Rex** from the url in the title. ',
              '**2.** **Open** or **create** any bat file and paste the folowing code:',
              '```nbminer -a <algo> -o <pool> -u <YourWalletAddress>.<WorkerName>```',
              '**3.** Change **<algo>** to your desired algorithm.',
              '**4.** Change **<pool>** to your desired pool.',
              '**5.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name.',
              '**🥳Done!** Run that bat file and enjoy!',
            ].join('\n'),
          })
          .setThumbnail(
            'https://github.com/NebuTech/NBMiner/blob/master/logo.png?raw=true',
          )
          .setFooter('Crypto Helper made by Dominik#5555')
          .setTimestamp();
        break;
      }
      case 'teamredminer': {
        minerembed
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor('#e40607')
          .setTitle('**Team Red Miner**')
          .setURL('https://github.com/todxx/teamredminer/releases/tag/v0.9.4.2')
          .addFields([
            {
              name: '**Info**',
              value:
                '> This is an optimized miner for AMD GPUs and Xilinx FPGAs created by todxx and kerney666.',
              inline: false,
            },
            {
              name: '**DevFee**',
              value:
                '> Depending on the algorythm, the developer fee is between 0.75% and 3%.',
              inline: false,
            },
            {
              name: 'Mining Setup',
              value: [
                '**Note!** You can get the pool address from the ites like **https://ethermine.org/**.',
                '**1.** Install **T-Rex** from the url in the title. ',
                '**2.** **Open** or **create** any bat file and paste the folowing code:',
                '```teamredminer.exe -a <algo> -o <pool> -u <YourWalletAddress>.<WorkerName> -p x```',
                '**3.** Change **<algo>** to your desired algorithm. ',
                '**4.** Change **<pool>** to your desired pool.',
                '**5.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name.',
                '**🥳Done!** Run that bat file and enjoy!',
              ].join('\n'),
            }])
          .setThumbnail(
            'https://www.teamredminer.com/assets/img/TRMrw_transp.png',
          )
          .setFooter('Crypto Helper made by Dominik#5555')
          .setTimestamp();
        break;
      }
      case 'xmrig': {
        minerembed
          .setAuthor('Crypto Helper', 'https://cdn.discordapp.com/avatars/747050613656911892/f571ada569c6bf641cbd862ba77dceae.png?size=512', 'https://discord.com/oauth2/authorize?client_id=747050613656911892&permissions=274878294080&scope=bot%20applications.commands')
          .setColor('#ec641c')
          .setTitle('**XMRig**')
          .setURL('https://xmrig.com/download')
          .addFields([
            {
              name: '**Info**',
              value:
                '> High performance, open source, cross platform RandomX, KawPow, CryptoNight and AstroBWT CPU/GPU miner',
              inline: false,
            },
            {
              name: '**DevFee**',
              value:
                '> Default dev-fee is 1% (1 minute in 100 minutes) can be increased via option **donate-level** or disabled in source code.',
              inline: false,
            },
            {
              name: 'Mining Setup',
              value: [
                '**Note!** Only use for **cpu mining**. Otherwise use **t-rex** etc.',
                '**1.** Install **T-Rex** from the url in the title. ',
                '**2.** **Open** or **create** any bat file and paste the following code:',
                '```xmrig.exe --donate-level 5 -o pool.xmr.pt:9000 -u <YourWalletAddress> -k -p <WorkerName> --tls --coin <coin> ```',
                '**3.** Change **<coin>** to your desired coin.',
                '**4.** Change **<pool>** to your desired pool.',
                '**5.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name.',
                '**🥳Done!** Run the bat file and enjoy!',
              ].join('\n'),
            }])
          .setThumbnail('https://avatars.githubusercontent.com/u/27528955?v=4')
          .setFooter('Crypto Helper made by Dominik#5555')
          .setTimestamp();
        break;
      }
      default:
        break;
    }
    interaction.editReply({
      embeds: [minerembed],
    });
  },
};
