import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Partenaria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    invite: string;

    @Column()
    description: string;

    @Column()
    userId: string;

    @Column({nullable: true})
    image: string;

}