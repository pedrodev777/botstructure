const { prefix, token } = require('./config.json');

const { Client, Collection, Intents } = require('discord.js');
const { Database } = require('secure-db');
const { readdirSync } = require('fs');

const axios = require('axios');

const bot = new Client({
  intents: new Intents()
  .add('GUILD_MESSAGES','GUILDS')
});

bot.default_prefix = prefix;
bot.db = new Database('Bot');
bot.axios = axios;

['commands'].forEach(x => bot[x] = new Collection());

Object.defineProperty(bot, 'config', {
  value: require('./config.json')
});

bot.prefix = (guild_id) => {
  if(!guild_id) return prefix;
  return bot.db.get(`${guild_id}_prefix`) || prefix;
};

readdirSync('./events').forEach(e => require(`./events/${e}`)(bot));

bot.commandHandler = () => {

readdirSync('./commands').forEach(c => {
  const command = require(`./commands/${c}`);
  
  bot.commands.set(command.name, command);
  
  if(!('aliases' in command)) return;
  
  for(let alias of command.aliases) {
    bot.commands.set(alias, command);
  }
  
});

};

bot.commandHandler();

bot.login(token);