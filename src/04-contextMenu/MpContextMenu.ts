import {ContextMenu} from "./context-menu";
import {ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, Colors, ActionRowBuilder} from "discord.js";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";

export const MpContextMenu: ContextMenu = {
    data: new ContextMenuCommandBuilder()
        .setType(ApplicationCommandType.User)
        .setName('mp'),
    run: async (client, interaction) => {
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOneBy({guildId: interaction.guildId});
        if (!config) {
            await interaction.reply({content: 'La configuration n\'a pas été trouvée.', ephemeral: true});
            return;
        }
        if (!config.mpChannelId) {
            await interaction.reply({content: 'Le salon MP n\'a pas été configuré.', ephemeral: true});
            return;
        }
        const targetMember = await interaction.guild.members.fetch(interaction.targetId);
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (config.mpSystemAge) {
            const allow = (
                (member.roles.cache.has(config.majorRoleId) && !targetMember.roles.cache.has(config.minorRoleId))
                || (member.roles.cache.has(config.minorRoleId) && !targetMember.roles.cache.has(config.majorRoleId))
            );
            if (!allow) {
                await interaction.reply({content: 'Vous ne pouvez pas MP cette personne.', ephemeral: true});
                return;
            }
        }
        if (targetMember.user.bot) {
            await interaction.reply({content: 'Vous ne pouvez pas MP un bot.', ephemeral: true});
            return;
        }
        if (targetMember.roles.cache.has(config.closeRoleId)) {
            await interaction.reply({content: 'Cette personne ne souhaite pas recevoir de MP.', ephemeral: true});
            return;
        }
        const mpChannel = interaction.guild.channels.cache.get(config.mpChannelId);
        if (!mpChannel) {
            await interaction.reply({content: 'Le salon MP n\'a pas été trouvé.', ephemeral: true});
            return;
        }
        const yesOrNoButton = new ActionRowBuilder();
        const yesBtn = client.buttons.get('yesmp');
        const noBtn = client.buttons.get('nomp');
        yesOrNoButton.addComponents(yesBtn.data, noBtn.data);
        //@ts-ignore
        await mpChannel.send({
            content: `||<@${targetMember.id}>||`,
            embeds: [
                new EmbedBuilder().setColor(Colors.Orange).setDescription(`<@${targetMember.id}> , <@${member.id}> cherche a te connaitre dans tes DM à toi de dire oui ou non.`)
            ],
            components: [yesOrNoButton]
        });

        await interaction.reply({content: 'La demande de MP a été envoyée.', ephemeral: true});

    }
}