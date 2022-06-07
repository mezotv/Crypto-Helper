const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, version: djsversion } = require("discord.js");
const { version } = require("../../package.json");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Shows all info about the bot and its developer"),
  async execute(interaction, client) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const core = os.cpus()[0];

    const infoembed = new MessageEmbed()
    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
      .setColor("#5865f4")
      .setTitle("Bot Info")
      .addField(
        "General",
        [
          `**❯ Developer:** [Mezo](https://sexymezo.com)`,
          `**❯ Client:** [Crypto Helper Invite](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=274878294080&scope=bot%20applications.commands)`,
          `**❯ Commands:** ${client.commands.size}`,
          `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
          `**❯ Users:** ${client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString()}`,
          `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
          `**❯ Creation Date:** <t:1598181145:R>`,
          `**❯ Bot Version:** v${version}`,
          `**❯ Node.js:** ${process.version}`,
          `**❯ Discord.js:** v${djsversion}`,
        ].join("\n")
      )
      .addField(
        "System",
        [
          `**❯ Platform:** ${process.platform}`,
          `**❯ Uptime:** ${`${days}d ${hours}h ${minutes}m ${seconds}s`}`,
          "**❯ CPU:**",
          `> Cores: ${os.cpus().length}`,
          `> Threads: ${os.cpus().length * 2}`,
          `> Model: ${core.model}`,
          `> Base Speed: ${core.speed}MHz`,
        ].join("\n")
      )
      .setFooter({ text: 'Crypto Helper made by Mezo#0001' })
      .setTimestamp();

    await interaction.reply({ embeds: [infoembed] });
  },
};
