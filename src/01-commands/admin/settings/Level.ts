import {SubCommand} from "../../subCommand";
import {ChannelType, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder, TextChannel} from "discord.js";
import {Levels} from "../../../entities/Levels";
import {AppDataSource} from "../../../data-source";
import {SubGroupCommand} from "../../subGroupCommand";

export const Level: SubGroupCommand = {
    data: new SlashCommandSubcommandGroupBuilder()
        .setName('level')
        .setDescription('Gestion des niveaux')
        .addSubcommand(subcommandGroup => subcommandGroup
            .setName('addblacklist')
            .setDescription('Ajoute un channel à la blacklist')
            .addChannelOption(option => option
                .setName('channel')
                .addChannelTypes(ChannelType.GuildText)
                .setDescription('Le channel à ajouter à la blacklist')
                .setRequired(true))),
    run: async (client, interaction) => {
        //@ts-ignore
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case 'addblacklist':
                await addBlacklist(client, interaction);
                return;
        }
    }
}

const addBlacklist = async (client, interaction) => {
    const levelRepo = AppDataSource.getRepository(Levels);
    const channel = interaction.options.get('channel').channel as TextChannel;
    const level = await levelRepo.findOneBy({guildId: interaction.guildId});
    if (!level) {
        const nL = new Levels();
        nL.guildId = interaction.guildId;
        nL.blacklistedChannels = [channel.id];
        await levelRepo.save(nL);
        return await interaction.reply('Channel ajouté à la blacklist');
    } else {
        if (level.blacklistedChannels != null && level.blacklistedChannels.includes(channel.id)) {
            return await interaction.reply('Channel déjà dans la blacklist');
        } else {
            if (level.blacklistedChannels == null) level.blacklistedChannels = [];
            level.blacklistedChannels.push(channel.id);
            await levelRepo.save(level);
            return await interaction.reply('Channel ajouté à la blacklist');
        }
    }
}