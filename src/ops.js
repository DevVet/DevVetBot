const fetch = require("node-fetch");

const foaas = (msg) => {
  const refMap = {
    company: "DevVet",
    from: msg.author.username,
    name: "Json",
    tool: "keeb",
    do: "Debug",
    something: "code",
    reference: "Sun Tzu",
    noun: "code",
    reaction: "Code",
    behavior: "that shit",
    thing: "asshole",
    language: "Assembly x86",
  };

  let url = "https://www.foaas.com";

  fetch(url + "/operations")
    .then((resp) => resp.json())
    .then((data) => {
      const randomIdx = Math.floor(Math.random() * data.length);
      let service = data[randomIdx];

      service.fields.forEach((field) => {
        service.url = service.url.replace(
          `:${field.field}`,
          refMap[field.field]
        );
      });

      msg.channel.send(url + service.url);
    });
};

const github = (msg) => {
  let user = msg.content.split(" ");
  user = user[user.length - 1];
  try {
    fetch(`https://api.github.com/users/${user}`)
      .then((resp) => resp.json())
      .then((userData) => {
        msg.channel.send(userData.html_url);
        msg.channel.send(`Total Repos: ${userData.public_repos}`);
      })
      .catch(console.error);
  } catch (error) {
    cosole.error(error);
  }
};

const devToArticles = (newsChannel) => {
  fetch("https://dev.to/api/articles")
    .then((res) => res.json())
    .then((json) => {
      newsChannel.send(
        json
          .slice(0, 5)
          .reduce(
            (acc, article) => `${acc}${article.url}\n`,
            "Top 5 Dev.to articles:\n"
          )
      );
    });
};

const sendHelp = (msg) => {
  msg.channel.send(
    "DVBot Commands:\n   help - command list\n   articles - print top 5 Dev.to articls in #daily-articles\n   github <githubUsername> - print user github link and repo count"
  );
};

const jinx = (msg) => {
  msg.channel.send("1\r2\r3\r4\r5\r6\r7\r8\r9\r10\rYou owe me a coke!!");
};

module.exports = { foaas, github, devToArticles, sendHelp, jinx };
