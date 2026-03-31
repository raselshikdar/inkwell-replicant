import { useParams, Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Hash, TrendingUp, Loader2 } from "lucide-react";
import { useArticlesByTag } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TagPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sort, setSort] = useState<"trending" | "recent">("trending");

  const { data: tagData } = useQuery({
    queryKey: ["tag-info", slug],
    queryFn: async () => {
      const { data } = await supabase.from("tags").select("*").eq("slug", slug!).single();
      return data;
    },
    enabled: !!slug,
  });

  const { data: articles = [], isLoading } = useArticlesByTag(slug || "");

  const { data: relatedTags = [] } = useQuery({
    queryKey: ["related-tags", slug],
    queryFn: async () => {
      const { data } = await supabase.from("tags").select("*").neq("slug", slug!).order("posts_count", { ascending: false }).limit(6);
      return data || [];
    },
    enabled: !!slug,
  });

  const sortedArticles = sort === "trending"
    ? [...articles].sort((a, b) => b.reaction_count - a.reaction_count)
    : articles;

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Hash className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">#{tagData?.name || slug}</h1>
            {tagData && <p className="text-sm text-muted-foreground">{tagData.posts_count.toLocaleString()} posts</p>}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Explore the latest articles about {tagData?.name || slug}.
        </p>

        <div className="flex items-center gap-2 mb-6 border-b border-border pb-3">
          {(["trending", "recent"] as const).map((s) => (
            <button key={s} onClick={() => setSort(s)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${sort === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-border"}`}>
              {s === "trending" && <TrendingUp className="h-3 w-3" />}
              {s}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : sortedArticles.length > 0 ? (
          <div className="space-y-0">
            {sortedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="list" />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-12">No articles found for #{tagData?.name || slug}</p>
        )}

        {relatedTags.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-foreground mb-3">Related Tags</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((t) => (
                <Link key={t.slug} to={`/tag/${t.slug}`}
                  className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-2 rounded-full hover:bg-border transition-colors">
                  <Hash className="h-3 w-3" />{t.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagPage;
