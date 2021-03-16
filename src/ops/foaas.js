const fetch = require("node-fetch");
const jsdom = require("jsdom");
const Discord = require("discord.js");

const fetchService = async (msg, url) => {
  const REF_MAP = {
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

  try {
    const resp = await fetch(url + "/operations");
    const data = await resp.json();

    const randomIdx = Math.floor(Math.random() * data.length);
    let service = data[randomIdx];

    service.fields.forEach((field) => {
      service.url = service.url.replace(
        `:${field.field}`,
        REF_MAP[field.field]
      );
    });

    return service;
  } catch (err) {
    console.error(err);
  }
};

const fetchInsult = async (url) => {
  const resp = await fetch(url);
  const data = await resp.text();

  const dom = new jsdom.JSDOM(data);
  const message = dom.window.document.querySelector("h1").innerHTML;
  const author = dom.window.document
    .querySelector("em")
    .innerHTML.replace("- ", "");
  return { message, author };
};

module.exports = async (msg) => {
  let url = "https://www.foaas.com";

  const service = await fetchService(msg, url);

  const fuUrl = url + service.url;

  const { message, author } = await fetchInsult(fuUrl);

  const embed = new Discord.MessageEmbed()
    .setDescription(message)
    .setFooter(author);

  msg.channel.send(embed);
};
