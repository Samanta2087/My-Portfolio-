import { Router } from "express";
import { db } from "../storage";
import { projects, messages, analytics, insertProjectSchema, insertMessageSchema } from "@shared/schema";
import { requireAdmin } from "../middleware/auth";
import { desc, eq, sql, and, gte } from "drizzle-orm";

const router = Router();

// Dashboard Stats
router.get("/stats", requireAdmin, async (req, res) => {
  try {
    const [projectCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects);

    const [unreadMessages] = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(eq(messages.isRead, false));

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [viewsLast30Days] = await db
      .select({ total: sql<number>`sum(views)` })
      .from(analytics)
      .where(gte(analytics.date, thirtyDaysAgo));

    const recentMessages = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt))
      .limit(5);

    res.json({
      projectCount: projectCount.count || 0,
      unreadMessages: unreadMessages.count || 0,
      totalViews: viewsLast30Days.total || 0,
      recentMessages,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

// Projects CRUD
router.get("/projects", requireAdmin, async (req, res) => {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.order), desc(projects.createdAt));
    
    res.json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

router.post("/projects", requireAdmin, async (req, res) => {
  try {
    const validatedData = insertProjectSchema.parse(req.body);
    
    const [newProject] = await db
      .insert(projects)
      .values(validatedData)
      .returning();
    
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: "Failed to create project" });
  }
});

router.put("/projects/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = insertProjectSchema.parse(req.body);
    
    const [updatedProject] = await db
      .update(projects)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(400).json({ message: "Failed to update project" });
  }
});

router.delete("/projects/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [deletedProject] = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
});

// Messages Management
router.get("/messages", requireAdmin, async (req, res) => {
  try {
    const allMessages = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt));
    
    res.json(allMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

router.patch("/messages/:id/read", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [updatedMessage] = await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id))
      .returning();
    
    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json(updatedMessage);
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ message: "Failed to update message" });
  }
});

router.patch("/messages/:id/replied", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [updatedMessage] = await db
      .update(messages)
      .set({ isReplied: true, isRead: true })
      .where(eq(messages.id, id))
      .returning();
    
    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json(updatedMessage);
  } catch (error) {
    console.error("Error marking message as replied:", error);
    res.status(500).json({ message: "Failed to update message" });
  }
});

router.delete("/messages/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [deletedMessage] = await db
      .delete(messages)
      .where(eq(messages.id, id))
      .returning();
    
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

// Public Contact Form Submission
router.post("/contact", async (req, res) => {
  try {
    const validatedData = insertMessageSchema.parse(req.body);
    
    const [newMessage] = await db
      .insert(messages)
      .values(validatedData)
      .returning();
    
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(400).json({ message: "Failed to send message" });
  }
});

// Analytics
router.post("/analytics/track", async (req, res) => {
  try {
    const { path } = req.body;
    
    if (!path) {
      return res.status(400).json({ message: "Path is required" });
    }

    await db
      .insert(analytics)
      .values({ path })
      .onConflictDoNothing();
    
    res.json({ message: "View tracked" });
  } catch (error) {
    console.error("Error tracking analytics:", error);
    res.status(500).json({ message: "Failed to track view" });
  }
});

router.get("/analytics", requireAdmin, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const pageViews = await db
      .select({
        path: analytics.path,
        views: sql<number>`sum(${analytics.views})`,
      })
      .from(analytics)
      .where(gte(analytics.date, thirtyDaysAgo))
      .groupBy(analytics.path)
      .orderBy(desc(sql`sum(${analytics.views})`));

    res.json(pageViews);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

export default router;
