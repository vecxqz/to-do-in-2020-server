import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// https://github.com/typeorm/typeorm/blob/master/docs/entities.md
@Entity()
export class Canvas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guid: string;

  @Column()
  key: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column({ type: 'longblob', nullable: true })
  data;
}
