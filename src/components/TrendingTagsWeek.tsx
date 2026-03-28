import { Hash } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockTrendingTagsWeek } from "@/data/bottomSectionData";

// Generate pseudo-random colors for tag avatars
const tagColors = [
  "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
  "bg-pink-500", "bg-cyan-500", "bg-red-500", "bg-yellow-500",
  "bg-indigo-500", "bg-teal-500", "bg-rose-500", "bg-emerald-500",
  "bg-violet-500", "bg-amber-500",
];

const TrendingTagsWeek = () => {
  return (
    <div className="py-5 border-t border-border">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Hash className="h-5 w-5 text-foreground" />
        <h2 className="text-lg font-bold text-foreground">Trending tags this week</h2>
      </div>

      {/* Tags list */}
      <div className="space-y-3">
        {mockTrendingTagsWeek.map((tag, i) => (
          <div key={tag.name} className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-5 text-right flex-shrink-0">
              {tag.rank}
            </span>
            <span className="text-sm font-medium text-foreground flex-1">{tag.name}</span>
            <div className="flex items-center gap-1">
              {/* Small avatar circles */}
              <div className="flex -space-x-1.5">
                {[0, 1, 2].map((j) => (
                  <Avatar key={j} className="h-5 w-5 border border-background">
                    <AvatarFallback className={`${tagColors[(i * 3 + j) % tagColors.length]} text-white text-[7px]`}>
                      &nbsp;
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-1 w-8 text-right">{tag.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTagsWeek;
