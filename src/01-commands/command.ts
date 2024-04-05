import { CommandInteraction, Client, SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: any;
  cooldown?: number;
  run: (client: Client, interaction: CommandInteraction) => void;
}