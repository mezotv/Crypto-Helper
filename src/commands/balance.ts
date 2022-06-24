import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
const userModel = require('../db/Models/userModel.ts');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Get your current balance')
    .addUserOption((option) => option
      .setName('user')
      .setDescription('Get the balance of a user')
      .setRequired(false)),

  async execute(interaction: any) {
    let balembed = new MessageEmbed();
    if (interaction.options.getUser('user')) {
      await userModel
        .findOne({
          userId: interaction.options.getUser('user').id,
        })
        .then(async (result: any) => {
          if (!result) {
            if (interaction.options.getUser('user').id == interaction.user.id) {
              const errorembed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Wopps')
                .setDescription(
                  'You dont seem to have a crypto wallet yet so we just made one for you!',
                );
              await interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            }
          } else {
            const errorembed = new MessageEmbed()
              .setColor('RED')
              .setTitle('Wopps')
              .setDescription("This user doesn't have a crypto wallet yet.");

            await interaction.reply({
              embeds: [errorembed],
              ephemeral: true,
            });
          }
        });
    } else {
      await userModel
        .findOne({
          userId: interaction.user.id,
        })
        .then(async (result: any) => {
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
            .findOne({
              userID: interaction.user.id,
            })
            .then(async (result: any) => {
              balembed
                .setColor('#5865f4')
                .setTitle(`${interaction.user.username}'s Crypto Wallet`)
                .addField('Physical Wallet', `**\` ${result.walletMoney}  \`** <:bitcoin:976394052708749342>`, true)
                .addField('Digital Wallet', `**\` ${result.bankMoney}  \`** <:bitcoin:976394052708749342>`, true);

              await interaction.reply({
                embeds: [balembed],

              });
            });
        });
    }
  },
};
