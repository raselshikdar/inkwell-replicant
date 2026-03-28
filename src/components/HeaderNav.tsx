import { Search, Bell, BookOpen, PenSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const HeaderNav = () => {
  return (
    <header className="sticky top-0 z-50 bg-hn-header border-b border-hn-border">
      <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-14">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">H</span>
            </div>
            <span className="text-hn-header-foreground font-bold text-lg hidden sm:inline">hashnode</span>
          </a>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9 bg-hn-header/50 border-none text-hn-header-foreground placeholder:text-muted-foreground rounded-full focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Right: Nav items */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="text-hn-header-foreground hover:bg-hn-header/80 md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-hn-header-foreground hover:bg-hn-header/80">
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-hn-header-foreground hover:bg-hn-header/80">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-1.5 hidden sm:flex"
          >
            <PenSquare className="h-4 w-4" />
            Write
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden text-hn-header-foreground hover:bg-hn-header/80">
            <PenSquare className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-hn-green text-primary-foreground text-xs font-semibold">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
