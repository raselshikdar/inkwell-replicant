import { Triangle, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { getTimeAgo } from "@/lib/timeAgo";
import type { ArticleWithAuthor } from "@/hooks/useArticles";

interface ArticleCardProps {
  article: ArticleWithAuthor;
  variant?: "featured" | "grid" | "list";
}

const ArticleCard = ({ article, variant = "grid" }: ArticleCardProps) => {
  const timeAgo = getTimeAgo(article.created_at);
  const authorName = article.profiles?.name || "Unknown";
  const authorUsername = article.profiles?.username || "";
  const authorInitials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  if (variant === "featured") {
    return (
      <article>
        <Link to={`/article/${article.slug}`} className="cursor-pointer block">
          <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-muted">
            {article.cover_image ? (
              <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <Avatar className="h-7 w-7 border-2 border-white/30">
                {article.profiles?.avatar_url && <AvatarImage src={article.profiles.avatar_url} />}
                <AvatarFallback className="bg-primary/80 text-primary-foreground text-[10px] font-semibold">{authorInitials}</AvatarFallback>
              </Avatar>
              <span className="text-white text-sm font-medium">{authorName}</span>
              <span className="text-white/70 text-xs">· {timeAgo} · {article.read_time_minutes} min read</span>
            </div>
          </div>
        </Link>
        <Link to={`/user/${authorUsername}`} className="text-xs text-muted-foreground mt-2.5 block hover:text-primary">@{authorUsername}</Link>
        <Link to={`/article/${article.slug}`}>
          <h2 className="text-base font-bold text-foreground leading-snug mt-0.5 hover:text-primary transition-colors">{article.title}</h2>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-muted-foreground">
            <Triangle className="h-3.5 w-3.5" /><span className="text-xs font-medium">{article.reaction_count}</span>
          </span>
          <span className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5" /><span className="text-xs font-medium">{article.response_count}</span>
          </span>
        </div>
      </article>
    );
  }

  if (variant === "list") {
    return (
      <article className="flex items-start gap-3 py-4 border-b border-border group">
        <div className="flex-1 min-w-0">
          <Link to={`/user/${authorUsername}`} className="flex items-center gap-2 mb-1.5">
            <Avatar className="h-5 w-5">
              {article.profiles?.avatar_url && <AvatarImage src={article.profiles.avatar_url} />}
              <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-semibold">{authorInitials}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{authorName} · {timeAgo}</span>
          </Link>
          <Link to={`/article/${article.slug}`}>
            <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
          </Link>
          {article.brief && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.brief}</p>}
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Triangle className="h-3 w-3" /> {article.reaction_count}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageCircle className="h-3 w-3" /> {article.response_count}
            </span>
          </div>
        </div>
        {article.cover_image && (
          <Link to={`/article/${article.slug}`} className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <img src={article.cover_image} alt="" className="w-full h-full object-cover" />
          </Link>
        )}
      </article>
    );
  }

  return (
    <article>
      <Link to={`/article/${article.slug}`} className="cursor-pointer block">
        <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-muted">
          {article.cover_image ? (
            <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5">
            <Avatar className="h-5 w-5 border border-white/30">
              {article.profiles?.avatar_url && <AvatarImage src={article.profiles.avatar_url} />}
              <AvatarFallback className="bg-primary/80 text-primary-foreground text-[8px] font-semibold">{authorInitials}</AvatarFallback>
            </Avatar>
            <span className="text-white/80 text-[10px] truncate">{timeAgo} · {article.read_time_minutes} min read</span>
          </div>
        </div>
      </Link>
      <p className="text-[11px] text-muted-foreground mt-2">@{authorUsername}</p>
      <Link to={`/article/${article.slug}`}>
        <h3 className="text-sm font-bold text-foreground leading-snug mt-0.5 line-clamp-3 hover:text-primary transition-colors">{article.title}</h3>
      </Link>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="flex items-center gap-1 border border-border rounded-full px-2.5 py-1 text-muted-foreground">
          <Triangle className="h-3 w-3" /><span className="text-[11px] font-medium">{article.reaction_count}</span>
        </span>
        <span className="flex items-center gap-1 border border-border rounded-full px-2.5 py-1 text-muted-foreground">
          <MessageCircle className="h-3 w-3" /><span className="text-[11px] font-medium">{article.response_count}</span>
        </span>
      </div>
    </article>
  );
};

export default ArticleCard;
