import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({
    path: '.env',
});

export default {
    schema: './src/drizzle/drizzle.entity.ts',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
    casing: 'snake_case',
} satisfies Config;
