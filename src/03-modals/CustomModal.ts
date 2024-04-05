import {ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import Loggers from "../utils/Loggers";

export default class CustomModal {

    private modal: any;

    constructor() {
        this.modal = new ModalBuilder();
    }

    setCustomId(customId: string) {
        this.modal.setCustomId(customId);
        return this;
    }

    setTitle(title: string) {
        this.modal.setTitle(title);
        return this;
    }

    addComponent(customId: string, label: string, style: number, value?: string, placeholder?: string) {
        const input = new TextInputBuilder()
            .setCustomId(customId)
            .setLabel(label)
            .setStyle(style);
        if (placeholder) {
            input.setPlaceholder(placeholder);
        }
        if (value) {
            input.setValue(value);
        }
        const action = new ActionRowBuilder().addComponents(input);
        // @ts-ignore
        this.modal.addComponents(action);
        return this;
    }

    build() {
        return this.modal;
    }
}