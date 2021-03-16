const fetch = require("node-fetch");

module.exports = async (channel, options) => {
  const username = options.filter((option) => option.name === "username")[0]
    .value;

  const resp = await fetch(`https://api.github.com/users/${username}`);
  const userData = await resp.json();

  channel.send(userData.html_url);
  channel.send(`Total Repos: ${userData.public_repos}`);
};
