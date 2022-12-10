const axios = require('axios');
const { Embed } = require('interactions.js');

module.exports = {
  name: 'coin',
  description: 'Get advanced info about a crypto currency',
  options: [
    {
      name: 'content',
      description: 'The name for the coin you want to get',
      type: 3,
      required: true,
    },
  ],
  async execute(interaction, client) {

    let datacrypto;
    try {
      await axios({
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${interaction.data.options[0]?.value}`,
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
      coinembed = new Embed()
        .setColor('#F30D0D')
        .setTitle('Error')
        .setDescription('Could not find a coin with the given id');
    } else {
      coinembed = new Embed()
        .setColor('#DEF007')
        .setTitle(`Coin: ${datacrypto.name}`)
        .setThumbnail(datacrypto.image.large)
        .addFields([
          { name: 'Symbol', value: datacrypto.symbol, inline: true },
          { name: 'Market Cap Rank', value: `#${datacrypto.market_cap_rank}`, inline: true },
          { name: 'Price in USD', value: `$${datacrypto.market_data.current_price.usd}`, inline: true },
          { name: 'Price in EUR', value: `${datacrypto.market_data.current_price.eur}€`, inline: true },
          { name: '24h Price Change', value: `${datacrypto.market_data.price_change_percentage_24h}%`, inline: true },
          { name: 'Volume', value: `$${datacrypto.market_data.total_volume.usd}`, inline: true },
          { name: 'Circulating Supply', value: `${datacrypto.market_data.circulating_supply}`, inline: true },
          { name: 'Total Supply', value: `${datacrypto.market_data.total_supply}`, inline: true },
          { name: 'Website', value: `[${datacrypto.links.homepage[0]}](${datacrypto.links.homepage[0]})`, inline: true },
        ])
        .setTimestamp()
        .setFooter('Crypto Helper made by Dominik#5555');
    
    return interaction.editReply({
      embeds: [coinembed],
    });
  }
},
}