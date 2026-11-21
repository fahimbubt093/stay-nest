import { io } from "next/cache";

export async function DateDisplay() {
  await io();
  const now = new Date();

  return (
    <time dateTime={now.toISOString()}>
      {new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(now)}
    </time>
  );
}
