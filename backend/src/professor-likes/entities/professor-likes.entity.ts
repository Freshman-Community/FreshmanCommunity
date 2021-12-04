import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('professor-like-unique', ['userId', 'professorId'])
export class ProfessorLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id, { cascade: false })
  userId: number;

  @Column()
  professorId: number;

  @CreateDateColumn()
  createdAt: Date;
}
