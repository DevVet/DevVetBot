import Discord, { SnowflakeUtil } from 'discord.js';
import { hailHydra } from '.';
import { MockGuild, MockTextChannel, MockMessage } from '../mocks/discordMock';

describe('Hail hydra', () => {
  test('should return a random file from assets', async () => {
    const client = new Discord.Client({ restSweepInterval: 0 });
    const guild = new MockGuild(client);
    const channel = new MockTextChannel(guild);
    const user = {
      id: 1234,
      username: 'username',
      discriminator: '1234',
    };
    //const message = new MockMessage('hail hydra', channel, user);
    const message = {
      channel: {
        send: jest.fn(),
      },
    };
    hailHydra(message);
    console.log(message.channel.send); // return undefined
  });
});
