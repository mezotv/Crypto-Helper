const { REST } = require('@discordjs/rest');
const { ActivityType } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { readdirSync, readFileSync } = require('fs');
const { ChalkAdvanced } = require('chalk-advanced');

module.exports = async (client) => {
  const commandFiles = readdirSync('./src/commands/').filter((file) => file.endsWith('.js'));

  const commands = [];

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  const rest = new REST({
    version: '10',
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === 'PRODUCTION') {
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: commands,
        });
        console.log(
          `${ChalkAdvanced.white('Crypto Helper')} ${ChalkAdvanced.gray(
            '>',
          )} ${ChalkAdvanced.green(
            'Successfully registered commands globally',
          )}`,
        );
      } else {
        await rest.put(
          Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
          {
            body: commands,
          },
        );

        console.log(
          `${ChalkAdvanced.white('Crypto Helper')} ${ChalkAdvanced.gray(
            '>',
          )} ${ChalkAdvanced.green('Successfully registered commands locally')}`,
        );
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();

  setInterval(() => {
    (async () => {
      let rawdata = readFileSync('./src/coindata/ethereum.json');
      let data = JSON.parse(rawdata);

      const status = [
        `⚡${data.result.FastGasPrice} |🚶${data.result.ProposeGasPrice} |🐢${data.result.SafeGasPrice} |`,
      ];

      if (data.result.suggestBaseFee >= 90) {
        client.user.setStatus('dnd');
      } else if (data.result.suggestBaseFee >= 45) {
        client.user.setStatus('idle');
      } else {
        client.user.setStatus('online');
      }

      client.user.setActivity(`${status}`, { type: ActivityType.Watching });
    })();
  }, 15000);
};
