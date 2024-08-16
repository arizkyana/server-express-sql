import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

import {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_URL,
  DATABASE_PORT,
} from "./helpers/env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DATABASE_URL,
  //   port: 5432,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
