import {Colors, EmbedBuilder} from "discord.js";

export const Success = (message: string) => {
    return new EmbedBuilder()
        .setTitle("Success")
        .setDescription(message)
        .setThumbnail("https://s3.cedre.info/ose-static/files/check.png")
        .setColor(Colors.Green)
}

export const Error = (message: string) => {
    return new EmbedBuilder()
        .setTitle("Error")
        .setDescription(message)
        .setThumbnail("https://s3.cedre.info/ose-static/files/xmark.png")
        .setColor(Colors.Red)
}

export const Info = (message: string) => {
    return new EmbedBuilder()
        .setTitle("Info")
        .setDescription(message)
        .setColor(Colors.Blue)
}

export const Warning = (message: string) => {
    return new EmbedBuilder()
        .setTitle("Warning")
        .setDescription(message)
        .setColor(Colors.Yellow)
}

