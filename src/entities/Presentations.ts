import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Presentations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    presentationMsgId: string;

    @Column()
    guildId: string;

    @Column()
    name: string;

    @Column()
    age: string;

    @Column({type: 'longtext'})
    description: string;
}