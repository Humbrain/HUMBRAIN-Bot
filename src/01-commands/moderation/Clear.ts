import {GuildChannel, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import lang from "../../lang/lang";
import {Command} from "../../components/command";

const Clear: Command = {
    cooldown: 30,
    data: new SlashCommandBuilder()
        .setName(lang.moderation.clear['en-US'])
        .setNameLocalizations(lang.moderation.clear)
        .setDescription(lang.moderation.clear['en-US'])
        .setDescriptionLocalizations(lang.moderation.clear)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => option
            .setName(lang.amount['en-US'])
            .setNameLocalizations(lang.amount)
            .setDescription(lang.amount_description['en-US'])
            .setDescriptionLocalizations(lang.amount_description))
        .addBooleanOption(option => option
            .setName(lang.all['en-US'])
            .setNameLocalizations(lang.all)
            .setDescription(lang.all_description['en-US'])
            .setDescriptionLocalizations(lang.all)),
    run: async (client, interaction) => {
        // @ts-ignore
        const amount = interaction.options.getInteger(lang.amount['en-US']);
        // @ts-ignore
        const all = interaction.options.getBoolean(lang.all['en-US']);
        if (all) {
            const channel: GuildChannel = interaction.guild?.channels.cache.get(interaction.channelId) as GuildChannel;
            channel.clone().then((clonedChannel) => {
                const originalPosition = channel.position;
                channel.delete().catch(() => null);
                clonedChannel.setPosition(originalPosition);
                // @ts-ignore
                clonedChannel.send({content: lang.moderation.clear['en-US']});
            })
        }
        if (amount) {
            await interaction.channel?.bulkDelete(amount);
            await interaction.reply({content: lang.moderation.clear['en-US']});
        }
    }
}

export default Clear;