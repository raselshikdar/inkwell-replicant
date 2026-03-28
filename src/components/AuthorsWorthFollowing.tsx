import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockAuthorsToFollow } from "@/data/bottomSectionData";

const AuthorsWorthFollowing = () => {
  return (
    <div className="py-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-bold text-foreground">Authors worth following</h2>
      </div>

      {/* Author list */}
      <div className="space-y-4">
        {mockAuthorsToFollow.map((author) => (
          <div key={author.name} className="flex items-start gap-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback className="bg-muted text-muted-foreground text-sm font-semibold">
                {author.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{author.name}</p>
              {author.handle && (
                <p className="text-xs text-muted-foreground">{author.handle}</p>
              )}
              {author.bio && (
                <p className="text-xs text-muted-foreground line-clamp-2">{author.bio}</p>
              )}
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                {author.postsThisMonth} post{author.postsThisMonth !== 1 ? "s" : ""} this month
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <span>1 / 3</span>
        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AuthorsWorthFollowing;
