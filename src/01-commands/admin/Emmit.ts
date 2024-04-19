import {Command} from '../../components/command';
import {Client, SlashCommandBuilder} from 'discord.js';

const Emmit: Command = {
    data: new SlashCommandBuilder()
        .setName('emmit')
        .setDescription('Replies with Hello there!')
        .addStringOption(choice => choice.setName('event').setDescription('Choose your event').setRequired(true).setChoices(
            {name: 'Membre', value: 'member'},
            {name: 'Guild', value: 'guild'})),
    run: async (client: Client, interaction) => {
        const event: string = interaction.options.get('event').value as string;

        switch (event) {
            case 'member':
                // @ts-ignore
                client.emit('guildMemberAdd', interaction.member);
                await interaction.reply({content: 'Emitted the event.', ephemeral: true});
                break;
            case 'guild':
                client.emit('guildCreate', interaction.guild);
                await interaction.reply({content: 'Emitted the event.', ephemeral: true});
                break;
        }
    },
};

export default Emmit;