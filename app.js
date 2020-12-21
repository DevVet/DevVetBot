const Discord = require("discord.js");
const fetch = require("node-fetch");
const { foaas, github, devToArticles, sendHelp } = require("./ops.js");
const client = new Discord.Client();

require("dotenv").config();

let newsChannel;
let motorpoolChannel;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  newsChannel = client.channels.cache.get("773550355464060950");
  motorpoolChannel = client.channels.cache.get("765949464443617334");
});

client.on("message", (msg) => {
  if (msg.content.toLowerCase().match(/!dvb/g)) {
    if (msg.content.toLowerCase().match(/help/g)) {
      sendHelp(msg);
    } else if (msg.content.toLowerCase().match(/articles/g)) {
      devToArticles(newsChannel);
    } else if (msg.content.toLowerCase().match(/github/g)) {
      github(msg);
    } else if (msg.content.toLowerCase().match(/fujson/g)) {
      foaas(msg);
    }
  }
});

client.on("guildMemberAdd", (noob) => {
  motorpoolChannel.send(
    `Welcome to DevVet ${noob.user.username}!!\n\n This server is a social/educational network for Military Veterans who are also developers.  We're glad to have you here.`
  );
});

client.login(process.env.DISCORD_LOGIN);
