import {ButtonInteraction} from "discord.js";
import CustomClient from "../utils/CustomClient";

export interface Button {
    data: any;
    cooldown?: number;
    run: (client: CustomClient, interaction: ButtonInteraction) => void;
}