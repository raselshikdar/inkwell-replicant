import { Layers } from "lucide-react";
import { mockTrendingSeries } from "@/data/bottomSectionData";

const TrendingSeriesSection = () => {
  return (
    <div className="py-5 border-t border-border">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-5 w-5 text-foreground" />
        <h2 className="text-lg font-bold text-foreground">Trending series</h2>
      </div>

      {/* Series list */}
      <div className="space-y-3">
        {mockTrendingSeries.map((series) => (
          <div key={series.rank} className="flex items-start gap-3">
            <span className="text-sm text-muted-foreground w-5 text-right flex-shrink-0 pt-0.5">
              {series.rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-snug truncate">
                {series.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">{series.author}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-sm text-muted-foreground">
                {series.views.toLocaleString()} views
              </p>
              <p className="text-xs text-muted-foreground">
                {series.posts} post{series.posts !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSeriesSection;
