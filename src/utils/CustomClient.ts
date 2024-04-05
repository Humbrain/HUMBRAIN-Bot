import {Client, Collection} from "discord.js";

export default class CustomClient extends Client {
    commands: Collection<string, any> = new Collection();
    contextMenu: Collection<string, any> = new Collection();
    buttons: Collection<string, any> = new Collection();
    modals: Collection<string, any> = new Collection();
}