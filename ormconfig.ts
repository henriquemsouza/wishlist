import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import env from "./src/infra/config/env";

const defaultConfig = {
  synchronize: true,
  logging: false,
  entities: ["./src/**/infra/db/entities/*{.ts,.js}"],
  migrations: ["./src/**/infra/db/migrations/**/*{.ts,.js}"],
  cli: {
    entitiesDir: "./src/**/db/entities",
    migrationsDir: "./src/**/db/migrations",
  },
  seeds: ["./src/**/db/seeds/**/*{.ts,.js}"],
  factories: ["./src/**/db/factories/**/*{.ts,.js}"],
  type: "postgres",
  database: env.db_name,
  host: env.db_host,
  password: env.db_pass,
  username: env.db_user,
  namingStrategy: new SnakeNamingStrategy(),
};

module.exports = [
  {
    ...defaultConfig,
    name: 'development',
    logging: true,
    database: env.db_name,
  },
];
