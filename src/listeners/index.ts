import {Event} from "./event";
import {Ready} from "./ready";
import {InteractionCreate} from "./interactionCreate";
import {GuildCreate} from "./guildCreate";
import {GuildMemberAdd} from "./guildMemberAdd";

export const Events: Event[] = [Ready, InteractionCreate, GuildCreate, GuildMemberAdd];

