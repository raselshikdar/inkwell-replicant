import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SidebarDrawer from "@/components/SidebarDrawer";

const HeaderNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <>
      <SidebarDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted h-9 w-9" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">◆</span>
              </div>
              <span className="text-foreground font-bold text-lg">hashnode</span>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted h-9 w-9" onClick={() => navigate("/search")}>
              <Search className="h-5 w-5" />
            </Button>
            {isAuthenticated ? (
              <Link to={`/user/${profile?.username}`}>
                <Avatar className="h-8 w-8 cursor-pointer ml-1">
                  {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
                  <AvatarFallback className="bg-hn-green text-primary-foreground text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" className="text-foreground text-sm ml-1" onClick={() => navigate("/login")}>
                Sign in
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderNav;
