const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, version: djsversion } = require("discord.js");
const { version } = require("../../package.json");
const os = require("os");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Shows all info about the bot and its developer"),
  async execute(interaction, client) {
    const core = os.cpus()[0];
    const createdAt = new Date(client.user.createdTimestamp).toLocaleString(
      "en-GB"
    );

    const infoembed = new MessageEmbed()
      .setColor("#2e3036")
      .setTitle("Bot Info")
      .setThumbnail(client.user.displayAvatarURL())
      .addField(
        "General",
        [
          `**❯ Developer:** [Mezo](https://sexymezo.com)`,
          `**❯ Client:** [Crypto Helper Invite](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`,
          `**❯ Commands:** ${client.commands.size}`,
          `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
          `**❯ Users:** ${client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString()}`,
          `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
          `**❯ Creation Date:** ${createdAt}`,
          `**❯ Bot Version:** v${version}`,
          `**❯ Node.js:** ${process.version}`,
          `**❯ Discord.js:** v${djsversion}`,
        ].join("\n")
      )
      .addField(
        "System",
        [
          `**❯ Platform:** ${process.platform}`,
          `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
          "**❯ CPU:**",
          `> Cores: ${os.cpus().length / 2}`,
          `> Threads: ${os.cpus().length}`,
          `> Model: ${core.model}`,
          `> Base Speed: ${core.speed}MHz`,
        ].join("\n")
      )
      .setTimestamp();

    await interaction.reply({ embeds: [infoembed] });
  },
};
