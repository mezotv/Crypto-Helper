const { InfinityAutoPoster } = require("ibl-autopost");
require("dotenv").config();
const client = require("../../index");


async function InfinityPoster () {
const poster = InfinityAutoPoster(process.env.INFINITYTOKEN, client); // your discord.js or eris client

// Optional Logger
poster.on("posted", (stats) => {
  console.log(
    `Posted stats to the Infinity Bot List API | ${stats.servers} servers`
  );
});

poster.on("error", (err) => {
  console.log(err);
});
}
module.exports = { InfinityPoster };
