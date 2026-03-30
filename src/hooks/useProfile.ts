import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProfileByUsername = (username: string) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!username,
  });
};

export const useFollowCounts = (userId: string) => {
  return useQuery({
    queryKey: ["follow-counts", userId],
    queryFn: async () => {
      const [{ count: followers }, { count: following }] = await Promise.all([
        supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", userId),
        supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", userId),
      ]);
      return { followers: followers || 0, following: following || 0 };
    },
    enabled: !!userId,
  });
};

export const useIsFollowing = (followerId: string | undefined, followingId: string) => {
  return useQuery({
    queryKey: ["is-following", followerId, followingId],
    queryFn: async () => {
      if (!followerId) return false;
      const { data } = await supabase
        .from("follows")
        .select("id")
        .eq("follower_id", followerId)
        .eq("following_id", followingId)
        .maybeSingle();
      return !!data;
    },
    enabled: !!followerId && !!followingId,
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("posts_count", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
};
