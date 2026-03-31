import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image, X, Bold, Italic, Code, List, Link2, Heading } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePublishArticle } from "@/hooks/useArticles";
import { toast } from "sonner";

const WritePage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverInput, setCoverInput] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");
  const publishMutation = usePublishArticle();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Sign in to write</h1>
          <p className="text-sm text-muted-foreground mb-4">You need to be logged in to create posts.</p>
          <Link to="/login" className="text-primary font-medium hover:underline">Sign in →</Link>
        </div>
      </div>
    );
  }

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || "text").length);
    }, 0);
  };

  const toolbarActions = [
    { icon: Heading, action: () => insertMarkdown("## ", "\n"), label: "Heading" },
    { icon: Bold, action: () => insertMarkdown("**", "**"), label: "Bold" },
    { icon: Italic, action: () => insertMarkdown("*", "*"), label: "Italic" },
    { icon: Code, action: () => insertMarkdown("`", "`"), label: "Code" },
    { icon: List, action: () => insertMarkdown("- ", "\n"), label: "List" },
    { icon: Link2, action: () => insertMarkdown("[", "](url)"), label: "Link" },
    { icon: Image, action: () => insertMarkdown("![alt](", ")"), label: "Image" },
  ];

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !user) return;
    try {
      await publishMutation.mutateAsync({
        title,
        content,
        brief: content.slice(0, 160),
        coverImage,
        tags,
        authorId: user.id,
      });
      toast.success("Article published!");
      navigate("/");
    } catch {
      toast.error("Failed to publish");
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem("draft", JSON.stringify({ title, content, coverImage, tags }));
    toast.success("Draft saved locally!");
  };

  // Load draft on mount
  useState(() => {
    const draft = localStorage.getItem("draft");
    if (draft) {
      try {
        const { title: t, content: c, coverImage: ci, tags: tg } = JSON.parse(draft);
        if (t || c) {
          setTitle(t || "");
          setContent(c || "");
          setCoverImage(ci || "");
          setTags(tg || []);
        }
      } catch {}
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-[900px] mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={handleSaveDraft}>Save draft</Button>
            <Button size="sm" className="rounded-full text-xs" onClick={handlePublish} disabled={!title.trim() || publishMutation.isPending}>
              {publishMutation.isPending ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-4 py-8">
        {coverImage ? (
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-muted mb-6">
            <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            <button onClick={() => setCoverImage("")} className="absolute top-3 right-3 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : coverInput ? (
          <div className="flex items-center gap-2 mb-6">
            <input
              type="url" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="Paste image URL..."
              className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => { if (coverUrl.trim()) { setCoverImage(coverUrl.trim()); setCoverInput(false); setCoverUrl(""); } }}>
              Add
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full text-xs" onClick={() => { setCoverInput(false); setCoverUrl(""); }}>
              Cancel
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setCoverInput(true)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 border border-dashed border-border rounded-lg px-4 py-8 w-full justify-center transition-colors"
          >
            <Image className="h-5 w-5" /> Add cover image
          </button>
        )}

        <textarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title..."
          className="w-full text-3xl font-extrabold text-foreground placeholder:text-muted-foreground/50 bg-transparent border-none outline-none resize-none mb-4" rows={2} />

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1.5 rounded-full">
              #{tag}
              <button onClick={() => setTags(tags.filter((t) => t !== tag))}><X className="h-3 w-3" /></button>
            </span>
          ))}
          {tags.length < 5 && (
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
              placeholder="Add tag..." className="text-sm bg-transparent text-foreground placeholder:text-muted-foreground outline-none w-24" />
          )}
        </div>

        <div className="flex items-center gap-1 border border-border rounded-lg px-2 py-1.5 mb-4 bg-card">
          {toolbarActions.map(({ icon: Icon, action, label }) => (
            <button key={label} onClick={action} title={label} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <textarea ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tell your story... (Markdown supported)"
          className="w-full min-h-[400px] text-sm text-foreground placeholder:text-muted-foreground/50 bg-transparent border-none outline-none resize-none leading-relaxed" />
      </div>
    </div>
  );
};

export default WritePage;
