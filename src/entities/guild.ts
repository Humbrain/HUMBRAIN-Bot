import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Guild {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

}