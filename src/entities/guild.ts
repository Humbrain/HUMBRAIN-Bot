import {Column, Entity, ManyToMany, PrimaryColumn} from 'typeorm';
import {LevelsUsers} from "./LevelsUsers";

@Entity()
export class Guild {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    icon: string;

}