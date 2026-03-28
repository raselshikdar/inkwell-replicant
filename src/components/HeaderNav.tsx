import { Search, Link2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const HeaderNav = () => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-14">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">◆</span>
            </div>
            <span className="text-foreground font-bold text-lg">hashnode</span>
          </a>
        </div>

        {/* Right: Search, Link, Avatar */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted h-9 w-9">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted h-9 w-9">
            <Link2 className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8 cursor-pointer ml-1">
            <AvatarFallback className="bg-hn-green text-primary-foreground text-xs font-semibold">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
