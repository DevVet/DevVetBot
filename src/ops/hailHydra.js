const fs = require("fs");

module.exports = (msg) => {
  const memeDir = "./src/assets";
  fs.readdir(memeDir, (err, hydraMemes) => {
    if (err) {
      throw err;
    }
    const memeIndex = Math.floor(Math.random() * hydraMemes.length);
    msg.channel.send("", { files: [`${memeDir}/${hydraMemes.at(memeIndex)}`] });
  });
};
