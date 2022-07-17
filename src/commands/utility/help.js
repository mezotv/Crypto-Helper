const { path } = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { readdirSync, readFileSync } = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get a list of all commands supported by the bot')
    .addSubcommand((subCommand) => subCommand.setName('utility').setDescription('List of all utility commands'))
    .addSubcommand((subCommand) => subCommand.setName('crypto').setDescription('List of all crypto commands')),

  async execute(interaction, client) {
    let helpembed = new MessageEmbed();
    switch (interaction.options.getSubcommand()) {
      case 'utility': {
        // loop through all commands in the utility folder and retrieve their names and descriptions
        const utilityPath = await path.join(__dirname, '../utility/');
        const utilityFolders = readdirSync(utilityPath);
        const utilityCommands = [];
        for (const folder of utilityFolders) {
          const folderPath = path.join(utilityPath, folder);
          const commandFiles = readdirSync(folderPath).filter((file) => file.endsWith('.js'));
          for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);
            utilityCommands.push(command.data.toJSON());
          }
        }
        helpembed
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .setColor('#5865f4')
          .setTitle('📰 Utility Commands')
          .addFields(utilityCommands.map((command) => ({
            name: `${command.name}`,
            value: `${command.description}`,
          })))
          .setFooter({ text: 'Crypto Helper made by Developer Dungeon Studios' })
          .setTimestamp();
        break;
      }
      case 'crypto': {
        // loop through all commands in the crypto folder and retrieve their names and descriptions
        const cryptoPath = await path.join(__dirname, '../crypto/');
        const cryptoFolders = readdirSync(cryptoPath);
        const cryptoCommands = [];
        for (const folder of cryptoFolders) {
          const folderPath = path.join(cryptoPath, folder);
          const commandFiles = readdirSync(folderPath).filter((file) => file.endsWith('.js'));
          for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);
            cryptoCommands.push(command.data.toJSON());
          }
        }
        helpembed
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .setColor('#5865f4')
          .setTitle('⛏️ Crypto Commands')
          .addFields(cryptoCommands.map((command) => ({
            name: `${command.name}`,
            value: `${command.description}`,
          })))
          .setTimestamp()
          .setFooter({
            text: 'Crypto Helper made by Developer Dungeon Studios',
          });
        break;
      }
      default:
        break;
    }
    await interaction.reply({
      embeds: [helpembed],
    });
  },
};
