import { useParams, Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Link2, Github, Calendar } from "lucide-react";
import { mockArticles } from "@/data/mockData";
import ArticleCard from "@/components/ArticleCard";
import { formatDate } from "@/lib/timeAgo";
import { useState } from "react";

// Mock user data based on username
const getMockUser = (username: string) => {
  const authorArticle = mockArticles.find((a) => a.author.username === username);
  return {
    name: authorArticle?.author.name || username,
    username,
    initials: authorArticle?.author.initials || username.slice(0, 2).toUpperCase(),
    bio: "Developer & writer sharing insights about software engineering, open source, and tech.",
    location: "Earth",
    website: `https://${username}.dev`,
    github: username,
    joinedAt: "2025-01-15",
    followers: 42,
    following: 18,
  };
};

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const user = getMockUser(username || "");
  const userArticles = mockArticles.filter((a) => a.author.username === username);
  const [tab, setTab] = useState<"posts" | "about">("posts");

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            <p className="text-sm text-foreground mt-2">{user.bio}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{user.location}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Joined {formatDate(user.joinedAt)}</span>
              <a href={user.website} className="flex items-center gap-1 text-primary hover:underline"><Link2 className="h-3 w-3" />{user.website}</a>
              <a href={`https://github.com/${user.github}`} className="flex items-center gap-1 hover:text-foreground"><Github className="h-3 w-3" />{user.github}</a>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span><strong className="text-foreground">{user.followers}</strong> <span className="text-muted-foreground">followers</span></span>
              <span><strong className="text-foreground">{user.following}</strong> <span className="text-muted-foreground">following</span></span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <Button variant="outline" size="sm" className="rounded-full">Follow</Button>
        </div>

        {/* Tabs */}
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

        {/* Content */}
        {tab === "posts" ? (
          userArticles.length > 0 ? (
            <div className="space-y-4">
              {userArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.slug}`}>
                  <ArticleCard article={article} variant="grid" />
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
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Links</h3>
              <div className="space-y-2">
                <a href={user.website} className="flex items-center gap-2 text-sm text-primary hover:underline"><Link2 className="h-4 w-4" />{user.website}</a>
                <a href={`https://github.com/${user.github}`} className="flex items-center gap-2 text-sm text-primary hover:underline"><Github className="h-4 w-4" />github.com/{user.github}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
