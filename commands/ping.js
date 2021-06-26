const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "ping",
  code: async(client, message) => {
    message.reply({
      embeds: [
           new MessageEmbed()
           .setTitle('ping')
           .addFields([{
             name: 'WebSocket',
             value: `\`${client.ws.ping}ms\``,
             inline: true
           }, {
             name: 'Tempo de resposta',
             value: `\`${message.createdTimestamp - Date.now()}ms\``,
             inline: true
           }])
           .setColor('800080')
        ]
    });
  }
};