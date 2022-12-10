const { Embed, } = require('interactions.js');
const axios = require('axios');

module.exports = {
  name: 'global',
  description: 'Global Info about cryptocurrencies',
  async execute(interaction, client) {
    interaction.deferReply();

    let cryptoData;
    try {
      await axios({
        method: 'GET',
        url: 'https://coingecko.p.rapidapi.com/global',
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
    const globalembed = new Embed()
      .setColor('#5865f4')
      .setTitle('Global Crypto Info')
      .addFields([
        { name: 'Active Cryptocurrencies', value: `${cryptoData.data.active_cryptocurrencies}`, inline: true },
        { name: 'Active Markets', value: `${cryptoData.data.markets}`, inline: true },
        { name: 'Market Cap Change 24h', value: `${cryptoData.data.market_cap_change_percentage_24h_usd}%`, inline: false },
        { name: 'Last Update:', value: `<t:${cryptoData.data.updated_at}:R>`, inline: false },
      ])
      .setTimestamp()
      .setFooter('Crypto Helper made by Dominik#5555');

    return interaction.editReply({
      embeds: [globalembed],
    });
  },
};
