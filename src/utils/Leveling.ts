import {LevelsUsers} from "../entities/LevelsUsers";
import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Levels} from "../entities/Levels";
import {Guild} from "../entities/guild";
import * as canvafy from "canvafy";
import * as console from "console";
import Loggers from "./Loggers";
import {LevelsRanks} from "../entities/LevelsRanks";

const XP_FOR_LEVEL = 200;
export default class Leveling {
    private readonly _userId: string;
    private readonly _guildId: string;
    private readonly _message;
    private _LevelUserRepo: Repository<LevelsUsers>
    private _LevelRepo: Repository<Levels>;
    private _LevelRankRepo: Repository<LevelsRanks>;
    private _GuildRepo: Repository<Guild>;
    private _LevelUser: LevelsUsers;

    constructor(message) {
        this._userId = message.author.id;
        this._guildId = message.guild.id;
        this._message = message;
        this._LevelUserRepo = AppDataSource.getRepository(LevelsUsers);
        this._LevelRankRepo = AppDataSource.getRepository(LevelsRanks);
        this._LevelRepo = AppDataSource.getRepository(Levels);
    }

    public async setLevelUser(): Promise<void> {
        if (!await this.checkIfIsActivated()) return;
        this._LevelUser = await this._LevelUserRepo.findOneBy({userId: this._userId, guildId: this._guildId});
        if (this._LevelUser == null) {
            this._LevelUser = new LevelsUsers();
            this._LevelUser.userId = this._userId;
            this._LevelUser.guildId = this._guildId;
            this._LevelUser.level = 0;
            this._LevelUser.xp = 0;
            await this._LevelUserRepo.save(this._LevelUser);
            this._LevelUser = await this._LevelUserRepo.findOneBy({userId: this._userId, guildId: this._guildId});
        }
    }

    async addXp() {
        if (!await this.checkIfIsActivated()) return;
        await this.setLevelUser();
        this._LevelUser.xp += Math.floor(Math.random() * 10) + 15;
        await this._LevelUserRepo.save(this._LevelUser);
        await this.chekLevel();
    }

    public static getLevelNeed(LevelUser: LevelsUsers) {
        let levelNeed = 0;
        if (LevelUser.level === 0) {
            levelNeed = XP_FOR_LEVEL;
        } else {
            levelNeed = XP_FOR_LEVEL ** ((((100 + LevelUser.level) / 10000) * 100));
            levelNeed = Math.floor(levelNeed);
        }
        return levelNeed;
    }

    public static async CalculateRank(userId: string, guildId: string) {
        const allUsers = await AppDataSource.getRepository(LevelsUsers).find({where: {guildId: guildId}});
        const user = allUsers.find(user => user.userId === userId);
        if (!user) return 0;
        const rank = allUsers.filter(u => u.xp > user.xp).length + 1;
        return rank;
    }

    private async chekLevel() {
        if (!await this.checkIfIsActivated()) return;
        let levelNeed = Leveling.getLevelNeed(this._LevelUser);
        if (this._LevelUser.xp >= levelNeed) {
            this._LevelUser.level++;
            this._LevelUser.xp = 0;
            await this._LevelUserRepo.save(this._LevelUser);
            await this.sendLevelUp();
            await this.checkRankUp();
        }
    }

    private async sendLevelUp() {
        if (!await this.checkIfIsActivated()) return;
        const levelInfo = await this._LevelRepo.findOneBy({guildId: this._guildId});
        let channel = this._message.guild.channels.cache.get(this._message.channelId);
        if (levelInfo.channelId != null) channel = this._message.guild.channels.cache.get(levelInfo.channelId);
        const member = this._message.guild.members.cache.get(this._userId);
        const levelUp = await new canvafy.LevelUp()
            .setAvatar(member.user.displayAvatarURL({format: "png"}))
            .setBackground("color", "#bcddf6")
            .setUsername(member.user.globalName || member.user.username)
            .setBorder("#bcddf6")
            .setAvatarBorder("#fbc5dc")
            .setOverlayOpacity(0.7)
            .setLevels(this._LevelUser.level - 1, this._LevelUser.level)
            .build();

        channel.send({
            content: `<@${member.id}> you leveled up! You are now level ${this._LevelUser.level}!`,
            files: [{
                attachment: levelUp,
                name: `levelup-${member.id}.png`
            }]
        });
    }

    async checkIfIsActivated() {
        const levelInfo = await this._LevelRepo.findOneBy({guildId: this._guildId});
        if (levelInfo == null) {
            const newLevel = new Levels();
            newLevel.guildId = this._guildId;
            newLevel.isActivated = false;
            await this._LevelRepo.save(newLevel);
            return false;
        }
        return levelInfo.isActivated;
    }

    private async checkRankUp() {
        if (!await this.checkIfIsActivated()) return;
        const levelInfo = await this._LevelRepo.findOneBy({guildId: this._userId});
        const levelRanks = await this._LevelRankRepo.find({where: {guildId: this._guildId}});
        const levelUser = await this._LevelUserRepo.findOneBy({userId: this._userId, guildId: this._guildId});
        const levelRank = levelRanks.find(rank => rank.level <= levelUser.level);
        let channel = this._message.guild.channels.cache.get(this._message.channelId);
        if (levelInfo?.channelId != null) channel = this._message.guild.channels.cache.get(levelInfo.channelId);
        if (levelRank == null) return;
        const member = this._message.guild.members.cache.get(this._userId);
        const role = this._message.guild.roles.cache.get(levelRank.roleId);
        if (member.roles.cache.has(role.id)) return;
        await member.roles.add(role);
        const welcome = await new canvafy.WelcomeLeave()
            .setAvatar(member.user.displayAvatarURL({forceStatic: true, extension: "png"}))
            .setBackground("color", "#bcddf6")
            .setTitle("New Rank : " + role.name + "!")
            .setDescription(`Congratulations ${member.displayName}! You have reached the rank of ${role.name}!`)
            .setBorder("#bcddf6")
            .setAvatarBorder("#fbc5dc")
            .setOverlayOpacity(0.3)
            .build();

        channel.send({
            files: [{
                attachment: welcome,
                name: `rankup-${member.id}.png`
            }]
        });
    }
}