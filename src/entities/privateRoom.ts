import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PrivateRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column({nullable: true})
    channelId: string;

    @Column({nullable: true})
    guildId: string;
}