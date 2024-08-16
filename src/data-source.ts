import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  //   port: 5432,
  port: 6543,
  username: "postgres.wwmgwrjegqaspmpkvjnp",
  password: "v5ya8lRG4fx79JUD",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

// db password: v5ya8lRG4fx79JUD
