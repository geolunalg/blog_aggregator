import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config"

const dbUrl = readConfig().dbUrl;

export default defineConfig({
    schema: "src/lib/db/schema.ts",
    out: "src/lib/metadata",
    dialect: "postgresql",
    dbCredentials: {
        url: dbUrl
    }
});