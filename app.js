const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();

require('dotenv').config()

let newsChannel;
let motorpoolChannel;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (
    msg.content.toLowerCase().match(/devvetbot/g)
    && msg.content.toLowerCase().match(/articles/g)
  ) {
    fetch('https://dev.to/api/articles')
    .then(res => res.json())
    .then(json => {

      newsChannel.send(json
        .slice(0,5)
        .reduce((acc,article) => `${acc}${article.url}\n`, "Top 5 Dev.to articles:\n")
      )
    });
  }
});

client.on('guildMemberAdd', noob => {
  motorpoolChannel.send(`Welcome to DevVet ${noob.user.username}!!\n\n This server is a social/educational network for Military Veterans who are also developers.  We're glad to have you here.`)
});

client.login(process.env.DISCORD_LOGIN)
  .then(_ => {
    newsChannel = client.channels.cache.get('773550355464060950');
    motorpoolChannel = client.channels.cache.get('765949464443617334')
  });
