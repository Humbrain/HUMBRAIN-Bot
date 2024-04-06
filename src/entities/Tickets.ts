import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Tickets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guildId: string;

    @Column({nullable: true})
    ticketChannelId: string;

    @Column({nullable: true})
    userId: string;

    @Column({nullable: true})
    transcript: string;

    @Column({nullable: true})
    open: boolean;
}