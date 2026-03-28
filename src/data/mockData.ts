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

export interface DiscussionPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage?: string;
  author: {
    name: string;
    username: string;
    blogName: string;
    initials: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  reactionCount: number;
  responseCount: number;
  tags: { name: string; slug: string }[];
}

export interface ForumThread {
  id: string;
  author: {
    name: string;
    initials: string;
    username: string;
  };
  title: string;
  brief: string;
  publishedAt: string;
  reactionCount: number;
  responseCount: number;
  tag?: string;
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
    id: "0",
    title: "Back to FreeBSD: Part 2 — Jails",
    brief: "A deep dive into FreeBSD jails and containerization.",
    slug: "back-to-freebsd-part-2-jails",
    coverImage: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop",
    author: {
      name: "Roman Zaiev",
      photo: "",
      username: "romanzaiev",
      blogName: "hypha.pub",
      initials: "RZ",
    },
    publishedAt: "2026-03-27T08:00:00Z",
    readTimeMinutes: 10,
    reactionCount: 2,
    responseCount: 0,
    tags: [{ name: "FreeBSD", slug: "freebsd" }],
    isFeatured: true,
  },
  {
    id: "1",
    title: "Sierra Software Engineer, Agent...",
    brief: "Reflections on a career in software development.",
    slug: "sierra-software-engineer",
    coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    author: {
      name: "Gajineer",
      photo: "",
      username: "gajineer",
      blogName: "gajineer.co",
      initials: "G",
    },
    publishedAt: "2026-03-27T14:00:00Z",
    readTimeMinutes: 3,
    reactionCount: 2,
    responseCount: 0,
    tags: [{ name: "Career", slug: "career" }],
  },
  {
    id: "2",
    title: "No Keys, No Risk - Secure Secrets wit...",
    brief: "Deep dive into secrets management.",
    slug: "no-keys-no-risk",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    author: {
      name: "Amitabh",
      photo: "",
      username: "amitabh",
      blogName: "blog.amitabh.cloud",
      initials: "A",
    },
    publishedAt: "2026-03-27T11:00:00Z",
    readTimeMinutes: 4,
    reactionCount: 5,
    responseCount: 1,
    tags: [{ name: "Security", slug: "security" }],
  },
  {
    id: "3",
    title: "My career is no better (or worse)...",
    brief: "Reflections on a career in software development.",
    slug: "my-career-is-no-better-2",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    author: {
      name: "Dana Ciocan",
      photo: "",
      username: "danaciocan",
      blogName: "danaciocan.com",
      initials: "DC",
    },
    publishedAt: "2026-03-27T10:00:00Z",
    readTimeMinutes: 10,
    reactionCount: 3,
    responseCount: 1,
    tags: [{ name: "Career", slug: "career" }],
  },
  {
    id: "4",
    title: "# Git Adventures --- Part 2: When Git...",
    brief: "Deep dive into Git internals and advanced workflows.",
    slug: "git-adventures-part-2-b",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
    author: {
      name: "AP",
      photo: "",
      username: "ap",
      blogName: "blogs.devvloper.in",
      initials: "AP",
    },
    publishedAt: "2026-03-27T09:00:00Z",
    readTimeMinutes: 13,
    reactionCount: 3,
    responseCount: 0,
    tags: [{ name: "Git", slug: "git" }],
  },
];

export const mockDiscussionPosts: DiscussionPost[] = [
  {
    id: "d1",
    title: "Artifact-Driven AI Creation",
    brief: "I usually use AI...",
    slug: "artifact-driven-ai-creation",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=150&fit=crop",
    author: {
      name: "Abrey M...",
      username: "abreym",
      blogName: "engineering.fraction...",
      initials: "AM",
    },
    publishedAt: "2026-03-28T01:00:00Z",
    readTimeMinutes: 8,
    reactionCount: 0,
    responseCount: 0,
    tags: [{ name: "AI", slug: "ai" }],
  },
  {
    id: "d2",
    title: "Why the heck Java 21 Virtual...",
    brief: "Introduction Java ...",
    slug: "why-the-heck-java-21-virtual",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=200&h=150&fit=crop",
    author: {
      name: "Haseeb Ans...",
      username: "haseeb",
      blogName: "haseebansari.bl...",
      initials: "HA",
    },
    publishedAt: "2026-03-27T22:00:00Z",
    readTimeMinutes: 5,
    reactionCount: 0,
    responseCount: 0,
    tags: [{ name: "Java", slug: "java" }],
  },
];

export const mockForumThreads: ForumThread[] = [
  {
    id: "f1",
    author: { name: "Merouan Ballout", initials: "MB", username: "merouan" },
    title: "Hi, I'm merouan",
    brief: "I'm a dba . I'm interested in database...",
    publishedAt: "2026-03-28T03:00:00Z",
    reactionCount: 0,
    responseCount: 0,
    tag: "#introduction",
  },
  {
    id: "f2",
    author: { name: "kapKap", initials: "KK", username: "kapkap" },
    title: "Hi, I'm Mika",
    brief: "I'm an independent web dev coding...",
    publishedAt: "2026-03-28T01:00:00Z",
    reactionCount: 1,
    responseCount: 1,
    tag: "#introduction",
  },
  {
    id: "f3",
    author: { name: "Benjamin Wagner", initials: "BW", username: "bwagner" },
    title: "I built Customermates, a selfhostable, opensource Pipedrive CRM...",
    brief: "I built Customermates because I was...",
    publishedAt: "2026-03-27T21:00:00Z",
    reactionCount: 0,
    responseCount: 1,
  },
  {
    id: "f4",
    author: { name: "Peter Groft", initials: "PG", username: "peterg" },
    title: "Seamless Migration from Google Workspace to Microsoft Office 365",
    brief: "Migrating from Google Workspace to...",
    publishedAt: "2026-03-27T21:00:00Z",
    reactionCount: 0,
    responseCount: 0,
  },
  {
    id: "f5",
    author: { name: "Deepak Singh", initials: "DS", username: "deepaks" },
    title: "Why Multi-Entity Xero Businesses Need Dedicated Backup Solutions?",
    brief: "Multiple Xero organisations...",
    publishedAt: "2026-03-27T18:00:00Z",
    reactionCount: 0,
    responseCount: 1,
  },
  {
    id: "f6",
    author: { name: "Dunlop Marshall", initials: "D", username: "dunlop" },
    title: "Introduction to Sensors",
    brief: "Introduction to Sensors  Sensors are...",
    publishedAt: "2026-03-27T17:00:00Z",
    reactionCount: 0,
    responseCount: 0,
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
