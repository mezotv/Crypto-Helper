const { Client, Intents } = require('discord.js');
const Cluster = require('discord-hybrid-sharding');

/* Misc */
// console.clear();

/* Initialize client */
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
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
