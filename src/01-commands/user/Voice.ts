import {Command} from "../command";
import {CommandInteraction, GuildMember, SlashCommandBuilder} from "discord.js";
import lang from "../../lang/lang";
import {PrivateRoom} from "../../entities/privateRoom";
import {AppDataSource} from "../../data-source";
import {Error, Success} from "../../utils/Embed";

export const Voice: Command = {
    data: new SlashCommandBuilder()
        .setName(lang.voice["en-US"])
        .setNameLocalizations(lang.voice)
        .setDescription(lang.voice_description["en-US"])
        .setDescriptionLocalizations(lang.voice_description)
        .addSubcommand(subcommand => subcommand
            .setName(lang.voice_isvisible["en-US"])
            .setNameLocalizations(lang.voice_isvisible)
            .setDescription(lang.voice_isvisible_description["en-US"])
            .setDescriptionLocalizations(lang.voice_isvisible_description)
            .addBooleanOption(option => option
                .setName(lang.voice_isvisible_everyone["en-US"])
                .setNameLocalizations(lang.voice_isvisible_everyone)
                .setDescription(lang.voice_isvisible_everyone_description["en-US"])
                .setDescriptionLocalizations(lang.voice_isvisible_everyone_description)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(lang.voice_limit["en-US"])
            .setNameLocalizations(lang.voice_limit)
            .setDescription(lang.voice_limit_description["en-US"])
            .setDescriptionLocalizations(lang.voice_limit_description)
            .addIntegerOption(option => option
                .setName(lang.voice_limit_amount["en-US"])
                .setNameLocalizations(lang.voice_limit_amount)
                .setDescription(lang.voice_limit_amount_description["en-US"])
                .setDescriptionLocalizations(lang.voice_limit_amount_description)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(lang.voice_name["en-US"])
            .setNameLocalizations(lang.voice_name)
            .setDescription(lang.voice_name_description["en-US"])
            .setDescriptionLocalizations(lang.voice_name_description)
            .addStringOption(option => option
                .setName(lang.voice_name_channel["en-US"])
                .setNameLocalizations(lang.voice_name_channel)
                .setDescription(lang.voice_name_channel_description["en-US"])
                .setDescriptionLocalizations(lang.voice_name_channel_description)
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName(lang.voice_opento["en-US"])
            .setNameLocalizations(lang.voice_opento)
            .setDescription(lang.voice_opento_description["en-US"])
            .setDescriptionLocalizations(lang.voice_opento_description)
            .addUserOption(option => option
                .setName(lang.voice_opento_user["en-US"])
                .setNameLocalizations(lang.voice_opento_user)
                .setDescription(lang.voice_opento_user_description["en-US"])
                .setDescriptionLocalizations(lang.voice_opento_user_description)
                .setRequired(true)))
    ,
    run: async (client, interaction: CommandInteraction) => {
        const member: GuildMember = interaction.member as GuildMember;
        if (!member.voice.channel) {
            const error = Error("Vous devez être dans un salon vocal pour exécuter cette commande");
            await interaction.reply({embeds: [error], ephemeral: true});
            return;
        }
        const channel = member.voice.channel;
        const voiceRepo = AppDataSource.getRepository(PrivateRoom);
        const voice = await voiceRepo.findOneBy({channelId: channel.id});
        if (!voice) {
            const error = Error("Ce salon vocal n'est pas un salon vocal privé");
            await interaction.reply({embeds: [error], ephemeral: true});
            return;
        }
        if (voice.userId !== member.id) {
            const error = Error("Vous n'êtes pas le propriétaire de ce salon vocal");
            await interaction.reply({embeds: [error], ephemeral: true});
            return;
        }

        // @ts-ignore
        const subcommand = interaction.options.getSubcommand();
        let succes;
        switch (subcommand) {
            case lang.voice_isvisible["en-US"]:
                // @ts-ignore
                const everyone = interaction.options.getBoolean(lang.voice_isvisible_everyone["en-US"]);
                await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    ViewChannel: everyone,
                })
                succes = Success(`Le salon vocal est maintenant ${everyone ? "visible" : "invisible"}`);
                await interaction.reply({embeds: [succes], ephemeral: true});
                break;
            case lang.voice_limit["en-US"]:
                // @ts-ignore
                const amount = interaction.options.getInteger(lang.voice_limit_amount["en-US"]);
                await channel.edit({userLimit: amount});
                succes = Success(`Le salon vocal a maintenant une limite de ${amount} utilisateurs`);
                await interaction.reply({embeds: [succes], ephemeral: true});
                break;
            case lang.voice_name["en-US"]:
                // @ts-ignore
                const name = interaction.options.getString(lang.voice_name_channel["en-US"]);
                await channel.setName(name);
                succes = Success(`Le salon vocal a maintenant le nom ${name}`);
                await interaction.reply({embeds: [succes], ephemeral: true});
                break;
            case lang.voice_opento["en-US"]:
                // @ts-ignore
                const user = interaction.options.getUser(lang.voice_opento_user["en-US"]);
                await channel.permissionOverwrites.create(user, {
                    ViewChannel: true,
                })
                succes = Success(`Le salon vocal est maintenant ouvert à ${user}`);
                await interaction.reply({embeds: [succes], ephemeral: true});
                break;
        }
    }
}