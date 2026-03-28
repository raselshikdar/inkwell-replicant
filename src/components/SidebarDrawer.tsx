import { Home, FolderOpen, Bookmark, MessageCircle, Keyboard, Sun, LifeBuoy, ChevronsRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: FolderOpen, label: "Blogs", href: "/blogs" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: MessageCircle, label: "Forums", href: "/forums", badge: "New" },
];

const bottomItems = [
  { icon: Keyboard, label: "Shortcuts" },
  { icon: Sun, label: "Theme" },
  { icon: LifeBuoy, label: "Resources" },
];

const SidebarDrawer = ({ open, onClose }: SidebarDrawerProps) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-card z-[70] shadow-xl transform transition-transform duration-200 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close / collapse button */}
        <div className="flex justify-center py-4">
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronsRight className="h-5 w-5" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">◆</span>
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                    item.active
                      ? "bg-secondary text-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-xs font-semibold text-primary ml-1">
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-4">
          <ul className="space-y-1 mb-3">
            {bottomItems.map((item) => (
              <li key={item.label}>
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-foreground hover:bg-secondary w-full transition-colors">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* User */}
          <div className="flex items-center gap-3 px-3 py-2.5 border-t border-border pt-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-amber-500 text-white text-xs font-semibold">
                RS
              </AvatarFallback>
            </Avatar>
            <span className="text-[15px] font-medium text-foreground">Guest User</span>
          </div>

          {/* Footer */}
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
