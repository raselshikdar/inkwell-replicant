import { mockArticles, mockDiscussionPosts } from "@/data/mockData";
import { mockExtendedDiscussions } from "@/data/extendedDiscussions";
import ArticleCard from "@/components/ArticleCard";
import WritePrompt from "@/components/WritePrompt";
import DiscussionPost from "@/components/DiscussionPost";
import ForumSection from "@/components/ForumSection";
import BottomDiscussionPost from "@/components/BottomDiscussionPost";
import AuthorsWorthFollowing from "@/components/AuthorsWorthFollowing";
import TrendingTagsWeek from "@/components/TrendingTagsWeek";
import TrendingSeriesSection from "@/components/TrendingSeriesSection";
import { ArrowDown } from "lucide-react";

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

      {/* Bottom discussion post (Saikat Das) */}
      <BottomDiscussionPost />

      {/* Authors worth following */}
      <AuthorsWorthFollowing />

      {/* Trending tags this week */}
      <TrendingTagsWeek />

      {/* Trending series */}
      <TrendingSeriesSection />

      {/* Extended discussion posts */}
      <div className="mt-2 border-t border-border">
        {mockExtendedDiscussions.map((post) => (
          <DiscussionPost key={post.id} post={post} />
        ))}
      </div>

      {/* Load more */}
      <div className="flex justify-center py-6 border-t border-border">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Load more <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ArticleFeed;
