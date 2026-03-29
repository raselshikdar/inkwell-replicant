import { Triangle, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import type { Article } from "@/data/mockData";
import { getTimeAgo } from "@/lib/timeAgo";

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "grid";
}

const ArticleCard = ({ article, variant = "grid" }: ArticleCardProps) => {
  const timeAgo = getTimeAgo(article.publishedAt);

  if (variant === "featured") {
    return (
      <article>
        <Link to={`/article/${article.slug}`} className="cursor-pointer block">
          <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-muted">
            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <Avatar className="h-7 w-7 border-2 border-white/30">
                <AvatarFallback className="bg-primary/80 text-primary-foreground text-[10px] font-semibold">{article.author.initials}</AvatarFallback>
              </Avatar>
              <span className="text-white text-sm font-medium">{article.author.name}</span>
              <span className="text-white/70 text-xs">· {timeAgo} · {article.readTimeMinutes} min read</span>
            </div>
          </div>
        </Link>
        <Link to={`/user/${article.author.username}`} className="text-xs text-muted-foreground mt-2.5 block hover:text-primary">{article.author.blogName}</Link>
        <Link to={`/article/${article.slug}`}><h2 className="text-base font-bold text-foreground leading-snug mt-0.5 hover:text-primary transition-colors">{article.title}</h2></Link>
        <div className="flex items-center gap-2 mt-2">
          <button className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:bg-muted transition-colors">
            <Triangle className="h-3.5 w-3.5" /><span className="text-xs font-medium">{article.reactionCount}</span>
          </button>
          <button className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:bg-muted transition-colors">
            <MessageCircle className="h-3.5 w-3.5" /><span className="text-xs font-medium">{article.responseCount}</span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <article>
      <Link to={`/article/${article.slug}`} className="cursor-pointer block">
        <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-muted">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5">
            <Avatar className="h-5 w-5 border border-white/30">
              <AvatarFallback className="bg-primary/80 text-primary-foreground text-[8px] font-semibold">{article.author.initials}</AvatarFallback>
            </Avatar>
            <span className="text-white/80 text-[10px] truncate">{timeAgo} · {article.readTimeMinutes} min read</span>
          </div>
        </div>
      </Link>
      <p className="text-[11px] text-muted-foreground mt-2">{article.author.blogName}</p>
      <Link to={`/article/${article.slug}`}><h3 className="text-sm font-bold text-foreground leading-snug mt-0.5 line-clamp-3 hover:text-primary transition-colors">{article.title}</h3></Link>
      <div className="flex items-center gap-1.5 mt-2">
        <button className="flex items-center gap-1 border border-border rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted transition-colors">
          <Triangle className="h-3 w-3" /><span className="text-[11px] font-medium">{article.reactionCount}</span>
        </button>
        <button className="flex items-center gap-1 border border-border rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted transition-colors">
          <MessageCircle className="h-3 w-3" /><span className="text-[11px] font-medium">{article.responseCount}</span>
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;
