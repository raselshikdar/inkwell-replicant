import { Triangle, MessageCircle, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const BottomDiscussionPost = () => {
  return (
    <div className="py-4 border-b border-border">
      {/* Author */}
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="bg-hn-green text-primary-foreground text-[9px] font-semibold">
            SD
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-foreground">Saikat Das</span>
        <span className="text-xs text-muted-foreground">in blog.saikat.in</span>
        <div className="flex-1" />
        <Bookmark className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="flex gap-2 ml-0">
        <div className="flex flex-col items-center gap-1 pt-0.5">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Triangle className="h-4 w-4" />
          </button>
          <span className="text-xs text-muted-foreground">0</span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="h-4 w-4" />
          </button>
          <span className="text-xs text-muted-foreground">0</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-foreground leading-snug">
            How I Got gRPC Working Through Cloudflare Tunnel (The...
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            4h ago · 7 min read · A complete guide to exposing a Go gRPC backend behin...
          </p>
          <button className="text-primary text-sm font-medium mt-2 hover:underline flex items-center gap-1">
            ⊕ Join discussion
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomDiscussionPost;
