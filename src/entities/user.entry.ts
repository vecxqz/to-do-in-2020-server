import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: '' })
  email: string;

  @Column({ type: 'timestamp' })
  updateTime: Date;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: false })
  isDelete: boolean;
}
