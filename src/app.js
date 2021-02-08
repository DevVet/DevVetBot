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

  client.api
    .applications(client.user.id)
    .guilds("765949464443617331")
    .commands.post({
      data: {
        name: "dvb",
        description: "DevVetBot tools",
        options: [
          {
            name: "articles",
            description:
              "Post the current Top 5 Dev.To articles to the #daily-articles channel",
            type: 1,
          },
          {
            name: "github",
            description: "Get the github data for a given user",
            type: 1,
            options: [
              {
                name: "username",
                description: "Github username",
                type: 3,
                required: true,
              },
            ],
          },
          {
            name: "mdn",
            description: "Search MDN for with given string",
            type: 1,
            options: [
              {
                name: "search",
                description: "Search String",
                type: 3,
                required: true,
              },
            ],
          },
          {
            name: "jinx",
            description: "JINX!!!",
            type: 1,
          },
        ],
      },
    });

  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    const command = interaction.data.options[0];
    const interactionChannel = client.channels.cache.get(
      interaction.channel_id
    );

    switch (command.name) {
      case "github":
        github(interactionChannel, command.options);
        break;
      case "articles":
        devToArticles(newsChannel);
        break;
      case "mdn":
        mdn(interactionChannel, command.options);
        break;
      case "jinx":
        jinx(interactionChannel);
    }
  });
});

client.on("message", (msg) => {
  if (msg.content.toLowerCase().match(/^!fujson/g)) {
    foaas(msg);
  }
});

client.on("guildMemberAdd", (noob) => {
  motorpoolChannel.send(
    `Welcome to DevVet ${noob.user.username}!!\n\n This server is a social/educational network for Military Veterans who are also developers.  We're glad to have you here.`
  );
});

client.login(process.env.DISCORD_LOGIN);
