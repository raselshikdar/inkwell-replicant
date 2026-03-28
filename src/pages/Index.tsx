import HeaderNav from "@/components/HeaderNav";
import ArticleFeed from "@/components/ArticleFeed";
import RightSidebar from "@/components/RightSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-hn-bg">
      <HeaderNav />
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main feed */}
          <div className="flex-1 min-w-0">
            <ArticleFeed />
          </div>
          {/* Right sidebar — hidden on mobile */}
          <div className="hidden lg:block w-[320px] flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
