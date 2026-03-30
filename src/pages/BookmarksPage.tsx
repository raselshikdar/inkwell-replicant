import HeaderNav from "@/components/HeaderNav";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Bookmark, Trash2, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getTimeAgo } from "@/lib/timeAgo";

const BookmarksPage = () => {
  const { bookmarks, toggleBookmark, loading: bookmarksLoading } = useBookmarks();
  const { isAuthenticated } = useAuth();

  const articleIds = Array.from(bookmarks);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["bookmarked-articles", articleIds],
    queryFn: async () => {
      if (articleIds.length === 0) return [];
      const { data, error } = await supabase
        .from("articles")
        .select(`*, profiles!articles_author_id_fkey(id, username, name, avatar_url)`)
        .in("id", articleIds);
      if (error) throw error;
      return data || [];
    },
    enabled: articleIds.length > 0,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNav />
        <div className="max-w-[720px] mx-auto px-4 py-20 text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Sign in required</h1>
          <Link to="/login" className="text-primary font-medium hover:underline">Sign in →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Bookmarks</h1>
          <span className="text-sm text-muted-foreground">({articles.length})</span>
        </div>

        {(isLoading || bookmarksLoading) ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-1">No bookmarks yet</h2>
            <p className="text-sm text-muted-foreground mb-4">Save articles to read later by clicking the bookmark icon.</p>
            <Link to="/" className="text-primary text-sm font-medium hover:underline">Explore articles →</Link>
          </div>
        ) : (
          <div className="space-y-0">
            {articles.map((article: any) => {
              const initials = article.profiles?.name
                ? article.profiles.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                : "U";
              return (
                <div key={article.id} className="flex items-start gap-3 py-4 border-b border-border">
                  <div className="flex-1 min-w-0">
                    <Link to={`/article/${article.slug}`} className="group">
                      <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Avatar className="h-4 w-4">
                        <AvatarFallback className="bg-primary/10 text-primary text-[7px] font-semibold">{initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{article.profiles?.name} · {getTimeAgo(article.created_at)}</span>
                    </div>
                  </div>
                  {article.cover_image && (
                    <Link to={`/article/${article.slug}`} className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img src={article.cover_image} alt="" className="w-full h-full object-cover" />
                    </Link>
                  )}
                  <button onClick={() => toggleBookmark(article.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1 flex-shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
