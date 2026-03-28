import { mockArticles, mockDiscussionPosts } from "@/data/mockData";
import ArticleCard from "@/components/ArticleCard";
import WritePrompt from "@/components/WritePrompt";
import DiscussionPost from "@/components/DiscussionPost";
import ForumSection from "@/components/ForumSection";

const ArticleFeed = () => {
  return (
    <div>
      {/* Popular posts — 2x2 grid (4 cards) */}
      <div className="grid grid-cols-2 gap-4">
        {mockArticles.slice(0, 4).map((article) => (
          <ArticleCard key={article.id} article={article} variant="grid" />
        ))}
      </div>

      {/* Write prompt */}
      <div className="mt-5">
        <WritePrompt />
      </div>

      {/* Discussion posts */}
      <div className="mt-2">
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
