import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Mail, 
  Settings, 
  LogOut,
  BarChart3 
} from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const [location] = useLocation();

  const menuItems = [
    { path: "/Jeet", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/Jeet/projects", icon: FolderKanban, label: "Projects" },
    { path: "/Jeet/messages", icon: Mail, label: "Messages" },
    { path: "/Jeet/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/Jeet/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-display font-bold text-primary">ADMIN PANEL</h1>
        <p className="text-xs text-muted-foreground font-mono mt-1">PORTFOLIO MANAGEMENT</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path || (item.path !== "/Jeet" && location.startsWith(item.path));
          
          return (
            <Link key={item.path} href={item.path}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
