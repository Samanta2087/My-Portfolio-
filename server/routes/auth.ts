import { Router } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { storage } from "../storage";
import { db } from "../storage";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Configure Passport Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return done(null, false, { message: "Invalid username or password" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      
      if (!isValid) {
        return done(null, false, { message: "Invalid username or password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Login endpoint
router.post("/login", (req, res, next) => {
  passport.authenticate("local", async (err: any, user: any, info: any) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    
    if (!user) {
      return res.status(401).json({ message: info?.message || "Invalid credentials" });
    }

    // Check if 2FA is enabled
    const dbUser = await storage.getUserByUsername(user.username);
    
    if (dbUser?.twoFactorEnabled) {
      // Store user in session temporarily for 2FA verification
      req.session.pendingUser = {
        id: user.id,
        username: user.username,
      };
      return res.json({
        requiresTwoFactor: true,
        message: "Please enter your 2FA code",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      
      return res.json({
        id: user.id,
        username: user.username,
        requiresTwoFactor: false,
      });
    });
  })(req, res, next);
});

// Verify 2FA code
router.post("/verify-2fa", async (req, res) => {
  const { code } = req.body;
  const pendingUser = req.session.pendingUser;

  if (!pendingUser) {
    return res.status(401).json({ message: "No pending authentication" });
  }

  try {
    const user = await storage.getUser(pendingUser.id);
    
    if (!user || !user.twoFactorSecret) {
      return res.status(401).json({ message: "Invalid authentication state" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: code,
      window: 2,
    });

    if (!verified) {
      return res.status(401).json({ message: "Invalid 2FA code" });
    }

    // Clear pending user and log in
    delete req.session.pendingUser;
    
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      
      return res.json({
        id: user.id,
        username: user.username,
      });
    });
  } catch (error) {
    console.error("2FA verification error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});

// Setup 2FA
router.post("/setup-2fa", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const secret = speakeasy.generateSecret({
      name: `Portfolio Admin (${(req.user as any).username})`,
      issuer: "Portfolio Admin",
    });

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

    // Store secret temporarily in session
    req.session.tempTwoFactorSecret = secret.base32;

    res.json({
      secret: secret.base32,
      qrCode: qrCodeUrl,
    });
  } catch (error) {
    console.error("2FA setup error:", error);
    res.status(500).json({ message: "Failed to setup 2FA" });
  }
});

// Enable 2FA (verify and save)
router.post("/enable-2fa", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { code } = req.body;
  const tempSecret = req.session.tempTwoFactorSecret;

  if (!tempSecret) {
    return res.status(400).json({ message: "No 2FA setup in progress" });
  }

  try {
    const verified = speakeasy.totp.verify({
      secret: tempSecret,
      encoding: "base32",
      token: code,
      window: 2,
    });

    if (!verified) {
      return res.status(401).json({ message: "Invalid 2FA code" });
    }

    // Save the secret to database
    await db
      .update(users)
      .set({
        twoFactorSecret: tempSecret,
        twoFactorEnabled: true,
      })
      .where(eq(users.id, (req.user as any).id));

    delete req.session.tempTwoFactorSecret;

    res.json({ message: "2FA enabled successfully" });
  } catch (error) {
    console.error("2FA enable error:", error);
    res.status(500).json({ message: "Failed to enable 2FA" });
  }
});

// Disable 2FA
router.post("/disable-2fa", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { password } = req.body;

  try {
    const user = await storage.getUser((req.user as any).id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    await db
      .update(users)
      .set({
        twoFactorSecret: null,
        twoFactorEnabled: false,
      })
      .where(eq(users.id, user.id));

    res.json({ message: "2FA disabled successfully" });
  } catch (error) {
    console.error("2FA disable error:", error);
    res.status(500).json({ message: "Failed to disable 2FA" });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

// Get current user
router.get("/user", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  const user = await storage.getUser((req.user as any).id);
  
  res.json({
    id: user?.id,
    username: user?.username,
    twoFactorEnabled: user?.twoFactorEnabled || false,
  });
});

export default router;
