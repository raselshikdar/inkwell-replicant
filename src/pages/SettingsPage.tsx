import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, User, Bell, Shield, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const { profile, isAuthenticated, updateProfile } = useAuth();
  const [tab, setTab] = useState<"profile" | "notifications" | "account">("profile");
  const [name, setName] = useState(profile?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [website, setWebsite] = useState(profile?.website || "");
  const [saving, setSaving] = useState(false);

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Sign in required</h1>
          <p className="text-sm text-muted-foreground mb-4">You need to be logged in to access settings.</p>
          <Link to="/login" className="text-primary font-medium hover:underline">Sign in →</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name, bio, location, website });
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "account" as const, label: "Account", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-border"}`}>
              <t.icon className="h-4 w-4" />{t.label}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="rounded-full text-xs">Change avatar</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Website</label>
                <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleSave} className="rounded-full" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div className="space-y-4">
            {["Email notifications for new comments", "Email notifications for new followers", "Weekly digest email", "Push notifications"].map((label) => (
              <label key={label} className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm text-foreground">{label}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              </label>
            ))}
          </div>
        )}

        {tab === "account" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">{profile?.username}@...</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Change Password</h3>
              <Button variant="outline" size="sm" className="rounded-full text-xs">Update password</Button>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-destructive mb-2">Danger Zone</h3>
              <Button variant="destructive" size="sm" className="rounded-full text-xs">Delete account</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
