import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CommentWithAuthor {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  article_id: string;
  profiles: {
    id: string;
    username: string;
    name: string;
    avatar_url: string | null;
  };
}

export const useComments = (articleId: string) => {
  return useQuery({
    queryKey: ["comments", articleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          profiles!comments_author_id_fkey(id, username, name, avatar_url)
        `)
        .eq("article_id", articleId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as CommentWithAuthor[];
    },
    enabled: !!articleId,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      articleId,
      authorId,
      content,
    }: {
      articleId: string;
      authorId: string;
      content: string;
    }) => {
      const { error } = await supabase.from("comments").insert({
        article_id: articleId,
        author_id: authorId,
        content,
      });
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.articleId] });
    },
  });
};
