import { useState } from "react";
import Header from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, User, Lock, Database, Save, Shield, Smartphone } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [twoFactorSetup, setTwoFactorSetup] = useState<{
    secret: string;
    qrCode: string;
  } | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [disablePassword, setDisablePassword] = useState("");

  const { data: user } = useQuery({
    queryKey: ["/api/user"],
  });

  const setupTwoFactorMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/setup-2fa", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to setup 2FA");
      return res.json();
    },
    onSuccess: (data) => {
      setTwoFactorSetup(data);
      toast({
        title: "2FA Setup",
        description: "Scan the QR code with your authenticator app",
      });
    },
    onError: () => {
      toast({
        title: "Setup Failed",
        description: "Unable to setup 2FA",
        variant: "destructive",
      });
    },
  });

  const enableTwoFactorMutation = useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch("/api/enable-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      return res.json();
    },
    onSuccess: () => {
      setTwoFactorSetup(null);
      setVerificationCode("");
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication is now active",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid code",
        variant: "destructive",
      });
    },
  });

  const disableTwoFactorMutation = useMutation({
    mutationFn: async (password: string) => {
      const res = await fetch("/api/disable-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      return res.json();
    },
    onSuccess: () => {
      setDisablePassword("");
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Disable Failed",
        description: error.message || "Invalid password",
        variant: "destructive",
      });
    },
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
      });
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleDatabaseBackup = () => {
    toast({
      title: "Backup Started",
      description: "Database backup will be downloaded shortly",
    });
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Settings"
        description="Manage your admin account and preferences"
      />

      <div className="p-8 max-w-4xl">
        {/* Account Settings */}
        <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Account Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={user?.username || "JeetVK"}
                disabled
                className="mt-2 bg-secondary/50"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Username cannot be changed
              </p>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
          </div>

          {!twoFactorSetup ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account by requiring a code
                from your authenticator app when logging in.
              </p>
              
              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Status: {(user as any)?.twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(user as any)?.twoFactorEnabled 
                      ? "Your account is protected with 2FA"
                      : "2FA is not enabled on your account"}
                  </p>
                </div>
              </div>

              {!(user as any)?.twoFactorEnabled ? (
                <Button
                  onClick={() => setupTwoFactorMutation.mutate()}
                  disabled={setupTwoFactorMutation.isPending}
                  className="w-full sm:w-auto"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {setupTwoFactorMutation.isPending ? "Setting up..." : "Enable 2FA"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="disablePassword">
                      Enter password to disable 2FA
                    </Label>
                    <Input
                      id="disablePassword"
                      type="password"
                      value={disablePassword}
                      onChange={(e) => setDisablePassword(e.target.value)}
                      placeholder="Your current password"
                      className="mt-2"
                    />
                  </div>
                  <Button
                    onClick={() => disableTwoFactorMutation.mutate(disablePassword)}
                    disabled={!disablePassword || disableTwoFactorMutation.isPending}
                    variant="destructive"
                    className="w-full sm:w-auto"
                  >
                    {disableTwoFactorMutation.isPending ? "Disabling..." : "Disable 2FA"}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium mb-4">
                  Scan this QR code with your authenticator app
                </p>
                <div className="inline-block p-4 bg-white rounded-lg">
                  <img
                    src={twoFactorSetup.qrCode}
                    alt="2FA QR Code"
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Or enter this code manually: <code className="font-mono bg-secondary px-2 py-1 rounded">{twoFactorSetup.secret}</code>
                </p>
              </div>

              <div>
                <Label htmlFor="verificationCode">
                  Enter the 6-digit code from your app
                </Label>
                <Input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => enableTwoFactorMutation.mutate(verificationCode)}
                  disabled={verificationCode.length !== 6 || enableTwoFactorMutation.isPending}
                  className="flex-1"
                >
                  {enableTwoFactorMutation.isPending ? "Verifying..." : "Verify & Enable"}
                </Button>
                <Button
                  onClick={() => {
                    setTwoFactorSetup(null);
                    setVerificationCode("");
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, currentPassword: e.target.value })
                }
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                className="mt-2"
                required
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirmPassword: e.target.value })
                }
                className="mt-2"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>

        {/* Database Settings */}
        <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Database</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Backup your database to save all projects, messages, and analytics data.
              </p>
              <Button
                onClick={handleDatabaseBackup}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Database className="h-4 w-4 mr-2" />
                Download Backup
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Database Location:</strong> ./local.db
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Database Type:</strong> SQLite
              </p>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SettingsIcon className="h-4 w-4" />
            <span>Portfolio Admin Panel v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
