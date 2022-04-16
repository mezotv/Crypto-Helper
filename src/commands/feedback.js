const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Formatters } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("Share feedback or suggestions with the developers"), 

  async execute(interaction, client) {
    const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method

    const modal = new Modal() // We create a Modal
    .setCustomId('modal-customid')
    .setTitle('Test of Discord-Modals!')
    .addComponents(
      new TextInputComponent() // We create a Text Input Component
      .setCustomId('textinput-customid')
      .setLabel('Some text Here')
      .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
      .setMinLength(4)
      .setMaxLength(10)
      .setPlaceholder('Write a text here')
      .setRequired(true) // If it's required or not
    );
    
        showModal(modal, {
            client: client, // Client to show the Modal through the Discord API.
            interaction: interaction // Show the modal with interaction data.

        
            
    });
    if(modal.customId === 'modal-customid'){
        const firstResponse = modal.getTextInputValue('textinput-customid')
        await modal.deferReply({ ephemeral: true })
        modal.followUp({ content: 'Congrats! Powered by discord-modals.' + Formatters.codeBlock('markdown', firstResponse), ephemeral: true })
    }  

    },
};
