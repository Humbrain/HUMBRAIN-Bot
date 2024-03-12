import { Client } from 'discord.js';
import { config } from './config';
import ready from './listeners/ready';
import interactionCreate from './listeners/interactionCreate';

console.log('Bot is starting...');

const client = new Client({
  intents: [],
});

ready(client);
interactionCreate(client);

client.login(config.DISCORD_TOKEN);