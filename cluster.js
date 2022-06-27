const Cluster = require('discord-hybrid-sharding');
require('dotenv').config();

const manager = new Cluster.Manager(`${__dirname}/src/index.js`, {
  totalShards: 4, // or 'auto'
  /// Check below for more options
  shardsPerClusters: 2,
  // totalClusters: 7,
  mode: 'process', // you can also choose "worker"
  token: process.env.TOKEN,
});

manager.on('clusterCreate', (cluster) => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });
