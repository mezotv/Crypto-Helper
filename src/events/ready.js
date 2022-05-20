const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();
const client = require("../index");
const fetch = require("node-fetch");

const { postStats } = require("./botlists/botlists")


client.on("ready", async () => {
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
    version: "10",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === "PRODUCTION") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        console.log("Successfully registered commands globally");
        postStats()

      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          {
            body: commands,
          }
        );

        console.log("Successfully registered commands locally");
        
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();

  setInterval(() => {
    (async () => {
      let data;

      await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
            data = res
      });
    let status = [
      `⚡${data.result.FastGasPrice} |🚶${data.result.ProposeGasPrice} |🐢${data.result.SafeGasPrice} |`,
    ];
    client.user.setPresence({
      activities: [{ name: `${status}` }],
      status: "dnd",
    });

  })();
  }, 15000);
});
