import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import * as schema from "./shared/schema";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function createAdminUser() {
  const username = "JeetVK";
  const password = "SamantaVK18";
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await db.insert(schema.users).values({
      username,
      password: hashedPassword,
    });
    
    console.log("✅ Admin user created successfully!");
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log("\n⚠️  IMPORTANT: Change the password after first login!");
  } catch (error: any) {
    if (error.message?.includes("UNIQUE") || error.message?.includes("unique")) {
      console.log("ℹ️  Admin user already exists");
    } else {
      console.error("❌ Error creating admin user:", error);
    }
  } finally {
    await pool.end();
  }
}

createAdminUser();
