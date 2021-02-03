const Discord = require("discord.js");
const fetch = require("node-fetch");
const {
  foaas,
  github,
  devToArticles,
  sendHelp,
  jinx,
  mdn,
} = require("./ops.js");
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
  if (msg.content.toLowerCase().match(/^!dvb/g)) {
    let endOfCommandIdx = msg.content.indexOf(" ", 5);
    endOfCommandIdx =
      endOfCommandIdx === -1 ? msg.content.length : endOfCommandIdx;
    const command = msg.content.slice(5, endOfCommandIdx);
    switch (command) {
      case "help":
        sendHelp(msg);
        break;
      case "articles":
        devToArticles(newsChannel);
        break;
      case "github":
        github(msg);
        break;
      case "mdn":
        mdn(msg);
        break;
      case "fujson":
      default:
        foaas(msg);
    }
  } else if (msg.content.toLowerCase().match(/^!jinx/g)) {
    jinx(msg);
  }
});

client.on("guildMemberAdd", (noob) => {
  motorpoolChannel.send(
    `Welcome to DevVet ${noob.user.username}!!\n\n This server is a social/educational network for Military Veterans who are also developers.  We're glad to have you here.`
  );
});

client.login(process.env.DISCORD_LOGIN);
