
-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  location TEXT DEFAULT '',
  website TEXT DEFAULT '',
  github TEXT DEFAULT '',
  twitter TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  posts_count INT NOT NULL DEFAULT 0
);

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tags viewable by everyone" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create tags" ON public.tags FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update tags" ON public.tags FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brief TEXT DEFAULT '',
  content TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT false,
  read_time_minutes INT NOT NULL DEFAULT 1,
  reaction_count INT NOT NULL DEFAULT 0,
  response_count INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published articles viewable by everyone" ON public.articles FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can insert articles" ON public.articles FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own articles" ON public.articles FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own articles" ON public.articles FOR DELETE USING (auth.uid() = author_id);

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_articles_author ON public.articles(author_id);
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_published ON public.articles(published, created_at DESC);

-- Article-Tags join table
CREATE TABLE public.article_tags (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Article tags viewable by everyone" ON public.article_tags FOR SELECT USING (true);
CREATE POLICY "Authors can manage article tags" ON public.article_tags FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authors can delete article tags" ON public.article_tags FOR DELETE USING (auth.uid() IS NOT NULL);

-- Comments table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can comment" ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own comments" ON public.comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own comments" ON public.comments FOR DELETE USING (auth.uid() = author_id);

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_comments_article ON public.comments(article_id, created_at);

-- Reactions table
CREATE TABLE public.reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'like',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (article_id, user_id, type)
);

ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reactions viewable by everyone" ON public.reactions FOR SELECT USING (true);
CREATE POLICY "Users can add reactions" ON public.reactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove own reactions" ON public.reactions FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks table
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, article_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookmarks" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add bookmarks" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove own bookmarks" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Forum threads table
CREATE TABLE public.forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  brief TEXT DEFAULT '',
  content TEXT DEFAULT '',
  tag TEXT DEFAULT '',
  reaction_count INT NOT NULL DEFAULT 0,
  response_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Threads viewable by everyone" ON public.forum_threads FOR SELECT USING (true);
CREATE POLICY "Users can create threads" ON public.forum_threads FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own threads" ON public.forum_threads FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own threads" ON public.forum_threads FOR DELETE USING (auth.uid() = author_id);

CREATE TRIGGER update_forum_threads_updated_at BEFORE UPDATE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Follows table
CREATE TABLE public.follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (follower_id, following_id),
  CHECK (follower_id != following_id)
);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Follows viewable by everyone" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can follow" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- Insert default tags
INSERT INTO public.tags (name, slug, posts_count) VALUES
  ('JavaScript', 'javascript', 12453),
  ('Python', 'python', 9821),
  ('React', 'react', 8734),
  ('AI', 'ai', 7623),
  ('DevOps', 'devops', 5432),
  ('TypeScript', 'typescript', 4987),
  ('Node.js', 'nodejs', 4321),
  ('CSS', 'css', 3876),
  ('Docker', 'docker', 3654),
  ('AWS', 'aws', 3210),
  ('FreeBSD', 'freebsd', 128),
  ('Career', 'career', 2345),
  ('Security', 'security', 1987),
  ('Git', 'git', 1654),
  ('Java', 'java', 3421);
