module.exports = {
  name: 'restartcommands',
  code: async(bot, message) => {
    
    if(bot.config.devs.indexOf(message.author.id) == -1)
    {
      return message.reply({
        content:'sai random'
      })
    }
    bot.commands.clear();
    
    bot.commandHandler();
    
    message.reply({
      content: `Comandos reiniciados!`
    })
  }
}