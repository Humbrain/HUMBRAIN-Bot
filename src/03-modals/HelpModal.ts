import {
    ActionRowBuilder, ButtonBuilder,
    EmbedBuilder,
    TextChannel,
    TextInputStyle
} from "discord.js";
import {Modal} from "../components/Modal";
import CustomModal from "../components/CustomModal";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";
import {v4 as uuidv4} from 'uuid';


const HelpModal: Modal = {
    data: new CustomModal()
        .setCustomId('helpModal')
        .setTitle('Raconte nous ton témoignage anonymement')
        .addComponent("form_help_description", "Description", TextInputStyle.Paragraph),
    run: async (client, interaction) => {
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOneBy({guildId: interaction.guildId});
        if (!config) {
            interaction.reply({content: 'Une erreur est survenue', ephemeral: true});
            return;
        }

        const description = interaction.fields.getTextInputValue("form_help_description");
        const embed = new EmbedBuilder()
            .setTitle(`Histoire`)
            .setThumbnail(client.user.avatarURL())
            .setDescription(`${description}`)
            .setColor("#bcddf6")
        const channel = await client.channels.fetch(config.helpChannelId) as TextChannel;
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(client.buttons.get('helpBtn').data) ;
        const msg = await channel.send({embeds: [embed], components: [row]});
        const uuid = uuidv4();

        await msg.startThread({
            name: `${uuid}`,
            autoArchiveDuration: 60,
            reason: `${uuid}`
        });
        await interaction.reply({content: 'Votre histoire est publié', ephemeral: true});
    }
}

export default HelpModal;