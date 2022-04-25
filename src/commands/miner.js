const { SlashCommandBuilder } = require("@discordjs/builders");
const { result } = require("../coindata/ethereum.json");
const {
  fastestFee,
  halfHourFee,
  hourFee,
} = require("../coindata/bitcoin.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("miner")
    .setDescription("Shows the current gas price for the selected coin")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("phoenixminer")
        .setDescription("Setup for Phoenix miner")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("trexminer").setDescription("Setup for T-rex miner")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("nbminer").setDescription("Setup for NbMiner")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("xmrig").setDescription("Setup for XMRig")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("gminer").setDescription("Setup for GMiner")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("salad").setDescription("Setup for Salad.io")
    ),

  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "phoenixminer": {
        var gasembed = new MessageEmbed()
          .setColor("#5865f4")
          .setTitle("**Phoenix Miner**")
          .setDescription("Setup for Phoenix Miner")
          .setTimestamp();
        break;
      }
      case "trexminer": {
        var gasembed = new MessageEmbed()
          .setColor("#5865f4")
          .setTitle("**Trex Miner**")
          .setDescription("Setup for Trex Miner")
          .setTimestamp();
        break;
      }
      case "nbminer": {
        var gasembed = new MessageEmbed()
          .setColor("#5865f4")
          .setTitle("**NBminer**")
          .setDescription("Setup fornbminer") 
          .setTimestamp();
        break;
      }
      case "xmrig": {
        var gasembed = new MessageEmbed()
          .setColor("#5865f4")
          .setTitle("**Xmrig Miner**")
          .setDescription("Setup for Xmrig Miner")
          .setTimestamp();
        break;
      }
      case "gminer": {
        var gasembed = new MessageEmbed()
          .setColor("#5865f4")
          .setTitle("**Gminer**")
          .setDescription("Setup for Gminer")
          .setTimestamp();
        break;
      }
      case "salad": {
        var gasembed = new MessageEmbed()
          .setColor("#5865f4")
          .setTitle("**Salad**")
          .setDescription("Setup for Salad")
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
