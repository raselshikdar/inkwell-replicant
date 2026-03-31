import { useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import ArticleFeed from "@/components/ArticleFeed";
import PopularHeader from "@/components/PopularHeader";
import RightSidebar from "@/components/RightSidebar";
import FeedTabs from "@/components/FeedTabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("latest");

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <main className="max-w-[1200px] mx-auto px-4 py-4">
        <PopularHeader />
        <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex gap-6 mt-4">
          <div className="flex-1 min-w-0">
            <ArticleFeed filter={activeTab} />
          </div>
          <div className="hidden lg:block w-[320px] flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
