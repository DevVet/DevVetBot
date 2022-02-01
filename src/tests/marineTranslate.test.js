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
const sendStub = jest.fn();

const channelStub = {
  send: sendStub,
};

describe("marineTranslate Command", () => {
  const marineTransFunc = require("../ops/marineTranslate");
  const start = "hello world from quantico";
  let resp;
  beforeAll(async () => {
    await marineTransFunc(channelStub, [{ name: "phrase", value: start }]);
    resp = sendStub.mock.calls[0][0];
  });

  test("returns string with same number of words", async () => {
    expect(resp.split(" ")).toHaveLength(start.split(" ").length);
  });

  test("returns marine words", () => {
    resp.split(" ").forEach((word) => expect(MARINE_SPEAK).toContain(word));
  });
});
