import { Client } from "discord.js";
import { Commands } from '../commands';

export default (client: Client): void => {
  client.once("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    await client.application.commands.set(Commands.map(c => c.data));
    console.log(`Registered ${Commands.length} commands`);
    console.log(`${client.user.username} is online`);
  });
};