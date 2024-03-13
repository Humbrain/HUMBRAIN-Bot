import { CommandInteraction, Client, SlashCommandBuilder } from 'discord.js';

export interface ContextMenu {
  data: any;
  run: (client: Client, interaction: CommandInteraction) => void;
}