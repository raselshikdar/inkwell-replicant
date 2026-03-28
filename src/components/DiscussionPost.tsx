import { Triangle, MessageCircle, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { DiscussionPost as DiscussionPostType } from "@/data/mockData";

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

interface Props {
  post: DiscussionPostType;
}

const DiscussionPost = ({ post }: Props) => {
  const timeAgo = getTimeAgo(post.publishedAt);

  return (
    <article className="py-4 border-b border-border">
      {/* Author line */}
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">
            {post.author.initials}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-foreground">{post.author.name}</span>
        <span className="text-xs text-muted-foreground">in {post.author.blogName}</span>
        <div className="flex-1" />
        <Bookmark className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Content row: text + optional image */}
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          {/* Reactions column + title */}
          <div className="flex gap-2">
            <div className="flex flex-col items-center gap-1 pt-0.5">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Triangle className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground">{post.reactionCount}</span>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground">{post.responseCount}</span>
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-foreground leading-snug">{post.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {timeAgo} · {post.readTimeMinutes} min read ·
              </p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{post.brief}</p>
              <button className="text-primary text-sm font-medium mt-2 hover:underline flex items-center gap-1">
                ⊕ Join discussion
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        {post.coverImage && (
          <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </article>
  );
};

export default DiscussionPost;
