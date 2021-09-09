import fetch from "node-fetch";

jest.mock("node-fetch", () => jest.fn());

const mockUser = {
  username: "devvetbot",
  html_url: "http://dev.vet",
  public_repos: 69,
};

const sendStub = jest.fn();

const channelStub = {
  send: sendStub,
};

describe("Github command", () => {
  test("should return user data", async () => {
    var githubFunc = require("../ops/github");

    const response = Promise.resolve({
      ok: true,
      status: 200,
      json: () => {
        return mockUser;
      },
    });

    fetch.mockImplementation(() => response);

    await response;

    githubFunc(channelStub, [{ name: "username", value: mockUser.username }])
      .then(() => {
        expect(sendStub.mock.calls.length).toBe(2);
        expect(sendStub.mock.calls[0][0]).toEqual(mockUser.html_url);
        expect(sendStub.mock.calls[1][0]).toEqual(
          `Total Repos: ${mockUser.public_repos}`
        );
      })
      .catch((e) => {
        console.log(e.message);
      });
  });
});
