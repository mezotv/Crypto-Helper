/* Requiring the nedded libarys*/
const { Collection, Client } = require("discord.js");
require("dotenv").config();
const discordModals = require('discord-modals')

/* It's creating a new client with the needed intents. */
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
});
module.exports = client;

discordModals(client); 

/* Basically loading the even and command loader ironic right */
require("./util/eventLoader" || "./util/commandLoader")(client);

/* It's creating a new collection for the aliases. */
client.aliases = new Collection();
client.commands = new Collection();

/* Logging the bot in. */
client.login(process.env.TOKEN);
