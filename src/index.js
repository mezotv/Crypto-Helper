const { Client, GatewayIntentBits } = require('discord.js');
const Cluster = require('discord-hybrid-sharding');

/* Misc */
console.clear();

/* Initialize client */
const client = new Client({
  intents: [
    GatewayIntentBits.GUILDS,
    GatewayIntentBits.GUILD_MESSAGES,
    GatewayIntentBits.DIRECT_MESSAGES,
  ],
  shards: Cluster.data.SHARD_LIST,
  shardCount: Cluster.data.TOTAL_SHARDS,
});

const cryptoClientComponents = async () => {
  await require('./util/cryptoClient')(client);
  await require('./util/botlists')(client);

  await require('./db/dbHandler');
};
const { fetchGas } = require('./util/fetchGas');

fetchGas();
cryptoClientComponents();
