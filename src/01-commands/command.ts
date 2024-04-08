import {CommandInteraction, Client, SlashCommandBuilder, CacheType, BaseInteraction} from 'discord.js';
import CustomClient from "../utils/CustomClient";

export interface Command {
    data: Omit<SlashCommandBuilder, "addBooleanOption" | "addUserOption" | "addChannelOption" | "addRoleOption" | "addAttachmentOption" | "addMentionableOption" | "addStringOption" | "addIntegerOption" | "addNumberOption" | "addSubcommand" | "addSubcommandGroup">;
    cooldown?: number;
    run: (client: CustomClient, interaction: CommandInteraction) => void;
}