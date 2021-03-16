const fetch = require("node-fetch");
const jsdom = require("jsdom");
const Discord = require("discord.js");

module.exports = async (channel, options) => {
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
    const embed = new Discord.MessageEmbed()
      .setTitle(result.title)
      .setURL(result.url)
      .setDescription(result.description);
    channel.send(embed);
  }
};
