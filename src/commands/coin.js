const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coin')
    .setDescription('Get advanced info about a crypto currenzy')
    .addStringOption((option) => option.setName('name')
      .setDescription('name for the coin you want to get')
      .setRequired(true)),

  async execute(interaction, client) {
    let cryptoData;
    try {
      await axios({
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${interaction.options.getString('name')}`,
        params: {
          localization: 'true',
          tickers: 'true',
          market_data: 'true',
          community_data: 'true',
          developer_data: 'true',
          sparkline: 'false',
        },
        headers: {
          'X-RapidAPI-Key': process.env.COINAPI,
          'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
        },
      })
        .then((res) => {
          cryptoData = res.data;
        })
        .catch(() => {
        });
    } catch (err) {}
    let coinembed;

    if (cryptoData == undefined || null) {
      coinembed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Error')
        .setDescription('Could not find a coin with the given ID.');
    } else {
      coinembed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Coin: ${cryptoData.name}`)
        .setThumbnail(cryptoData.image.large)
        .addFields(
          { name: 'Symbol', value: cryptoData.symbol, inline: true },
          { name: 'Market Cap Rank', value: `#${cryptoData.market_cap_rank}`, inline: true },
          { name: 'Price in USD', value: `$${cryptoData.market_data.current_price.usd}`, inline: true },
          { name: 'Price in EUR', value: `${cryptoData.market_data.current_price.eur}€`, inline: true },
          { name: '24h Price Change', value: `${cryptoData.market_data.price_change_percentage_24h}%`, inline: true },
          { name: 'Volume', value: `$${cryptoData.market_data.total_volume.usd}`, inline: true },
          { name: 'Circulating Supply', value: `${cryptoData.market_data.circulating_supply}`, inline: true },
          { name: 'Total Supply', value: `${cryptoData.market_data.total_supply}`, inline: true },
          { name: 'Website', value: `[${cryptoData.links.homepage[0]}](${cryptoData.links.homepage[0]})`, inline: true },
        )
        .setTimestamp()
        .setFooter({
          text: 'Crypto Helper made by Developer Dungeon Studios',
        });
    }
    await interaction.reply({
      embeds: [coinembed],
    });
  },
};
