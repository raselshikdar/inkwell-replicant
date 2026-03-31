import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, User, Shield, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SettingsPage = () => {
  const { profile, user, isAuthenticated, updateProfile, logout } = useAuth();
  const [tab, setTab] = useState<"profile" | "account">("profile");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [saving, setSaving] = useState(false);

  // Password change
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      setLocation(profile.location || "");
      setWebsite(profile.website || "");
      setGithub(profile.github || "");
      setTwitter(profile.twitter || "");
    }
  }, [profile]);

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
      await updateProfile({ name, bio, location, website, github, twitter });
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPw.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setChangingPw(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) throw error;
      toast.success("Password updated!");
      setCurrentPw("");
      setNewPw("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update password");
    } finally {
      setChangingPw(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirm) return;
    toast.error("Account deletion requires admin action. Please contact support.");
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
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
                <p className="text-sm text-muted-foreground">@{profile?.username}</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Name", value: name, onChange: setName, type: "text" },
                { label: "Location", value: location, onChange: setLocation, type: "text" },
                { label: "Website", value: website, onChange: setWebsite, type: "url" },
                { label: "GitHub username", value: github, onChange: setGithub, type: "text" },
                { label: "Twitter username", value: twitter, onChange: setTwitter, type: "text" },
              ].map(({ label, value, onChange, type }) => (
                <div key={label}>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
                  <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
            </div>

            <Button onClick={handleSave} className="rounded-full" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        )}

        {tab === "account" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Change Password</h3>
              <div className="space-y-3 max-w-[400px]">
                <div className="relative">
                  <input type={showNewPw ? "text" : "password"} value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New password (min 8 chars)"
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 pr-10" />
                  <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button variant="outline" size="sm" className="rounded-full" onClick={handlePasswordChange} disabled={changingPw || newPw.length < 8}>
                  {changingPw ? "Updating..." : "Update password"}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Sign out</h3>
              <Button variant="outline" size="sm" className="rounded-full" onClick={async () => { await logout(); toast.success("Signed out"); }}>
                Sign out
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-destructive mb-2">Danger Zone</h3>
              <p className="text-xs text-muted-foreground mb-3">Permanently delete your account and all associated data.</p>
              <Button variant="destructive" size="sm" className="rounded-full text-xs" onClick={handleDeleteAccount}>
                Delete account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
