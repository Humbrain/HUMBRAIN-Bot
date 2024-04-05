import {ButtonInteraction, ModalSubmitInteraction} from "discord.js";
import CustomClient from "../utils/CustomClient";

export interface Modal {
    data: any;
    cooldown?: number;
    run: (client: CustomClient, interaction: ModalSubmitInteraction) => void;
}