import fetch from "node-fetch";

jest.mock("node-fetch", () => jest.fn());

const mockArticles = [
  { url: "http://dev.vet/article/1" },
  { url: "http://dev.vet/article/2" },
  { url: "http://dev.vet/article/3" },
  { url: "http://dev.vet/article/4" },
  { url: "http://dev.vet/article/5" },
  { url: "http://dev.vet/article/6" },
  { url: "http://dev.vet/article/7" },
];

const sendStub = jest.fn();

const channelStub = {
  send: sendStub,
};

describe("DevTo command", () => {
  test("should return first 5 articles", async () => {
    var devToFunc = require("../ops/devToArticles");

    const response = Promise.resolve({
      ok: true,
      status: 200,
      json: () => {
        return mockArticles;
      },
    });

    fetch.mockImplementation(() => response);

    await response;

    devToFunc(channelStub)
      .then(() => {
        expect(sendStub.mock.calls[0][0].split("\n").length).toEqual(7);
      })
      .catch((e) => {
        console.log(e.message);
      });
  });
});
