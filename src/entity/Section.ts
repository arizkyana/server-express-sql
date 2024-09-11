import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Course } from "./Course";

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: false,
  })
  title: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: string;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: number;

  @ManyToOne(() => Course, (course) => course.id)
  course: number;
}
