import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import * as schema from "@shared/schema";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export const storage = {
  // Legacy interface - keeping for backward compatibility
  async getUser(id: string) {
    return db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
  },
  
  async getUserByUsername(username: string) {
    return db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    });
  },
  
  async createUser(insertUser: schema.InsertUser) {
    const [user] = await db.insert(schema.users).values(insertUser).returning();
    return user;
  },
};
