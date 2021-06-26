const { exec } = require('child_process')
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'terminal',
  aliases: ['console'],
  code: async(bot, message) => {
    if(bot.config.devs.indexOf(message.author.id) == -1) {
      return message.reply('Sai random')
    }
    
    exec(message.args.join(' '), (err, resultado) => {
      if(err) return message.reply({
        content: String(err)
      })
      
      message.reply({
        embeds: [new MessageEmbed()
        .setDescription(`\`\`\`kt
${resultado}
\`\`\``)]
      })
    })
  }
}