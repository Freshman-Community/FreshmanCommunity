import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  major: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  laboratory: string;

  @Column({ default: 0 })
  likeCount: number;
}
