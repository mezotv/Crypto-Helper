const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userModel = require('../db/Models/userModel.ts');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mine')
    .setDescription('Mine crypto coins!'),

  async execute(interaction, client) {
    if (client.talkedRecently.has(interaction.user.id)) {
      return interaction.reply('You can only use this command once every 2 hours!');
    }
    const rawcoins = Math.floor(Math.random(100) * 300) + 100;
    let multiplier = 1;
    await userModel
      .findOne({
        userID: interaction.user.id,
      })
      .then(async (result) => {
        for (let miner = 0; miner <= result.minerCount - 1; miner += 1) {
          multiplier += 0.1;
        }
        if (result.voted == true) multiplier += 0.2;
      });
    const coins = Math.floor(rawcoins * multiplier);
    userModel
      .findOne({
        userID: interaction.user.id,
      })
      .then(async (result) => {
        if (result) {
          await userModel.findOneAndUpdate(
            { userID: interaction.user.id },
            { bankMoney: result.bankMoney += coins },
          );
        }
      });

    const votemebed = new MessageEmbed()
      .setAuthor({
        name: `${client.user.username}`,
        iconURL: client.user.avatarURL(),
      })
      .setColor('#5865f4')
      .setTitle(
        `You have mined **\`${coins}\`** <:bitcoin:976394052708749342> !`,
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: 'Crypto Helper made by Developer Dungeon Studios' });

    await interaction.reply({
      embeds: [votemebed],
    });
    client.talkedRecently.add(interaction.user.id);
    setTimeout(() => {
      client.talkedRecently.delete(interaction.user.id);
    }, 1000 * 60 * 2);
  },
};
