export interface AuthorToFollow {
  name: string;
  handle?: string;
  bio: string;
  postsThisMonth: number;
  initials: string;
  photo?: string;
}

export interface TrendingTagWeek {
  rank: number;
  name: string;
  count: number;
}

export interface TrendingSeries {
  rank: number;
  name: string;
  author: string;
  views: number;
  posts: number;
}

export const mockAuthorsToFollow: AuthorToFollow[] = [
  { name: "Roman Zaiev", bio: "Building Hypha, a next-generation video platform for professional...", postsThisMonth: 1, initials: "RZ" },
  { name: "Amit singh", handle: "@asyncamit", bio: "", postsThisMonth: 6, initials: "AS" },
  { name: "Habib Najibullah", bio: "AI Security", postsThisMonth: 1, initials: "HN" },
  { name: "Harsh", bio: "Data Science and Machine Learning student @IIT Madras", postsThisMonth: 15, initials: "H" },
  { name: "Sudheer Tripathi", bio: "SWE3 @ Clearglass | Solving engineering problems one step at a...", postsThisMonth: 1, initials: "ST" },
];

export const mockTrendingTagsWeek: TrendingTagWeek[] = [
  { rank: 1, name: "#ai", count: 301 },
  { rank: 2, name: "#chaicode", count: 252 },
  { rank: 3, name: "#javascript", count: 202 },
  { rank: 4, name: "#chaiaurcode", count: 139 },
  { rank: 5, name: "#web-development", count: 90 },
  { rank: 6, name: "#devops", count: 85 },
  { rank: 7, name: "#security", count: 81 },
  { rank: 8, name: "#chaicohort", count: 78 },
  { rank: 9, name: "#mcp", count: 78 },
  { rank: 10, name: "#webdev", count: 71 },
  { rank: 11, name: "#automation", count: 56 },
  { rank: 12, name: "#python", count: 52 },
  { rank: 13, name: "#cybersecurity", count: 48 },
  { rank: 14, name: "#programming-blogs", count: 47 },
];

export const mockTrendingSeries: TrendingSeries[] = [
  { rank: 1, name: "#AndroidDev", author: "Shreyas Patil | The official bl...", views: 1398, posts: 1 },
  { rank: 2, name: "The APEX Developer Reinve...", author: "Dimitri Gielis writing about O...", views: 1183, posts: 1 },
  { rank: 3, name: "Comparing programming l...", author: "Uncle Mario's ramblings", views: 1006, posts: 1 },
  { rank: 4, name: "VCF Automation", author: "Warroyo's Blog", views: 479, posts: 1 },
  { rank: 5, name: "PacketSmith", author: "Netomize Official Blog", views: 448, posts: 3 },
  { rank: 6, name: "Hosting & Deployment Platf...", author: "jcalloway.dev — Dev Tools, AI...", views: 400, posts: 12 },
  { rank: 7, name: "Building Tripvento", author: "Tripvento B2B Hotel Rankings ...", views: 377, posts: 2 },
  { rank: 8, name: "Linux for DevOps Beginners", author: "From Not Knowing How to Sh...", views: 329, posts: 7 },
  { rank: 9, name: "Applied AI Digest", author: "Fractional AI Engineering Blog", views: 325, posts: 1 },
  { rank: 10, name: "Production Rust: Lessons fro...", author: "The Rust Guy", views: 306, posts: 1 },
];
