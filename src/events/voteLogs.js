const Topgg = require("@top-gg/sdk");
const express = require("express");
require("dotenv").config();

const app = express();
const webhook = new Topgg.Webhook(process.env.TOPGGTOKEN);

async function voteLogs() {
  app.post(
    "/dblwebhook",
    webhook.listener((vote) => {
      console.log(vote.user);


    })
  );

  app.listen(69);
}
module.exports = { voteLogs };
