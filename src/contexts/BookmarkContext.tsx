import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface BookmarkContextType {
  bookmarks: Set<string>;
  toggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  loading: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setBookmarks(new Set());
      return;
    }
    setLoading(true);
    supabase
      .from("bookmarks")
      .select("article_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) setBookmarks(new Set(data.map((b) => b.article_id)));
        setLoading(false);
      });
  }, [user, isAuthenticated]);

  const toggleBookmark = useCallback(
    async (articleId: string) => {
      if (!user) return;
      const has = bookmarks.has(articleId);
      // Optimistic update
      setBookmarks((prev) => {
        const next = new Set(prev);
        if (has) next.delete(articleId);
        else next.add(articleId);
        return next;
      });

      if (has) {
        await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("article_id", articleId);
      } else {
        await supabase.from("bookmarks").insert({ user_id: user.id, article_id: articleId });
      }
    },
    [user, bookmarks]
  );

  const isBookmarked = useCallback((id: string) => bookmarks.has(id), [bookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, loading }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
};
