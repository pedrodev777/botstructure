const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = {
  name: 'eval',
  aliases: ['e'],
  code: async (bot, message) => {
    
if(bot.config.devs.indexOf(message.author.id) == -1) {
  return message.reply({
    content: 'Sai random'
  });
}
    
const { db, axios } = bot;

const evaled = eval(message.args.join(' '));

const inspected = inspect(evaled);

    message.reply({
      embeds: [new MessageEmbed()
      .setDescription(`\`\`\`kt
${inspected}
\`\`\``)
      .setColor('800080')
      ]
    });
  }
};