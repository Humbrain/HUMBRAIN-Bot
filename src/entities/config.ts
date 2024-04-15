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

    @Column({nullable: true})
    ticketCategoryId: string;

    @Column({nullable: true})
    ticketMessage: string;

    @Column({nullable: true})
    ticketChannelId: string;

    @Column({nullable: true})
    ticketRoleId: string;

    @Column({nullable: true})
    ticketTranscriptChannelId: string;

    @Column({nullable: true})
    partenaireChannelId: string;

    @Column({nullable: true})
    partenariaChannelAskId: string;

    @Column({nullable: true})
    partenaireRoleId: string;

    @Column({nullable: true})
    partenaireMentionId: string;

    @Column({nullable: true})
    privateRoomCategoryId: string;

    @Column({nullable: true})
    privateRoomVoiceId: string;

    @Column({nullable: true})
    messageLogChannelId: string;
}