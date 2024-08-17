import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

import { getSlugId } from "../helpers/id";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: false,
  })
  name: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;

  @Column({
    type: "json",
    default: ["products.jpg"],
  })
  images: string[];

  @Column({
    type: "int",
    default: 0,
  })
  price: number;

  @Column({
    type: "int",
    nullable: false,
    default: 1,
  })
  qty: number;

  @Column({
    type: "text",
    unique: true,
  })
  slug: string;

  @Column({
    type: "text",
  })
  category: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: string;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: string;

  @Column({
    type: "int",
    default: 1,
  })
  createdBy: number;

  @BeforeInsert()
  createSlug() {
    const product = this;
    const id = getSlugId();

    if (!product.slug) {
      product.slug = `${product.name.toLowerCase().split(" ").join("-")}-${id}`;
    } else {
      product.slug = `${product.slug.toLowerCase().split(" ").join("-")}-${id}`;
    }
  }
}
