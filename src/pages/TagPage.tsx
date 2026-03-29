import { useParams, Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Hash, TrendingUp } from "lucide-react";
import { mockArticles, mockTrendingTags } from "@/data/mockData";
import { mockExtendedDiscussions } from "@/data/extendedDiscussions";
import ArticleCard from "@/components/ArticleCard";
import { useState } from "react";

const allArticles = [...mockArticles, ...mockExtendedDiscussions];

const TagPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tag = mockTrendingTags.find((t) => t.slug === slug);
  const tagName = tag?.name || slug || "";
  const [sort, setSort] = useState<"trending" | "recent">("trending");

  const articles = allArticles.filter((a) =>
    a.tags.some((t) => t.slug === slug || t.name.toLowerCase() === slug?.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-6">
        {/* Tag header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Hash className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">#{tagName}</h1>
            {tag && <p className="text-sm text-muted-foreground">{tag.postsCount.toLocaleString()} posts</p>}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Explore the latest articles and discussions about {tagName}.
        </p>

        {/* Sort */}
        <div className="flex items-center gap-2 mb-6 border-b border-border pb-3">
          {(["trending", "recent"] as const).map((s) => (
            <button key={s} onClick={() => setSort(s)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${sort === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-border"}`}>
              {s === "trending" && <TrendingUp className="h-3 w-3" />}
              {s}
            </button>
          ))}
        </div>

        {/* Articles */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {articles.map((article) => (
              <Link key={article.id} to={`/article/${article.slug}`}>
                <ArticleCard article={{...article, coverImage: article.coverImage || ""}} variant="grid" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-12">No articles found for #{tagName}</p>
        )}

        {/* Related tags */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-foreground mb-3">Related Tags</h2>
          <div className="flex flex-wrap gap-2">
            {mockTrendingTags.filter((t) => t.slug !== slug).slice(0, 6).map((t) => (
              <Link key={t.slug} to={`/tag/${t.slug}`}
                className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-2 rounded-full hover:bg-border transition-colors">
                <Hash className="h-3 w-3" />{t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagPage;
