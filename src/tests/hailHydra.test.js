import { promises as fs } from "fs";
import { hailHydra } from "../ops";

describe("Hail hydra", () => {
  const memeDir = "./src/assets";
  let memes;

  beforeAll(async () => {
    memes = await fs.readdir(memeDir);
  });

  test("should return a random file from assets", () => {
    const message = {
      channel: {
        send: jest.fn(),
      },
    };
    return hailHydra(message).then(() => {
      const returnedFile =
        message.channel.send.mock.calls[0][1].files[0].slice(13);
      expect(memes).toContain(returnedFile);
    });
  });
});
