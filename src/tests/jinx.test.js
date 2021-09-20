import { jinx } from "../ops";

describe("Jinx", () => {
  test("should demand for a coke when called", () => {
    const channel = {
      send: jest.fn(),
    };
    jinx(channel);
    const sentMsg = channel.send.mock.calls[0][0];
    expect(sentMsg).toBe("1\r2\r3\r4\r5\r6\r7\r8\r9\r10\rYou owe me a coke!!");
  });
});
