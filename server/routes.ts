import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Authentication routes
  app.use("/api", authRoutes);
  
  // Admin routes
  app.use("/api/admin", adminRoutes);
  
  // Public API routes will go here
  
  return httpServer;
}
