const fetch = require("node-fetch");
const jsdom = require("jsdom");
const Discord = require("discord.js");

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

      return url + service.url;
    })
    .then((fuUrl) => {
      fetch(fuUrl)
        .then((resp) => resp.text())
        .then((data) => {
          const dom = new jsdom.JSDOM(data);
          const message = dom.window.document.querySelector("h1").innerHTML;
          const author = dom.window.document
            .querySelector("em")
            .innerHTML.replace("- ", "");

          const embed = new Discord.MessageEmbed()
            .setDescription(message)
            .setFooter(author);

          msg.channel.send(embed);
        })
        .catch(console.error);
    })
    .catch(console.error);
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
    "DVBot Commands:\n   help - command list\n   articles - print top 5 Dev.to articls in #daily-articles\n   github <githubUsername> - print user github link and repo count\n  mdn <searchString> - Return top three MDN search results for searchString\n\n!jinx - Get there first and they oh you a coke"
  );
};

const jinx = (msg) => {
  msg.channel.send("1\r2\r3\r4\r5\r6\r7\r8\r9\r10\rYou owe me a coke!!");
};

const mdn = async (msg) => {
  const searchString = msg.content.slice(msg.content.indexOf("mdn") + 4);
  const url = `https://developer.mozilla.org/en-US/search?q=${encodeURI(
    searchString.replace(" ", "+")
  )}`;
  const response = await fetch(url);
  const dom = new jsdom.JSDOM(await response.text());
  const resultElements = dom.window.document.getElementsByClassName("result");

  let results = [];

  for (let i = 0; i < 3; i++) {
    const resultElement = resultElements.item(i);
    const result = {
      title: resultElement.querySelector(".result-title").innerHTML,
      url: `https://developer.mozilla.org${
        resultElement.querySelector(".result-title").href
      }`,
      description: resultElement
        .querySelector(".result-excerpt")
        .innerHTML.replace(/(<([^>]+)>)/gi, "")
        .replace(/\n/gi, " "),
    };

    results.push(result);
  }

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const embed = new Discord.MessageEmbed()
      .setTitle(result.title)
      .setURL(result.url)
      .setDescription(result.description);
    msg.channel.send(embed);
  }
};

module.exports = { foaas, github, devToArticles, sendHelp, jinx, mdn };
