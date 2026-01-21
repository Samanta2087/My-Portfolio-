import { User } from "lucide-react";

interface HeaderProps {
  title: string;
  description?: string;
  username?: string;
}

export default function Header({ title, description, username }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-display font-bold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      {username && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent">
          <User className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono">{username}</span>
        </div>
      )}
    </header>
  );
}
