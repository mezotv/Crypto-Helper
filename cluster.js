const Cluster = require('discord-hybrid-sharding');
require('dotenv').config();

const { ChalkAdvanced } = require('chalk-advanced');

const manager = new Cluster.Manager(`${__dirname}/src/index.js`, {
  totalShards: 4, // or 'auto'
  /// Check below for more options
  shardsPerClusters: 2,
  // totalClusters: 7,
  mode: 'process', // you can also choose "worker"
  token: process.env.TOKEN,
});

manager.extend(
  new Cluster.HeartbeatManager({
    interval: 2000, // Interval to send a heartbeat
    maxMissedHeartbeats: 5, // Maximum amount of missed Heartbeats until Cluster will get respawned
  }),
);

manager.on('clusterCreate', (cluster) => console.log(ChalkAdvanced.green(`Launched cluster ${cluster.id}!`)));
manager.spawn({ timeout: -1 });
