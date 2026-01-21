import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

const sqlite = new Database("./local.db");
export const db = drizzle(sqlite, { schema });

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
