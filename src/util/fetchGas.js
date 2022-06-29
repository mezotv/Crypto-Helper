const axios = require('axios');
const { writeFile } = require('fs');
require('dotenv').config();

const path = './src/coindata/ethereum.json';

async function fetchGas() {
  let datacrypto;
  setInterval(async () => {
    try {
      await axios({
        method: 'post',
        url: `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((res) => {
          datacrypto = JSON.stringify(res.data, null, 2);
          writeFile(path, datacrypto, (err) => {
            if (err) throw err;
          });
        })
        .catch(() => {
        });
    } catch (err) {}
  }, 12000);
}

module.exports = { fetchGas };
