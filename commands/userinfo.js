const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  code: async(message) => {
    
    let member = message.member;
    
    message.reply({
      embeds: [new MessageEmbed()
      .setTitle(`${member.nickname || member.user.username}`)
      .setColor('800080')
      ]
    })
  }
};