import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useReactions = (articleId: string, userId?: string) => {
  return useQuery({
    queryKey: ["reactions", articleId, userId],
    queryFn: async () => {
      const { count } = await supabase
        .from("reactions")
        .select("*", { count: "exact", head: true })
        .eq("article_id", articleId);

      let userReacted = false;
      if (userId) {
        const { data } = await supabase
          .from("reactions")
          .select("id")
          .eq("article_id", articleId)
          .eq("user_id", userId)
          .eq("type", "like")
          .maybeSingle();
        userReacted = !!data;
      }

      return { count: count || 0, userReacted };
    },
    enabled: !!articleId,
  });
};

export const useToggleReaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      articleId,
      userId,
      hasReacted,
    }: {
      articleId: string;
      userId: string;
      hasReacted: boolean;
    }) => {
      if (hasReacted) {
        await supabase
          .from("reactions")
          .delete()
          .eq("article_id", articleId)
          .eq("user_id", userId)
          .eq("type", "like");
      } else {
        await supabase.from("reactions").insert({
          article_id: articleId,
          user_id: userId,
          type: "like",
        });
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reactions", variables.articleId] });
    },
  });
};
