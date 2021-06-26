const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
  name: 'avatar',
  aliases: ['av'],
  code: async(bot, message) => {
    
    let avatar = user.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 4096
    });
    
    let split = avatar.split('.');
    
    split = split[split.length-1].split('?')[0];
    
    let msg = message.author.id == user.id ? 'Seu avatar:' : `Avatar de \`\`\`${user.username.split('`').join('')}\`\`\`:`;
    
    message.reply({
      content: msg,
      files: [new MessageAttachment()
      .setFile(avatar,`${user.username}.${split}`)]
    });
  }
};