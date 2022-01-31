const MARINE_SPEAK = [
  "ooray",
  "grunt",
  "oof",
  "crayola",
  "kill",
  "buzzcut",
  "ugga",
  "north",
  "south",
  "east",
  "birdy",
  "semper fi",
  "montazuma",
];

const tranlate = () =>
  MARINE_SPEAK[Math.floor(Math.random() * MARINE_SPEAK.length)];

module.exports = async (channel, options) => {
  const phrase = options.filter((option) => option.name === "phrase")[0].value;

  const translated = phrase.split(" ").map(translate).join(" ");

  channel.send(translated);
};
