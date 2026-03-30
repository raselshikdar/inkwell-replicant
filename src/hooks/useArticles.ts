import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ArticleWithAuthor {
  id: string;
  title: string;
  slug: string;
  brief: string | null;
  content: string | null;
  cover_image: string | null;
  published: boolean;
  read_time_minutes: number;
  reaction_count: number;
  response_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
  profiles: {
    id: string;
    username: string;
    name: string;
    avatar_url: string | null;
  };
  article_tags: {
    tags: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
}

export const useArticles = (limit = 20) => {
  return useQuery({
    queryKey: ["articles", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          profiles!articles_author_id_fkey(id, username, name, avatar_url),
          article_tags(tags(id, name, slug))
        `)
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data || []) as unknown as ArticleWithAuthor[];
    },
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          profiles!articles_author_id_fkey(id, username, name, avatar_url, bio),
          article_tags(tags(id, name, slug))
        `)
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data as unknown as ArticleWithAuthor;
    },
    enabled: !!slug,
  });
};

export const useUserArticles = (userId: string) => {
  return useQuery({
    queryKey: ["user-articles", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          profiles!articles_author_id_fkey(id, username, name, avatar_url),
          article_tags(tags(id, name, slug))
        `)
        .eq("author_id", userId)
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as ArticleWithAuthor[];
    },
    enabled: !!userId,
  });
};

export const usePublishArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content,
      brief,
      coverImage,
      tags,
      authorId,
    }: {
      title: string;
      content: string;
      brief: string;
      coverImage: string;
      tags: string[];
      authorId: string;
    }) => {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
        "-" +
        Date.now().toString(36);

      const wordCount = content.split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));

      const { data: article, error } = await supabase
        .from("articles")
        .insert({
          author_id: authorId,
          title,
          slug,
          brief: brief || content.slice(0, 160),
          content,
          cover_image: coverImage,
          published: true,
          read_time_minutes: readTime,
        })
        .select()
        .single();

      if (error) throw error;

      // Handle tags
      if (tags.length > 0) {
        for (const tagName of tags) {
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
          let { data: existingTag } = await supabase
            .from("tags")
            .select("id")
            .eq("slug", tagSlug)
            .single();

          if (!existingTag) {
            const { data: newTag } = await supabase
              .from("tags")
              .insert({ name: tagName, slug: tagSlug })
              .select("id")
              .single();
            existingTag = newTag;
          }

          if (existingTag) {
            await supabase.from("article_tags").insert({
              article_id: article.id,
              tag_id: existingTag.id,
            });
          }
        }
      }

      return article;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useSearchArticles = (query: string) => {
  return useQuery({
    queryKey: ["search-articles", query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          profiles!articles_author_id_fkey(id, username, name, avatar_url),
          article_tags(tags(id, name, slug))
        `)
        .eq("published", true)
        .or(`title.ilike.%${query}%,brief.ilike.%${query}%`)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data || []) as unknown as ArticleWithAuthor[];
    },
    enabled: query.length > 0,
  });
};

export const useArticlesByTag = (tagSlug: string) => {
  return useQuery({
    queryKey: ["articles-by-tag", tagSlug],
    queryFn: async () => {
      const { data: tagData } = await supabase
        .from("tags")
        .select("id")
        .eq("slug", tagSlug)
        .single();

      if (!tagData) return [];

      const { data: articleTagData } = await supabase
        .from("article_tags")
        .select("article_id")
        .eq("tag_id", tagData.id);

      if (!articleTagData || articleTagData.length === 0) return [];

      const articleIds = articleTagData.map((at) => at.article_id);

      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          profiles!articles_author_id_fkey(id, username, name, avatar_url),
          article_tags(tags(id, name, slug))
        `)
        .eq("published", true)
        .in("id", articleIds)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []) as unknown as ArticleWithAuthor[];
    },
    enabled: !!tagSlug,
  });
};
