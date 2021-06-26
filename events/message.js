module.exports = (bot) => {
  
  bot.on('message', async message => {
    
    let prefix = bot.prefix(message.guild.id);
    
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(message.channel.type === "dm") return;
    
    message.args = message.content.trim().slice(prefix.length).split(" ");
    
    let command = message.args.shift();
    
    let cmd = bot.commands.get(command);
    
    if(cmd) {
      cmd.code(bot, message);
    }
    
    return;
  });
};