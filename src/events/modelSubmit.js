const client = require("../index");

client.on('modalSubmit', async (modal) => {
    if(modal.customId === 'modal-customid'){
      const firstResponse = modal.getTextInputValue('textinput-customid')
      await modal.deferReply({ ephemeral: true })
      modal.followUp({ content: 'Congrats! Powered by discord-modals.' + Formatters.codeBlock('markdown', firstResponse), ephemeral: true })
    }  
  });