import {Client, Collection} from "discord.js";
import lang from "../lang/lang";

export default class CustomClient extends Client {
    commands: Collection<string, any> = new Collection();
    contextMenu: Collection<string, any> = new Collection();
    buttons: Collection<string, any> = new Collection();
    modals: Collection<string, any> = new Collection();
    lang = lang;
}