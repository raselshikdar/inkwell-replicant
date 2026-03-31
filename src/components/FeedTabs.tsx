import { cn } from "@/lib/utils";

const tabs = [
  { id: "latest", label: "Latest" },
  { id: "featured", label: "Featured" },
  { id: "top", label: "Top" },
];

interface FeedTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FeedTabs = ({ activeTab, onTabChange }: FeedTabsProps) => {
  return (
    <div className="border-b border-border">
      <div className="flex items-center gap-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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
