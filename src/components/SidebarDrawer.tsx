import { Home, FolderOpen, Bookmark, MessageCircle, Keyboard, Sun, LifeBuoy, ChevronsRight, PenSquare, Settings, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SidebarDrawer = ({ open, onClose }: SidebarDrawerProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: PenSquare, label: "Write", href: "/write" },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: MessageCircle, label: "Forums", href: "/forums", badge: "New" },
    { icon: FolderOpen, label: "Explore", href: "/search" },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-[60] transition-opacity" onClick={onClose} />}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-card z-[70] shadow-xl transform transition-transform duration-200 ease-in-out flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-center py-4">
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronsRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">◆</span>
          </div>
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.href} onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-foreground hover:bg-secondary transition-colors">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && <span className="text-xs font-semibold text-primary ml-1">{item.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-3 pb-4">
          <ul className="space-y-1 mb-3">
            {isAuthenticated && (
              <li>
                <Link to="/settings" onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-foreground hover:bg-secondary w-full transition-colors">
                  <Settings className="h-5 w-5" /><span>Settings</span>
                </Link>
              </li>
            )}
            {[{ icon: Keyboard, label: "Shortcuts" }, { icon: Sun, label: "Theme" }, { icon: LifeBuoy, label: "Resources" }].map((item) => (
              <li key={item.label}>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-foreground hover:bg-secondary w-full transition-colors">
                  <item.icon className="h-5 w-5" /><span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 px-3 py-2.5 border-t border-border pt-4">
            {isAuthenticated ? (
              <>
                <Link to={`/user/${user?.username}`} onClick={onClose} className="flex items-center gap-3 flex-1">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{user?.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-[15px] font-medium text-foreground">{user?.name}</span>
                </Link>
                <button onClick={() => { logout(); onClose(); }} className="text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Link to="/login" onClick={onClose} className="flex items-center gap-3 text-[15px] font-medium text-foreground hover:text-primary">
                <LogIn className="h-5 w-5" /><span>Sign in</span>
              </Link>
            )}
          </div>

          <div className="px-3 pt-3 border-t border-border mt-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Sitemap</a>
            </div>
            <p className="text-xs text-muted-foreground mt-1">© 2026 LinearBytes Inc.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarDrawer;
