import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials : {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL
  }
});
