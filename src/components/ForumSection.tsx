import { MessageCircle, Triangle, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockForumThreads } from "@/data/mockData";

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return "1d ago";
  return `${diffDays}d ago`;
}

const ForumSection = () => {
  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-bold text-foreground">Recent from Forum</h2>
          <span className="text-primary text-sm font-medium">New</span>
        </div>
      </div>

      {/* Thread button */}
      <div className="flex justify-end mb-3">
        <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
          + Thread
        </button>
      </div>

      {/* Threads */}
      <div className="space-y-0">
        {mockForumThreads.map((thread) => {
          const timeAgo = getTimeAgo(thread.publishedAt);
          return (
            <div key={thread.id} className="py-3 border-b border-border">
              {/* Author */}
              <div className="flex items-center gap-2 mb-1.5">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-semibold">
                    {thread.author.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{thread.author.name}</span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-foreground leading-snug ml-11">{thread.title}</h3>
              <p className="text-sm text-muted-foreground ml-11 mt-0.5 line-clamp-1">{thread.brief}</p>

              {/* Meta */}
              <div className="flex items-center gap-3 ml-11 mt-1.5 text-xs text-muted-foreground">
                <span>{timeAgo}</span>
                {thread.reactionCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Triangle className="h-3 w-3" /> {thread.reactionCount}
                  </span>
                )}
                {thread.responseCount > 0 && (
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> {thread.responseCount}
                  </span>
                )}
                {thread.tag && (
                  <span className="text-primary font-medium">{thread.tag}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View all */}
      <button className="flex items-center gap-1 text-sm font-medium text-foreground mt-4 hover:text-primary transition-colors">
        View all threads <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ForumSection;
