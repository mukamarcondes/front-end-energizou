import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Customer } from "./entity/Customer";
import { Company } from "./entity/Company";

export async function connectToDatabase(): Promise<DataSource> {
  const params: DataSourceOptions = {
    type: "postgres",
    url: process.env.POSTGRES_URL + "?sslmode=require",
    synchronize: true,
    entities: [Customer, Company],
    subscribers: [],
    migrations: [],
  };

  const connection = new DataSource(params);

  return connection;
}
