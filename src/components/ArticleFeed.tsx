import { mockArticles, mockDiscussionPosts } from "@/data/mockData";
import ArticleCard from "@/components/ArticleCard";
import WritePrompt from "@/components/WritePrompt";
import DiscussionPost from "@/components/DiscussionPost";
import ForumSection from "@/components/ForumSection";

const ArticleFeed = () => {
  const featuredArticle = mockArticles[0];
  const gridArticles = mockArticles.slice(1, 5);

  return (
    <div>
      {/* Featured / hero card */}
      <ArticleCard article={featuredArticle} variant="featured" />

      {/* Popular posts — 2x2 grid (4 cards) */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {gridArticles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="grid" />
        ))}
      </div>

      {/* Write prompt */}
      <div className="mt-4">
        <WritePrompt />
      </div>

      {/* Discussion posts */}
      <div className="mt-1">
        {mockDiscussionPosts.map((post) => (
          <DiscussionPost key={post.id} post={post} />
        ))}
      </div>

      {/* Forum section */}
      <ForumSection />
    </div>
  );
};

export default ArticleFeed;
