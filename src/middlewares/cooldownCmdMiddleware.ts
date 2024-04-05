import {AppDataSource} from "../data-source";
import {CooldownActions, Cooldowns} from "../entities/cooldowns";
import moment = require("moment");
import {Guild} from "../entities/guild";
import Loggers from "../utils/Loggers"

export default class CooldownCmdMiddleware {
    static async run(client, interaction): Promise<boolean> {
        const cooldownsRepo = await AppDataSource.getRepository(Cooldowns);
        let userId;
        let action;
        let command;
        if (interaction) {
            command = client.commands.get(interaction.commandName);
            if (!command.cooldown) return true;
            userId = interaction.user.id;
            action = CooldownActions.COMMAND
        }

        // @ts-ignore
        const cooldown = await cooldownsRepo.findOneBy({guildId: interaction.guildId, actions: action, userId: userId, commandName: interaction.commandName}) as Cooldowns;
        if (!cooldown) {
            const newCooldown = new Cooldowns();
            newCooldown.actions = action;
            newCooldown.userId = userId;
            newCooldown.expiresAt = moment().add(command.cooldown, 'seconds').toDate();
            newCooldown.commandName = interaction.commandName;
            newCooldown.guildId = interaction.guildId
            await cooldownsRepo.save(newCooldown);
            return true;
        } else {
            if (moment().isAfter(cooldown.expiresAt)) {
                cooldown.expiresAt = moment().add(command.cooldown, 'seconds').toDate();
                await cooldownsRepo.save(cooldown);
                return true;
            } else {
                return false;
            }
        }
    }
}