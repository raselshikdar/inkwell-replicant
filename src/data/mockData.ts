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
    title: "How to Build REST APIs: Part 11 — Auth",
    brief: "A comprehensive guide to adding authentication to your REST API using JWT tokens, OAuth, and session management.",
    slug: "how-to-build-rest-apis-part-11-auth",
    coverImage: "",
    author: {
      name: "Sarah Chen",
      photo: "",
      username: "sarahchen",
      blogName: "Sarah's Dev Blog",
    },
    publishedAt: "2026-03-27",
    readTimeMinutes: 8,
    reactionCount: 142,
    responseCount: 23,
    tags: [{ name: "REST API", slug: "rest-api" }, { name: "Auth", slug: "auth" }],
    isFeatured: true,
  },
  {
    id: "2",
    title: "GPT-5 Release: Beginners Guide",
    brief: "Everything you need to know about GPT-5 and how to get started using it in your projects.",
    slug: "gpt-5-release-beginners-guide",
    coverImage: "",
    author: {
      name: "Alex Rivera",
      photo: "",
      username: "alexrivera",
      blogName: "AI Weekly",
    },
    publishedAt: "2026-03-26",
    readTimeMinutes: 6,
    reactionCount: 298,
    responseCount: 45,
    tags: [{ name: "AI", slug: "ai" }, { name: "GPT", slug: "gpt" }],
  },
  {
    id: "3",
    title: "He says, He Tells — Indirect Speech Patterns in Code Reviews",
    brief: "Communication patterns in code reviews and how they impact team dynamics.",
    slug: "indirect-speech-patterns-code-reviews",
    coverImage: "",
    author: {
      name: "Marcus Johnson",
      photo: "",
      username: "marcusj",
      blogName: "Code Culture",
    },
    publishedAt: "2026-03-26",
    readTimeMinutes: 5,
    reactionCount: 87,
    responseCount: 12,
    tags: [{ name: "Code Review", slug: "code-review" }, { name: "Culture", slug: "culture" }],
  },
  {
    id: "4",
    title: "How to Set Up Automatic Deployment with GitHub Actions",
    brief: "Step by step guide to setting up CI/CD pipelines using GitHub Actions for your web projects.",
    slug: "automatic-deployment-github-actions",
    coverImage: "",
    author: {
      name: "Priya Patel",
      photo: "",
      username: "priyap",
      blogName: "DevOps Daily",
    },
    publishedAt: "2026-03-25",
    readTimeMinutes: 10,
    reactionCount: 156,
    responseCount: 31,
    tags: [{ name: "DevOps", slug: "devops" }, { name: "GitHub Actions", slug: "github-actions" }],
  },
  {
    id: "5",
    title: "PSA: Always Use TypeScript Strict Mode",
    brief: "Why strict mode should be enabled in every TypeScript project and how to migrate existing codebases.",
    slug: "psa-always-use-typescript-strict-mode",
    coverImage: "",
    author: {
      name: "Tom Wilson",
      photo: "",
      username: "tomwilson",
      blogName: "TypeScript Tips",
    },
    publishedAt: "2026-03-25",
    readTimeMinutes: 4,
    reactionCount: 412,
    responseCount: 67,
    tags: [{ name: "TypeScript", slug: "typescript" }],
  },
  {
    id: "6",
    title: "What's New in React 20: A Complete Overview",
    brief: "Exploring all the new features and improvements in React 20 including the new compiler and server components.",
    slug: "whats-new-react-20",
    coverImage: "",
    author: {
      name: "Emma Zhang",
      photo: "",
      username: "emmazhang",
      blogName: "React Weekly",
    },
    publishedAt: "2026-03-24",
    readTimeMinutes: 12,
    reactionCount: 523,
    responseCount: 89,
    tags: [{ name: "React", slug: "react" }, { name: "JavaScript", slug: "javascript" }],
  },
  {
    id: "7",
    title: "Why Python is Still the #1 Language in AI/ML",
    brief: "An analysis of why Python continues to dominate the AI and machine learning landscape.",
    slug: "why-python-still-number-one-ai-ml",
    coverImage: "",
    author: {
      name: "David Kim",
      photo: "",
      username: "davidkim",
      blogName: "ML Engineering",
    },
    publishedAt: "2026-03-24",
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
