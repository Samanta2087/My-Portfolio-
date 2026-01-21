import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./shared/schema";
import bcrypt from "bcryptjs";

const sqlite = new Database("./local.db");
const db = drizzle(sqlite, { schema });

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
    if (error.message?.includes("UNIQUE")) {
      console.log("ℹ️  Admin user already exists");
    } else {
      console.error("❌ Error creating admin user:", error);
    }
  } finally {
    sqlite.close();
  }
}

createAdminUser();
