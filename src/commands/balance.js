const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userModel = require('../db/Models/userModel.ts');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Get your current balance')
    .addUserOption((option) => option
      .setName('user')
      .setDescription('Get the balance of a user')
      .setRequired(false)),

  async execute(interaction) {
    let balembed = new MessageEmbed();
    await userModel
      .findOne({ userId: interaction.user.id })
      .then(async (result) => {
        if (!result) {
          const errorembed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Wopps')
            .setDescription(
              'This user does not seem to have a crypto wallet yet!\n Use any command to create one!',
            );

          await interaction.reply({
            embeds: [errorembed],
            ephemeral: true,
          });
        }
        await userModel
          .findOne({ userID: interaction.user.id })
          .then(async (result) => {
            balembed
              .setColor('#5865f4')
              .setTitle('Crypto Wallet')
              .addField(
                {
                  name: `**${interaction.user.username}'s balance**`,
                  value: `> Bank: $${result.bankMoney} \n > Wallet: $${result.walletMoney}`,
                  inline: false,
                },
              );

            await interaction.reply({
              embeds: [balembed],
            });
          });
      });
  },
};
