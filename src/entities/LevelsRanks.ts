import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Guild} from "./guild";

@Entity()
export class LevelsRanks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleId: string;

    @Column()
    level: number;

    @Column()
    guildId: string;
}