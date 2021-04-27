const fetch = require("node-fetch");

module.exports = async (newsChannel) => {
  const resp = await fetch("https://dev.to/api/articles?top=2&state=rising");
  const json = await resp.json();

  newsChannel.send(
    json
      .slice(0, 5)
      .reduce(
        (acc, article) => `${acc}${article.url}\n`,
        "Top 5 Dev.to articles:\n"
      )
  );
};
