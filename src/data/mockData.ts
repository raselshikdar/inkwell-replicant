export interface Article {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: string;
  author: {
    name: string;
    photo: string;
    username: string;
    blogName: string;
    initials: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  reactionCount: number;
  responseCount: number;
  tags: { name: string; slug: string }[];
  isFeatured?: boolean;
}

export interface TrendingTag {
  name: string;
  slug: string;
  postsCount: number;
  logo?: string;
}

export interface TrendingArticle {
  id: string;
  title: string;
  author: {
    name: string;
    photo: string;
    username: string;
  };
  publishedAt: string;
}

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Back to FreeBSD: Part 2 — Jails",
    brief: "Exploring FreeBSD jails for containerization and system isolation.",
    slug: "back-to-freebsd-part-2-jails",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
    author: {
      name: "Roman Zaiev",
      photo: "",
      username: "romanzaiev",
      blogName: "hypha.pub",
      initials: "RZ",
    },
    publishedAt: "2026-03-27",
    readTimeMinutes: 10,
    reactionCount: 2,
    responseCount: 0,
    tags: [{ name: "FreeBSD", slug: "freebsd" }],
    isFeatured: true,
  },
  {
    id: "2",
    title: "Sierra Software Engineer, Agent...",
    brief: "My experience as a software engineer working with AI agents.",
    slug: "sierra-software-engineer-agent",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    author: {
      name: "Gaijineer",
      photo: "",
      username: "gaijineer",
      blogName: "gaijineer.co",
      initials: "G",
    },
    publishedAt: "2026-03-27",
    readTimeMinutes: 5,
    reactionCount: 2,
    responseCount: 0,
    tags: [{ name: "Career", slug: "career" }],
  },
  {
    id: "3",
    title: "No Keys, No Risk - Secure Secrets wit...",
    brief: "Stop using .env in production. Learn how to manage secrets securely.",
    slug: "no-keys-no-risk-secure-secrets",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    author: {
      name: "Amitabh",
      photo: "",
      username: "amitabh",
      blogName: "blog.amitabh.cloud",
      initials: "A",
    },
    publishedAt: "2026-03-27",
    readTimeMinutes: 4,
    reactionCount: 5,
    responseCount: 1,
    tags: [{ name: "AWS", slug: "aws" }, { name: "Security", slug: "security" }],
  },
  {
    id: "4",
    title: "My career is no better (or worse)...",
    brief: "Reflections on a career in software development.",
    slug: "my-career-is-no-better",
    coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    author: {
      name: "Dana Ciocan",
      photo: "",
      username: "danaciocan",
      blogName: "danaciocan.com",
      initials: "DC",
    },
    publishedAt: "2026-03-27",
    readTimeMinutes: 10,
    reactionCount: 3,
    responseCount: 1,
    tags: [{ name: "Career", slug: "career" }],
  },
  {
    id: "5",
    title: "# Git Adventures — Part 2: When Git...",
    brief: "Deep dive into Git internals and advanced workflows.",
    slug: "git-adventures-part-2",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
    author: {
      name: "AP",
      photo: "",
      username: "ap",
      blogName: "blogs.devvloper.in",
      initials: "AP",
    },
    publishedAt: "2026-03-27",
    readTimeMinutes: 13,
    reactionCount: 3,
    responseCount: 0,
    tags: [{ name: "Git", slug: "git" }],
  },
  {
    id: "6",
    title: "What's New in React 20: A Complete Overview",
    brief: "Exploring all the new features in React 20.",
    slug: "whats-new-react-20",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    author: {
      name: "Emma Zhang",
      photo: "",
      username: "emmazhang",
      blogName: "react.weekly",
      initials: "EZ",
    },
    publishedAt: "2026-03-26",
    readTimeMinutes: 12,
    reactionCount: 523,
    responseCount: 89,
    tags: [{ name: "React", slug: "react" }],
  },
  {
    id: "7",
    title: "Why Python is Still #1 in AI/ML",
    brief: "An analysis of Python's dominance in AI.",
    slug: "why-python-still-number-one",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=400&h=300&fit=crop",
    author: {
      name: "David Kim",
      photo: "",
      username: "davidkim",
      blogName: "ml.engineering",
      initials: "DK",
    },
    publishedAt: "2026-03-26",
    readTimeMinutes: 7,
    reactionCount: 234,
    responseCount: 56,
    tags: [{ name: "Python", slug: "python" }, { name: "AI", slug: "ai" }],
  },
];

export const mockTrendingArticles: TrendingArticle[] = [
  {
    id: "t1",
    title: "How to Get 10K Visitors Through Developer Content",
    author: { name: "James Park", photo: "", username: "jamespark" },
    publishedAt: "2026-03-27",
  },
  {
    id: "t2",
    title: "Achievement Unlocked: Getting Started with Gamification",
    author: { name: "Nina Kowalski", photo: "", username: "ninak" },
    publishedAt: "2026-03-26",
  },
  {
    id: "t3",
    title: "The Coffee Log — A Developer's Best Friend",
    author: { name: "Carlos Mendez", photo: "", username: "carlosm" },
    publishedAt: "2026-03-26",
  },
  {
    id: "t4",
    title: "Understanding WebSockets in 5 Minutes",
    author: { name: "Lily Thompson", photo: "", username: "lilyt" },
    publishedAt: "2026-03-25",
  },
  {
    id: "t5",
    title: "Build Time Comparisons: Vite vs Turbopack vs Bun",
    author: { name: "Ryan Fischer", photo: "", username: "ryanf" },
    publishedAt: "2026-03-25",
  },
];

export const mockTrendingTags: TrendingTag[] = [
  { name: "JavaScript", slug: "javascript", postsCount: 12453 },
  { name: "Python", slug: "python", postsCount: 9821 },
  { name: "React", slug: "react", postsCount: 8734 },
  { name: "AI", slug: "ai", postsCount: 7623 },
  { name: "DevOps", slug: "devops", postsCount: 5432 },
  { name: "TypeScript", slug: "typescript", postsCount: 4987 },
  { name: "Node.js", slug: "nodejs", postsCount: 4321 },
  { name: "CSS", slug: "css", postsCount: 3876 },
  { name: "Docker", slug: "docker", postsCount: 3654 },
  { name: "AWS", slug: "aws", postsCount: 3210 },
];

export const feedTabs = [
  { id: "personalized", label: "Personalized" },
  { id: "following", label: "Following" },
  { id: "featured", label: "Featured" },
  { id: "latest", label: "Latest" },
  { id: "top", label: "Top" },
];
