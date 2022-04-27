const fetch = require("node-fetch");
const { writeFile } = require("fs");

async function updateGas() {
  setInterval(() => {
      const data = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`;
      try {
        fetch(data, {
          method: "GET",
          headers: {
            apikey: process.env.API_KEY,
          },
        })
          .then((res) => res.json())
          .then((json) => {
          try {
            let datacrypto = JSON.stringify(json, null, 2);
           // console.log("Ethereum Fees Updated");
            writeFile("./src/coindata/ethereum.json", datacrypto, (err) => {
              if (err) console.log(err);
            });
            } catch (err) {

 console.log(err)

}
          });
      }

      const data2 = `https://bitcoinfees.earn.com/api/v1/fees/recommended`;
      try {
        fetch(data2, {
          method: "GET",
          headers: {
            apikey: process.env.API_KEY,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            let datacrypto = JSON.stringify(json, null, 2);
            //console.log("Bitcoin Fees Updated");
            writeFile("./src/coindata/bitcoin.json", datacrypto, (err) => {
              if (err) console.log(err);
            });
          });
      } catch (error) {
        console.log(error);
      }
}, 15000);
}

module.exports = { updateGas };
