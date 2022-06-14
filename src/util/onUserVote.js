const { Webhook } = require('@top-gg/sdk');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const express = require('express');

require('dotenv').config;

const userModel = require('../db/Models/userModel.ts');

const app = express();

module.exports = async function postStats(client) {
  const webhook = new Webhook(process.env.DBLTOKEN);

  app.post(
    '/dblwebhook',
    webhook.listener(async (vote) => {
      const voteUser = await client.users.fetch(vote.user);
      const staffDm = await client.users.fetch('347077478726238228');

      let voteEmbed = new MessageEmbed();
      let staffEmbed = new MessageEmbed();

      userModel
        .findOne({
          guildID: vote.user,
        })
        .then(async (result) => {
          if (result) {
            await userModel.findOneAndUpdate({
              lastVote: (Date.now() / 1000) | 0,
              voted: true,
              totalVotes: result.totalVotes + 1,
              bankMoney: result.bankMoney + 1000,
            });
          } else {
            await userModel.create({
              userID: vote.user,
              lastVote: (Date.now() / 1000) | 0,
              voted: true,
              totalVotes: 1,
              bankMoney: 2000,
            });
          }
          voteEmbed
            .setColor('#5865f4')
            .setTitle('Thanks for your Vote!')
            .addFields(
              {
                name: 'Last vote:',
                value: `<t:${(Date.now() / 1000) | 0}:R>`,
                inline: false,
              },
              {
                name: 'Vote count:',
                value: `**${result.totalVotes + 1}**`,
                inline: false,
              },
              {
                name: 'Voting benefits:',
                value: '> + $1000',
                inline: false,
              },
            );
          staffEmbed
            .setColor('#5865f4')
            .setTitle('Someone Voted for me🥳')
            .addFields(
              {
                name: 'User id:',
                value: `${vote.user}`,
                inline: false,
              },
            );
        });

      const voteButton = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('Vote Again!')
          .setStyle('LINK')
          .setEmoji('🥳')
          .setURL(
            'https://top.gg/bot/747050613656911892/vote',
          ),
      );

      voteUser.send({ embeds: [voteEmbed], components: [voteButton] }).catch(() => {
        staffDm.send({ embeds: [staffEmbed] });
        return;
      });
    }),
  );
};
app.listen(3000);
