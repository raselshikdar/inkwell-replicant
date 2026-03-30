import { useParams, Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Link2, Github, Calendar, Loader2 } from "lucide-react";
import { useProfileByUsername, useFollowCounts } from "@/hooks/useProfile";
import { useUserArticles } from "@/hooks/useArticles";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/lib/timeAgo";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { data: profileData, isLoading } = useProfileByUsername(username || "");
  const { data: followCounts } = useFollowCounts(profileData?.id || "");
  const { data: userArticles = [] } = useUserArticles(profileData?.id || "");
  const { user } = useAuth();
  const [tab, setTab] = useState<"posts" | "about">("posts");
  const [following, setFollowing] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNav />
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNav />
        <div className="max-w-[720px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">User not found</h1>
          <Link to="/" className="text-primary font-medium hover:underline">← Back to feed</Link>
        </div>
      </div>
    );
  }

  const initials = profileData.name
    ? profileData.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : profileData.username.slice(0, 2).toUpperCase();

  const handleFollow = async () => {
    if (!user) { toast.error("Sign in to follow"); return; }
    try {
      if (following) {
        await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", profileData.id);
        setFollowing(false);
      } else {
        await supabase.from("follows").insert({ follower_id: user.id, following_id: profileData.id });
        setFollowing(true);
      }
    } catch {
      toast.error("Failed");
    }
  };

  const isOwnProfile = user?.id === profileData.id;

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-8">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-20 w-20">
            {profileData.avatar_url && <AvatarImage src={profileData.avatar_url} />}
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground">{profileData.name}</h1>
            <p className="text-sm text-muted-foreground">@{profileData.username}</p>
            {profileData.bio && <p className="text-sm text-foreground mt-2">{profileData.bio}</p>}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
              {profileData.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{profileData.location}</span>}
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Joined {formatDate(profileData.created_at)}</span>
              {profileData.website && <a href={profileData.website} className="flex items-center gap-1 text-primary hover:underline"><Link2 className="h-3 w-3" />{profileData.website}</a>}
              {profileData.github && <a href={`https://github.com/${profileData.github}`} className="flex items-center gap-1 hover:text-foreground"><Github className="h-3 w-3" />{profileData.github}</a>}
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span><strong className="text-foreground">{followCounts?.followers || 0}</strong> <span className="text-muted-foreground">followers</span></span>
              <span><strong className="text-foreground">{followCounts?.following || 0}</strong> <span className="text-muted-foreground">following</span></span>
            </div>
          </div>
        </div>

        {!isOwnProfile && (
          <div className="flex gap-4 mb-4">
            <Button variant={following ? "secondary" : "outline"} size="sm" className="rounded-full" onClick={handleFollow}>
              {following ? "Following" : "Follow"}
            </Button>
          </div>
        )}

        <div className="border-b border-border mb-6">
          <div className="flex gap-0">
            {(["posts", "about"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium capitalize relative transition-colors ${tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {t}
                {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {tab === "posts" ? (
          userArticles.length > 0 ? (
            <div className="space-y-4">
              {userArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.slug}`} className="block py-3 border-b border-border hover:bg-muted/50 rounded-lg px-2 transition-colors">
                  <h3 className="text-sm font-bold text-foreground">{article.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{article.brief}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-12">No posts yet.</p>
          )
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{profileData.bio || "No bio yet."}</p>
            </div>
            {(profileData.website || profileData.github) && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Links</h3>
                <div className="space-y-2">
                  {profileData.website && <a href={profileData.website} className="flex items-center gap-2 text-sm text-primary hover:underline"><Link2 className="h-4 w-4" />{profileData.website}</a>}
                  {profileData.github && <a href={`https://github.com/${profileData.github}`} className="flex items-center gap-2 text-sm text-primary hover:underline"><Github className="h-4 w-4" />github.com/{profileData.github}</a>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
