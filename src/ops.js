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

const github = (channel, options) => {
  const username = options.filter((option) => option.name === "username")[0]
    .value;

  try {
    fetch(`https://api.github.com/users/${username}`)
      .then((resp) => resp.json())
      .then((userData) => {
        channel.send(userData.html_url);
        channel.send(`Total Repos: ${userData.public_repos}`);
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

const jinx = (channel) => {
  channel.send("1\r2\r3\r4\r5\r6\r7\r8\r9\r10\rYou owe me a coke!!");
};

const mdn = async (channel, options) => {
  const searchString = options.filter((option) => option.name === "search")[0]
    .value;
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
    console.log(JSON.stringify(result, null, 2));
    // const embed = new Discord.MessageEmbed()
    //   .setTitle(result.title)
    //   .setURL(result.url)
    //   .setDescription(result.description);
    // channel.send(embed);
  }
};

module.exports = { foaas, github, devToArticles, jinx, mdn };
