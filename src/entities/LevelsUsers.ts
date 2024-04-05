import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
@Unique(["userId", "guildId"])
export class LevelsUsers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    xp: number;

    @Column()
    level: number;

    @Column()
    guildId: string;
}