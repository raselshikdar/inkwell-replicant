import HeaderNav from "@/components/HeaderNav";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { mockArticles } from "@/data/mockData";
import { mockExtendedDiscussions } from "@/data/extendedDiscussions";
import { Link } from "react-router-dom";
import { Bookmark, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getTimeAgo } from "@/lib/timeAgo";

const allArticles = [...mockArticles, ...mockExtendedDiscussions];

const BookmarksPage = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const bookmarkedArticles = allArticles.filter((a) => bookmarks.has(a.id));

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Bookmarks</h1>
          <span className="text-sm text-muted-foreground">({bookmarkedArticles.length})</span>
        </div>

        {bookmarkedArticles.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-1">No bookmarks yet</h2>
            <p className="text-sm text-muted-foreground mb-4">Save articles to read later by clicking the bookmark icon.</p>
            <Link to="/" className="text-primary text-sm font-medium hover:underline">Explore articles →</Link>
          </div>
        ) : (
          <div className="space-y-0">
            {bookmarkedArticles.map((article) => (
              <div key={article.id} className="flex items-start gap-3 py-4 border-b border-border">
                <div className="flex-1 min-w-0">
                  <Link to={`/article/${article.slug}`} className="group">
                    <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Avatar className="h-4 w-4">
                      <AvatarFallback className="bg-primary/10 text-primary text-[7px] font-semibold">{article.author.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{article.author.name} · {getTimeAgo(article.publishedAt)}</span>
                  </div>
                </div>
                {article.coverImage && (
                  <Link to={`/article/${article.slug}`} className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img src={article.coverImage} alt="" className="w-full h-full object-cover" />
                  </Link>
                )}
                <button onClick={() => toggleBookmark(article.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1 flex-shrink-0">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
