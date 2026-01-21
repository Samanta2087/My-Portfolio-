import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/admin/Header";
import { Mail, Check, Reply, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
}

export default function Messages() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const res = await fetch("/api/admin/messages", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/messages/${id}/read`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const markRepliedMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/messages/${id}/replied`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to mark as replied");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      toast({ title: "Message marked as replied" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete message");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      toast({ title: "Message deleted" });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Messages" />
      
      <main className="flex-1 p-8 bg-background">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Contact Messages</h3>
          <div className="text-sm text-muted-foreground">
            {messages?.filter(m => !m.isRead).length || 0} unread
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`bg-card rounded-lg border p-6 ${
                  !message.isRead ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{message.name}</h4>
                      {!message.isRead && (
                        <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded">
                          New
                        </span>
                      )}
                      {message.isReplied && (
                        <span className="px-2 py-1 text-xs bg-green-500 text-white rounded">
                          Replied
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                    {message.subject && (
                      <p className="text-sm font-medium mt-1">Subject: {message.subject}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleDateString()} at{" "}
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                </div>

                <p className="text-sm mb-4 whitespace-pre-wrap">{message.message}</p>

                <div className="flex gap-2">
                  {!message.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markReadMutation.mutate(message.id)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Mark Read
                    </Button>
                  )}
                  {!message.isReplied && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        window.location.href = `mailto:${message.email}?subject=Re: ${message.subject || "Your message"}`;
                        markRepliedMutation.mutate(message.id);
                      }}
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(message.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Mail className="w-16 h-16 mb-4 opacity-20" />
            <p>No messages yet</p>
          </div>
        )}
      </main>
    </div>
  );
}
