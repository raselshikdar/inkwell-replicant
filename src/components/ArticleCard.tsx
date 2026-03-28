import { Triangle, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Article } from "@/data/mockData";

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "grid";
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "1d ago";
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}

const ArticleCard = ({ article, variant = "grid" }: ArticleCardProps) => {
  const timeAgo = getTimeAgo(article.publishedAt);

  if (variant === "featured") {
    return (
      <article className="cursor-pointer">
        {/* Cover image with overlay */}
        <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-muted">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {/* Author info overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <Avatar className="h-7 w-7 border-2 border-white/30">
              <AvatarFallback className="bg-primary/80 text-primary-foreground text-[10px] font-semibold">
                {article.author.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-white text-sm font-medium">{article.author.name}</span>
            <span className="text-white/70 text-xs">· {timeAgo} · {article.readTimeMinutes} min read</span>
          </div>
        </div>

        {/* Blog name */}
        <p className="text-xs text-muted-foreground mt-2.5">{article.author.blogName}</p>
        {/* Title */}
        <h2 className="text-base font-bold text-foreground leading-snug mt-0.5">{article.title}</h2>
        {/* Reactions */}
        <div className="flex items-center gap-2 mt-2">
          <button className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:bg-muted transition-colors">
            <Triangle className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{article.reactionCount}</span>
          </button>
          <button className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:bg-muted transition-colors">
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{article.responseCount}</span>
          </button>
        </div>
      </article>
    );
  }

  // Grid card variant
  return (
    <article className="cursor-pointer">
      {/* Cover image with overlay */}
      <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-muted">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5">
          <Avatar className="h-5 w-5 border border-white/30">
            <AvatarFallback className="bg-primary/80 text-primary-foreground text-[8px] font-semibold">
              {article.author.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-white/80 text-[10px] truncate">{timeAgo} · {article.readTimeMinutes} min read</span>
        </div>
      </div>

      {/* Blog name */}
      <p className="text-[11px] text-muted-foreground mt-2">{article.author.blogName}</p>
      {/* Title */}
      <h3 className="text-sm font-bold text-foreground leading-snug mt-0.5 line-clamp-3">{article.title}</h3>
      {/* Reactions */}
      <div className="flex items-center gap-1.5 mt-2">
        <button className="flex items-center gap-1 border border-border rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted transition-colors">
          <Triangle className="h-3 w-3" />
          <span className="text-[11px] font-medium">{article.reactionCount}</span>
        </button>
        <button className="flex items-center gap-1 border border-border rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted transition-colors">
          <MessageCircle className="h-3 w-3" />
          <span className="text-[11px] font-medium">{article.responseCount}</span>
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;
