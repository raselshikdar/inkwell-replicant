import HeaderNav from "@/components/HeaderNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Triangle, Plus, Loader2 } from "lucide-react";
import { useForumThreads, useCreateThread } from "@/hooks/useForumThreads";
import { useAuth } from "@/contexts/AuthContext";
import { getTimeAgo } from "@/lib/timeAgo";
import { useState } from "react";
import { toast } from "sonner";

const ForumsPage = () => {
  const [filter, setFilter] = useState("all");
  const { data: threads = [], isLoading } = useForumThreads(filter);
  const { user, isAuthenticated } = useAuth();
  const createThread = useCreateThread();
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBrief, setNewBrief] = useState("");
  const [newTag, setNewTag] = useState("#general");

  const handleCreate = async () => {
    if (!newTitle.trim() || !user) return;
    try {
      await createThread.mutateAsync({
        title: newTitle,
        brief: newBrief || newTitle,
        content: newBrief,
        tag: newTag,
        authorId: user.id,
      });
      setNewTitle("");
      setNewBrief("");
      setShowCreate(false);
      toast.success("Thread created!");
    } catch {
      toast.error("Failed to create thread");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <div className="max-w-[720px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Forums</h1>
          </div>
          {isAuthenticated && (
            <Button size="sm" className="rounded-full text-xs gap-1" onClick={() => setShowCreate(!showCreate)}>
              <Plus className="h-3 w-3" /> New Thread
            </Button>
          )}
        </div>

        {showCreate && (
          <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Thread title..."
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <textarea value={newBrief} onChange={(e) => setNewBrief(e.target.value)} placeholder="Describe your topic..." rows={3}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <div className="flex items-center justify-between">
              <select value={newTag} onChange={(e) => setNewTag(e.target.value)}
                className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-foreground">
                <option value="#general">#general</option>
                <option value="#introduction">#introduction</option>
                <option value="#showcase">#showcase</option>
                <option value="#help">#help</option>
              </select>
              <Button size="sm" className="rounded-full text-xs" onClick={handleCreate} disabled={!newTitle.trim() || createThread.isPending}>
                {createThread.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6">
          {["all", "introduction", "showcase", "general"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-border"}`}>
              {f === "all" ? "All" : `#${f}`}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : threads.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">No threads yet. Start the conversation!</p>
        ) : (
          <div className="space-y-0">
            {threads.map((thread) => {
              const initials = thread.profiles?.name
                ? thread.profiles.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                : "U";
              return (
                <div key={thread.id} className="py-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      {thread.profiles?.avatar_url && <AvatarImage src={thread.profiles.avatar_url} />}
                      <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{thread.profiles?.name}</span>
                    <span className="text-xs text-muted-foreground">· {getTimeAgo(thread.created_at)}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-1">{thread.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{thread.brief}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {thread.reaction_count > 0 && (
                      <span className="flex items-center gap-1"><Triangle className="h-3 w-3" /> {thread.reaction_count}</span>
                    )}
                    <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {thread.response_count}</span>
                    {thread.tag && <span className="text-primary font-medium">{thread.tag}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumsPage;
