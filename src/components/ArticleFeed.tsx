import { mockArticles } from "@/data/mockData";
import ArticleCard from "@/components/ArticleCard";

const ArticleFeed = () => {
  const featured = mockArticles[0];
  const gridArticles = mockArticles.slice(1);

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">New & Popular</span>
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Featured card */}
      <div className="mb-5">
        <ArticleCard article={featured} variant="featured" />
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-4">
        {gridArticles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="grid" />
        ))}
      </div>
    </div>
  );
};

export default ArticleFeed;
