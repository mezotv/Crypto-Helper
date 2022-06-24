import axios from 'axios';
require('dotenv').config();
import { AutoPoster } from 'topgg-autoposter';
import { ChalkAdvanced } from 'chalk-advanced';

module.exports = function postStats(client: any) {
  AutoPoster(`${process.env.AUTO_POSTER}`, client);

  axios({
    method: 'post',
    url: 'https://api.voidbots.net/bot/stats/747050613656911892',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: process.env.VOIDTOKEN,
    },
    data: {
      server_count: client.guilds.cache.size,
      shard_count: 1,
    },
  })
    .then(() => {})
    .catch(() => {});

  axios({
    method: 'post',
    url: 'https://api.botlist.me/api/v1/bots/747050613656911892/stats',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: process.env.BOTLISTMETOKEN,
    },
    data: {
      server_count: client.guilds.cache.size,
      shard_count: 1,
    },
  })
    .then(() => {})
    .catch(() => {
    });

  axios({
    method: 'post',
    url: 'https://radarbotdirectory.xyz/api/bot/747050613656911892/stats',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: process.env.RADARTOKEN,
    },
    data: {
      guilds: client.guilds.cache.size,
      shards: 1,
    },
  })
    .then(() => {})
    .catch(() => {});

  console.log(
    `${ChalkAdvanced.white('Botlists')} ${ChalkAdvanced.gray(
      '>',
    )} ${ChalkAdvanced.green(
      'Pushing stats to Botlists',
    )}`,
  );
};
