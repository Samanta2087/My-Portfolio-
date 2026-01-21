import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/admin/Header";
import { BarChart3, FolderKanban, Mail, TrendingUp } from "lucide-react";

interface DashboardStats {
  projectCount: number;
  unreadMessages: number;
  totalViews: number;
  recentMessages: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
  }>;
}

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Dashboard" />
      
      <main className="flex-1 p-8 bg-background">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FolderKanban}
            label="Total Projects"
            value={stats?.projectCount || 0}
            color="text-blue-500"
          />
          <StatCard
            icon={Mail}
            label="Unread Messages"
            value={stats?.unreadMessages || 0}
            color="text-yellow-500"
          />
          <StatCard
            icon={BarChart3}
            label="Total Views (30d)"
            value={stats?.totalViews || 0}
            color="text-green-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Engagement"
            value="High"
            color="text-purple-500"
          />
        </div>

        {/* Recent Messages */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-xl font-display font-bold mb-4">Recent Messages</h3>
          
          {stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div className="space-y-4">
              {stats.recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 bg-accent rounded-lg border border-border"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{message.name}</p>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No messages yet</p>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  color: string 
}) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-accent ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
