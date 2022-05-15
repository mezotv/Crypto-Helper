const fetch = require("node-fetch")
require("dotenv").config();
const client = require("../../index");


async function voidPoster() {
fetch(`https://api.voidbots.net/bot/stats/747050613656911892`, {
    method: "POST",
    headers: { 
      Authorization: process.env.VOIDTOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"server_count": client.guilds.cache.size.toLocaleString(), "shard_count": 1 })
  }).then(response => response.text())
.then(console.log).catch(console.error);
}
module.exports = { voidPoster };