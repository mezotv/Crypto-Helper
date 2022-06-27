const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { hashify } = require('hashify-matchify');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hashify')
    .setDescription('Hash a given string')
    .addStringOption((option) => option
      .setName('content')
      .setDescription('The string you want to hash')
      .setRequired(true)),

  async execute(interaction) {
    const hashstring = `**${interaction.options.getString('content')}**`;

    const { hash } = await hashify(hashstring);

    const hashembed = new MessageEmbed()
      .setColor('#5865f4')
      .setTitle('🪴 String hashed!')
      .addFields(
        {
          name: '**Input String:**',
          value: `> ${hashstring}`,
          inline: false,
        },
        {
          name: '**Hashed String:**',
          value: `||${hash}||`,
          inline: false,
        },
      );

    await interaction.reply({
      embeds: [hashembed],
    });
  },
};
