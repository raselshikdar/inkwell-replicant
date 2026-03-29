import { useParams, Link } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Triangle, MessageCircle, Bookmark, Share2, ArrowLeft, Heart } from "lucide-react";
import { mockArticles } from "@/data/mockData";
import { mockExtendedDiscussions } from "@/data/extendedDiscussions";
import { getArticleContent } from "@/data/mockArticleContent";
import { getTimeAgo, formatDate } from "@/lib/timeAgo";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useState } from "react";

const allArticles = [...mockArticles, ...mockExtendedDiscussions];

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = allArticles.find((a) => a.slug === slug);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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

  const content = getArticleContent(article.slug);
  const bookmarked = isBookmarked(article.id);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <article className="max-w-[720px] mx-auto px-4 py-6">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to feed
        </Link>

        {/* Cover */}
        {article.coverImage && (
          <div className="rounded-xl overflow-hidden aspect-[16/9] bg-muted mb-6">
            <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-4">{article.title}</h1>

        {/* Author row */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <Link to={`/user/${article.author.username}`}>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                {article.author.initials}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link to={`/user/${article.author.username}`} className="text-sm font-semibold text-foreground hover:text-primary">
              {article.author.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {formatDate(article.publishedAt)} · {article.readTimeMinutes} min read
            </p>
          </div>
          <div className="flex-1" />
          <Button variant="outline" size="sm" className="rounded-full text-xs">Follow</Button>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Link key={tag.slug} to={`/tag/${tag.slug}`} className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1.5 rounded-full hover:bg-border transition-colors">
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Content (rendered as simple markdown-like blocks) */}
        <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
          {content.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={i} />;
            if (trimmed.startsWith("### ")) return <h3 key={i} className="text-lg font-bold text-foreground mt-6 mb-2">{trimmed.slice(4)}</h3>;
            if (trimmed.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">{trimmed.slice(3)}</h2>;
            if (trimmed.startsWith("```")) return <div key={i} className="bg-secondary rounded-lg p-4 my-3 font-mono text-xs text-foreground overflow-x-auto">{trimmed.slice(3)}</div>;
            if (trimmed.startsWith("- ")) return <li key={i} className="text-sm text-muted-foreground ml-4 mb-1 list-disc">{trimmed.slice(2)}</li>;
            if (/^\d+\.\s/.test(trimmed)) return <li key={i} className="text-sm text-muted-foreground ml-4 mb-1 list-decimal">{trimmed.replace(/^\d+\.\s/, "")}</li>;
            return <p key={i} className="text-sm text-muted-foreground mb-3">{trimmed}</p>;
          })}
        </div>

        {/* Reactions bar */}
        <div className="flex items-center gap-3 py-6 mt-6 border-t border-border">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 border rounded-full px-4 py-2 text-sm font-medium transition-colors ${liked ? "border-red-300 bg-red-50 text-red-600" : "border-border text-muted-foreground hover:bg-muted"}`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            {article.reactionCount + likeCount}
          </button>
          <button className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
            <MessageCircle className="h-4 w-4" /> {article.responseCount}
          </button>
          <div className="flex-1" />
          <button
            onClick={() => toggleBookmark(article.id)}
            className={`p-2 rounded-full transition-colors ${bookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-primary" : ""}`} />
          </button>
          <button className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {/* Comments section */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Comments ({article.responseCount})</h3>
          <div className="flex gap-3 mb-6">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button size="sm" className="rounded-full text-xs">Comment</Button>
              </div>
            </div>
          </div>
          {article.responseCount === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
