const fetch = require("node-fetch");
const { writeFile } = require('fs');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function updateGas() {
    for (var i = 0; i < Infinity; i++) {
    const data = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`;
    fetch(data, {
        method: 'GET',
        headers: {
            'apikey': process.env.API_KEY,
        },

    }).then((res) =>
        res.json()
    ).then((json) => {

        let datacrypto = JSON.stringify(json, null, 2);
        writeFile('./src/coindata/ethereum.json', datacrypto, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

        
    },
  await delay(Number(15) * 100));
    }
}
module.exports = { updateGas }

