const { Application } = require('interactions.js');
const { fetchGas } = require('./util/fetchGas');
require('dotenv').config();

/* Initialize client */
const client = new Application({
  botToken: process.env.TOKEN,
  publicKey: process.env.PUBLICKEY,
  applicationId: process.env.APPLICATIONID,
});
const cryptoClientComponents = async () => {
  await require('./util/cryptoClient')(client);
};

fetchGas();
cryptoClientComponents();
