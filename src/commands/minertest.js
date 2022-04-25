const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("minertest")
    .setDescription("Lets you configure miner settings")
    .addSubcommand((phoenix) =>
      phoenix.setName("phoenixminer").setDescription("Setup for Phoenix miner")
    )
    .addSubcommand((trex) =>
      trex.setName("trexminer").setDescription("Setup for T-rex miner")
    )
    .addSubcommand((nbminer) =>
      nbminer.setName("nbminer").setDescription("Setup for NbMiner")
    )
    .addSubcommand((xmrig) =>
      xmrig
        .setName("xmrig")
        .setDescription("Setup for XMRig")
    )
    .addSubcommand((gminer) =>
      gminer
        .setName("gminer")
        .setDescription("Setup for GMiner")
    ),
  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {

      case "phoenixminer": {
        const phoenixembed = new MessageEmbed()
        .setTitle("Phoenix Miner")
        .setDescription("PhoenixMiner is fast (arguably the fastest) Ethash (Ethereum, ETC, etc.) miner that supports both AMD and Nvidia cards (including in mixed mining rigs). It runs under Windows x64 and Linux x64")
        

        await interaction.editReply({
          embeds: [phoenixembed],
        });
      }
     case "trexminer": {
        const trexembed = new MessageEmbed().setTitle("trex Miner")

        await interaction.editReply({
          embeds: [trexembed],
        });
      }
      case "nbminer": {
        const nbminerembed = new MessageEmbed().setTitle("nbminer")

        await interaction.editReply({
          embeds: [nbminerembed],
        });
      }
      case "xmrig": {
        const xmrigembed = new MessageEmbed().setTitle("xmrig")

        await interaction.editReply({
          embeds: [xmrigembed],
        });
      }
      case "gminer": {
        const gminerembed = new MessageEmbed().setTitle("gminer")

        await interaction.editReply({
          embeds: [gminerembed],
        });
      }
    }
  },
};
