import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Guild} from "./guild";

export enum CooldownActions {
    COMMAND = 'command',
    LEVELING = 'leveling',
}

@Entity()
@Unique(["userId", "guildId", "commandName"])
export class Cooldowns {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    actions: CooldownActions;

    @Column()
    guildId: string;

    @Column({nullable: true})
    commandName: string;

    @Column()
    expiresAt: Date;
}