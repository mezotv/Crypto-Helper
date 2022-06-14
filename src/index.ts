import { Client, Intents } from 'discord.js';

/* Misc */
console.clear();

/* Initialize client */
const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGES
    ],
});

const cryptoClientComponents = async () => {
  await require('./util/cryptoClient')(client);
  await require('./util/botlists')(client);
  await require('./util/onUserVote')(client);
  await require('./db/dbHandler.ts');
}

cryptoClientComponents();