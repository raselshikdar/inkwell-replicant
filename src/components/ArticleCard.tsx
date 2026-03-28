import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/data/mockData";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const timeAgo = getTimeAgo(article.publishedAt);

  return (
    <article className="bg-card border-b border-border p-4 sm:p-5 hover:bg-hn-card-hover transition-colors cursor-pointer">
      <div className="flex gap-3">
        {/* Author avatar */}
        <Avatar className="h-9 w-9 flex-shrink-0 mt-0.5">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {article.author.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* Author info */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-medium text-foreground truncate">
              {article.author.name}
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{article.author.blogName}</span>
          </div>

          {/* Title */}
          <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug mb-1.5 line-clamp-2">
            {article.title}
          </h2>

          {/* Brief */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {article.brief}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {article.tags.map((tag) => (
              <Badge
                key={tag.slug}
                variant="secondary"
                className="bg-hn-tag-bg text-hn-tag-text hover:bg-border text-xs font-normal px-2 py-0.5 rounded-full cursor-pointer"
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-muted-foreground hover:text-hn-red transition-colors">
                <Heart className="h-4 w-4" />
                <span className="text-xs">{article.reactionCount}</span>
              </button>
              <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{article.responseCount}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{article.readTimeMinutes} min read</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export default ArticleCard;
