import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ThreadWithAuthor {
  id: string;
  title: string;
  brief: string | null;
  content: string | null;
  tag: string | null;
  reaction_count: number;
  response_count: number;
  created_at: string;
  author_id: string;
  profiles: {
    id: string;
    username: string;
    name: string;
    avatar_url: string | null;
  };
}

export const useForumThreads = (filter?: string) => {
  return useQuery({
    queryKey: ["forum-threads", filter],
    queryFn: async () => {
      let query = supabase
        .from("forum_threads")
        .select(`*, profiles!forum_threads_author_id_fkey(id, username, name, avatar_url)`)
        .order("created_at", { ascending: false });

      if (filter && filter !== "all") {
        query = query.ilike("tag", `%${filter}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as ThreadWithAuthor[];
    },
  });
};

export const useCreateThread = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      brief,
      content,
      tag,
      authorId,
    }: {
      title: string;
      brief: string;
      content: string;
      tag: string;
      authorId: string;
    }) => {
      const { error } = await supabase.from("forum_threads").insert({
        author_id: authorId,
        title,
        brief,
        content,
        tag,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-threads"] });
    },
  });
};
