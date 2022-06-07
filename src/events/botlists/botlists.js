const axios = require("axios");
const { InfinityAutoPoster } = require("ibl-autopost");
require("dotenv").config();
const client = require("../../index");
const { AutoPoster } = require("topgg-autoposter");

const ap = AutoPoster(`${process.env.AUTO_POSTER}`, client);

async function postStats() {
  voidPoster();
  topggPoster();
  InfinityPoster();
  radarPoster();
  botlistmePoster();
}

async function voidPoster() {
  axios({
    method: "post",
    url: "https://api.voidbots.net/bot/stats/747050613656911892",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: process.env.VOIDTOKEN,
    },
    data: {
      server_count: client.guilds.cache.size,
      shard_count: 10,
    },
  })
    .then(function (res) {})
    .catch(function (err) {});
}

async function botlistmePoster() {
  axios({
    method: "post",
    url: "https://api.botlist.me/api/v1/bots/747050613656911892/stats",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: process.env.BOTLISTMETOKEN,
    },
    data: {
      server_count: client.guilds.cache.size,
      shard_count: 1,
    },
  })
    .then(function (res) {})
    .catch(function (err) {
      console.log(err);
    });
}
async function radarPoster() {
  axios({
    method: "post",
    url: "https://radarbotdirectory.xyz/api/bot/747050613656911892/stats",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: process.env.RADARTOKEN,
    },
    data: {
      guilds: client.guilds.cache.size,
      shards: 1,
    },
  })
    .then(function (res) {})
    .catch(function (err) {});
}

async function topggPoster() {
  ap.on("posted", () => {
    console.log("Stats pushed to https://top.gg/bot/747050613656911892");
  });
}

async function InfinityPoster() {
  const poster = InfinityAutoPoster(process.env.INFINITYTOKEN, client); // your discord.js or eris client

  // Optional Logger
  poster.on("posted", (stats) => {
    console.log(
      `Posted stats to the Infinity Bot List API | ${stats.servers} servers`
    );
  });
}

module.exports = { postStats };
