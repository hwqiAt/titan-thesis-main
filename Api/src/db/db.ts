import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "../db/schema";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: "mydb",
      host: "localhost",
      user: "postgres",
      password: "123456",
    }),
  }),
});
