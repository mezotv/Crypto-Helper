const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();
const client = require("../index");
const { result } = require("../coindata/ethereum.json");

const { updateGas } = require("./updateGas");

const { autoPoster } = require("./autoPoster");


client.once("ready", async () => {
  const commandFiles = readdirSync("./src/commands/").filter((file) =>
    file.endsWith(".js")
  );

  const commands = [];

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const CLIENT_ID = client.user.id;

  const rest = new REST({
    version: "9",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === "PRODUCTION") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        console.log("Successfully registered commands globally");
        // Only updates Top.gg stats when bot is in production
        autoPoster();
        // Only updates gas price when bot is in production
        updateGas();

      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          {
            body: commands,
          }
        );
        updateGas();
        console.log("Successfully registered commands locally");
        
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();

  setInterval(() => {
    let status = [
      `⚡${result.FastGasPrice} |🚶${result.ProposeGasPrice} |🐢${result.SafeGasPrice} |`,
    ];

    client.user.setPresence({
      activities: [{ name: `${status}` }],
      status: "dnd",
    });
  }, 15000);
});
