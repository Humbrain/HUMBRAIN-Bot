import {Events} from "discord.js";
import {Event} from "./event";
import Loggers from "../utils/Loggers";
import CooldownLevelingMiddleware from "../middlewares/cooldownLevlingMiddleware";
import Leveling from "../utils/Leveling";

export const MessageCreate: Event = {
    once: false,
    event: Events.MessageCreate,
    run: async (client, message) => {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!await CooldownLevelingMiddleware.run(client, message)) return;
        const leveling = new Leveling(message);
        if(!await leveling.checkIfIsActivated()) return;
        await leveling.addXp();

    }
}