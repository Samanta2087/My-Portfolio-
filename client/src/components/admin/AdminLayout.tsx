import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/admin/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/user", {
        credentials: "include",
      });
      
      if (res.ok) {
        const user = await res.json();
        setUsername(user.username);
      } else {
        setLocation("/Jeet/login");
      }
    } catch (error) {
      setLocation("/Jeet/login");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setLocation("/Jeet/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!username) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onLogout={handleLogout} />
      {children}
    </div>
  );
}
