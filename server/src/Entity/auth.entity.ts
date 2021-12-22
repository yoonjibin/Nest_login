import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryColumn()
  id: string;
  @Column()
  pw: string;
  @Column()
  name: string;
}
