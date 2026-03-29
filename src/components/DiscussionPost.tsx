import { Triangle, MessageCircle, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useBookmarks } from "@/contexts/BookmarkContext";
import type { DiscussionPost as DiscussionPostType } from "@/data/mockData";
import { getTimeAgo } from "@/lib/timeAgo";

interface Props {
  post: DiscussionPostType;
}

const DiscussionPost = ({ post }: Props) => {
  const timeAgo = getTimeAgo(post.publishedAt);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(post.id);

  return (
    <article className="py-4 border-b border-border">
      <div className="flex items-center gap-2 mb-2">
        <Link to={`/user/${post.author.username}`}>
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">{post.author.initials}</AvatarFallback>
          </Avatar>
        </Link>
        <Link to={`/user/${post.author.username}`} className="text-sm font-medium text-foreground hover:text-primary">{post.author.name}</Link>
        <span className="text-xs text-muted-foreground">in {post.author.blogName}</span>
        <div className="flex-1" />
        <button onClick={() => toggleBookmark(post.id)} className={`transition-colors ${bookmarked ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-primary" : ""}`} />
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex gap-2">
            <div className="flex flex-col items-center gap-1 pt-0.5">
              <button className="text-muted-foreground hover:text-foreground transition-colors"><Triangle className="h-4 w-4" /></button>
              <span className="text-xs text-muted-foreground">{post.reactionCount}</span>
              <button className="text-muted-foreground hover:text-foreground transition-colors"><MessageCircle className="h-4 w-4" /></button>
              <span className="text-xs text-muted-foreground">{post.responseCount}</span>
            </div>
            <div className="min-w-0">
              <Link to={`/article/${post.slug}`}><h3 className="text-base font-bold text-foreground leading-snug hover:text-primary transition-colors">{post.title}</h3></Link>
              <p className="text-xs text-muted-foreground mt-1">{timeAgo} · {post.readTimeMinutes} min read</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{post.brief}</p>
              <Link to={`/article/${post.slug}`} className="text-primary text-sm font-medium mt-2 hover:underline flex items-center gap-1">⊕ Join discussion</Link>
            </div>
          </div>
        </div>
        {post.coverImage && (
          <Link to={`/article/${post.slug}`} className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
          </Link>
        )}
      </div>
    </article>
  );
};

export default DiscussionPost;
