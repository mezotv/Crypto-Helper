const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { writeFile } = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coin')
    .setDescription('Get info about a coin')
    .addStringOption((option) => option.setName('name')
      .setDescription('name for the coin you want to get')
      .setRequired(true)),

  async execute(interaction, client) {
    let datacrypto;
    try {
      await axios({
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${interaction.options.getString('name')}`,
        headers: {
          'X-RapidAPI-Key': process.env.COINAPI,
          'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
        },
      })
        .then((res) => {
          datacrypto = res.data;
        })
        .catch(() => {
        });
    } catch (err) {}
    let coinembed;

    if (datacrypto == undefined || null) {
      coinembed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Error')
        .setDescription('Could not find coin with the given id');
    } else {
      coinembed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Coin: ${datacrypto.name}`)
        .setDescription(`Price: ${datacrypto.market_data.current_price.usd}$`);
    }
    await interaction.reply({
      embeds: [coinembed],
    });
  },
};
