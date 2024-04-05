import * as Canvas from "@napi-rs/canvas";
import {AttachmentBuilder} from "discord.js";
import {request} from "undici";

export const ReturnProfil = async (interaction, name, age, description) => {
    const canvas = Canvas.createCanvas(600, 600);
    const context = canvas.getContext('2d');
    const bg = await Canvas.loadImage('./src/00-assets/profile_discord.png');
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#161414';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    let font = applyText(canvas, interaction.user.displayName);
    context.font = '22px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText("Présentation de", 105, 35 - (font / 2));

    context.font = `${font}px sans-serif`;
    context.fillStyle = '#ffffff';
    context.fillText(interaction.user.displayName, 105, 35 + (font / 2));

    context.font = '20px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText(`Username: ${name}`, 20, 100);

    context.font = '20px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText(`Age: ${age}`, 310, 100);

    context.font = '20px sans-serif';
    context.fillStyle = '#ffffff';
    const descriptionSplit = description.split('\n');
    let y = 130;
    for (const desc of descriptionSplit) {
        context.fillText(desc, 20, y);
        y += 20;
    }

    context.beginPath();
    context.arc(35+23, 35 + 17, 35, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    const {body} = await request(interaction.user.displayAvatarURL({extension: 'png'}));
    const avatar = await Canvas.loadImage(await body.arrayBuffer());
    context.drawImage(avatar, 23, 17, 70, 70);

    const attachment = new AttachmentBuilder(await canvas.encode('png'), {name: 'profile-image.png'});

    return attachment
}

const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 60;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        context.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (context.measureText(text).width > 370);

    // Return the result to use in the actual canvas
    return fontSize;
};