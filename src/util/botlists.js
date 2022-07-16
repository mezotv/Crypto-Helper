const axios = require('axios');
require('dotenv').config();
const Topgg = require('@top-gg/sdk');
const { ChalkAdvanced } = require('chalk-advanced');

module.exports = async function postStats(client) {
  console.log(
    `${ChalkAdvanced.white('Bot lists')} ${ChalkAdvanced.gray(
      '>',
    )} ${ChalkAdvanced.green(
      'Pushing stats to bot lists...',
    )}`,
  );

  const api = new Topgg.Api(process.env.AUTO_POSTER);

  await api.postStats({
    serverCount: `${client.guilds.cache.size}`,
    shardCount: `${client.cluster.info.TOTAL_SHARDS}`,
  })
    .then(() => {
      console.log(ChalkAdvanced.green('Posted stats to Top.gg!'));
    })
    .catch((err) => {
      console.log(ChalkAdvanced.red(`Error posting stats to Top.gg: ${err}`));
    });

  await axios({
    method: 'post',
    url: 'https://api.voidbots.net/bot/stats/747050613656911892',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: process.env.VOIDTOKEN,
    },
    data: {
      server_count: client.guilds.cache.size,
      shard_count: client.cluster.info.TOTAL_SHARDS,
    },
  })
    .then(() => {
      console.log(ChalkAdvanced.green('Posted stats to Void!'));
    })
    .catch((err) => {
      console.log(ChalkAdvanced.red(`Error posting stats to VoidBots: ${err}`));
    });

  await axios({
    method: 'post',
    url: 'https://api.botlist.me/api/v1/bots/747050613656911892/stats',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: process.env.BOTLISTMETOKEN,
    },
    data: {
      server_count: client.guilds.cache.size,
      shard_count: client.cluster.info.TOTAL_SHARDS,
    },
  })
    .then(() => {
      console.log(ChalkAdvanced.green('Posted stats to BotList.me!'));
    })
    .catch((err) => {
      console.log(ChalkAdvanced.red(`Error posting stats to Botlist.me: ${err}`));
    });

  await axios({
    method: 'post',
    url: 'https://radarbotdirectory.xyz/api/bot/747050613656911892/stats',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: process.env.RADARTOKEN,
    },
    data: {
      guilds: client.guilds.cache.size,
      shards: client.cluster.info.TOTAL_SHARDS,
    },
  })
    .then(() => {
      console.log(ChalkAdvanced.green('Posted stats to RadarBotDirectory!'));
    })
    .catch((err) => {
      console.log(ChalkAdvanced.red(`Error posting stats to RadarBotDirectory: ${err}`));
    });
};
