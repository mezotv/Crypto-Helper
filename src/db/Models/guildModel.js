const { Schema, model } = require('mongoose');

const guildProfile = new Schema(
  {
    guildID: {
      type: String,
      required: true,
      unique: true,
    },
    botJoined: {
      type: Number,
    },
    fistCommandUse: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = model('guildProfile', guildProfile);
