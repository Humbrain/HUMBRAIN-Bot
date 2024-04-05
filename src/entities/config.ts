import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Config {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guildId: string;

    @Column({nullable: true})
    welcomeChannelId: string;

    @Column({nullable: true})
    welcomeMessage: string;

    @Column({nullable: true})
    presentationChannelId: string;

    @Column({nullable: true})
    mpChannelId: string;

    @Column({default: false})
    mpSystemAge: boolean;

    @Column({nullable: true})
    majorRoleId: string;

    @Column({nullable: true})
    minorRoleId: string;

    @Column({nullable: true})
    closeRoleId: string;
}