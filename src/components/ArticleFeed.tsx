import { useState } from "react";
import { useArticles, type ArticleWithAuthor } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import WritePrompt from "@/components/WritePrompt";
import AuthorsWorthFollowing from "@/components/AuthorsWorthFollowing";
import TrendingTagsWeek from "@/components/TrendingTagsWeek";
import TrendingSeriesSection from "@/components/TrendingSeriesSection";
import { ArrowDown, Loader2 } from "lucide-react";

interface ArticleFeedProps {
  filter?: string;
}

const ArticleFeed = ({ filter = "latest" }: ArticleFeedProps) => {
  const [limit, setLimit] = useState(20);
  const { data: articles = [], isLoading } = useArticles(limit);

  const filteredArticles = (() => {
    switch (filter) {
      case "featured":
        return articles.filter((a) => a.is_featured);
      case "top":
        return [...articles].sort((a, b) => b.reaction_count - a.reaction_count);
      default:
        return articles;
    }
  })();

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1, 5);
  const restArticles = filteredArticles.slice(5);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-sm">No articles yet. Be the first to write!</p>
      </div>
    );
  }

  return (
    <div>
      {featuredArticle && (
        <ArticleCard article={featuredArticle} variant="featured" />
      )}

      {gridArticles.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {gridArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="grid" />
          ))}
        </div>
      )}

      <div className="mt-4">
        <WritePrompt />
      </div>

      {restArticles.length > 0 && (
        <div className="mt-4 space-y-0 border-t border-border">
          {restArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="list" />
          ))}
        </div>
      )}

      <AuthorsWorthFollowing />
      <TrendingTagsWeek />
      <TrendingSeriesSection />

      {filteredArticles.length >= limit && (
        <div className="flex justify-center py-6 border-t border-border">
          <button
            onClick={() => setLimit((l) => l + 20)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Load more <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleFeed;
