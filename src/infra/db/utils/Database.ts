import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from "typeorm";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import env from "../../config/env";
import { injectable } from "inversify";
import CustomerEntity from "../entities/CustomerEntity";
import WishlistEntity from "../entities/WishlistEntity";
import WishlistItemEntity from "../entities/WishlistItemEntity";

@injectable()
export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = env.env_name;
    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      connection = await this.connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      const connectionOptions: ConnectionOptions =
        this.buildConnectionOptions(CONNECTION_NAME);

      if (env.db_pass) {
        this.assignPass(connectionOptions);
      }

      connection = await createConnection(connectionOptions);
    }

    return connection;
  }

  private buildConnectionOptions(CONNECTION_NAME: string): ConnectionOptions {
    return {
      name: CONNECTION_NAME,
      type: `postgres`,
      port: env.db_port,
      synchronize: false,
      logging: true,
      database: env.db_name,
      host: env.db_host,
      password: env.db_pass,
      username: env.db_user,
      entities: [CustomerEntity, WishlistEntity, WishlistItemEntity],
      migrations: [__dirname + "/src/infra/infra/db/migrations/*{.ts,.js}"],
      namingStrategy: new SnakeNamingStrategy(),
      cli: {
        entitiesDir: "./src/infra/db/entities",
        migrationsDir: "./src/**/db/migrations",
      },
    };
  }

  private assignPass(connectionOptions) {
    Object.assign(connectionOptions, {
      password: env.db_pass,
    });
  }
}
