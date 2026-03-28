import { Link2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const WritePrompt = () => {
  return (
    <div className="flex items-center gap-3 py-4 border-b border-border">
      <Avatar className="h-9 w-9 flex-shrink-0">
        <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-semibold">
          U
        </AvatarFallback>
      </Avatar>
      <button className="flex-1 text-left text-muted-foreground text-sm bg-transparent hover:text-foreground transition-colors">
        What are you working on?
      </button>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        <Link2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WritePrompt;
