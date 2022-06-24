import { Collection } from 'discord.js';
require('dotenv').config();

module.exports = (client: any) => {
/* Basically loading the event loader ironic right */
  require('./eventLoader')(client);

  /* It's creating a new collection for the aliases. */
  client.commands = new Collection();
  client.talkedRecently = new Set();

  /* Logging the bot in. */
  client.login(process.env.TOKEN);
};
