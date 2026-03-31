import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Search, X, Hash, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTimeAgo } from "@/lib/timeAgo";
import { useSearchArticles } from "@/hooks/useArticles";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "articles" | "tags">("all");

  const { data: searchResults = [], isLoading: searchLoading } = useSearchArticles(query);

  const { data: allTags = [] } = useQuery({
    queryKey: ["all-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("posts_count", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data || [];
    },
  });

  const tagResults = query.trim()
    ? allTags.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus
            placeholder="Search articles, tags..."
            className="w-full bg-secondary border border-border rounded-xl pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          {(["all", "articles", "tags"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-border"}`}>
              {f}
            </button>
          ))}
        </div>

        {!query.trim() ? (
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Trending Tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Link key={tag.slug} to={`/tag/${tag.slug}`}
                  className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-2 rounded-full hover:bg-border transition-colors">
                  <Hash className="h-3 w-3" />
                  {tag.name}
                  <span className="text-muted-foreground ml-1">{tag.posts_count}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            {(filter === "all" || filter === "tags") && tagResults.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tagResults.map((tag) => (
                    <Link key={tag.slug} to={`/tag/${tag.slug}`}
                      className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-medium px-3 py-2 rounded-full hover:bg-border transition-colors">
                      <Hash className="h-3 w-3" />{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {(filter === "all" || filter === "articles") && (
              <div>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Articles ({searchResults.length})
                </h2>
                {searchLoading ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
                ) : searchResults.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">No articles found for "{query}"</p>
                ) : (
                  <div className="space-y-0">
                    {searchResults.map((article) => {
                      const initials = article.profiles?.name
                        ? article.profiles.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                        : "U";
                      return (
                        <Link key={article.id} to={`/article/${article.slug}`} className="flex items-start gap-3 py-4 border-b border-border group">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{article.brief}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Avatar className="h-4 w-4">
                                {article.profiles?.avatar_url && <AvatarImage src={article.profiles.avatar_url} />}
                                <AvatarFallback className="bg-primary/10 text-primary text-[7px] font-semibold">{initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{article.profiles?.name} · {getTimeAgo(article.created_at)}</span>
                            </div>
                          </div>
                          {article.cover_image && (
                            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                              <img src={article.cover_image} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
