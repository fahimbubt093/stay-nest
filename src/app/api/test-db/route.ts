import { connection } from "next/server";

export async function GET(): Promise<Response> {
  await connection();

  if (process.env.ENABLE_DATABASE_TEST !== "true") {
    return Response.json(
      {
        success: false,
        message: "Database connectivity testing is disabled.",
      },
      { status: 503 },
    );
  }

  try {
    const { verifyDatabaseConnection } = await import("@/lib/db");
    verifyDatabaseConnection();

    return Response.json({
      success: true,
      message: "SQLite database connection successful",
    });
  } catch (error) {
    console.error("Database connection test failed:", error);

    return Response.json(
      {
        success: false,
        message: "SQLite database connection failed",
      },
      { status: 500 },
    );
  }
}
