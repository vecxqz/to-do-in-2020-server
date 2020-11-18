import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

// https://github.com/typeorm/typeorm/blob/master/docs/entities.md
@Entity()
export class Pages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  canvasId: string;

  @Column({
    default: '',
  })
  prviewUrl: string;

  @Column({ type: 'longtext' })
  data;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ type: 'timestamp' })
  updateTime: Date;
}
