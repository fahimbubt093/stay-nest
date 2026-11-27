import "server-only";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

function createDatabase(): Database.Database {
  const databaseDirectory = join(process.cwd(), "database");
  const configuredFilename = process.env.SQLITE_DATABASE_FILENAME?.trim();

  if (
    configuredFilename &&
    (configuredFilename === "." ||
      configuredFilename === ".." ||
      /[\\/]/.test(configuredFilename))
  ) {
    throw new Error("SQLITE_DATABASE_FILENAME must be a file name, not a path.");
  }

  const databaseFilename = configuredFilename || "hotel.sqlite";
  mkdirSync(databaseDirectory, { recursive: true });
  const databasePath = join(databaseDirectory, databaseFilename);
  const connection = new Database(databasePath);
  connection.pragma("foreign_keys = ON");

  return connection;
}

declare global {
  var hotelSqliteDatabase: Database.Database | undefined;
}

export const database =
  globalThis.hotelSqliteDatabase ?? createDatabase();

if (process.env.NODE_ENV !== "production") {
  globalThis.hotelSqliteDatabase = database;
}

export function verifyDatabaseConnection(): void {
  try {
    database.prepare("SELECT 1").get();
  } catch (error) {
    throw new Error(
      "Unable to connect to SQLite. Check SQLITE_DATABASE_FILENAME and file permissions.",
      { cause: error },
    );
  }
}
