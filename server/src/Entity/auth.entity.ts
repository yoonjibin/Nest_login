import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  sub: String;
  @Column()
  id: string;
  @Column()
  pw: string;
  @Column()
  name: string;
}
