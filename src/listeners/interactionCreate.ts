import {
    CommandInteraction,
    Client,
    Interaction,
    Events,
    ButtonInteraction,
    ModalSubmitInteraction,
    ContextMenuCommandInteraction
} from 'discord.js';
import {Event} from "./event";
import CooldownMiddleware from "../middlewares/cooldownCmdMiddleware";
import CustomClient from "../utils/CustomClient";
import Loggers from "../utils/Loggers";


export const InteractionCreate: Event = {
    once: false,
    event: Events.InteractionCreate,
    run: async (client: CustomClient, interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            await handleSlashCommand(client, interaction);
        }
        if (interaction.isButton()) {
            await handleButton(client, interaction);
        }
        if (interaction.isModalSubmit()) {
            await handleModals(client, interaction);
        }
        if (interaction.isContextMenuCommand()) {
            await handleContextMenu(client, interaction);
        }
    }
}

const handleSlashCommand = async (client: CustomClient, interaction: CommandInteraction): Promise<void> => {
    if (!await CooldownMiddleware.run(client, interaction)) {
        //@ts-ignore
        await interaction.reply({content: 'You are on cooldown', ephemeral: true});
        return;
    }
    const slashCommand = client.commands.find(c => c.data.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.followUp({content: 'An error has occurred'});
        return;
    }
    slashCommand.run(client, interaction);
};

const handleButton = async (client: CustomClient, interaction: ButtonInteraction): Promise<void> => {
    const button = client.buttons.get(interaction.customId);
    if (!button) {
        interaction.reply({content: 'An error has occurred', ephemeral: true});
        return;
    }
    button.run(client, interaction);
}

const handleModals = async (client: CustomClient, interaction: ModalSubmitInteraction): Promise<void> => {
    const button = client.modals.get(interaction.customId);
    if (!button) {
        interaction.reply({content: 'An error has occurred', ephemeral: true});
        return;
    }
    button.run(client, interaction);
}

const handleContextMenu = async (client: CustomClient, interaction: ContextMenuCommandInteraction): Promise<void> => {
    const button = client.contextMenu.get(interaction.commandName);
    if (!button) {
        interaction.reply({content: 'An error has occurred', ephemeral: true});
        return;
    }
    button.run(client, interaction);
}