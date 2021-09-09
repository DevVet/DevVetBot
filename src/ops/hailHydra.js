const fs = require("fs").promises;

module.exports = async (msg) => {
  const memeDir = "./src/assets";
  const hydraMemes = await fs.readdir(memeDir);
  const memeIndex = Math.floor(Math.random() * hydraMemes.length);
  msg.channel.send("", { files: [`${memeDir}/${hydraMemes[memeIndex]}`] });
};
