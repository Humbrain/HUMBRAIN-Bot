import {CommandInteraction, Client, SlashCommandBuilder, ContextMenuCommandInteraction} from 'discord.js';
import CustomClient from "../utils/CustomClient";

export interface ContextMenu {
  data: any;
  run: (client: CustomClients, interaction: ContextMenuCommandInteraction) => void;
}