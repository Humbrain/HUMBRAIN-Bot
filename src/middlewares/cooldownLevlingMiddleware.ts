import {AppDataSource} from "../data-source";
import {CooldownActions, Cooldowns} from "../entities/cooldowns";
import {Guild} from "../entities/guild";
import moment = require("moment");

export default class CooldownLevelingMiddleware {
    static async run(client, message): Promise<boolean> {
        if (message.author.bot) return false;
        if (!message.guild) return false;
        const CoolDownRepo = AppDataSource.getRepository(Cooldowns);
        const cooldown = await CoolDownRepo.findOneBy({userId: message.author.id, actions: CooldownActions.LEVELING});
        const GuildRepo = AppDataSource.getRepository(Guild);
        if (!cooldown) {
            const newCooldown = new Cooldowns();
            newCooldown.actions = CooldownActions.LEVELING;
            newCooldown.userId = message.author.id;
            newCooldown.expiresAt = moment().add(15, 'seconds').toDate();
            newCooldown.guildId = message.guild.id;
            await CoolDownRepo.save(newCooldown);
            return true;
        }
        if (moment().isAfter(cooldown.expiresAt)) {
            cooldown.expiresAt = moment().add(15, 'seconds').toDate();
            await CoolDownRepo.save(cooldown);
            return true;
        }
        return false;
    }
}