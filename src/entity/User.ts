import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "text",
  })
  fullName: string;

  @Column({
    unique: true,
    nullable: false,
    type: "text",
  })
  username: string;

  @Column({
    unique: true,
    nullable: false,
    type: "text",
  })
  email: string;

  @Column({
    nullable: false,
    type: "text",
  })
  password: string;

  @Column({
    nullable: false,
    enum: ["admin", "user"],
    default: "user",
    type: "enum",
  })
  role: string;

  @Column({
    default: "default.jpg",
    type: "text",
  })
  profilePicture: string;

  @Column({
    default: true,
    type: "bool",
  })
  isActive: boolean;

  @Column({
    nullable: true,
    type: "text",
  })
  activationCode: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: string;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: string;
}
