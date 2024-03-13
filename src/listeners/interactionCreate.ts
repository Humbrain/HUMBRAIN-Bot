import {CommandInteraction, Client, Interaction, Events} from 'discord.js';
import {Commands} from '../commands';
import {Event} from "./event";


export const InteractionCreate: Event = {
    once: false,
    event: Events.InteractionCreate,
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    }
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.data.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.followUp({content: 'An error has occurred'});
        return;
    }
    slashCommand.run(client, interaction);
};