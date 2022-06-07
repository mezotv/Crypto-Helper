const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();
const client = require("../index");
const { ChalkAdvanced } = require("chalk-advanced");
const axios = require("axios");
const { FetchWebsite } = require("../util/fetchWebsite");

const { postStats } = require("./botlists/botlists");

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
        console.log(
          `${ChalkAdvanced.white("Crypto Helper")} ${ChalkAdvanced.gray(
            ">"
          )} ${ChalkAdvanced.green(
            "Successfully registered commands globally"
          )}`
        );
        FetchWebsite(client);
        postStats();
      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          {
            body: commands,
          }
        );

        console.log(
          `${ChalkAdvanced.white("Crypto Helper")} ${ChalkAdvanced.gray(
            ">"
          )} ${ChalkAdvanced.green("Successfully registered commands locally")}`
        );
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();

  setInterval(() => {
    (async () => {
      let data;
      try {
        await axios({
          method: "post",
          url: `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then(function (res) {
            data = res.data;
          })
          .catch(function (err) {
            console.log(err);
          });
      } catch (err) {
        return;
      }
      let status = [
        `⚡${data.result.FastGasPrice} |🚶${data.result.ProposeGasPrice} |🐢${data.result.SafeGasPrice} |`,
      ];

      if (data.result.suggestBaseFee >= 90) {
        client.user.setStatus("dnd");
      } else if (data.result.suggestBaseFee >= 45) {
        client.user.setStatus("idle");
      } else {
        client.user.setStatus("online");
      }

      client.user.setActivity(`${status}`, { type: "WATCHING" });
    })();
  }, 15000);
});
