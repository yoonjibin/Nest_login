import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  pw: string;
  @Column()
  name: string;
}
