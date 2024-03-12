import { CommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { Command } from './command';

export const Hello: Command = {
  data: new SlashCommandBuilder().setName('hello').setDescription('Replies with Hello there!'),
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'Hello there!';

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};