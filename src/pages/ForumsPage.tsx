import HeaderNav from "@/components/HeaderNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Triangle, Plus } from "lucide-react";
import { mockForumThreads } from "@/data/mockData";
import { getTimeAgo } from "@/lib/timeAgo";
import { useState } from "react";

const ForumsPage = () => {
  const [filter, setFilter] = useState<"all" | "introduction" | "showcase" | "general">("all");

  const threads = filter === "all"
    ? mockForumThreads
    : mockForumThreads.filter((t) => t.tag?.includes(filter));

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Forums</h1>
          </div>
          <Button size="sm" className="rounded-full text-xs gap-1">
            <Plus className="h-3 w-3" /> New Thread
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(["all", "introduction", "showcase", "general"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-border"}`}>
              {f === "all" ? "All" : `#${f}`}
            </button>
          ))}
        </div>

        {/* Threads */}
        <div className="space-y-0">
          {threads.map((thread) => (
            <div key={thread.id} className="py-4 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">{thread.author.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{thread.author.name}</span>
                <span className="text-xs text-muted-foreground">· {getTimeAgo(thread.publishedAt)}</span>
              </div>
              <h3 className="text-sm font-bold text-foreground leading-snug mb-1">{thread.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{thread.brief}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {thread.reactionCount > 0 && (
                  <span className="flex items-center gap-1"><Triangle className="h-3 w-3" /> {thread.reactionCount}</span>
                )}
                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {thread.responseCount}</span>
                {thread.tag && <span className="text-primary font-medium">{thread.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumsPage;
