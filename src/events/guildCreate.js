const guildcreate = require('../db/Models/guildModel');

module.exports = async (guild) => {
  const result = await guildcreate.findOne({ guildID: guild.id });
  if (!result) {
    await guildcreate.create({
      guildID: guild.id,
      botJoined: (Date.now() / 1000) | 0,
    });
  } else {
  }
};
