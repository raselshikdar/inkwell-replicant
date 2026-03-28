import { feedTabs } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FeedTabs = () => {
  const [activeTab, setActiveTab] = useState("personalized");

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center gap-0 overflow-x-auto hn-scrollbar">
        {feedTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedTabs;
