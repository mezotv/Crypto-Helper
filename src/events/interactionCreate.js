const guildCreate = require('../db/Models/guildModel');

module.exports = async (interaction) => {
  if (!interaction.guild) {
    interaction.reply({
      content: 'You need to be in a server to use this command.',
      ephemeral: true,
    });
  } else {
    guildCreate.findOne({ guildID: interaction.guild.id }).then(async (result) => {
      if (!result) {
        await guildCreate.create({
          guildID: interaction.guild.id,
          botJoined: (Date.now() / 1000) | 0,
          fistCommandUse: (Date.now() / 1000) | 0,
        });
      } else {}

      const { client } = interaction;
      if (!interaction.isCommand()) return;
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        command.execute(interaction, client);
      } catch (err) {
        if (err) console.error(err);
        interaction.reply({
          content: 'An error occurred while executing that command!',
          ephemeral: true,
        });
      }
    });
  }
};
