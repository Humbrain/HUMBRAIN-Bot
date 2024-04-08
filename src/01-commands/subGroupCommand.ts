import {
  CommandInteraction,
  Client,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder
} from 'discord.js';
import CustomClient from "../utils/CustomClient";

export interface SubGroupCommand {
  data: SlashCommandSubcommandGroupBuilder;
  cooldown?: number;
  run: (client: CustomClient, interaction: CommandInteraction) => void;
}