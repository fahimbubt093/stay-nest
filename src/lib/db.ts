import "server-only";
import {
  createPool,
  type Pool,
  type PoolConnection,
  type PoolOptions,
} from "mysql2/promise";

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required MySQL environment variable ${name}. Set it in the project-root .env file.`,
    );
  }

  return value;
}

function getPort(): number {
  const value = process.env.DB_PORT;
  const port = value ? Number(value) : 3306;

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("DB_PORT must be a whole number between 1 and 65535.");
  }

  return port;
}

const poolOptions: PoolOptions = {
  host: requiredEnv("DB_HOST"),
  port: getPort(),
  user: requiredEnv("DB_USER"),
  password: process.env.DB_PASSWORD ?? "",
  database: requiredEnv("DB_NAME"),
  charset: "utf8mb4",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

declare global {
  var hotelDbPool: Pool | undefined;
}

export const pool =
  globalThis.hotelDbPool ?? createPool(poolOptions);

if (process.env.NODE_ENV !== "production") {
  globalThis.hotelDbPool = pool;
}

export async function verifyDatabaseConnection(): Promise<void> {
  let connection: PoolConnection | undefined;

  try {
    connection = await pool.getConnection();
    await connection.ping();
  } catch (error) {
    throw new Error(
      "Unable to connect to MySQL. Check the DB_* settings and ensure the database server is running.",
      { cause: error },
    );
  } finally {
    connection?.release();
  }
}
