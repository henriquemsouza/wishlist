import env from "../../config/env";
import { Connection, getConnection } from "typeorm";
import { Database } from "./Database";

export const createDBConnection = async (): Promise<Connection> => {
  const db = new Database();

  const connection = await db.getConnection();
  return connection;
};

export const getTypeORMConnection = (): Connection => {
  const connectionName = env.env_name;
  return getConnection(connectionName);
};
