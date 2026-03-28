import { TrendingUp, Hash, Bookmark, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockTrendingArticles, mockTrendingTags } from "@/data/mockData";

const TrendingArticles = () => (
  <div className="bg-card rounded-lg border border-border p-4">
    <div className="flex items-center gap-2 mb-4">
      <TrendingUp className="h-4 w-4 text-primary" />
      <h3 className="font-semibold text-sm text-foreground">Trending Articles</h3>
    </div>
    <div className="space-y-3">
      {mockTrendingArticles.map((article, index) => (
        <a key={article.id} href="#" className="flex gap-3 group cursor-pointer">
          <span className="text-lg font-bold text-muted-foreground/40 leading-none mt-0.5 w-5 text-right flex-shrink-0">
            {index + 1}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Avatar className="h-4 w-4">
                <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-semibold">
                  {article.author.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{article.author.name}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
    <button className="text-primary text-sm font-medium mt-4 hover:underline w-full text-left">
      See all trending articles →
    </button>
  </div>
);

const TrendingTags = () => (
  <div className="bg-card rounded-lg border border-border p-4">
    <div className="flex items-center gap-2 mb-4">
      <Hash className="h-4 w-4 text-primary" />
      <h3 className="font-semibold text-sm text-foreground">Trending Tags</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {mockTrendingTags.map((tag) => (
        <a
          key={tag.slug}
          href="#"
          className="flex items-center gap-1.5 bg-hn-tag-bg hover:bg-border text-hn-tag-text text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors"
        >
          <Hash className="h-3 w-3" />
          {tag.name}
        </a>
      ))}
    </div>
  </div>
);

const QuickLinks = () => (
  <div className="bg-card rounded-lg border border-border p-4">
    <h3 className="font-semibold text-sm text-foreground mb-3">Quick Links</h3>
    <div className="space-y-2">
      {[
        { label: "My Bookmarks", icon: Bookmark },
        { label: "Explore Tags", icon: Hash },
        { label: "Dev Community", icon: ExternalLink },
      ].map(({ label, icon: Icon }) => (
        <a
          key={label}
          href="#"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
      ))}
    </div>
  </div>
);

const RightSidebar = () => {
  return (
    <aside className="space-y-4 w-full">
      <TrendingArticles />
      <TrendingTags />
      <QuickLinks />
    </aside>
  );
};

export default RightSidebar;
