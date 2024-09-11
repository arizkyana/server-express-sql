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
export class Bundle {
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

  @Column({
    type: "number",
    nullable: false,
  })
  price: number;

  @Column({
    type: "float",
    nullable: false,
  })
  discount: number;

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
