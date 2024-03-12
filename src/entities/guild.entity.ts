import { Entity, Column } from 'typeorm';

@Entity()
export class Guild {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true, default: false })
  owner: boolean;

  @Column({ nullable: true })
  owner_id: string;
}
