const { Embed } = require('interactions.js');
const { hashify } = require('hashify-matchify');

module.exports = {
  name: 'hashify',
  description: 'Generate a hash for the given string',
  options: [
    {
      name: 'content',
      description: 'The string you want to hash',
      type: 3,
      required: true,
    },
  ],
  async execute(interaction) {
    const value = String(interaction.data.options[0]?.value);
    const hashstring = `**${value}**`;

    const { hash } = await hashify(value);

    const hashembed = new Embed()
      .setColor('#5865f4')
      .setTitle('🪴 String hashed!')
      .addFields([
        {
          name: '**Input String:**',
          value: `> ${hashstring}`,
          inline: false,
        },
        {
          name: '**Hashed String:**',
          value: `||${hash}||`,
          inline: false,
        },
      ]);

    return interaction.editReply({
      embeds: [hashembed],
    });
  },
};
