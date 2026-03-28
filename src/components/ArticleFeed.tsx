import { mockArticles } from "@/data/mockData";
import ArticleCard from "@/components/ArticleCard";
import FeedTabs from "@/components/FeedTabs";

const ArticleFeed = () => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <FeedTabs />
      <div>
        {mockArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleFeed;
