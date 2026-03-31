import { useParams, Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bookmark, Share2, ArrowLeft, Heart, Loader2, Check, Copy } from "lucide-react";
import { useArticleBySlug } from "@/hooks/useArticles";
import { useComments, useAddComment } from "@/hooks/useComments";
import { useReactions, useToggleReaction } from "@/hooks/useReactions";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/lib/timeAgo";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useArticleBySlug(slug || "");
  const { user, isAuthenticated, profile } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [commentText, setCommentText] = useState("");
  const [following, setFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: comments = [] } = useComments(article?.id || "");
  const { data: reactionData } = useReactions(article?.id || "", user?.id);
  const toggleReaction = useToggleReaction();
  const addComment = useAddComment();

  // Check follow status
  useEffect(() => {
    if (!user || !article) return;
    if (user.id === article.author_id) return;
    supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", article.author_id)
      .maybeSingle()
      .then(({ data }) => setFollowing(!!data));
  }, [user, article]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNav />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNav />
        <div className="max-w-[720px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Article not found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/" className="text-primary font-medium hover:underline">← Back to feed</Link>
        </div>
      </div>
    );
  }

  const authorInitials = article.profiles?.name
    ? article.profiles.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";
  const bookmarked = isBookmarked(article.id);
  const tags = article.article_tags?.map((at) => at.tags) || [];

  const handleLike = () => {
    if (!user) { toast.error("Sign in to react"); return; }
    toggleReaction.mutate({
      articleId: article.id,
      userId: user.id,
      hasReacted: reactionData?.userReacted || false,
    });
  };

  const handleFollow = async () => {
    if (!user) { toast.error("Sign in to follow"); return; }
    try {
      if (following) {
        await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", article.author_id);
        setFollowing(false);
        toast.success("Unfollowed");
      } else {
        await supabase.from("follows").insert({ follower_id: user.id, following_id: article.author_id });
        setFollowing(true);
        toast.success("Following!");
      }
    } catch {
      toast.error("Failed");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: article.title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleComment = async () => {
    if (!user || !commentText.trim()) return;
    try {
      await addComment.mutateAsync({ articleId: article.id, authorId: user.id, content: commentText.trim() });
      setCommentText("");
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const userInitials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <article className="max-w-[720px] mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to feed
        </Link>

        {article.cover_image && (
          <div className="rounded-xl overflow-hidden aspect-[16/9] bg-muted mb-6">
            <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-4">{article.title}</h1>

        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <Link to={`/user/${article.profiles?.username}`}>
            <Avatar className="h-10 w-10">
              {article.profiles?.avatar_url && <AvatarImage src={article.profiles.avatar_url} />}
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{authorInitials}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link to={`/user/${article.profiles?.username}`} className="text-sm font-semibold text-foreground hover:text-primary">
              {article.profiles?.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {formatDate(article.created_at)} · {article.read_time_minutes} min read
            </p>
          </div>
          <div className="flex-1" />
          {isAuthenticated && user?.id !== article.author_id && (
            <Button
              variant={following ? "secondary" : "outline"}
              size="sm"
              className="rounded-full text-xs"
              onClick={handleFollow}
            >
              {following ? "Following" : "Follow"}
            </Button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Link key={tag.slug} to={`/tag/${tag.slug}`} className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1.5 rounded-full hover:bg-border transition-colors">
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
          {(article.content || "").split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={i} />;
            if (trimmed.startsWith("### ")) return <h3 key={i} className="text-lg font-bold text-foreground mt-6 mb-2">{trimmed.slice(4)}</h3>;
            if (trimmed.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">{trimmed.slice(3)}</h2>;
            if (trimmed.startsWith("```")) return <div key={i} className="bg-secondary rounded-lg p-4 my-3 font-mono text-xs text-foreground overflow-x-auto">{trimmed.slice(3)}</div>;
            if (trimmed.startsWith("- ")) return <li key={i} className="text-sm text-muted-foreground ml-4 mb-1 list-disc">{trimmed.slice(2)}</li>;
            return <p key={i} className="text-sm text-muted-foreground mb-3">{trimmed}</p>;
          })}
        </div>

        <div className="flex items-center gap-3 py-6 mt-6 border-t border-border">
          <button onClick={handleLike}
            className={`flex items-center gap-1.5 border rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              reactionData?.userReacted
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}>
            <Heart className={`h-4 w-4 ${reactionData?.userReacted ? "fill-current" : ""}`} />
            {reactionData?.count || 0}
          </button>
          <button className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
            <MessageCircle className="h-4 w-4" /> {comments.length}
          </button>
          <div className="flex-1" />
          {isAuthenticated && (
            <button onClick={() => toggleBookmark(article.id)}
              className={`p-2 rounded-full transition-colors ${bookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"}`}>
              <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-primary" : ""}`} />
            </button>
          )}
          <button onClick={handleShare} className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors">
            {copied ? <Check className="h-5 w-5 text-primary" /> : <Share2 className="h-5 w-5" />}
          </button>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Comments ({comments.length})</h3>
          {isAuthenticated ? (
            <div className="flex gap-3 mb-6">
              <Avatar className="h-8 w-8">
                {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Share your thoughts..."
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20" rows={3} />
                <div className="flex justify-end mt-2">
                  <Button size="sm" className="rounded-full text-xs" onClick={handleComment} disabled={!commentText.trim() || addComment.isPending}>
                    {addComment.isPending ? "Posting..." : "Comment"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-6">
              <Link to="/login" className="text-primary hover:underline">Sign in</Link> to leave a comment.
            </p>
          )}

          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => {
                const cInitials = comment.profiles?.name
                  ? comment.profiles.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                  : "U";
                return (
                  <div key={comment.id} className="flex gap-3 py-3 border-b border-border">
                    <Link to={`/user/${comment.profiles?.username}`}>
                      <Avatar className="h-8 w-8">
                        {comment.profiles?.avatar_url && <AvatarImage src={comment.profiles.avatar_url} />}
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{cInitials}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Link to={`/user/${comment.profiles?.username}`} className="text-sm font-semibold text-foreground hover:text-primary">
                          {comment.profiles?.name}
                        </Link>
                        <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
