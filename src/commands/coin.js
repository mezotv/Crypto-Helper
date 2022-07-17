const axios = require('axios');
const { MessageEmbed, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coin')
    .setDescription('Get advanced info about a crypto currenzy')
    .addStringOption((option) => option.setName('name')
      .setDescription('name for the coin you want to get')
      .setRequired(true)),

  async execute(interaction, client) {
    let datacrypto;
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
        .setDescription('Could not find a coin with the given id');
    } else {
      coinembed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Coin: ${datacrypto.name}`)
        .setThumbnail(datacrypto.image.large)
        .addFields(
          { name: 'Symbol', value: datacrypto.symbol, inline: true },
          { name: 'Market Cap Rank', value: `#${datacrypto.market_cap_rank}`, inline: true },
          { name: 'Price in USD', value: `$${datacrypto.market_data.current_price.usd}`, inline: true },
          { name: 'Price in EUR', value: `${datacrypto.market_data.current_price.eur}€`, inline: true },
          { name: '24h Price Change', value: `${datacrypto.market_data.price_change_percentage_24h}%`, inline: true },
          { name: 'Volume', value: `$${datacrypto.market_data.total_volume.usd}`, inline: true },
          { name: 'Circulating Supply', value: `${datacrypto.market_data.circulating_supply}`, inline: true },
          { name: 'Total Supply', value: `${datacrypto.market_data.total_supply}`, inline: true },
          { name: 'Website', value: `[${datacrypto.links.homepage[0]}](${datacrypto.links.homepage[0]})`, inline: true },
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
