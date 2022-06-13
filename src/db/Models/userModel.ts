import { Schema, model } from'mongoose';

const userProfile = new Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    bankMoney: {
      type: Number,
      default: 1000,
    },
    walletMoney: {
      type: Number,
      default: 0,
    },
    minerCount: {
      type: Number,
      default: 0,
    },
    voted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = model('userProfile', userProfile);
