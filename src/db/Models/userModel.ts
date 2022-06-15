import { Schema, model } from 'mongoose';

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
    nextVote: {
      type: Number,
    },
    voted: {
      type: Boolean,
      default: false,
    },
    userHash: {
      type: String,
      required: true,
      default: 'Not hashed yet',
    },
    lastVote: {
      type: Number,
    },
    totalVotes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = model('userProfile', userProfile);
