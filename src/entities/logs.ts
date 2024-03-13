import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Guild} from "./guild";

export enum Sanction {
    MUTE = 'MUTE',
    KICK = 'KICK',
    BAN = 'BAN',
    UNBAN = 'UNBAN',
    WARN = 'WARN',
    UNMUTE = 'UNMUTE',
    UNKICK = 'UNKICK'
}

@Entity()
export class Logs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum', enum: Sanction})
    sanction: Sanction;

    @Column({type: 'text'})
    reason: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ManyToOne(() => Guild)
    guild: Guild;

    @Column()
    userId: string;

}