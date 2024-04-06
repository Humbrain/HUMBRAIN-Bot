import {ChannelType, Events} from "discord.js";
import {Event} from "./event";
import {AppDataSource} from "../data-source";
import {Config} from "../entities/config";
import {PrivateRoom} from "../entities/privateRoom";
import Loggers from "../utils/Loggers";

export const VoiceStateUpdate: Event = {
    once: false,
    event: Events.VoiceStateUpdate,
    run: async (client, oldState, newState) => {
        const configRepo = AppDataSource.getRepository(Config);
        const config = await configRepo.findOneBy({guildId: newState.guild.id});
        if (!oldState.channel && newState.channel) {
            // User joined a voice channel
            await createChannel(config, newState);
        } else if (oldState.channel && !newState.channel) {
            // User left a voice channel
            await deleteChannel(config, oldState);
        } else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
            // User switched voice channels
            await createChannel(config, newState);
            await deleteChannel(config, oldState);
        }
    }
}

const createChannel = async (config, newState) => {
    if (config.privateRoomCategoryId == null) return;
    if (newState.channel.id === config.privateRoomVoiceId) {
        // User joined the creator voice channel
        const newVoiceChannel = await newState.guild.channels.create({
            name: `Salon de ${newState.member.displayName}`,
            type: ChannelType.GuildVoice,
            parent: config.privateRoomCategoryId,
        });
        await newState.setChannel(newVoiceChannel);
        const privateRoomRepo = AppDataSource.getRepository(PrivateRoom);
        await privateRoomRepo.save({
            userId: newState.member.id,
            voiceChannelId: newVoiceChannel.id,
            guildId: newState.guild.id,
            channelId: newVoiceChannel.id,
        });

    }
}

const deleteChannel = async (config, oldState) => {
    if (config.privateRoomCategoryId == null) return;
    // User left the creator voice channel
    const privateRoomRepo = AppDataSource.getRepository(PrivateRoom);
    const privateRoom = await privateRoomRepo.findOneBy({channelId: oldState.channel.id});
    if (privateRoom) {
        const voiceChannel = await oldState.guild.channels.fetch(privateRoom.channelId);
        if (voiceChannel && voiceChannel.members.size === 0) {
            await voiceChannel.delete();
            await privateRoomRepo.delete(privateRoom.id);
        }
    }
}