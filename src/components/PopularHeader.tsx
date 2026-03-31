import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PopularHeader = () => {
  const { data } = useQuery({
    queryKey: ["feed-stats"],
    queryFn: async () => {
      const { count: articleCount } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("published", true);

      const { data: authors } = await supabase
        .from("articles")
        .select("author_id")
        .eq("published", true);

      const uniqueAuthors = new Set(authors?.map((a) => a.author_id)).size;
      return { articles: articleCount || 0, writers: uniqueAuthors };
    },
  });

  return (
    <div className="flex items-start justify-between mb-4">
      <h1 className="text-xl font-bold text-foreground leading-tight">
        Popular<br />posts
      </h1>
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">Total:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-foreground font-semibold">{data?.articles || 0} articles</span>
        </div>
        <span className="text-muted-foreground">{data?.writers || 0} writers</span>
      </div>
    </div>
  );
};

export default PopularHeader;
