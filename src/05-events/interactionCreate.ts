import {
    CommandInteraction,
    Interaction,
    Events,
    ButtonInteraction,
    ModalSubmitInteraction,
    ContextMenuCommandInteraction
} from 'discord.js';
import {Events as e} from "../handlers/eventHandler";
import CooldownMiddleware from "../middlewares/cooldownCmdMiddleware";
import CustomClient from "../utils/CustomClient";
import {Error, Warning} from "../utils/Embed";


const InteractionCreate: e = {
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
        const embed = Warning("Vous devez attendre avant de pouvoir réutiliser cette commande");
        await interaction.reply({embeds: [embed], ephemeral: true});
        return;
    }
    const slashCommand = client.commands.find(c => c.data.name === interaction.commandName);
    if (!slashCommand) {
        const embed = Error("Une erreur est survenue");
        await interaction.reply({embeds: [embed], ephemeral: true});
        return;
    }
    slashCommand.run(client, interaction);
};

const handleButton = async (client: CustomClient, interaction: ButtonInteraction): Promise<void> => {
    const button = client.buttons.get(interaction.customId);
    if (!button) {
        const embed = Error("Une erreur est survenue");
        await interaction.reply({embeds: [embed], ephemeral: true});
        return;
    }
    button.run(client, interaction);
}

const handleModals = async (client: CustomClient, interaction: ModalSubmitInteraction): Promise<void> => {
    const button = client.modals.get(interaction.customId);
    if (!button) {
        const embed = Error("Une erreur est survenue");
        await interaction.reply({embeds: [embed], ephemeral: true});
        return;
    }
    button.run(client, interaction);
}

const handleContextMenu = async (client: CustomClient, interaction: ContextMenuCommandInteraction): Promise<void> => {
    const button = client.contextMenu.get(interaction.commandName);
    if (!button) {
        const embed = Error("Une erreur est survenue");
        await interaction.reply({embeds: [embed], ephemeral: true});
        return;
    }
    button.run(client, interaction);
}


export default InteractionCreate;