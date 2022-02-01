const MARINE_SPEAK = [
  "oorah",
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
  "semper",
  "fi",
  "montazuma",
  "roger",
  "fire",
  "attack",
  "navy",
];

const translate = () =>
  MARINE_SPEAK[Math.floor(Math.random() * MARINE_SPEAK.length)];

module.exports = async (channel, options) => {
  const phrase = options.filter((option) => option.name === "phrase")[0].value;

  const translated = phrase.split(" ").map(translate).join(" ");

  await channel.send(translated);
};
