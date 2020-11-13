import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// https://github.com/typeorm/typeorm/blob/master/docs/entities.md
@Entity()
export class Pages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  canvasId: string;

  @Column({ type: 'longtext' })
  data;
}
