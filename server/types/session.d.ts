import "express-session";

declare module "express-session" {
  interface SessionData {
    pendingUser?: {
      id: string;
      username: string;
    };
    tempTwoFactorSecret?: string;
  }
}
