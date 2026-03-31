import { Link } from "react-router-dom";
import { TrendingUp, Hash, Bookmark, ExternalLink, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TrendingArticles = () => {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["trending-articles-sidebar"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, reaction_count, profiles!articles_author_id_fkey(name, username, avatar_url)")
        .eq("published", true)
        .order("reaction_count", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm text-foreground">Trending Articles</h3>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></div>
      ) : articles.length === 0 ? (
        <p className="text-xs text-muted-foreground">No articles yet.</p>
      ) : (
        <div className="space-y-3">
          {articles.map((article: any, index: number) => (
            <div key={article.id} className="flex gap-3 group">
              <span className="text-lg font-bold text-muted-foreground/40 leading-none mt-0.5 w-5 text-right flex-shrink-0">{index + 1}</span>
              <div className="min-w-0">
                <Link to={`/article/${article.slug}`}>
                  <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">{article.title}</p>
                </Link>
                <div className="flex items-center gap-1.5 mt-1">
                  <Link to={`/user/${article.profiles?.username}`}>
                    <Avatar className="h-4 w-4">
                      {article.profiles?.avatar_url && <AvatarImage src={article.profiles.avatar_url} />}
                      <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-semibold">{article.profiles?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <Link to={`/user/${article.profiles?.username}`} className="text-xs text-muted-foreground hover:text-primary">{article.profiles?.name}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TrendingTags = () => {
  const { data: tags = [] } = useQuery({
    queryKey: ["trending-tags-sidebar"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("posts_count", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm text-foreground">Trending Tags</h3>
      </div>
      {tags.length === 0 ? (
        <p className="text-xs text-muted-foreground">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.slug} to={`/tag/${tag.slug}`}
              className="flex items-center gap-1.5 bg-secondary hover:bg-border text-secondary-foreground text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors">
              <Hash className="h-3 w-3" />{tag.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const QuickLinks = () => (
  <div className="bg-card rounded-lg border border-border p-4">
    <h3 className="font-semibold text-sm text-foreground mb-3">Quick Links</h3>
    <div className="space-y-2">
      <Link to="/bookmarks" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1">
        <Bookmark className="h-4 w-4" />My Bookmarks
      </Link>
      <Link to="/search" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1">
        <Hash className="h-4 w-4" />Explore Tags
      </Link>
      <Link to="/forums" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1">
        <ExternalLink className="h-4 w-4" />Forums
      </Link>
    </div>
  </div>
);

const RightSidebar = () => (
  <aside className="space-y-4 w-full">
    <TrendingArticles />
    <TrendingTags />
    <QuickLinks />
  </aside>
);

export default RightSidebar;
