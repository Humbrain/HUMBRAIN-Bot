import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Guild} from "./guild";

@Entity()
export class Levels {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isActivated: boolean;

    @Column({type: "simple-array"})
    blacklistedChannels: string[] = [];

    @Column()
    guildId: string;

    @Column( {nullable: true})
    channelId?: string;
}