const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("miner")
    .setDescription("Shows a setup for the selected miner")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("phoenixminer")
        .setDescription("Setup for Phoenix miner")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("trexminer").setDescription("Setup for T-rex Miner")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("nbminer").setDescription("Setup for NbMiner")
    )
    .addSubcommand((subCommand) =>
    subCommand.setName("teamredminer").setDescription("Setup for Team Red Miner")
  )
    .addSubcommand((subCommand) =>
      subCommand.setName("xmrig").setDescription("Setup for XMRig")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("salad").setDescription("Setup for Salad.io")
    ),

  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "phoenixminer": {
        var gasembed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
          .setColor("#212020")
          .setTitle("**Phoenix Miner**")
          .setURL("https://phoenixminer.org/")
          .addFields(
            {
              name: "**Info**",
              value: `> PhoenixMiner is fast (arguably the fastest) Ethash (Ethereum, ETC, etc.) miner that supports both AMD and Nvidia cards (including in mixed mining rigs). It runs under Windows x64 and Linux x64`,
              inline: false,
            },
            {
              name: "**DevFee**",
              value:
                "> The lowest devfee of 0.9% (35 seconds defvee mining per each 65 minutes)",
              inline: false,
            }
          )
          .addField(
            "Mining Setup",
            [
              "**Note!** You can get the pool address from the ites like **https://ethermine.org/**.",
              "**1.** Install **PhoenixMiner** from the url in the **title**. ",
              "**2.** **Open** or **create** any bat file and paste the folowing code:",
              "```PhoenixMiner.exe -pool <pool> -pool2 <backupPool> -wal <YourWalletAddress>.<WorkerName>```",
              "**3.** Change <pool> to your desired pool. If you want you can remove the second backup pool or change it aswell.",
              "**4.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name. The worker name is optional.",
              "**🥳Done!** Run that bat file and enjoy!",
            ].join("\n")
          )
          .setThumbnail("https://cdn.discordapp.com/attachments/926292185748496446/972791200308416532/eth.png")
          .setFooter({ text: 'Crypto Helper made by Mezo#0001' })
          .setTimestamp();
        break;
      }
      case "trexminer": {
        var gasembed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
          .setColor("#6a4e38")
          .setTitle("**T-Rex Miner**")
          .setURL("https://github.com/trexminer/T-Rex/releases/tag/0.25.15")
          .addFields(
            {
              name: "**Info**",
              value: `> T-Rex is a versatile cryptocurrency mining software. It supports a variety of algorithms. T-Rex is currently supported on NVIDIA GPUs only.`,
              inline: false,
            },
            {
              name: "**DevFee**",
              value:
                "> Developer fee is 1% (2% for Octopus, Autolykos2, and their dual mining modes).",
              inline: false,
            }
          )
          .addField(
            "Mining Setup",
            [
              "**Note!** You can get the pool address from the ites like **https://ethermine.org/**.",
              "**1.** Install **T-Rex** from the url in the title. ",
              "**2.** **Open** or **create** any bat file and paste the folowing code:",
              "```t-rex -a <algo> -o <pool> -u <YourWalletAddress> -p x -w <WorkerName>```",
              "**3.** Change **<algo>** to your desired algorithm. ",
              "**4.** Change **<pool>** to your desired pool.",
              "**5.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name.",
              "**Optional** Go to **http://127.0.0.1:4067/** to see your miner stats.",
              "**🥳Done!** Run that bat file and enjoy!",
            ].join("\n")
          )
          .setThumbnail("https://trex-miner.com/img/t-rex.png")
          .setFooter({ text: 'Crypto Helper made by Mezo#0001' })
          .setTimestamp();
        break;
      }
      case "nbminer": {
        var gasembed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
          .setColor("#fefffe")
          .setTitle("**NBMiner**")
          .setURL("https://github.com/NebuTech/NBMiner/releases")
          .addFields(
            {
              name: "**Info**",
              value: `> NBMiner comes with multiple different files that say start_ all those files are pre-made templates for mining different cryptocurrencies.`,
              inline: false,
            },
            {
              name: "**DevFee**",
              value:
                "> Depending on your choosen algorythm, the developer fee is between 1% and 3%.",
              inline: false,
            }
          )
          .addField(
            "Mining Setup",
            [
              "**Note!** You can get the pool address from the ites like **https://ethermine.org/**.",
              "**1.** Install **T-Rex** from the url in the title. ",
              "**2.** **Open** or **create** any bat file and paste the folowing code:",
              "```nbminer -a <algo> -o <pool> -u <YourWalletAddress>.<WorkerName>```",
              "**3.** Change **<algo>** to your desired algorithm.",
              "**4.** Change **<pool>** to your desired pool.",
              "**5.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name.",
              "**🥳Done!** Run that bat file and enjoy!",
            ].join("\n")
          )
          .setThumbnail("https://github.com/NebuTech/NBMiner/blob/master/logo.png?raw=true")
          .setFooter({ text: 'Crypto Helper made by Mezo#0001' })
          .setTimestamp();
        break;
      }
      case "teamredminer": {
        var gasembed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
        .setColor("#e40607")
        .setTitle("**Team Red Miner**")
        .setURL("https://github.com/todxx/teamredminer/releases/tag/v0.9.4.2")
        .addFields(
          {
            name: "**Info**",
            value: `> This is an optimized miner for AMD GPUs and Xilinx FPGAs created by todxx and kerney666.`,
            inline: false,
          },
          {
            name: "**DevFee**",
            value:
              "> Depending on the algorythm, the developer fee is between 0.75% and 3%.",
            inline: false,
          }
        )
        .addField(
          "Mining Setup",
          [
            "**Note!** You can get the pool address from the ites like **https://ethermine.org/**.",
            "**1.** Install **T-Rex** from the url in the title. ",
            "**2.** **Open** or **create** any bat file and paste the folowing code:",
            "```teamredminer.exe -a <algo> -o <pool> -u <YourWalletAddress>.<WorkerName> -p x```",
            "**3.** Change **<algo>** to your desired algorithm. ",
            "**4.** Change **<pool>** to your desired pool.",
            "**5.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name.",
            "**🥳Done!** Run that bat file and enjoy!",
          ].join("\n")
        )
        .setThumbnail("https://www.teamredminer.com/assets/img/TRMrw_transp.png")
        .setFooter({ text: 'Crypto Helper made by Mezo#0001' })
        .setTimestamp();
      break;
      }
      case "xmrig": {
        var gasembed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
          .setColor("#ec641c")
          .setTitle("**XMRig**")
          .setURL("https://xmrig.com/download")
          .addFields(
            {
              name: "**Info**",
              value: `> High performance, open source, cross platform RandomX, KawPow, CryptoNight and AstroBWT CPU/GPU miner`,
              inline: false,
            },
            {
              name: "**DevFee**",
              value:
                "> Default devfee is 1% (1 minute in 100 minutes) can be increased via option **donate-level** or disabled in source code.",
              inline: false,
            }
          )
          .addField(
            "Mining Setup",
            [
              "**Note!** Only use for **cpu mining**. Otherwise use **t-rex** etc.",
              "**1.** Install **T-Rex** from the url in the title. ",
              "**2.** **Open** or **create** any bat file and paste the folowing code:",
              "```xmrig.exe --donate-level 5 -o pool.xmr.pt:9000 -u <YourWalletAddress> -k -p <WorkerName> --tls --coin <coin> ```",
              "**3.** Change **<coin>** to your desired coin.",
              "**4.** Change **<pool>** to your desired pool.",
              "**5.** Change **<YourWalletAddress>** to your wallet address and **<WorkerName>** to your desired worker name.",
              "**🥳Done!** Run the bat file and enjoy!",
            ].join("\n")
          )
          .setThumbnail("https://avatars.githubusercontent.com/u/27528955?v=4")
          .setFooter({ text: 'Crypto Helper made by Mezo#0001' })
          .setTimestamp();
        break;
      }
      case "salad": {
        var gasembed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
        .setColor("#b1d234")
        .setTitle("**Salad**")
        .setURL("https://salad.com/download")
        .addFields(
          {
            name: "**Info**",
            value: `> Salad is the easiest and most trusted way to computeshare.`,
            inline: false,
          },
          {
            name: "**DevFee**",
            value:
              "> Salad doesnt add any devfee other than the pool fee. Some items on the store got fees on them though.",
            inline: false,
          }
        )
        .addField(
          "Mining Setup",
          [

            "**1.** Install **Salad** from the url in the title.",
            "**2.** Enter your email and the code sent to it",
            "**3.** You will get asked for a referal code. Make sure to enter **helper** to support our project. Once entered press the checkmark button next to it.",
            "**4.** Whitelist salad on your anti virus like shown here **https://support.salad.com/category/30-anti-virus**",
            "**5.** Press the start button and wait till it says **chopping**",
            "**Optional** Go to **https://app.salad.io/earn/summary** to keep track of your income.",
            "**🥳Done!** Now just wait for your money to come in!",
          ].join("\n")
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/697180189729226814/734781267509248111/favicon.512x512.png")
        .setFooter({ text: 'Crypto Helper made by Mezo#0001' })
        .setTimestamp();
      break;
      }
      default:
        break;
    }
    interaction.reply({
      embeds: [gasembed],
    });
  },
};
